#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const FEISHU_OPEN_BASE = "https://open.feishu.cn/open-apis";

function loadLocalEnv() {
  const envPath = resolve(process.cwd(), ".env.local");

  if (!existsSync(envPath)) {
    return;
  }

  const content = readFileSync(envPath, "utf8");

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      continue;
    }

    const [rawKey, ...rawValueParts] = trimmed.split("=");
    const key = rawKey.trim();
    const value = rawValueParts.join("=").trim().replace(/^['"]|['"]$/g, "");

    if (key && process.env[key] == null) {
      process.env[key] = value;
    }
  }
}

function parseArgs(argv) {
  const args = {};

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];

    if (!current.startsWith("--")) {
      continue;
    }

    const key = current.slice(2);
    const next = argv[index + 1];

    if (next && !next.startsWith("--")) {
      args[key] = next;
      index += 1;
      continue;
    }

    args[key] = true;
  }

  return args;
}

function printHelp() {
  console.log(`Read a Feishu wiki page or docx document.

Usage:
  node scripts/read-feishu-wiki.mjs --url <feishu_url>
  node scripts/read-feishu-wiki.mjs --token <wiki_or_docx_token> [--type wiki|docx]
  node scripts/read-feishu-wiki.mjs --url <feishu_directory_url> --children
  node scripts/read-feishu-wiki.mjs --token <token> --json

Environment:
  FEISHU_APP_ID
  FEISHU_APP_SECRET
  FEISHU_WIKI_TOKEN (optional default token)

Examples:
  node scripts/read-feishu-wiki.mjs --url 'https://xxx.feishu.cn/wiki/AbCdEfGhIjk'
  node scripts/read-feishu-wiki.mjs --token wikcnAbCdEfGhIjk
  node scripts/read-feishu-wiki.mjs --token doxcnAbCdEfGhIjk --type docx
  node scripts/read-feishu-wiki.mjs --url 'https://xxx.feishu.cn/wiki/AbCdEfGhIjk' --children
`);
}

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function extractTokenFromUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);
    const segments = url.pathname.split("/").filter(Boolean);

    const supportedTypes = ["wiki", "docx", "docs", "sheets", "base", "slides", "file"];

    for (let index = 0; index < segments.length; index += 1) {
      const segment = segments[index];
      if (supportedTypes.includes(segment) && segments[index + 1]) {
        const token = segments[index + 1].split("?")[0];
        return {
          token,
          inputType: segment === "docs" ? "doc" : segment,
        };
      }
    }

    return null;
  } catch {
    return null;
  }
}

async function feishuRequest(path, { method = "GET", accessToken, body } = {}) {
  const response = await fetch(`${FEISHU_OPEN_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = await response.json().catch(() => null);

  if (!response.ok) {
    const message = json?.msg || response.statusText;
    throw new Error(`Feishu API failed (${response.status}): ${message}`);
  }

  if (!json || json.code !== 0) {
    throw new Error(`Feishu API error (${json?.code ?? "unknown"}): ${json?.msg ?? "unknown error"}`);
  }

  return json;
}

async function getTenantAccessToken() {
  const appId = requireEnv("FEISHU_APP_ID");
  const appSecret = requireEnv("FEISHU_APP_SECRET");

  const result = await feishuRequest("/auth/v3/tenant_access_token/internal", {
    method: "POST",
    body: {
      app_id: appId,
      app_secret: appSecret,
    },
  });

  return result.tenant_access_token;
}

async function getWikiNode(accessToken, token, objType) {
  const params = new URLSearchParams({ token });

  if (objType && objType !== "wiki") {
    params.set("obj_type", objType);
  }

  const result = await feishuRequest(`/wiki/v2/spaces/get_node?${params.toString()}`, {
    accessToken,
  });

  return result.data.node;
}

async function getAllDocxBlocks(accessToken, documentId) {
  const items = [];
  let pageToken = null;

  do {
    const params = new URLSearchParams({
      page_size: "500",
      document_revision_id: "-1",
    });

    if (pageToken) {
      params.set("page_token", pageToken);
    }

    const result = await feishuRequest(
      `/docx/v1/documents/${encodeURIComponent(documentId)}/blocks?${params.toString()}`,
      { accessToken }
    );

    items.push(...(result.data?.items || []));
    pageToken = result.data?.page_token || null;
  } while (pageToken);

  return items;
}

async function getWikiChildren(accessToken, spaceId, parentNodeToken) {
  const items = [];
  let pageToken = null;

  do {
    const params = new URLSearchParams({
      page_size: "50",
      parent_node_token: parentNodeToken,
    });

    if (pageToken) {
      params.set("page_token", pageToken);
    }

    const result = await feishuRequest(
      `/wiki/v2/spaces/${encodeURIComponent(spaceId)}/nodes?${params.toString()}`,
      { accessToken }
    );

    items.push(...(result.data?.items || []));
    pageToken = result.data?.page_token || null;
  } while (pageToken);

  return items;
}

function textFromElements(elements = []) {
  return elements
    .map((element) => {
      if (element.text_run?.content) {
        return element.text_run.content;
      }
      if (element.mention_doc?.title) {
        return element.mention_doc.title;
      }
      if (element.reminder?.expire_time) {
        return `[Reminder ${element.reminder.expire_time}]`;
      }
      if (element.inline_block?.block_id) {
        return "[Inline block]";
      }
      if (element.file?.file_token) {
        return "[Attachment]";
      }
      if (element.mention_user?.user_id) {
        return "@user";
      }
      return "";
    })
    .join("");
}

function blockLabel(blockType) {
  const labels = {
    1: "",
    2: "",
    3: "# ",
    4: "## ",
    5: "### ",
    6: "#### ",
    7: "##### ",
    8: "###### ",
    12: "- ",
    13: "1. ",
    14: "```",
    15: "> ",
    17: "- [ ] ",
    22: "---",
  };

  return labels[blockType] ?? "";
}

