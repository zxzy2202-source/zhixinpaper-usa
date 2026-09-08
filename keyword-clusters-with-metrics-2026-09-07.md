# Zhixin Paper — 关键词聚类 + 真实搜索量(US / MX)

> 生成日期:2026-09-07
> 数据来源:Keywords Everywhere API(`get_keyword_data`,dataSource=`gkp`)。US `country=us`,MX `country=mx`,currency=usd。
> 关键词全集来自站内既有资料 `north-america-buyer-language-and-keywords.md` 第 4 节词库 + `north-america-keyword-metrics-serp-report.md`。

## 数据口径

| 项目 | 说明 |
|---|---|
| Vol | Google Keyword Planner 国家级月均搜索量快照。同义词、单复数、尺寸写法**不能相加**。GKP 会分桶取整。 |
| CPC | Google Ads 平均出价(美元)。 |
| Comp | Google Ads **广告**竞争度 0–1,**不是自然搜索 SEO KD**。此 API 档位不返回自然搜索难度。 |
| KD | 仍为空。上线后应接入 GSC,用真实展现 / 点击 / 排名回写自然搜索难度。 |
| 一致性 | 本次数据与站内此前研究吻合:`thermal receipt paper` 1,900、`thermal printer paper` 5,400、`bpa free thermal paper` 1,600、`etiquetas térmicas` 6,600、`rollos de papel térmico` 1,300 均一致或接近。 |

---

## 1. 美国关键词(有量词,按 Vol 降序)

| Vol | CPC | Comp | 关键词 | 簇 |
|---:|---:|---:|---|---|
| 40,500 | 0.17 | 0.90 | thermal paper | C1 |
| 27,100 | 1.66 | 1.00 | shipping labels | C6 |
| 5,400 | 0.23 | 1.00 | thermal printer paper | C10 |
| 2,900 | 0.67 | 1.00 | thermal paper rolls | C1 |
| 2,400 | 1.48 | 1.00 | 4x6 shipping labels | C6 |
| 2,400 | 1.48 | 1.00 | thermal labels | C6 |
| 1,900 | 0.57 | 1.00 | thermal receipt paper | C1 / C2 |
| 1,900 | 2.99 | 0.62 | barcode labels | C7 |
| 1,600 | 0.31 | 0.23 | bpa free thermal paper | C13 |
| 1,000 | 2.89 | 1.00 | direct thermal labels | C6 |
| 880 | 4.01 | 0.99 | thermal transfer labels | C8 |
| 720 | 0.17 | 0.63 | direct thermal vs thermal transfer | C12 |
| 590 | 0.44 | 0.97 | phenol free thermal paper | C13 |
| 480 | 1.08 | 1.00 | receipt paper rolls | C1 |
| 480 | 3.68 | 1.00 | inventory labels | C7 |
| 480 | 3.30 | 0.72 | tamper evident labels | C8 |
| 390 | 3.79 | 0.86 | pallet labels | C7 |
| 320 | 1.77 | 0.99 | thermal rolls | C1 |
| 320 | 0.42 | 1.00 | receipt printer paper | C10 |
| 260 | 0.51 | 1.00 | credit card machine paper | C3 |
| 170 | 2.96 | 0.95 | POS paper rolls | C2 |
| 170 | 1.86 | 0.99 | 4 x 6 thermal labels | C6 |
| 170 | 0.78 | 0.64 | what are thermal labels | C12 |
| 140 | 0.44 | 1.00 | credit card terminal paper rolls | C3 |
| 110 | 2.58 | 0.99 | fanfold labels | C6 |
| 110 | 9.97 | 0.12 | warehouse barcode labels | C7 |
| 110 | 3.56 | 0.90 | high temperature labels | C8 |
| 110 | 0.36 | 1.00 | thermal transfer vs direct thermal labels | C12 |
| 90 | 0.58 | 1.00 | bps free thermal paper | C13 |
| 70 | 0.76 | 1.00 | ATM receipt paper | C4 |
| 70 | 2.00 | 1.00 | direct thermal shipping labels | C6 |
| 70 | 6.25 | 0.96 | warehouse labels | C7 |
| 50 | 3.24 | 1.00 | POS receipt paper | C2 |
| 50 | 0.55 | 1.00 | 57mm thermal paper rolls | C2 |
| 50 | 2.44 | 0.68 | zebra 4x6 thermal labels | C6 |
| 50 | 6.77 | 1.00 | industrial thermal transfer labels | C8 |
| 50 | 1.75 | 0.98 | dymo thermal labels | C10 |
| 40 | 0.76 | 1.00 | 80mm thermal paper rolls | C2 |
| 40 | 0.84 | 1.00 | 2 x 1 thermal labels | C7 |
| 40 | 0.51 | 1.00 | freezer labels | C8 |
| 40 | 9.42 | 0.87 | thermal label supplier | C9 |
| 30 | 5.30 | 0.21 | cold chain labels | C8 |
| 30 | 1.38 | 1.00 | removable thermal labels | C8 |
| 30 | 0.16 | 1.00 | thermal paper roll sizes | C11 |
| 20 | 1.56 | 0.31 | thermal paper roll manufacturer | C9 |
| 20 | 3.72 | 1.00 | thermal paper supplier | C9 |
| 20 | 0.00 | 0.40 | thermal paper manufacturer | C9 |
| 10 | 0.00 | 0.32 | wholesale thermal paper rolls | C1 |
| 10 | 1.99 | 0.85 | custom printed thermal paper rolls | C5 |
| 10 | 0.00 | 1.00 | custom printed receipt paper | C5 |
| 10 | 3.83 | 1.00 | fanfold shipping labels | C6 |
| 10 | 0.82 | 1.00 | rollo 4x6 shipping labels | C6 |
| 10 | 2.23 | 1.00 | chemical resistant labels | C8 |
| 10 | 0.00 | 1.00 | pos printer paper size | C10 |
| 10 | 0.00 | 0.00 | how to measure thermal paper roll | C11 |
| 10 | 0.00 | 0.57 | wholesale thermal labels | C14 |
| 10 | 0.00 | 0.00 | parking ticket paper rolls | C16 |

