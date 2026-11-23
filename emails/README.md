# Emails del Golf & Games Classic (Resend)

Dos emails listos para Resend:

- `save-the-date/`: el Save the Date principal (`index.html` + `index.txt`).
- `reminder/`: un recordatorio más corto, con el mismo diseño.

Los logos siguen la regla del evento: MARJCC y MBJCC van arriba, en blanco, dentro de la imagen del encabezado (`save-the-date-email-header.png`), sin caja blanca. El logo de GMJF va siempre al final del email, solo.

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

## Antes de enviar, reemplaza

- `https://REPLACE-WITH-LANDING-PAGE-URL`: el link del botón (el landing page). Está en `build.py` y en los `.txt`.
- `[SENDER NAME AND MAILING ADDRESS]`: nombre y dirección postal de quien envía. La ley CAN-SPAM pide una dirección física.

Después de cambiar algo, corre `python3 build.py` y manda una prueba nueva.

## Cambiar el texto

El HTML de los dos emails se genera con `build.py`. Edita el texto ahí y corre:

```bash
python3 build.py
```

Los `.txt` se editan a mano. Para ver cómo queda, `node preview.cjs` genera `preview.png` y `preview-mobile.png` en cada carpeta.

Asuntos por defecto:

- Save the Date: "Save the date: Golf & Games Classic, March 12"
- Recordatorio: "Reminder: Save March 12 for the Golf & Games Classic"

Puedes cambiarlos con `--subject "..."`, y en ese caso la prueba también debe llevar el mismo `--subject`.

## Requisitos

Node 18 o más nuevo. El script usa la API de Resend directamente, sin instalar paquetes.


## En el entorno de Claude (nube)

Aquí la API key la pone el proxy de red, y Node necesita usar ese proxy. Usa `npm run send -- <opciones>` (por ejemplo `npm run send -- --template save-the-date --test`), que activa `NODE_USE_ENV_PROXY=1` automáticamente. En tu computadora puedes seguir usando `node send.mjs` con tu `RESEND_API_KEY`.
