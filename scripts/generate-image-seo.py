#!/usr/bin/env python3
"""
使用自定义 OpenAI API 分析网站图片，自动生成 SEO 优化的 Alt 文本和描述
"""

import os
import base64
import json
from pathlib import Path
from openai import OpenAI

# 使用自定义 API（已通过环境变量预配置）
client = OpenAI()

# 网站核心图片列表（路径 + 使用场景）
IMAGES = [
    {
        "path": "/home/ubuntu/zhixinpaper-usa/public/images/hero-bg.jpg",
        "url": "/images/hero-bg.jpg",
        "page_context": "Homepage hero section background - BPA-free thermal paper manufacturer ZhixinPaper USA",
        "category": "banners"
    },
    {
        "path": "/home/ubuntu/zhixinpaper-usa/public/images/factory-overview.jpg",
        "url": "/images/factory-overview.jpg",
        "page_context": "Factory overview - ISO 9001 certified thermal paper manufacturing facility, used on About page, Factory page, and Homepage",
        "category": "factory"
    },
    {
        "path": "/home/ubuntu/zhixinpaper-usa/public/images/thermal-rolls-product.jpg",
        "url": "/images/thermal-rolls-product.jpg",
        "page_context": "Product showcase - thermal paper rolls (POS rolls, ATM rolls, receipt rolls), used on Homepage product section",
        "category": "products"
    },
    {
        "path": "/home/ubuntu/zhixinpaper-usa/public/images/thermal-labels-product.jpg",
        "url": "/images/thermal-labels-product.jpg",
        "page_context": "Product showcase - thermal labels (direct thermal labels, shipping labels, barcode labels), used on Homepage product section",
        "category": "products"
    },
    {
        "path": "/home/ubuntu/zhixinpaper-usa/public/images/compliance-certifications.jpg",
        "url": "/images/compliance-certifications.jpg",
        "page_context": "Compliance certifications display - ISO 9001, SGS, REACH, BPA-Free certifications for thermal paper products",
        "category": "certifications"
    },
    {
        "path": "/home/ubuntu/zhixinpaper-usa/public/images/logo.png",
        "url": "/images/logo.png",
        "page_context": "Company logo - ZhixinPaper USA (知新纸业), thermal paper manufacturer",
        "category": "products"
    },
    {
        "path": "/home/ubuntu/zhixinpaper-usa/public/images/logo-original.jpg",
        "url": "/images/logo-original.jpg",
        "page_context": "Original company logo - ZhixinPaper (知新纸业)",
        "category": "products"
    },
]

def encode_image(image_path: str) -> str:
    """将图片编码为 base64"""
    with open(image_path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")

def get_image_mime(path: str) -> str:
    ext = Path(path).suffix.lower()
    return {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".webp": "image/webp",
        ".gif": "image/gif",
    }.get(ext, "image/jpeg")

def analyze_image(image_info: dict) -> dict:
    """调用 AI API 分析图片，生成 Alt 文本和 SEO 描述"""
    path = image_info["path"]
    context = image_info["page_context"]
    
    print(f"  分析: {Path(path).name}")
    
    # 编码图片
    b64 = encode_image(path)
    mime = get_image_mime(path)
    
    prompt = f"""You are an SEO expert for a B2B thermal paper manufacturer website (ZhixinPaper USA).

Analyze this image and generate optimized SEO content. The image is used in this context:
"{context}"

Please provide:
1. **alt_text**: A concise, descriptive alt text (max 125 characters) that:
   - Describes what's in the image accurately
   - Includes relevant keywords naturally (thermal paper, BPA-free, manufacturer, etc.)
   - Is written for screen readers AND search engines
   
2. **seo_title**: An SEO-optimized image title (max 60 characters)

3. **seo_description**: A detailed description (max 160 characters) for image SEO metadata

4. **keywords**: 3-5 relevant SEO keywords as a comma-separated string

5. **content_description**: A detailed Chinese description of what you see in the image (2-3 sentences, for internal documentation)

Respond ONLY with valid JSON in this exact format:
{{
  "alt_text": "...",
  "seo_title": "...", 
  "seo_description": "...",
  "keywords": "...",
  "content_description": "..."
}}"""

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:{mime};base64,{b64}",
                            "detail": "high"
                        }
                    },
                    {
                        "type": "text",
                        "text": prompt
                    }
                ]
            }
        ],
        max_tokens=500,
        temperature=0.3
    )
    
    content = response.choices[0].message.content.strip()
    
    # 解析 JSON 响应
    if content.startswith("```"):
        content = content.split("```")[1]
        if content.startswith("json"):
            content = content[4:]
    
    result = json.loads(content)
    result["url"] = image_info["url"]
    result["path"] = path
    result["category"] = image_info["category"]
    result["filename"] = Path(path).name
    
    return result

def main():
    print("=" * 60)
    print("ZhixinPaper USA — AI 图片 SEO 分析工具")
    print("=" * 60)
    
    results = []
    
    for i, img in enumerate(IMAGES, 1):
        print(f"\n[{i}/{len(IMAGES)}] 处理图片...")
        try:
            result = analyze_image(img)
            results.append(result)
            print(f"  ✓ Alt: {result['alt_text'][:60]}...")
        except Exception as e:
            print(f"  ✗ 错误: {e}")
            results.append({
                "url": img["url"],
                "filename": Path(img["path"]).name,
                "category": img["category"],
                "error": str(e)
            })
    
    # 保存结果
    output_path = "/home/ubuntu/zhixinpaper-usa/scripts/image-seo-results.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    
    print(f"\n{'=' * 60}")
    print(f"✓ 分析完成！结果已保存到: {output_path}")
    print(f"{'=' * 60}")
    
    # 打印摘要
    print("\n📋 生成结果摘要：\n")
    for r in results:
        if "error" not in r:
            print(f"📷 {r['filename']}")
            print(f"   Alt:  {r['alt_text']}")
            print(f"   标题: {r['seo_title']}")
            print(f"   描述: {r['seo_description']}")
            print(f"   关键词: {r['keywords']}")
            print()

if __name__ == "__main__":
    main()