### 美国 — Vol = 0(GKP 无可测量量)

长尾 B2B 采购词,仍是真实买家语言,适合页面正文 / FAQ 承接语义,**不作为独立页主 KW**:

`bulk thermal paper rolls` · `3 1/8 inch receipt paper` · `2 1/4 inch receipt paper` · `restaurant receipt paper rolls` · `supermarket pos paper` · `retail receipt paper supplier` · `payment terminal paper` · `2 1/4 x 50 ft thermal rolls` · `payment terminal receipt rolls` · `merchant receipt paper` · `bank receipt paper rolls` · `ATM paper roll supplier` · `bank teller receipt paper` · `diebold nixdorf atm paper rolls` · `ncr selfserv receipt paper` · `private label thermal paper` · `private label receipt paper` · `OEM thermal paper rolls` · `branded receipt paper` · `shipping label supplier` · `4 x 4 square labels` · `synthetic pp labels` · `receipt paper distributor` · `thermal paper printer compatibility` · `paper for epson receipt printer` · `paper for star receipt printer` · `paper for pax terminal` · `thermal paper roll size chart` · `1 inch core thermal paper` · `3 inch core labels` · `55 gsm thermal paper` · `60 gsm thermal paper` · `prop 65 thermal paper` · `reach thermal paper` · `fsc thermal paper` · `thermal paper quote` · `thermal paper rfq` · `thermal paper samples` · `thermal paper moq` · `lottery ticket paper rolls` · `casino receipt paper` · `kiosk receipt paper`

---

## 2. 墨西哥关键词(西语,有量词)

| Vol | CPC | Comp | 关键词 |
|---:|---:|---:|---|
| 40,500 | 0.32 | 0.02 | etiquetas de código de barras |
| 12,100 | 0.05 | 0.90 | papel térmico |
| 6,600 | 0.17 | 1.00 | etiquetas térmicas |
| 4,400 | 0.05 | 1.00 | papel para impresora térmica |
| 1,300 | 0.14 | 0.94 | rollos de papel térmico |
| 880 | 0.24 | 0.91 | etiquetas para envíos |
| 480 | 0.34 | 1.00 | papel térmico 80x80 |
| 210 | 0.07 | 1.00 | papel térmico 58mm |
| 210 | 0.13 | 1.00 | rollos de papel térmico 80mm |
| 170 | 0.20 | 0.99 | etiquetas 4x6 |
| 110 | 0.14 | 0.99 | papel térmico personalizado |
| 0 | — | — | etiquetas de código de barras para envíos |

