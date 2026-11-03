# Mi Paraíso · sitio web

Página de una sola vista (Angular 19 + Tailwind v4) del centro de estimulación temprana Mi Paraíso, en Imperial, Cañete.
No tiene servidor ni base de datos: el formulario de matrícula abre WhatsApp con la ficha ya escrita.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm start` | Servidor de desarrollo en http://localhost:4200 |
| `npm run build` | Compila para producción en `dist/mi-paraiso/browser` y, al terminar, ejecuta `scripts/preparar-produccion.mjs` |
| `npm run servir` | Sirve lo compilado con el servidor de producción propio (http://localhost:4400) |
| `node scripts/imagenes-adaptables.mjs` | Crea versiones de 480 y 960 px de cada foto y su catálogo. **Correrlo al agregar o cambiar fotos** |

## Configuración: `sitio.config.json`

Es el único archivo que hay que tocar para publicar.

| Campo | Para qué |
| --- | --- |
| `url` | Dominio con protocolo y sin `/` final, por ejemplo `https://miparaiso.pe`. **Vacío = modo no indexar** |
| `verificacionGoogle` | Código de la etiqueta HTML de Google Search Console (solo el valor de `content`) |
| `tokenCloudflareAnalytics` | Token de Cloudflare Web Analytics. Vacío = sin analítica |
| `negocio` | Datos de la ficha para Google (Schema.org). Al confirmar la dirección exacta, llenar `direccion` y corregir `latitud` y `longitud`. Las redes sociales van en `redesSociales` como lista de URLs |

Cada campo puede sobrescribirse con una variable de entorno (útil en el panel del hosting):
`SITIO_URL`, `VERIFICACION_GOOGLE`, `TOKEN_CLOUDFLARE_ANALYTICS`.

**Mientras no haya dominio** el sitio se genera con `noindex` y `robots.txt` bloqueando todo. Así Google no guarda direcciones
temporales (ngrok, pruebas) que luego compitan con el dominio real. Al poner la `url` y volver a compilar, todo pasa a ser indexable.

## Qué genera el build

- **SEO en `index.html`**: título y descripción con las búsquedas clave, canonical, Open Graph y Twitter con imagen absoluta (`img/og-imagen.jpg`, 1200×630), ficha del centro en JSON-LD (`ChildCare`) y meta de geolocalización.
- **`robots.txt` y `sitemap.xml`** (con las imágenes del sitio).
- **`404.html`** personalizada (la sirven solos Netlify, Cloudflare Pages, Apache con el `.htaccess` y el servidor propio).
- **Encabezados de seguridad**: `_headers` (Netlify / Cloudflare Pages) y `.htaccess` (Apache / hosting compartido). Incluyen CSP con hashes, anti-iframe, `nosniff`, HSTS, Referrer y Permissions Policy, y caché larga para los archivos con hash.
- **`/.well-known/security.txt`** con el contacto para reportar fallas.
- **Manifest e íconos** para "Agregar a pantalla de inicio".

## Publicar

### Render (versión de revisión, temporal)

El archivo `render.yaml` (en la raíz del repositorio, junto a la carpeta `web`) ya trae todo configurado:
sitio estático gratis con HTTPS, compilación, encabezados de seguridad, caché y la página 404.

1. Subir la carpeta del proyecto (la que contiene `render.yaml` y `web/`) a un repositorio de GitHub.
2. En Render: **New → Blueprint**, elegir ese repositorio y confirmar. La primera compilación tarda unos minutos.
3. El sitio queda en `https://mi-paraiso.onrender.com` (o un nombre parecido si ese está ocupado).
4. Cada vez que se sube un cambio a GitHub, Render vuelve a publicar solo.

Mientras sea una versión de revisión, `SITIO_URL` queda vacía: el sitio se publica en modo "no indexar".

### Opción recomendada: Cloudflare Pages (gratis, HTTPS incluido)

