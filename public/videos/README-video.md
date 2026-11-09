# Vidéo de fond du héros (section d'accueil)

## Où déposer le fichier

```
public/videos/hero-grue.mp4
```

Chemin complet sur ce PC :

```
C:\Users\LENOVO\Desktop\dsomague-site-v1.1\site\dsomague-site\public\videos\hero-grue.mp4
```

Le fichier doit s'appeler **exactement** `hero-grue.mp4`. C'est ce nom qui est
référencé dans `src/components/home/Hero.jsx`.

Une fois le fichier déposé, le serveur de développement le détecte tout seul
(HMR) — pas besoin de le relancer. Il suffit de recharger la page.

## Ce qui se passe si le fichier est absent

Aucune erreur à l'écran : la balise `<video>` échoue au chargement, elle est
alors retirée automatiquement (`onError`) et l'image `photo-005.jpg`, posée
juste en dessous, reste visible. Le héros ne peut donc pas apparaître vide.

## Spécifications conseillées

| Réglage | Valeur recommandée | Pourquoi |
|---|---|---|
| Conteneur | **MP4** | Seul format lu par tous les navigateurs |
| Codec vidéo | **H.264** (`avc1`) | Compatibilité universelle ; éviter HEVC/H.265 (pas lu sur Android/Windows) |
| Codec audio | aucun (vidéo muette) | La vidéo est en fond, elle est jouée sans son |
| Résolution | **1920 × 1080** (paysage) | Remplit correctement un héros plein écran large |
| Orientation | **paysage** | En portrait, `object-cover` recadre très agressivement |
| Durée | 10 à 20 s | Boucle courte et légère |
| Poids | **< 3 Mo** | Chargement rapide de la première impression |
| Débit | 2 à 4 Mb/s | Suffisant en fond assombri par un dégradé |

## Si la vidéo est en portrait ou trop lourde

`ffmpeg` est installé sur ce PC (dans `%TEMP%\ffx`). Exemple pour convertir
et alléger une vidéo verticale 360 × 640 en paysage HD :

```powershell
& "$env:TEMP\ffx\ffmpeg-master-latest-win64-gpl\bin\ffmpeg.exe" -i "source.mp4" `
  -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080" `
  -c:v libx264 -crf 26 -preset slow -an -movflags +faststart `
  "public/videos/hero-grue.mp4"
```

- `crop=1920:1080` : recadre au centre pour obtenir du paysage
- `-an` : supprime la piste audio
- `-movflags +faststart` : place l'index `moov` en tête du fichier, ce qui
  permet de démarrer la lecture sans attendre le téléchargement complet
