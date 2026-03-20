const { chromium } = require("playwright");

async function main() {
  const url = process.argv[2] || "http://localhost:3000/site";

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

  await page.goto(url, { waitUntil: "networkidle" });

  let last = null;
  for (let i = 0; i < 6; i++) {
    await page.waitForTimeout(1200);
    last = await page.evaluate(() => {
      const c = document.querySelector('canvas[aria-hidden="true"]');
      if (!c) return { found: false };
      const ctx = c.getContext("2d");
      if (!ctx) return { found: true, ctx: false };
      const x = Math.min(20, c.width - 1);
      const y = Math.min(20, c.height - 1);
      const d = ctx.getImageData(x, y, 1, 1).data;
      return {
        found: true,
        pixel: Array.from(d),
        w: c.width,
        h: c.height,
        zIndex: getComputedStyle(c).zIndex
      };
    });
    if (last && last.found) break;
  }

  console.log(last ? JSON.stringify(last) : JSON.stringify({ found: false }));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

