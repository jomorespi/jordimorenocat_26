## jordimoreno.cat

Portal personal/professional desenvolupat amb l'ajuda d'[Eleventy](https://www.11ty.dev/), amb [Nunjucks](https://mozilla.github.io/nunjucks/) com a motor de plantilles i [Markdown](https://www.markdownguide.org/) pel contingut.

### Instal·lació
- Crear fitxers `.env`:
  - `.env.dev`: Desenvolupament.
  - `.env.prod`: Producció.
- Afegir la variable `URL` als respectius fitxers. (Ex: `URL=http://localhost:8080`)

### Desenvolupament
- `npm run watch`: Desenvolupament local. Els canvis s'actualitzen a `http://localhost:8080`.
- `npm run build`: Generar paquet per a producció.