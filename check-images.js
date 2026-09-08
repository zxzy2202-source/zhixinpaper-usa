// Check image HTTP status on production site
const base = 'https://www.zhixinpaper.com';
const paths = [
  '/images/logo.png',
  '/images/hero-bg.jpg',
  '/images/thermal-rolls-product.jpg',
  '/images/thermal-labels-product.jpg',
  '/images/factory-overview.jpg',
  '/images/og-default.jpg',
];

async function check() {
  for (const p of paths) {
    const url = base + p;
    try {
      const r = await fetch(url, { method: 'HEAD', headers: { 'user-agent': 'Mozilla/5.0' } });
      console.log(r.status, r.headers.get('content-type') || '-', p);
    } catch (e) {
      console.log('ERR', e.message, p);
    }
  }

  // Also check if /_next/image optimizer returns 200
  const testNext = base + '/_next/image?url=%2Fimages%2Fhero-bg.jpg&w=1200&q=75';
  try {
    const r = await fetch(testNext, { method: 'HEAD', headers: { 'user-agent': 'Mozilla/5.0' } });
    console.log('\n_next/image optimizer:', r.status, r.headers.get('content-type'));
  } catch (e) {
    console.log('_next/image ERR:', e.message);
  }
}

check();
