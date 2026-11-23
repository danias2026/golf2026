# Exploración: email Art Deco beige, versión 2

Más Art Deco integrado en todo el email: arco con rayos, placa escalonada para la fecha, placa del matchup, tarjetas en arco para Golf y Mahjong, sol de rayos al cierre, marco doble dorado continuo. Solo exploración; no forma parte del branding aprobado ni se envía.

`node src/render.js` regenera las imágenes, `node src/preview.js` las vistas previas.

## Notas
- El marco dorado de los lados es un solo borde HTML (7px double) de arriba a abajo; las imágenes interiores miden 538px y van dentro del marco, así siempre queda alineado.
- Todo el fondo es el mismo beige (#F3E7CF), incluido el interior del arco y de las tarjetas.
- Sin botón por ahora (no hay link todavía).
- Para el futuro: el botón en celular debe ir con `white-space:nowrap`, menos espaciado entre letras (2px) y padding menor, para que no se parta ni se vea raro.
