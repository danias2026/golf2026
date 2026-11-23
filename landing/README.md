# Landing page: Golf & Games Classic 2027

Sitio estático (HTML, CSS y un poco de JavaScript). No necesita compilar nada: la carpeta `landing/` se sube tal cual.

## Archivos
- `index.html`: la página. `styles.css`, `main.js`: estilos y animaciones.
- `assets/`: logos (MARJCC y MBJCC en blanco arriba, GMJF al final), logo del evento optimizado y `golf-games-classic-2027.ics` para el botón "Save the date".
- `og-image.png`: la imagen que aparece al compartir el link en WhatsApp, Facebook, etc.
- `gen.js`: genera `index.html` y `og.html`. Solo hace falta correrlo si cambias el diseño (`node gen.js`). `render.js` vuelve a sacar las vistas previas y la imagen para compartir (`node render.js`).

## Ver la página en tu computadora
1. Abre una terminal en la carpeta `landing/`.
2. Corre `python3 -m http.server 8000`.
3. Abre http://localhost:8000 en el navegador.

## Publicarla (3 opciones fáciles)
1. **Netlify Drop**: entra a https://app.netlify.com/drop y arrastra la carpeta `landing/`. Te da un link al momento; luego puedes conectar un dominio (por ejemplo golf.marjcc.org).
2. **Vercel**: crea un proyecto desde el repositorio `danias2026/golf2026`, en "Root Directory" pon `landing`, sin comando de build. Cada cambio en GitHub se publica solo.
3. **GitHub Pages**: en el repositorio, Settings → Pages, publica desde la rama y la carpeta `landing/` (o copia su contenido a una rama `gh-pages`).

## Antes de lanzarla
- Cuando tengas el dominio final, cambia `og:image` en `index.html` (y en `gen.js`) por la URL completa, por ejemplo `https://golf.marjcc.org/og-image.png`; algunas redes no leen rutas relativas.
- El formulario "Stay in the loop" todavía no guarda correos: solo muestra un mensaje de gracias. Para conectarlo a una audiencia de Resend hay que crear una función serverless (`/api/subscribe`) con la API key guardada en el servidor. Está marcado con un comentario `TODO (Resend)` en `index.html` y `main.js`.
- Schedule, Registration y Sponsorship dicen "More details coming soon!" hasta que haya información.