---

## 3. 用真实数据重排的优先级

| 层 | 簇 | 主词(Vol / Comp) | 现有页面 | 说明 |
|---|---|---|---|---|
| S | C15 MX 条码标签 | `etiquetas de código de barras` 40,500 / 0.02 | 无专页(仅 `/mx`) | 全数据集最大机会,竞争几乎为零。`/mx` 下建独立西语条码标签页/板块 |
| S | C13 BPA / 无酚合规 | `bpa free thermal paper` 1,600 / 0.23 · `phenol free` 590 | `/compliance/bpa-free` | 低竞争 + 商业意图 + 页面就绪,ROI 最高。逐条绑定 grade 名与文件范围 |
| S | C10 打印机兼容指南 | `thermal printer paper` 5,400 | `/blog/thermal-paper-printer-compatibility-guide` | 高量信息词,已有页;向产品页导流 |
| A | C15 MX 其余 | `papel térmico` 12,100 · `etiquetas térmicas` 6,600 · `papel para impresora térmica` 4,400 · `rollos de papel térmico` 1,300 | `/mx`(已西语化) | 量级远超美国多数词;继续做真实西语内容,`/mx/export-and-customs` 也西语化 |
| A | C6 4x6 运输面单 | `shipping labels` 27,100(宽/难)· `4x6 shipping labels` 2,400 · `direct thermal labels` 1,000 | `products/thermal-labels/direct-thermal-labels`(标题已改 "4 x 6…") | 头词难,4x6 / direct 可打且商业 |
| A | C7 条码 / 仓储标签(英) | `barcode labels` 1,900 / 0.62 · `inventory labels` 480 · `pallet labels` 390 | 无专页 | 簇无 owner,竞争中等,应建页 |
| B | C1 hub | `thermal paper` 40,500 / 0.90(难)· `thermal paper rolls` 2,900 | `/products/thermal-paper-rolls` | 头词长期目标 |
| B | C12 对比指南 | `direct thermal vs thermal transfer` 720 / 0.63 | `/blog/direct-vs-thermal-transfer` | 信息词,已有页 |
| B | C8 热转印 / 特种标签 | `thermal transfer labels` 880 · `tamper evident labels` 480 / 0.72 | 各 slug 页 | 维护 |
| C | C2 POS · C3 支付终端 · C4 ATM | `credit card machine paper` 260 · `credit card terminal paper rolls` 140 · `ATM receipt paper` 70 | 均有页 | 量小但商业 + 页面就绪,维护 |
| C | C9 供应商 / 制造商 B2B | 合计 ~100,单词 ≤40 | 无专页 | 量太低,不单建页;并入 `/us`、`/oem-custom` |
| C | C5 定制印刷 · C11 规格指南 · C14 RFQ | ≤30(RFQ 词全 0) | 均有页 | C14 是转化页,不作 SEO 目标 |
| Hold | C16 细分终端(lottery / casino / parking / kiosk) | 全部 0–10 | 已 `noindex` | 数据证实 noindex 决策正确 |

---

## 4. 结论

1. **最大单点机会是墨西哥条码标签**(`etiquetas de código de barras` 40,500 / comp 0.02),不是美国任何词。
2. **`bpa free thermal paper`(1,600 / comp 0.23)是美国侧性价比最高的词**——低竞争、商业意图、页面已就绪。
3. **绝大多数英文长尾 B2B 采购词 GKP 量为 0**。作为语义承接词放页面正文 / FAQ,不作独立页主 KW。
4. **C16 细分终端卷页数据全部 0–10**,验证了 2026-09-07 对这些页 + EU 各国页做 `noindex` 的决策。
5. 所有市场:`Comp` 是广告竞争度,不是自然 KD;上线后用 GSC 回写真实难度。
