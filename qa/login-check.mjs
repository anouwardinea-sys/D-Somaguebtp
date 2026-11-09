export default async function run(page, ui) {
  const snap = await ui.snapshot();
  const emailRef = snap.match(/@(e\d+) textbox/i);
  const passRef = snap.match(/@(e\d+) textbox/i);
  // Fill email + password via Playwright locators (plus robust).
  await page
    .locator('input[type="email"], input[name="email"]')
    .first()
    .fill("admin@dsomague.tg");
  await page.locator('input[type="password"]').first().fill("admin");
  // Submit.
  await page.locator('button[type="submit"]').first().click();
  await page.waitForTimeout(1200);
  const after = await page.evaluate(() =>
    document.body.innerText.slice(0, 400),
  );
  return {
    loggedIn:
      after.includes("Tableau de bord") ||
      after.includes("Déconnexion") ||
      after.includes("Biens") ||
      after.includes("Messages"),
    after,
  };
}
