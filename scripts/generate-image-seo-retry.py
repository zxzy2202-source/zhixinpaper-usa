#!/usr/bin/env python3
"""
补充分析压缩后的两张图片
"""
import os, base64, json
from openai import OpenAI

client = OpenAI()

RETRY_IMAGES = [
    {
        "compressed_path": "/tmp/thermal-labels-compressed.jpg",
        "url": "/images/thermal-labels-product.jpg",
        "page_context": "Product showcase - thermal labels (direct thermal labels, shipping labels, barcode labels), used on Homepage product section",
        "category": "products",
        "filename": "thermal-labels-product.jpg"
    },
    {
        "compressed_path": "/tmp/logo-compressed.jpg",
        "url": "/images/logo.png",
        "page_context": "Company logo - ZhixinPaper USA (知新纸业), thermal paper manufacturer, used in website header",
        "category": "products",
        "filename": "logo.png"
    },
]

def encode_image(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")

for img in RETRY_IMAGES:
    print(f"分析: {img['filename']}")
    b64 = encode_image(img["compressed_path"])
    
    prompt = f"""You are an SEO expert for a B2B thermal paper manufacturer website (ZhixinPaper USA).
Context: "{img['page_context']}"

Provide:
1. alt_text (max 125 chars, descriptive + keywords)
2. seo_title (max 60 chars)
3. seo_description (max 160 chars)
4. keywords (3-5, comma-separated)
5. content_description (Chinese, 2-3 sentences)

Respond ONLY with valid JSON:
{{"alt_text":"...","seo_title":"...","seo_description":"...","keywords":"...","content_description":"..."}}"""

    resp = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[{"role":"user","content":[
            {"type":"image_url","image_url":{"url":f"data:image/jpeg;base64,{b64}","detail":"high"}},
            {"type":"text","text":prompt}
        ]}],
        max_tokens=400, temperature=0.3
    )
    
    content = resp.choices[0].message.content.strip()
    if content.startswith("```"):
        content = content.split("```")[1]
        if content.startswith("json"): content = content[4:]
    
    result = json.loads(content)
    result["url"] = img["url"]
    result["filename"] = img["filename"]
    result["category"] = img["category"]
    
    print(f"  ✓ Alt: {result['alt_text']}")
    print(f"  标题: {result['seo_title']}")
    
    # 追加到结果文件
    results_path = "/home/ubuntu/zhixinpaper-usa/scripts/image-seo-results.json"
    with open(results_path, "r", encoding="utf-8") as f:
        existing = json.load(f)
    
    # 移除之前的错误记录
    existing = [r for r in existing if r.get("url") != img["url"]]
    existing.append(result)
    
    with open(results_path, "w", encoding="utf-8") as f:
        json.dump(existing, f, ensure_ascii=False, indent=2)
    
    print(f"  ✓ 已更新到结果文件\n")

print("补充分析完成！")
