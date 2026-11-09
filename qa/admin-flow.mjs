export default async function run(page) {
  const out = {};

  // 1) Ouvrir /admin → doit afficher l'écran de connexion
  await page.goto("http://localhost:5173/admin", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  out.loginH1 = await page
    .locator("h1")
    .first()
    .innerText()
    .catch(() => null);

  // 2) Se connecter avec les identifiants de démo
  await page.fill('input[type="email"]', "admin@dsomague.tg");
  await page.fill('input[type="password"]', "admin");
  await page.getByRole("button", { name: /Se connecter/i }).click();
  await page.waitForTimeout(1500);
  out.afterLoginH1 = await page
    .locator("h1")
    .first()
    .innerText()
    .catch(() => null);

  // 3) Compter les biens affichés dans l'admin
  out.propertiesInAdmin = await page
    .locator("main article, main .bg-white.rounded-xl.shadow-sm")
    .count();

  // 4) Remplir le formulaire d'ajout d'un bien
  await page.fill(
    'input[placeholder="Villa 4 chambres avec cour"]',
    "TEST Villa Admin 9 chambres",
  );
  await page.fill('input[placeholder="Agoè, Lomé"]', "Quartier Test, Lomé");
  await page.fill('input[placeholder="350 000 F/mois"]', "999 999 F");
  await page.getByRole("button", { name: /^Ajouter$/ }).click();
  await page.waitForTimeout(1200);

  out.addMessage = await page.locator("text=Bien ajouté.").count();

  // 5) Aller sur la page publique Immobilier et vérifier que le bien apparaît
  await page.goto("http://localhost:5173/domain/immobilier", {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(1500);
  out.publicHasTest = await page
    .locator("text=TEST Villa Admin 9 chambres")
    .count();

  return out;
}
