export default async function run(page) {
  await page.goto("http://localhost:5173/admin", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await page.fill('input[type="email"]', "admin@dsomague.tg");
  await page.fill('input[type="password"]', "admin");
  await page.getByRole("button", { name: /Se connecter/i }).click();
  await page.waitForTimeout(1500);

  // Supprimer le bien de test s'il existe
  const row = page.locator("text=TEST Villa Admin 9 chambres").first();
  if (await row.count()) {
    page.once("dialog", (d) => d.accept());
    // Cliquer le bouton Supprimer de la carte contenant le titre de test
    await page
      .locator("div", { hasText: "TEST Villa Admin 9 chambres" })
      .getByRole("button", { name: "Supprimer" })
      .last()
      .click();
    await page.waitForTimeout(1200);
  }
  return { cleaned: true };
}
