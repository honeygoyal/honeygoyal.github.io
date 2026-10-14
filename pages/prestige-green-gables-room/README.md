# Prestige Green Gables · Room for rent

Static listing page for a furnished room with a private bathroom.
Live at: https://gokuldinesh.github.io/pages/prestige-green-gables-room/

## Before publishing
1. WhatsApp number is set in `assets/js/main.js` (`CONFIG.whatsapp`).
2. `index.html` → update the "Available from" date (search for `EDIT`).

## Structure
```
index.html
assets/
  css/style.css      styles (light + dark mode)
  js/main.js         WhatsApp links, photo lightbox
  img/thumb/*.webp   gallery thumbnails (800px)
  img/full/*.webp    full-size photos (1600px)
  img/og-preview.jpg link preview image for WhatsApp/Facebook
```

## Adding a photo
Put an 800px version in `img/thumb/` and a 1600px version in `img/full/` with the same name,
then copy one `<button>` line in the Photos section of `index.html` and change the file names and title.
