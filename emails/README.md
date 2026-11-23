# Emails del Golf & Games Classic (Resend)

Dos emails listos para Resend:

- `save-the-date/`: el Save the Date principal (`index.html` + `index.txt`).
- `reminder/`: un recordatorio más corto, con el mismo diseño.

Los logos siguen la regla del evento: MARJCC y MBJCC arriba, juntos, como anfitriones. El logo de GMJF va siempre al final del email, solo.

## 1. Subir las imágenes

Los emails no llevan las imágenes adentro: las cargan desde una URL pública. Sube **todo el contenido de `assets/`** a un lugar público, por ejemplo:

- la carpeta de imágenes del landing page (por ejemplo `https://golfandgames.org/email`)
- un bucket público de S3, Cloudflare R2 o Google Cloud Storage

Esa URL, **sin `/` al final**, es tu `ASSET_BASE_URL`.

## 2. Verificar el dominio en Resend

En Resend, ve a **Domains** y agrega el dominio desde el que vas a enviar (por ejemplo `marjcc.org`, o un subdominio como `events.marjcc.org`). Después agrega los registros DNS que te da Resend. Sin dominio verificado, los emails no salen o caen en spam.

## 3. Variables de entorno

```bash
export RESEND_API_KEY="re_..."
```

```bash
export ASSET_BASE_URL="https://tu-sitio.org/email"
```

## 4. Enviar una prueba

```bash
npm install
```

```bash
node send.mjs --template save-the-date --to tu@email.org --from "Golf & Games Classic <events@tudominio.org>"
```

Para el recordatorio usa `--template reminder`. El asunto de la prueba lleva `[TEST]` delante. Ábrela en Gmail, Outlook y el celular antes de mandarla a la lista.

## 5. Enviar a la lista (Broadcast)

1. En Resend, crea una **Audience** con los contactos de los dos JCCs y copia su ID.
2. Crea el broadcast:

```bash
node send.mjs --template save-the-date --audience TU_AUDIENCE_ID --from "Golf & Games Classic <events@tudominio.org>"
```

3. El broadcast queda como borrador en Resend para revisarlo. Para enviarlo directamente, agrega `--send` al final.

El link de **Unsubscribe** solo funciona en broadcasts: Resend lo rellena solo (`{{{RESEND_UNSUBSCRIBE_URL}}}`).

## Antes de enviar, reemplaza

- `https://REPLACE-WITH-LANDING-PAGE-URL`: el link del botón (el landing page). Está en `build.py` y en los `.txt`.
- `[SENDER NAME AND MAILING ADDRESS]`: nombre y dirección postal de quien envía. La ley CAN-SPAM pide una dirección física.

## Cambiar el texto

El HTML de los dos emails se genera con `build.py`. Edita el texto ahí y corre:

```bash
python3 build.py
```

Los `.txt` se editan a mano.

Asuntos por defecto:

- Save the Date: "Save the date: Golf & Games Classic, March 12"
- Recordatorio: "Reminder: Save March 12 for the Golf & Games Classic"

Puedes cambiarlos con `--subject "..."`.
