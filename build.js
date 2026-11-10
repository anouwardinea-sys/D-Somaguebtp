/**
 * build.js — Build de production complet pour le déploiement.
 *
 * Étapes :
 *   1. `vite build`            → génère le site statique dans dist/
 *   2. copie du dossier api/   → dist/api (l'API PHP doit voyager AVEC le site)
 *   3. création de dist/uploads → dossier d'accueil des images téléversées
 *
 * Le dossier dist/ obtenu est prêt à être envoyé tel quel dans public_html/
 * de l'hébergement LWS.
 *
 * Usage : npm run build
 */
import { execSync } from "node:child_process";
import { cpSync, mkdirSync, existsSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, "dist");
const apiSrc = join(root, "api");
const apiDest = join(dist, "api");
const uploadsDest = join(dist, "uploads");

/* 1. Build Vite ------------------------------------------------------------ */
console.log("▶ Build du site (Vite)…");
execSync("npx vite build", { cwd: root, stdio: "inherit" });

/* 2. Install API dependencies --------------------------------------------- */
console.log("▶ Dépendances PHP (Composer)…");
execSync("composer install --working-dir=api --no-dev --optimize-autoloader --no-interaction", {
  cwd: root,
  stdio: "inherit",
});

/* 3. Copie de l'API PHP ---------------------------------------------------- */
if (!existsSync(apiSrc)) {
  console.error(
    "✖ Dossier api/ introuvable : impossible de préparer le backend.",
  );
  process.exit(1);
}
// On repart d'un dossier propre pour ne jamais laisser traîner une vieille config.
if (existsSync(apiDest)) rmSync(apiDest, { recursive: true, force: true });
cpSync(apiSrc, apiDest, {
  recursive: true,
  filter: (src) => {
    // Exclure les secrets et outils ponctuels du paquet de production.
    if (src.endsWith("config.php") || src.endsWith("hash.php")) return false;
    return true;
  },
});
console.log("▶ API PHP copiée dans dist/api/");

/* 4. Dossier des images téléversées --------------------------------------- */
mkdirSync(uploadsDest, { recursive: true });
// Un fichier .gitkeep garde le dossier présent même vide.
const keep = join(uploadsDest, ".gitkeep");
if (!existsSync(keep)) {
  const { writeFileSync } = await import("node:fs");
  writeFileSync(keep, "");
}
console.log("▶ Dossier dist/uploads/ prêt");

console.log(
  "\n✔ Build terminé. Envoyez le CONTENU de dist/ dans public_html/ (LWS).",
);
