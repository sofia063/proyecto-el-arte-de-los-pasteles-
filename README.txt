ARTE DE LOS PASTELES — Sitio web de venta de pasteles
========================================================

CÓMO USARLO
-----------
1. Descomprime la carpeta.
2. Haz doble clic en "index.html" para abrirlo en tu navegador. Ya funciona,
   no necesitas instalar nada.
3. Si quieres subirlo a internet, sube toda la carpeta (index.html, css/,
   js/) a cualquier hosting (Hostinger, Netlify, GitHub Pages, etc.).

QUÉ INCLUYE
-----------
- index.html  -> estructura del sitio (catálogo, carrito, pedido, pago)
- css/style.css -> todo el diseño visual
- js/script.js  -> lógica del catálogo, carrito de compras, formulario de
  pedido y flujo de pago

FUNCIONES
---------
- Catálogo de 9 pasteles con filtros por categoría y buscador en vivo
  por nombre/descripción.
- Stock limitado: cada pastel tiene 10 unidades disponibles como máximo.
  El stock baja al agregar al carrito, sube si lo quitas, y el botón se
  deshabilita mostrando "Agotado" cuando llega a 0.
- Carrito de compras (agregar, quitar, sumar/restar cantidad, total).
- Formulario de datos de pedido (nombre, teléfono, dirección, fecha).
- Selector de forma de pago: tarjeta, QR/transferencia o efectivo al
  entregar.
- Pantalla de confirmación con número de pedido.
- Modo claro / oscuro (botón 🌙/☀️ en el menú superior) como opción de
  personalización visual para el cliente.
- Redes sociales y WhatsApp: enlaces a Instagram, Facebook y TikTok en
  el pie de página, más un botón flotante de WhatsApp (💬 abajo a la
  derecha) que abre un chat con mensaje predefinido.

NOTA SOBRE EL STOCK
--------------------
El contador de 10 unidades vive solo en el navegador de cada visitante
(no hay base de datos). Si quieres un inventario real compartido entre
todos los clientes (que se descuente de verdad y se sincronice), se
necesita conectar un backend o una base de datos.

NOTA SOBRE REDES SOCIALES Y WHATSAPP
-------------------------------------
Reemplaza estos datos de ejemplo por los reales de tu negocio:
- En index.html, busca "wa.me/59170000000" (aparece 2 veces) y cambia el
  número por tu WhatsApp real, en formato: código de país + número, sin
  espacios ni signos (ej. 59171234567).
- Cambia también los enlaces de instagram.com/..., facebook.com/... y
  tiktok.com/... por tus cuentas reales.

IMÁGENES
--------
Las fotos de los pasteles son reales y están enlazadas directamente desde
Unsplash (no se descargaron archivos, se referencian por URL). Si el sitio
se usa sin conexión a internet, las imágenes no se cargarán. Puedes
reemplazar cualquier URL en js/script.js (campo "img") por fotos propias
de tus pasteles cuando quieras.

SOBRE EL PAGO
--------------
Este es un sitio estático (sin servidor propio), así que el pago está
SIMULADO: el cliente llena sus datos de tarjeta o elige QR/efectivo y el
sistema confirma el pedido, pero no se procesa un cobro real todavía.

Para cobrar de verdad necesitas conectarlo a una pasarela de pago real,
por ejemplo:
- Stripe (stripe.com)
- PayPal (paypal.com/business)
- Mercado Pago (mercadopago.com)

En js/script.js, dentro de la función que confirma el pago, dejé un
bloque de código comentado que muestra dónde iría la llamada real a la
pasarela (fetch a tu backend). Cuando tengas cuenta con alguna de estas
plataformas, se conecta ahí.

PERSONALIZAR
------------
- Cambiar productos/precios: edita el arreglo PRODUCTS en js/script.js.
- Cambiar colores: edita las variables al inicio de css/style.css
  (:root { --vino, --dorado, --crema, etc. }).
- Cambiar textos, dirección, teléfono: edita directamente en index.html.