Da HTTPS desde el primer día, incluso sin dominio propio (`https://mi-paraiso.pages.dev`). También da protección contra ataques DDoS y CDN.

1. Subir el proyecto a GitHub y conectarlo en Cloudflare → Workers & Pages → Create → Pages.
2. Directorio raíz: `web`. Comando de build: `npm run build`. Carpeta de salida: `dist/mi-paraiso/browser`.
3. En Variables de entorno, agregar `SITIO_URL` con la URL final (la `.pages.dev` o el dominio, cuando exista).
4. Analítica: activar Web Analytics en el panel del proyecto. Ahí Cloudflare la inyecta solo; en ese caso **no** llenar `tokenCloudflareAnalytics` para no contar doble.

Netlify funciona igual (mismo comando y carpeta; lee el mismo `_headers`).

### Hosting compartido con Apache (cPanel)

Subir el contenido de `dist/mi-paraiso/browser` (incluido el `.htaccess` oculto) a `public_html`. Al tener SSL, quitar el `#` de
las dos líneas de redirección a HTTPS en el `.htaccess`. Para que no se pierda, la forma correcta es descomentarlas en
`scripts/preparar-produccion.mjs` y volver a compilar.

### Servidor propio (VPS)

`npm run build && npm run servir`, ideal detrás de Nginx o Cloudflare. Variables: `PUERTO`, `HTTPS=1` (cuando ya tenga
certificado) y `DETRAS_DE_PROXY=1` (si hay un proxy delante, para que el límite de peticiones use la IP real del visitante).
El servidor limita las peticiones por IP (responde 429 si alguien lo satura), solo acepta GET/HEAD, bloquea rutas fuera
de la carpeta y archivos ocultos, y corta conexiones lentas.

## Rendimiento

- **Fotos adaptables**: cada foto tiene versiones de 480 y 960 px (`foto-480.webp`). La directiva `appAdaptable`
  arma el `srcset` desde `src/app/core/imagenes-adaptables.ts` y el navegador baja solo el tamaño que muestra.
  Para una foto nueva: dejarla en `public/img`, correr el script de arriba y usar `[appAdaptable]="ruta" sizes="..."`.
- **Video de la portada**: 720p, en WebM (0,7 MB) para Chrome, Edge y Firefox y MP4 (1,2 MB) para Safari. El
  original en alta (`video/portada-original.mp4`) queda fuera de la publicación. No se descarga hasta que termina
  la pantalla de carga, y no se reproduce con conexión lenta o ahorro de datos.

## Al tener dominio: lista para aparecer en Google

1. Poner `url` en `sitio.config.json` (o `SITIO_URL` en el hosting) y volver a publicar.
2. **Google Search Console**: agregar la propiedad, verificar con la etiqueta HTML (`verificacionGoogle`) y enviar `https://<dominio>/sitemap.xml`.
3. **Perfil de Empresa en Google (Google Maps)**: es lo que más pesa en búsquedas locales como "estimulación temprana Imperial" o "nido en Cañete". Categoría *Centro de estimulación temprana* o *Guardería*, con el mismo nombre, teléfono y dirección que la web, fotos reales, horario y el enlace al sitio. Pedir reseñas a las familias.
4. Poner el enlace del sitio en Facebook, Instagram y el WhatsApp Business del centro, y agregar esas URLs en `negocio.redesSociales`.
5. Si cambia el dominio (de `.pages.dev` al propio), redirigir el antiguo con 301 al nuevo.

## Pendientes conocidos

- **Angular 19 ya no recibe parches de seguridad.** Hoy no hay riesgo real: las fallas reportadas por `npm audit` están en funciones que este sitio no usa (SSR, router, i18n, `formatDate`, HttpClient). Aun así, conviene actualizar con `ng update` antes de agregar funciones nuevas.
- Dirección exacta, horarios, redes sociales y fotos reales del local (ver `PRODUCT.md`).
