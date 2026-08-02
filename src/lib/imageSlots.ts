/**
 * 图片槽位注册中心 (边界安全文件)
 * ─────────────────────────────────────────────────────────────────
 * 设计目标：前台用图全部走"槽位"，运营在后台拖图绑定即可换图，
 * 永远不需要改代码。
 *
 * 使用方式：
 *   1) 前台组件：
 *        import { SlotImage } from "@/components/ui/SlotImage";
 *        <SlotImage slotKey="home.hero" alt="..." fill priority />
 *
 *   2) 新增槽位：在下面 SLOT_REGISTRY 里加一项，slotKey 全局唯一。
 *      fallback 是没绑定时的兜底图（必须是已存在的 public 路径或 CDN）。
 *
 * 🚨 文件铁律（来自 zxpapers v1.2 实战教训）：
 *   - 本文件必须保持"零 Node 运行时依赖"，可被 'use client' 组件 import。
 *   - 只允许导出：纯常量、纯类型、纯函数。
 *   - 禁止 import 任何含 node:fs / @libsql / drizzle / 服务端运行时的模块。
 *   - 跨服务端模块借类型时用 `import type`，绝不 import 运行时值。
 */

// ── 槽位类型 ─────────────────────────────────────────────────────
export type SlotGroup =
  | "home"
  | "products"
  | "industries"
  | "about"
  | "factory"
  | "geo"
  | "case-studies"
  | "general";

export interface SlotDefinition {
  /** 强类型 key，命名规范：group.sub-name */
  key: string;
  /** 后台展示标签 */
  label: string;
  /** 后台展示描述 */
  description: string;
  /** 所属分组 */
  group: SlotGroup;
  /** 未绑定时的兜底图 URL */
  fallback: string;
  /** alt 文本默认值（后台未填时用） */
  defaultAlt: string;
  /** 建议尺寸 (用于后台提示) */
  recommendedSize?: string;
}

