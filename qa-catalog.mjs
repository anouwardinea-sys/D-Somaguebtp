export default async function run(page, ui) {
  // Aller sur la page Immobilier
  await page.goto("http://localhost:4173/domain/immobilier", {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(1200);

  const cards = () => page.locator("article");

  const total = await cards().count();

  // Onglets principaux (Location / Vente)
  const offerButtons = page.locator("section button", {
    hasText: /^(Tout|Location|Vente|Prestations)$/,
  });
  const offers = await offerButtons.allInnerTexts();

  // Cliquer sur "Location"
  await page.getByRole("button", { name: "Location", exact: true }).click();
  await page.waitForTimeout(400);
  const afterLocation = await cards().count();

  // Puis filtrer type "Terrains"
  let afterTerrain = null;
  const terrain = page.getByRole("button", { name: "Terrains", exact: true });
  if (await terrain.count()) {
    await terrain.click();
    await page.waitForTimeout(400);
    afterTerrain = await cards().count();
  }

  // Passer sur "Vente"
  await page.getByRole("button", { name: "Vente", exact: true }).click();
  await page.waitForTimeout(400);
  const afterVente = await cards().count();

  return { total, offers, afterLocation, afterTerrain, afterVente };
}
