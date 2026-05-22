#!/usr/bin/env node
/**
 * Seed media_files table in Turso with existing website images
 */

const { createClient } = require("@libsql/client");

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const images = [
  // Product Images (category_id = 1)
  {
    filename: "thermal-rolls-product.jpg",
    originalName: "thermal-rolls-product.jpg",
    mimeType: "image/jpeg",
    size: 30967,
    width: 800,
    height: 597,
    url: "/images/thermal-rolls-product.jpg",
    alt: "Thermal paper rolls - standard POS receipt rolls manufactured by Zhixin Paper",
    folder: "images",
    categoryId: 1,
  },
  {
    filename: "thermal-labels-product.jpg",
    originalName: "thermal-labels-product.jpg",
    mimeType: "image/jpeg",
    size: 90724,
    width: 800,
    height: 597,
    url: "/images/thermal-labels-product.jpg",
    alt: "Thermal labels - direct thermal and thermal transfer labels by Zhixin Paper",
    folder: "images",
    categoryId: 1,
  },
  // Factory Photos (category_id = 2)
  {
    filename: "factory-overview.jpg",
    originalName: "factory-overview.jpg",
    mimeType: "image/jpeg",
    size: 145716,
    width: 1200,
    height: 670,
    url: "/images/factory-overview.jpg",
    alt: "Zhixin Paper manufacturing facility overview - ISO 9001 certified thermal paper factory",
    folder: "images",
    categoryId: 2,
  },
  {
    filename: "hero-bg.jpg",
    originalName: "hero-bg.jpg",
    mimeType: "image/jpeg",
    size: 318870,
    width: 1920,
    height: 1072,
    url: "/images/hero-bg.jpg",
    alt: "Zhixin Paper factory production line - thermal paper manufacturing",
    folder: "images",
    categoryId: 2,
  },
  // Banners & Ads (category_id = 3)
  {
    filename: "og-default.jpg",
    originalName: "og-default.jpg",
    mimeType: "image/jpeg",
    size: 108807,
    width: 1200,
    height: 630,
    url: "/images/og-default.jpg",
    alt: "Zhixin Paper - BPA-Free Thermal Paper Rolls & Labels Manufacturer",
    folder: "images",
    categoryId: 3,
  },
  {
    filename: "logo.png",
    originalName: "logo.png",
    mimeType: "image/png",
    size: 36962,
    width: 200,
    height: 200,
    url: "/images/logo.png",
    alt: "Zhixin Paper company logo",
    folder: "images",
    categoryId: 3,
  },
  // Certifications (category_id = 4)
  {
    filename: "compliance-certifications.jpg",
    originalName: "compliance-certifications.jpg",
    mimeType: "image/jpeg",
    size: 165278,
    width: 1071,
    height: 800,
    url: "/images/compliance-certifications.jpg",
    alt: "Zhixin Paper compliance certifications - ISO 9001, BPA-Free, REACH, RoHS, FSC",
    folder: "images",
    categoryId: 4,
  },
  // Uncategorized - uploads directory
  {
    filename: "1776487771203_32b6c697519b48fc814b3a4712323de2.jpg",
    originalName: "factory-photo.jpg",
    mimeType: "image/jpeg",
    size: 419077,
    width: 1584,
    height: 933,
    url: "/uploads/1776487771203_32b6c697519b48fc814b3a4712323de2.jpg",
    alt: "Factory photo",
    folder: "uploads",
    categoryId: 2,
  },
  {
    filename: "1776487789980_32b6c697519b48fc814b3a4712323de2.jpg",
    originalName: "factory-photo-2.jpg",
    mimeType: "image/jpeg",
    size: 419077,
    width: 1584,
    height: 933,
    url: "/uploads/1776487789980_32b6c697519b48fc814b3a4712323de2.jpg",
    alt: "Factory photo 2",
    folder: "uploads",
    categoryId: 2,
  },
];

async function main() {
  console.log("Seeding media_files table...");

  for (const img of images) {
    try {
      await client.execute({
        sql: `INSERT INTO media_files (filename, original_name, mime_type, size, width, height, url, alt, folder, category_id, uploaded_by, created_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, datetime('now'))`,
        args: [
          img.filename,
          img.originalName,
          img.mimeType,
          img.size,
          img.width,
          img.height,
          img.url,
          img.alt,
          img.folder,
          img.categoryId,
        ],
      });
      console.log(`  + ${img.originalName} -> category ${img.categoryId}`);
    } catch (err) {
      console.error(`  ! Failed: ${img.originalName}:`, err.message);
    }
  }

  // Verify
  const count = await client.execute("SELECT COUNT(*) as cnt FROM media_files");
  console.log(`\nDone! Total media_files: ${count.rows[0].cnt}`);

  // Show category counts
  const cats = await client.execute(`
    SELECT mc.name, COUNT(mf.id) as cnt
    FROM media_categories mc
    LEFT JOIN media_files mf ON mf.category_id = mc.id
    GROUP BY mc.id, mc.name
    ORDER BY mc.sort_order
  `);
  console.log("\nCategory counts:");
  cats.rows.forEach((r) => console.log(`  ${r.name}: ${r.cnt}`));
}

main().catch(console.error);