// ── 注册表 ───────────────────────────────────────────────────────
// 顺序无关，但 key 不能重复。
export const SLOT_REGISTRY = [
  // ── 首页 ─────────────────────────────────────────
  {
    key: "home.hero",
    label: "首页主视觉 Hero",
    description: "首屏全宽背景图，建议大场景的工厂或产品堆放图",
    group: "home",
    fallback: "/images/hero-bg.jpg",
    defaultAlt:
      "BPA-free thermal paper rolls in a large manufacturing facility by Zhixin Paper",
    recommendedSize: "2400 × 1200 px",
  },
  {
    key: "home.product.thermal-rolls",
    label: "首页 - 产品卡片 1 (Thermal Paper Rolls)",
    description: "首页产品区第一张卡片图",
    group: "home",
    fallback: "/images/thermal-rolls-product.jpg",
    defaultAlt:
      "Various sizes of BPA-free thermal paper rolls for POS, ATM, and receipt printers",
    recommendedSize: "800 × 600 px",
  },
  {
    key: "home.product.thermal-labels",
    label: "首页 - 产品卡片 2 (Thermal Labels)",
    description: "首页产品区第二张卡片图",
    group: "home",
    fallback: "/images/thermal-labels-product.jpg",
    defaultAlt:
      "Various rolls of thermal labels including direct thermal, shipping, and barcode labels",
    recommendedSize: "800 × 600 px",
  },
  {
    key: "home.factory-overview",
    label: "首页 - 工厂总览图",
    description: "首页 About 区与 CTA 区共用的工厂图",
    group: "home",
    fallback: "/images/factory-overview.jpg",
    defaultAlt:
      "Thermal paper manufacturing facility with paper rolls, converting equipment, and workers",
    recommendedSize: "1280 × 960 px",
  },
  {
    key: "home.compliance",
    label: "首页 - 合规认证图",
    description: "首页合规区展示证书墙或样品图",
    group: "home",
    fallback: "/images/compliance-certifications.jpg",
    defaultAlt:
      "Thermal paper compliance document and sample review display",
    recommendedSize: "1200 × 900 px",
  },

  // ── About / Factory ─────────────────────────────
  {
    key: "about.banner",
    label: "About 页 - 顶部 Banner",
    description: "About 页顶部全宽形象图",
    group: "about",
    fallback: "/images/factory-overview.jpg",
    defaultAlt: "Zhixin Paper factory exterior and team",
    recommendedSize: "2400 × 800 px",
  },
  {
    key: "factory.banner",
    label: "Factory 页 - 顶部 Banner",
    description: "Factory 页顶部形象图",
    group: "factory",
    fallback: "/images/factory-overview.jpg",
    defaultAlt: "Inside Zhixin Paper thermal paper manufacturing line",
    recommendedSize: "2400 × 800 px",
  },
  {
    key: "factory.equipment.thermal-coating",
    label: "设备页 - Thermal Coating",
    description: "热敏涂布工序设备实拍，需展示辊筒、料幅或连续生产线",
    group: "factory",
    fallback: "/images/factory-overview.jpg",
    defaultAlt: "Thermal coating production equipment used in a paper manufacturing process",
    recommendedSize: "1200 × 900 px",
  },
  {
    key: "factory.equipment.slitting-rewinding",
    label: "设备页 - Slitting & Rewinding",
    description: "纸卷分切与复卷设备实拍，需清晰展示卷材和机械结构",
    group: "factory",
    fallback: "/images/factory-overview.jpg",
    defaultAlt: "Paper roll slitting and rewinding equipment in a converting facility",
    recommendedSize: "1200 × 900 px",
  },
  {
    key: "factory.equipment.flexographic-printing",
    label: "设备页 - Flexographic Printing",
    description: "柔版印刷设备实拍，建议展示滚筒、走料与操作区域",
    group: "factory",
    fallback: "/images/factory-overview.jpg",
    defaultAlt: "Flexographic printing equipment for custom paper and label projects",
    recommendedSize: "1200 × 900 px",
  },
  {
    key: "factory.equipment.die-cutting-finishing",
    label: "设备页 - Die Cutting & Finishing",
    description: "标签模切及后道加工设备实拍",
    group: "factory",
    fallback: "/images/factory-overview.jpg",
    defaultAlt: "Label die cutting and finishing equipment in production",
    recommendedSize: "1200 × 900 px",
  },
  {
    key: "factory.equipment.lamination-converting",
    label: "设备页 - Lamination & Converting",
    description: "复合与材料转换设备实拍，建议包含卷材路径",
    group: "factory",
    fallback: "/images/factory-overview.jpg",
    defaultAlt: "Roll-fed lamination and converting equipment in a factory",
    recommendedSize: "1200 × 900 px",
  },
  {
    key: "factory.equipment.quality-inspection",
    label: "设备页 - Quality Inspection",
    description: "质量检验设备或人员执行卷材、标签检查的实拍",
    group: "factory",
    fallback: "/images/factory-overview.jpg",
    defaultAlt: "Quality inspection process for thermal paper and label rolls",
    recommendedSize: "1200 × 900 px",
  },

  // ── 产品卡片图（行业页推荐产品区） ─────────────
  {
    key: "products.card.standard-pos-rolls",
    label: "产品卡片 - Standard POS Rolls",
    description: "行业页推荐产品区卡片图",
    group: "products",
    fallback: "/images/thermal-rolls-product.jpg",
    defaultAlt: "Standard POS thermal paper rolls by Zhixin Paper",
    recommendedSize: "640 × 480 px",
  },
  {
    key: "products.card.credit-card-terminal-rolls",
    label: "产品卡片 - Credit Card Terminal Rolls",
    description: "产品目录及推荐产品区卡片图",
    group: "products",
    fallback: "/images/thermal-rolls-product.jpg",
    defaultAlt: "Credit card terminal thermal paper rolls by Zhixin Paper",
    recommendedSize: "640 × 480 px",
  },
  {
    key: "products.card.lottery-gaming-rolls",
    label: "产品卡片 - Lottery & Gaming Rolls",
    description: "行业页推荐产品区卡片图",
    group: "products",
    fallback: "/images/thermal-rolls-product.jpg",
    defaultAlt: "Lottery and gaming thermal paper rolls by Zhixin Paper",
    recommendedSize: "640 × 480 px",
  },
  {
    key: "products.card.casino-tito-rolls",
    label: "产品卡片 - Casino TITO Rolls",
    description: "行业页推荐产品区卡片图",
    group: "products",
    fallback: "/images/thermal-rolls-product.jpg",
    defaultAlt: "Casino TITO thermal paper rolls by Zhixin Paper",
    recommendedSize: "640 × 480 px",
  },
  {
    key: "products.card.atm-banking-rolls",
    label: "产品卡片 - ATM & Banking Rolls",
    description: "行业页推荐产品区卡片图",
    group: "products",
    fallback: "/images/thermal-rolls-product.jpg",
    defaultAlt: "ATM and banking thermal paper rolls by Zhixin Paper",
    recommendedSize: "640 × 480 px",
  },
  {
    key: "products.card.medical-rolls",
    label: "产品卡片 - Medical Rolls",
    description: "行业页推荐产品区卡片图",
    group: "products",
    fallback: "/images/thermal-rolls-product.jpg",
    defaultAlt: "Medical grade thermal paper rolls by Zhixin Paper",
    recommendedSize: "640 × 480 px",
  },
  {
    key: "products.card.back-print-thermal-rolls",
    label: "产品卡片 - Back Print Thermal Rolls",
    description: "行业页推荐产品区卡片图",
    group: "products",
    fallback: "/images/thermal-rolls-product.jpg",
    defaultAlt: "Back print thermal paper rolls by Zhixin Paper",
    recommendedSize: "640 × 480 px",
  },
  {
    key: "products.card.custom-printed-rolls",
    label: "产品卡片 - Custom Printed Rolls",
    description: "行业页推荐产品区卡片图",
    group: "products",
    fallback: "/images/thermal-rolls-product.jpg",
    defaultAlt: "Custom printed thermal paper rolls by Zhixin Paper",
    recommendedSize: "640 × 480 px",
  },
  {
    key: "products.card.direct-thermal-labels",
    label: "产品卡片 - Direct Thermal Labels",
    description: "行业页推荐产品区卡片图",
    group: "products",
    fallback: "/images/thermal-labels-product.jpg",
    defaultAlt: "Direct thermal shipping labels by Zhixin Paper",
    recommendedSize: "640 × 480 px",
  },
  {
    key: "products.card.freezer-cold-chain-labels",
    label: "产品卡片 - Freezer Cold Chain Labels",
    description: "行业页推荐产品区卡片图",
    group: "products",
    fallback: "/images/thermal-labels-product.jpg",
    defaultAlt: "Freezer and cold chain thermal labels by Zhixin Paper",
    recommendedSize: "640 × 480 px",
  },
  {
    key: "products.card.fanfold-labels",
    label: "产品卡片 - Fanfold Labels",
    description: "行业页推荐产品区卡片图",
    group: "products",
    fallback: "/images/thermal-labels-product.jpg",
    defaultAlt: "Fanfold thermal labels by Zhixin Paper",
    recommendedSize: "640 × 480 px",
  },
  {
    key: "products.card.wristband-labels",
    label: "产品卡片 - Wristband Labels",
    description: "行业页推荐产品区卡片图",
    group: "products",
    fallback: "/images/thermal-labels-product.jpg",
    defaultAlt: "Thermal wristband labels by Zhixin Paper",
    recommendedSize: "640 × 480 px",
  },
  {
    key: "products.card.custom-printed-labels",
    label: "产品卡片 - Custom Printed Labels",
    description: "行业页推荐产品区卡片图",
    group: "products",
    fallback: "/images/thermal-labels-product.jpg",
    defaultAlt: "Custom printed thermal labels by Zhixin Paper",
    recommendedSize: "640 × 480 px",
  },
  {
    key: "products.card.high-temperature-labels",
    label: "产品卡片 - High Temperature Labels",
    description: "行业页推荐产品区卡片图",
    group: "products",
    fallback: "/images/thermal-labels-product.jpg",
    defaultAlt: "High temperature industrial labels by Zhixin Paper",
    recommendedSize: "640 × 480 px",
  },
  {
    key: "products.card.chemical-resistant-labels",
    label: "产品卡片 - Chemical Resistant Labels",
    description: "行业页推荐产品区卡片图",
    group: "products",
    fallback: "/images/thermal-labels-product.jpg",
    defaultAlt: "Chemical resistant industrial labels by Zhixin Paper",
    recommendedSize: "640 × 480 px",
  },
  {
    key: "products.card.tamper-evident-labels",
    label: "产品卡片 - Tamper Evident Labels",
    description: "行业页推荐产品区卡片图",
    group: "products",
    fallback: "/images/thermal-labels-product.jpg",
    defaultAlt: "Tamper evident specialty labels by Zhixin Paper",
    recommendedSize: "640 × 480 px",
  },
  {
    key: "products.card.parking-ticketing-rolls",
    label: "产品卡片 - Parking Ticketing Rolls",
    description: "行业页推荐产品区卡片图",
    group: "products",
    fallback: "/images/thermal-rolls-product.jpg",
    defaultAlt: "Parking and ticketing thermal rolls by Zhixin Paper",
    recommendedSize: "640 × 480 px",
  },
  {
    key: "products.card.transport-ticket-rolls",
    label: "产品卡片 - Transport Ticket Rolls",
    description: "行业页推荐产品区卡片图",
    group: "products",
    fallback: "/images/thermal-rolls-product.jpg",
    defaultAlt: "Transport ticket thermal rolls by Zhixin Paper",
    recommendedSize: "640 × 480 px",
  },
  {
    key: "products.card.kiosk-vending-rolls",
    label: "产品卡片 - Kiosk & Vending Rolls",
    description: "推荐产品区卡片图",
    group: "products",
    fallback: "/images/thermal-rolls-product.jpg",
    defaultAlt: "Kiosk and vending thermal paper rolls by Zhixin Paper",
    recommendedSize: "640 × 480 px",
  },
  {
    key: "products.card.thermal-transfer-labels",
    label: "产品卡片 - Thermal Transfer Labels",
    description: "推荐产品区卡片图",
    group: "products",
    fallback: "/images/thermal-labels-product.jpg",
    defaultAlt: "Thermal transfer labels by Zhixin Paper",
    recommendedSize: "640 × 480 px",
  },
  {
    key: "products.card.removable-labels",
    label: "产品卡片 - Removable Labels",
    description: "产品目录及推荐产品区卡片图",
    group: "products",
    fallback: "/images/thermal-labels-product.jpg",
    defaultAlt: "Removable thermal labels by Zhixin Paper",
    recommendedSize: "640 × 480 px",
  },
  {
    key: "products.card.synthetic-paper-labels",
    label: "产品卡片 - Synthetic Paper Labels",
    description: "推荐产品区卡片图",
    group: "products",
    fallback: "/images/thermal-labels-product.jpg",
    defaultAlt: "Synthetic paper and PP labels by Zhixin Paper",
    recommendedSize: "640 × 480 px",
  },

  // ── GEO 地区落地页 ──────────────────────────────
  {
    key: "geo.us.hero",
    label: "/us 页 - 顶部 Hero",
    description: "美国市场落地页 Hero 图，建议带 USA / FDA 元素",
    group: "geo",
    fallback: "/images/hero-bg.jpg",
    defaultAlt: "Thermal paper rolls shipped DDP to USA distributors",
    recommendedSize: "2400 × 1000 px",
  },
  {
    key: "geo.ca.hero",
    label: "/ca 页 - 顶部 Hero",
    description: "加拿大市场落地页 Hero 图",
    group: "geo",
    fallback: "/images/hero-bg.jpg",
    defaultAlt: "Thermal paper rolls for Canadian retail and gaming",
    recommendedSize: "2400 × 1000 px",
  },
  {
    key: "geo.eu.hero",
    label: "/eu 页 - 顶部 Hero",
    description: "欧洲市场落地页 Hero 图，建议带 REACH / RoHS 元素",
    group: "geo",
    fallback: "/images/hero-bg.jpg",
    defaultAlt: "REACH-compliant thermal paper rolls for European market",
    recommendedSize: "2400 × 1000 px",
  },
] as const satisfies readonly SlotDefinition[];

// ── 强类型派生 ───────────────────────────────────────────────────
export type SlotKey = (typeof SLOT_REGISTRY)[number]["key"];

// ── 查询工具 ─────────────────────────────────────────────────────
const SLOT_MAP: Record<string, SlotDefinition> = Object.fromEntries(
  SLOT_REGISTRY.map((s) => [s.key, s])
);

/** 通过 key 获取槽位定义；未注册返回 undefined */
export function getSlot(key: string): SlotDefinition | undefined {
  return SLOT_MAP[key];
}

/** 按分组返回所有槽位（用于后台 UI 渲染） */
export function getSlotsByGroup(): Record<SlotGroup, SlotDefinition[]> {
  const out = {} as Record<SlotGroup, SlotDefinition[]>;
  for (const s of SLOT_REGISTRY) {
    if (!out[s.group]) out[s.group] = [];
    out[s.group].push(s);
  }
  return out;
}

/** 中文分组名（后台 UI 显示用） */
export const SLOT_GROUP_LABELS: Record<SlotGroup, string> = {
  home: "首页",
  products: "产品页",
  industries: "行业页",
  about: "关于我们",
  factory: "工厂",
  geo: "地区落地页",
  "case-studies": "客户案例",
  general: "通用",
};
