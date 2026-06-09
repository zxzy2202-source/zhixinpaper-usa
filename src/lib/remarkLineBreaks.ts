export function remarkLineBreaks() {
  return function transformer(tree: any) {
    transformChildren(tree);
  };
}

function transformChildren(node: any) {
  if (!node || !Array.isArray(node.children)) return;

  const nextChildren: any[] = [];

  for (const child of node.children) {
    if (child?.type === "text" && typeof child.value === "string" && child.value.includes("\n")) {
      const parts = child.value.split("\n");

      parts.forEach((part: string, index: number) => {
        if (part) nextChildren.push({ ...child, value: part });
        if (index < parts.length - 1) nextChildren.push({ type: "break" });
      });
      continue;
    }

    transformChildren(child);
    nextChildren.push(child);
  }

  node.children = nextChildren;
}
