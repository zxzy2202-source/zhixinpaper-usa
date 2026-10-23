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
    fallback: "/images/about-reference/about-banner.jpg",
    defaultAlt: "Zhixin Paper production campus and factory capability",
    recommendedSize: "2400 × 800 px",
  },
  {
    key: "about.vision",
    label: "About 页 - 愿景与使命图",
    description: "Vision and Mission 区域的宽幅工厂图片",
    group: "about",
    fallback: "/images/about-reference/section-wide.jpg",
    defaultAlt: "Zhixin Paper factory overview",
    recommendedSize: "1600 × 700 px",
  },
  {
    key: "about.culture",
    label: "About 页 - 企业文化图",
    description: "Company Culture 区域的企业文化展示图片",
    group: "about",
    fallback: "/images/about/company-culture.png",
    defaultAlt: "Zhixin Paper company culture display at the workshop entrance",
    recommendedSize: "2048 × 1152 px",
  },
  {
    key: "about.approach",
    label: "About 页 - 服务方式图",
    description: "From requirement to repeat supply 区域图片",
    group: "about",
    fallback: "/images/about-reference/section-profile.jpg",
    defaultAlt: "Zhixin Paper production and customer service team",
    recommendedSize: "1200 × 1200 px",
  },
  {
    key: "about.catalog",
    label: "About 页 - 产品目录图",
    description: "Resource Center 底部的产品与能力目录图片",
    group: "about",
    fallback: "/images/about-reference/catalog.jpg",
    defaultAlt: "Zhixin Paper product and capability catalog",
    recommendedSize: "1200 × 850 px",
  },
  {
    key: "about.history.2006",
    label: "About 页 - 历史节点 2006",
    description: "Company History 第一阶段图片",
    group: "about",
    fallback: "/images/factory-overview.jpg",
    defaultAlt: "Zhixin Paper trading history from June 2006",
    recommendedSize: "800 × 400 px",
  },
  {
    key: "about.history.2009",
    label: "About 页 - 历史 2009",
    description: "Company History 2009 年第一台分切机阶段图片",
    group: "about",
    fallback: "/images/hero-bg.jpg",
    defaultAlt: "August 2009 Zhixin Paper manufacturing history",
    recommendedSize: "800 × 400 px",
  },
  {
    key: "about.history.2009-2010",
    label: "About 页 - 历史 2009-2010",
    description: "Company History NCR 与车间扩建阶段图片",
    group: "about",
    fallback: "/images/compliance-certifications.jpg",
    defaultAlt: "2009 to 2010 Zhixin Paper history",
    recommendedSize: "800 × 400 px",
  },
  {
    key: "about.history.2011-2017",
    label: "About 页 - 历史 2011-2017",
    description: "Company History 制造基础建设阶段图片",
    group: "about",
    fallback: "/images/thermal-rolls-product.jpg",
    defaultAlt: "2011 to 2017 Zhixin Paper history",
    recommendedSize: "800 × 400 px",
  },
  {
    key: "about.history.2018",
    label: "About 页 - 历史 2018",
    description: "Company History 工厂升级阶段图片",
    group: "about",
    fallback: "/images/factory-overview.jpg",
    defaultAlt: "2018 Zhixin Paper history",
    recommendedSize: "800 × 400 px",
  },
  {
    key: "about.history.2022-2025",
    label: "About 页 - 历史 2022-2025",
    description: "Company History 国际业务能力重建阶段图片",
    group: "about",
    fallback: "/images/thermal-labels-product.jpg",
    defaultAlt: "2022 to 2025 Zhixin Paper history",
    recommendedSize: "800 × 400 px",
  },
  {
    key: "about.history.2026",
    label: "About 页 - 历史 2026",
    description: "Company History 长期稳定供应阶段图片",
    group: "about",
    fallback: "/images/factory-overview.jpg",
    defaultAlt: "2026 Zhixin Paper history",
    recommendedSize: "800 × 400 px",
  },
  {
    key: "about.equipment.thermal-paper",
    label: "About 页 - 设备 热敏纸加工",
    description: "Production Equipment 热敏纸分切复卷图片",
    group: "about",
    fallback: "/images/about-reference/equipment-1.jpg",
    defaultAlt: "Thermal paper converting equipment",
    recommendedSize: "1000 × 575 px",
  },
  {
    key: "about.equipment.thermal-label",
    label: "About 页 - 设备 热敏标签",
    description: "Production Equipment 热敏标签生产图片",
    group: "about",
    fallback: "/images/about-reference/equipment-2.jpg",
    defaultAlt: "Thermal label production equipment",
    recommendedSize: "1000 × 575 px",
  },
  {
    key: "about.equipment.ncr",
    label: "About 页 - 设备 NCR 印刷",
    description: "Production Equipment NCR 纸与印刷图片",
    group: "about",
    fallback: "/images/about-reference/equipment-3.jpg",
    defaultAlt: "NCR paper and printing equipment",
    recommendedSize: "1000 × 575 px",
  },
  {
    key: "about.equipment.quality",
    label: "About 页 - 设备 质量与出口检查",
    description: "Production Equipment 质量与出口检查图片",
    group: "about",
    fallback: "/images/about-reference/equipment-4.jpg",
    defaultAlt: "Quality and export review process",
    recommendedSize: "1000 × 575 px",
  },
  {
    key: "about.process.material",
    label: "About 页 - 流程 材料与加工",
    description: "Process Stories 材料选择与加工图片",
    group: "about",
    fallback: "/images/about-reference/process-1.jpg",
    defaultAlt: "Material selection and paper converting process",
    recommendedSize: "1000 × 800 px",
  },
  {
    key: "about.process.export",
    label: "About 页 - 流程 出口协调",
    description: "Process Stories 出口协调图片",
    group: "about",
    fallback: "/images/about-reference/process-2.jpg",
    defaultAlt: "Export coordination for paper orders",
    recommendedSize: "1000 × 800 px",
  },
  {
    key: "about.team.production",
    label: "About 页 - 团队 生产协调",
    description: "Our Team 生产协调职能图片",
    group: "about",
    fallback: "/images/factory-overview.jpg",
    defaultAlt: "Zhixin Paper production coordination",
    recommendedSize: "800 × 600 px",
  },
  {
    key: "about.team.quality",
    label: "About 页 - 团队 质量审核",
    description: "Our Team 质量审核职能图片",
    group: "about",
    fallback: "/images/compliance-certifications.jpg",
    defaultAlt: "Zhixin Paper quality review",
    recommendedSize: "800 × 600 px",
  },
  {
    key: "about.team.export",
    label: "About 页 - 团队 出口服务",
    description: "Our Team 出口服务职能图片",
    group: "about",
    fallback: "/images/thermal-labels-product.jpg",
    defaultAlt: "Zhixin Paper export service",
    recommendedSize: "800 × 600 px",
  },
  {
    key: "about.team.artwork",
    label: "About 页 - 团队 设计与标签",
    description: "Our Team 设计、条码与标签职能图片",
    group: "about",
    fallback: "/images/about-reference/equipment-2.jpg",
    defaultAlt: "Zhixin Paper artwork and label review",
    recommendedSize: "800 × 600 px",
  },
  {
    key: "about.team.packing",
    label: "About 页 - 团队 包装与文件",
    description: "Our Team 包装与出口文件职能图片",
    group: "about",
    fallback: "/images/about-reference/equipment-4.jpg",
    defaultAlt: "Zhixin Paper packing and document review",
    recommendedSize: "800 × 600 px",
  },
  {
    key: "about.team.support",
    label: "About 页 - 团队 客户支持",
    description: "Our Team 客户支持职能图片",
    group: "about",
    fallback: "/images/about-reference/process-2.jpg",
    defaultAlt: "Zhixin Paper customer support",
    recommendedSize: "800 × 600 px",
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
    label: "设备页 - 原材料备料（原 Thermal Coating 图位）",
    description: "外购母卷 / 空白标签半成品入库与备料实拍；不要放涂布设备照片",
    group: "factory",
    fallback: "/images/factory-overview.jpg",
    defaultAlt: "Sourced thermal paper rolls prepared for in-house converting",
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
    key: "products.card.barcode-warehouse-labels",
    label: "产品卡片 - Barcode & Warehouse Labels",
    description: "行业页推荐产品区卡片图",
    group: "products",
    fallback: "/images/thermal-labels-product.jpg",
    defaultAlt: "Barcode and warehouse thermal labels by Zhixin Paper",
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
  {
    key: "geo.mx.hero",
    label: "/mx 页 - 顶部 Hero",
    description: "墨西哥市场落地页 Hero 图",
    group: "geo",
    fallback: "/images/thermal-rolls-product.jpg",
    defaultAlt: "Thermal paper rolls supplied DDP to Mexico distributors",
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
