# Emails del Golf & Games Classic (Resend)

Dos emails listos para Resend:

- `save-the-date/`: el Save the Date principal (`index.html` + `index.txt`).
- `reminder/`: un recordatorio más corto, con el mismo diseño.

El diseño es el **Art Deco beige** oficial: franja de rayos y bloques de color arriba, un marco dorado doble continuo a los lados (hecho en el HTML, así siempre queda alineado), arco con el logo, placa escalonada con la fecha, placa del matchup, tarjetas en arco para Golf (pelota y palos cruzados) y Mahjong, sol de rayos al cierre y olas en festón. Todo sobre un solo beige (#F3E7CF). El texto importante va como texto real, así que se lee aunque el programa de correo bloquee las imágenes. "Golf & Games Classic" nunca se parte en dos líneas.

Los logos siguen la regla del evento: MARJCC y MBJCC arriba en verde azulado, sin caja (dentro de la imagen del arco). GMJF siempre al final del email, solo, en negro.

Las imágenes están en `assets/` (`band.png`, `hero-save-the-date.png`, `hero-reminder.png`, `fan.png`, `plaque.png`, `cards.png`, `closing.png`, `waves.png`, `gmjf-logo-black.png`). Se generan con:

```bash
node src-deco/render.cjs
python3 build.py
node preview.cjs
```

No hay botón todavía porque no hay link. En `build.py` hay un botón comentado listo para usar; en celular debe llevar `white-space:nowrap` y 2px de espacio entre letras para que no se parta.

## Regla obligatoria: primero la prueba, después la aprobación de Dania

**Ningún email sale sin una prueba aprobada.**

1. Se envía una prueba con `--test`. La prueba va **solo** a DaniaS@marjcc.org, con `[TEST]` delante del asunto.
2. Dania la revisa y la aprueba.
3. Solo entonces se hace el envío real, agregando `--approved`.

El script guarda una huella de cada prueba en `.approvals/pending.json`. La huella combina la plantilla, el HTML, el asunto y el remitente. El envío real solo sale si esa huella coincide con una prueba registrada. Si cambias el texto, el asunto o el remitente después de la prueba, el script lo bloquea y pide una prueba nueva.

Cada envío real queda registrado en `.approvals/sent.log` y sale de la lista de pendientes.

Si intentas un envío real sin prueba, verás: "Primero envía una prueba con --test y espera la aprobación de Dania".

## Remitentes

| Opción | Remitente |
|---|---|
| `--sender info` (por defecto) | Golf & Games Classic <info@marjcc.org> |
| `--sender roxana` | Roxana · MARJCC <roxanam@marjcc.org> |
| `--from "Nombre <correo>"` | cualquier otro, escrito a mano |

El dominio `marjcc.org` tiene que estar verificado en Resend (**Domains**), con los registros DNS que te da Resend. Sin dominio verificado, los emails no salen o caen en spam.

## La clave de Resend

La clave la pone el proxy de red automáticamente. No hace falta definir `RESEND_API_KEY`; si no existe, el script usa el valor `proxy-injected` y el proxy la reemplaza. Nunca pegues la clave en el chat ni en el código.

## Imágenes

- **Pruebas (`--test`):** las imágenes de `assets/` van adjuntas dentro del email (imágenes en línea, `cid:`). No hace falta subirlas a ningún lado.
- **Envío real a una o varias personas:** usa `--inline-images` para adjuntarlas igual, o define `ASSET_BASE_URL`.
- **Broadcast a una lista:** necesita `ASSET_BASE_URL`. Sube todo el contenido de `assets/` a un lugar público (por ejemplo la carpeta de imágenes del landing page) y usa esa URL **sin `/` al final**:

```bash
export ASSET_BASE_URL="https://tu-sitio.org/email"
```

## 1. Enviar la prueba a Dania

```bash
node send.mjs --template save-the-date --test
```

Con otro remitente:

```bash
node send.mjs --template save-the-date --sender roxana --test
```

Para el recordatorio usa `--template reminder`. Para ver qué haría el script sin enviar nada, agrega `--dry-run`.

## 2. Envío real, después de la aprobación

A una o varias personas (separadas por comas):

```bash
node send.mjs --template save-the-date --to persona@ejemplo.org --inline-images --approved
```

A una lista de Resend (Broadcast). Primero crea una **Audience** en Resend con los contactos de los dos JCCs y copia su ID:

```bash
node send.mjs --template save-the-date --audience TU_AUDIENCE_ID --approved
```

Eso deja el broadcast como borrador en Resend para revisarlo. Para enviarlo directamente:

```bash
node send.mjs --template save-the-date --audience TU_AUDIENCE_ID --approved --send
```

Usa el mismo `--sender` (o `--from`) y el mismo `--subject` que en la prueba; si no, la huella no coincide.

El link de **Unsubscribe** solo funciona en broadcasts: Resend lo rellena solo (`{{{RESEND_UNSUBSCRIBE_URL}}}`).

## Antes de enviar

- El pie ya lleva la dirección postal: MARJCC · 18900 NE 25th Avenue, North Miami Beach, FL 33180.
- Cuando haya link, descomenta el botón en `build.py` y pon el link del landing page.

Después de cambiar algo, corre `python3 build.py` y manda una prueba nueva.

## Cambiar el texto

El HTML de los dos emails se genera con `build.py`. Edita el texto ahí y corre:

```bash
python3 build.py
```

Los `.txt` también se generan con `build.py`. Para ver cómo queda, `node preview.cjs` genera `preview.png` y `preview-mobile.png` en cada carpeta.

Asuntos por defecto:

- Save the Date: "Save the date: Golf & Games Classic, March 12"
- Recordatorio: "Reminder: Save March 12 for the Golf & Games Classic"

Puedes cambiarlos con `--subject "..."`, y en ese caso la prueba también debe llevar el mismo `--subject`.

## Requisitos

Node 18 o más nuevo. El script usa la API de Resend directamente, sin instalar paquetes.


## En el entorno de Claude (nube)

Aquí la API key la pone el proxy de red, y Node necesita usar ese proxy. Usa `npm run send -- <opciones>` (por ejemplo `npm run send -- --template save-the-date --test`), que activa `NODE_USE_ENV_PROXY=1` automáticamente. En tu computadora puedes seguir usando `node send.mjs` con tu `RESEND_API_KEY`.
