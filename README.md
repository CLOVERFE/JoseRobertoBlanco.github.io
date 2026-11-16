# Portafolio de Jose Roberto Blanco Pulido

Sitio estático (HTML, CSS y un poco de JavaScript) listo para GitHub Pages. No necesita compilación ni dependencias.

## Qué incluye

| Ruta | Para qué sirve |
|---|---|
| `index.html` | Portafolio en español (página principal) |
| `en/index.html` | Portafolio en inglés |
| `cv/Jose_Roberto_Blanco_CV_ES.pdf` y `_EN.pdf` | CV con diseño, una página, para personas |
| `cv/Jose_Roberto_Blanco_CV_ATS_ES.pdf` / `.docx` (y `_EN`) | CV de texto en una columna, para portales de empleo, ATS y filtros con IA |
| `cv.md`, `cv.en.md` | CV completo en Markdown, legible por asistentes de IA |
| `resume.json` | CV en formato JSON Resume (jsonresume.org) |
| `llms.txt` | Resumen del sitio para modelos de lenguaje |
| `robots.txt`, `sitemap.xml` | Indexación en buscadores |
| `assets/` | Estilos, script, tipografías (alojadas aquí mismo) e imágenes en WebP |
| `404.html`, `favicon.svg`, `.nojekyll` | Página de error, icono y desactivación de Jekyll |

## Cómo publicarlo

1. Haz una copia de seguridad del repositorio actual (o crea una rama).
2. Copia **el contenido** de esta carpeta a la raíz del repositorio `CLOVERFE/JoseRobertoBlanco.github.io`, reemplazando el `index.html` anterior.
3. Sube los cambios (`git add -A`, `git commit`, `git push`). GitHub Pages publica en uno o dos minutos.
4. Abre https://cloverfe.github.io/JoseRobertoBlanco.github.io/ y prueba los botones de descarga y el cambio de idioma.

## Antes de publicar, revisa

- **Dirección del sitio.** Todo apunta a `https://cloverfe.github.io/JoseRobertoBlanco.github.io`, que es la dirección que GitHub Pages da a este repositorio. Si la cambias (dominio propio o renombrar el repositorio), busca y reemplaza ese texto en `index.html`, `en/index.html`, `404.html`, `sitemap.xml`, `robots.txt`, `llms.txt`, `cv.md`, `cv.en.md` y `resume.json`. El código QR y el texto de los CV también llevan esa dirección.
- **`robots.txt` y `llms.txt`.** Los buscadores solo los leen en la raíz del dominio, y este sitio vive en una subcarpeta, así que aquí no tienen efecto. Envía `sitemap.xml` directamente en Google Search Console.
- **Fechas de Grupo Ziram.** Aparece como 2025 a 2026 y en pasado. Si sigues ahí, cambia a «2025 a la fecha» y a tiempo presente.
- **Datos que faltan.** Nivel de inglés, LinkedIn y cifras de resultados no están porque no venían en tu CV. Agrégalos si los tienes.

## Después de publicar

- Da de alta el sitio en Google Search Console y envía `sitemap.xml`.
- Pon la dirección del portafolio en GitHub, LinkedIn y en cada postulación.
- Al postular en un portal, sube el CV **ATS**; el CV con diseño es para enviarlo a una persona o imprimirlo.

## Tipografías

Inter, con licencia SIL Open Font License (ver `assets/fonts/`).
