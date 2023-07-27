# CS-busqueda-articulos-wikipedia

Este proyecto es una página de búsqueda de artículos de Wikipedia que utiliza la API de Wikipedia para obtener los últimos artículos y realizar búsquedas en tiempo real.

## Instrucciones para habilitar CORS

La API de Wikipedia tiene políticas de seguridad de CORS (Cross-Origin Resource Sharing) que pueden bloquear las solicitudes realizadas desde el navegador. Esto puede provocar problemas al intentar obtener datos de la API directamente desde una página web alojada en otro dominio.

Para que el proyecto funcione correctamente en el navegador, es recomendable instalar la extensión "Allow CORS: Access-Control-Allow-Origin" en tu navegador. Esta extensión permite habilitar CORS para todas las solicitudes en el dominio local.

### Instalación de la extensión

- **Google Chrome**: [Allow CORS: Access-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf)

- **Mozilla Firefox**: [Allow CORS: Access-Control-Allow-Origin](https://addons.mozilla.org/es/firefox/addon/access-control-allow-origin/)

Una vez que hayas instalado la extensión, deberías poder utilizar el buscador de artículos de Wikipedia sin problemas.


**Instrucciones para Ver las Pruebas Unitarias**

El proyecto incluye pruebas unitarias para verificar el correcto funcionamiento de las funciones mostrarArticulos() y buscarArticulos().

Para ver las pruebas unitarias, sigue estos pasos:

Abre el archivo index.html en tu navegador web para ver la página de búsqueda de artículos de Wikipedia.

Abre la consola del navegador. Puedes hacerlo presionando la tecla F12 o haciendo clic derecho en la página y seleccionando "Inspeccionar" o "Inspect" y luego dirígete a la pestaña "Consola" o "Console".

Verás los mensajes console.log que indican si las pruebas unitarias fueron exitosas o si hay algún error.

**Tecnologías Utilizadas**

HTML
CSS
JavaScript (ES6)
Axios

**Autor**
Cristopher Seguel

