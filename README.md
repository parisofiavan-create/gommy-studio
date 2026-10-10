# Gommy Wallpaper Studio

Un pequeño estudio de fondos dreamcore y espacios liminales para Gommy Bunny / Gommy Studio. Combina ideas con chips, edita la descripción a tu gusto, mira la vista previa y copia el texto para usarlo en un generador de imágenes.

## Features

- Combina lugar, momento del día, ambiente, detalles y estilo visual.
- Cambia la interfaz entre inglés y español desde el encabezado (inglés de forma predeterminada).
- Escucha una nota suave al elegir chips; puedes apagarla o volver a activarla.
- Edita libremente el prompt sin perder la posibilidad de regenerarlo desde los chips.
- Usa los chips o escribe libremente para crear y editar un prompt listo para otra app de IA.
- Pulsa Enter o «Crear prompt» para crear hasta cinco prompts gratuitos.
- Al llegar al límite, la app muestra enlaces para contactar a Gommy Studio y consultar el pase Pro de $7 USD al mes.
- Copia el prompt y pégalo en Midjourney, DALL·E, Kling u otro generador para crear tu imagen.
- Los prompts gratuitos incluyen una instrucción de marca de agua sutil de Gommy Studio; los prompts premium, más completos y sin marca de agua, se venden en Gumroad.
- Consulta la opción Pro y visita Gumroad. La app no procesa pagos ni tiene inicio de sesión.
- Ve los cambios reflejados en una vista previa vertical.
- Crea una combinación sorpresa.
- Copia el texto al portapapeles.
- Guarda, recupera y elimina tus fondos favoritos. Se conservan en el navegador mediante almacenamiento local.
- Interfaz adaptable, navegación con teclado y respeto por la preferencia de movimiento reducido.

## Requisitos

- Node.js 18 or newer
- npm 9 or newer

## Ejecutar en local

```sh
npm install
npm run dev
```

Vite mostrará la dirección local después de iniciar.

## Producción

```sh
npm run build
npm run preview
```

El paquete estático de producción se genera en `dist/`. Puedes publicar esa carpeta en cualquier servicio de alojamiento estático. Configura el servicio para devolver `index.html` en las rutas de la aplicación.

## Estructura del proyecto

```text
.
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── src
	├── App.jsx
	├── index.css
	└── main.jsx
```

## Notas

- La app no genera imágenes: solo crea prompts. La vista previa de escena es una referencia visual y usa fotografías de Unsplash.
- Las fotografías de vista previa y las fuentes Fraunces y Nunito Sans de Google Fonts requieren conexión a internet.
- El botón Pro abre la página de Gommy Studio en Gumroad. No hay pagos, cuentas ni activación de la opción Pro dentro de la app.
- El contador de cinco prompts se guarda solo en este navegador; no verifica pases Pro y se reinicia al borrar los datos locales del sitio. La app no procesa pagos.
- Los favoritos se guardan en el navegador actual. Si borras sus datos, también se borrarán los favoritos.
- El acceso al portapapeles requiere una conexión segura (HTTPS o localhost) y permiso del navegador.