function blockText(block) {
  const payload =
    block.page ||
    block.text ||
    block.heading1 ||
    block.heading2 ||
    block.heading3 ||
    block.heading4 ||
    block.heading5 ||
    block.heading6 ||
    block.heading7 ||
    block.heading8 ||
    block.heading9 ||
    block.bullet ||
    block.ordered ||
    block.code ||
    block.quote ||
    block.todo ||
    null;

  if (block.block_type === 22) {
    return "---";
  }

  if (block.block_type === 27) {
    return "[Image]";
  }

  if (block.block_type === 23) {
    return "[File]";
  }

  if (block.block_type === 30) {
    return "[Sheet]";
  }

  if (block.block_type === 31) {
    return "[Table]";
  }

  if (block.block_type === 42 || block.block_type === 51) {
    return "[Wiki catalog]";
  }

  if (!payload) {
    return "";
  }

  const content = textFromElements(payload.elements);
  const prefix = blockLabel(block.block_type);

  if (block.block_type === 14) {
    return content ? `\`\`\`\n${content}\n\`\`\`` : "";
  }

  return `${prefix}${content}`.trimEnd();
}

function buildTree(items) {
  const blockMap = new Map(items.map((item) => [item.block_id, item]));
  const roots = [];

  for (const item of items) {
    if (!item.parent_id || !blockMap.has(item.parent_id)) {
      roots.push(item);
    }
  }

  return { roots, blockMap };
}

function renderBlock(block, blockMap, depth = 0, lines = []) {
  const line = blockText(block);
  if (line) {
    const indent =
      block.block_type === 12 || block.block_type === 13 || block.block_type === 17
        ? "  ".repeat(Math.max(depth - 1, 0))
        : "";
    lines.push(indent + line);
  }

  for (const childId of block.children || []) {
    const child = blockMap.get(childId);
    if (!child) {
      continue;
    }
    renderBlock(child, blockMap, depth + 1, lines);
  }

  return lines;
}

function renderDocx(items) {
  const { roots, blockMap } = buildTree(items);
  const lines = [];

  for (const root of roots) {
    renderBlock(root, blockMap, 0, lines);
  }

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

async function summarizeChild(accessToken, child) {
  if (child.obj_type !== "docx" || !child.obj_token) {
    return "";
  }

  const blocks = await getAllDocxBlocks(accessToken, child.obj_token);
  return renderDocx(blocks).replace(/\s+/g, " ").trim().slice(0, 320);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help || args.h) {
    printHelp();
    return;
  }

  const extracted = args.url ? extractTokenFromUrl(args.url) : null;
  const token = args.token || extracted?.token || process.env.FEISHU_WIKI_TOKEN;
  const inputType = args.type || extracted?.inputType || "wiki";

  if (!token) {
    printHelp();
    throw new Error("Please provide --url, --token, or FEISHU_WIKI_TOKEN.");
  }

  const accessToken = await getTenantAccessToken();
  const node = await getWikiNode(accessToken, token, inputType);

  if (args.children) {
    const children = await getWikiChildren(accessToken, node.space_id, node.node_token);
    const rows = [];

    for (const child of children) {
      rows.push({
        title: child.title,
        url: child.url,
        obj_type: child.obj_type,
        node_token: child.node_token,
        obj_token: child.obj_token,
        has_child: child.has_child,
        summary: await summarizeChild(accessToken, child),
      });
    }

    if (args.json) {
      console.log(JSON.stringify({ node, children: rows }, null, 2));
      return;
    }

    console.log(`# ${node.title}`);
    console.log("");
    console.log(`Children: ${rows.length}`);
    console.log("");

    for (const [index, child] of rows.entries()) {
      console.log(`${index + 1}. ${child.title}`);
      console.log(`   url: ${child.url}`);
      console.log(`   type: ${child.obj_type}`);
      if (child.summary) {
        console.log(`   summary: ${child.summary}`);
      }
      console.log("");
    }
    return;
  }

  if (args.json) {
    const payload = { node };

    if (node.obj_type === "docx") {
      payload.blocks = await getAllDocxBlocks(accessToken, node.obj_token);
    }

    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  console.log(`# ${node.title}`);
  console.log("");
  console.log(`- space_id: ${node.space_id}`);
  console.log(`- node_token: ${node.node_token}`);
  console.log(`- obj_type: ${node.obj_type}`);
  console.log(`- obj_token: ${node.obj_token}`);
  console.log(`- updated_at: ${node.obj_edit_time}`);
  console.log("");

  if (node.obj_type !== "docx") {
    console.log(`This script can resolve the node, but rich content export is currently implemented for docx only.`);
    return;
  }

  const blocks = await getAllDocxBlocks(accessToken, node.obj_token);
  const content = renderDocx(blocks);

  console.log(content || "[Document content is empty or not supported by the current renderer.]");
}

loadLocalEnv();

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
