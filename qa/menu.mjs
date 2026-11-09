export default async function run(page) {
  const out = {};
  await page.goto("http://localhost:5173/services", {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(1000);
  out.start = page.url();

  const servicesLink = page
    .locator("header nav a", { hasText: /Services/i })
    .first();
  await servicesLink.hover();
  await page.waitForTimeout(700);

  const first = page.locator('header a[href^="/domain/"]').first();
  const href = await first.getAttribute("href");
  out.clickedHref = href;
  await first.click();
  await page.waitForTimeout(1400);

  out.afterUrl = page.url();
  out.afterH1 = await page
    .locator("main h1")
    .first()
    .innerText()
    .catch(() => null);
  out.ok = page.url().includes(href);
  return out;
}
