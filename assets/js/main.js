const backendURL = 'http://localhost:3000';

// Función para obtener los últimos artículos de Wikipedia
async function obtenerUltimosArticulos() {
  try {
    const response = await axios.get(`${backendURL}/ultimos-articulos`);
    const articulos = response.data;
    mostrarArticulos(articulos);
  } catch (error) {
    console.error('Error al obtener los artículos:', error);
  }
}

// Función para mostrar los artículos en la lista
function mostrarArticulos(articulos) {
  const listaArticulos = document.getElementById('listaArticulos');
  listaArticulos.innerHTML = '';

  articulos.forEach(articulo => {
    const card = document.createElement('div');
    card.classList.add('card', 'mb-3');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const titulo = document.createElement('h5');
    titulo.classList.add('card-title');
    titulo.textContent = articulo.title;

    const descripcion = document.createElement('p');
    descripcion.classList.add('card-text');

    if (articulo.extract) {
      // Crear un elemento temporal para obtener el texto sin formato de la descripción
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = articulo.extract;
      const descripcionSinHTML = tempDiv.textContent;

      // Limitar la descripción a 100 caracteres
      const descripcionCorta = descripcionSinHTML.substring(0, 100) + '...';
      descripcion.textContent = descripcionCorta;
    } else {
      descripcion.textContent = 'No hay descripción disponible.';
    }

    const enlace = document.createElement('a');
    enlace.classList.add('btn', 'btn-primary');
    enlace.href = `https://es.wikipedia.org/?curid=${articulo.pageid}`;
    enlace.target = '_blank';
    enlace.textContent = 'Leer más';

    cardBody.appendChild(titulo);
    cardBody.appendChild(descripcion);
    cardBody.appendChild(enlace);

    card.appendChild(cardBody);

    listaArticulos.appendChild(card);
  });
}

// Función para buscar artículos
async function buscarArticulos(terminoBusqueda) {
  try {
    const response = await axios.get(`http://localhost:3000/buscar-articulos?terminoBusqueda=${terminoBusqueda}`);
    const query = response.data?.query;
    if (query && query.search) {
      const resultados = query.search;
      mostrarArticulos(resultados);
    } else {
      console.log('No se encontraron resultados.');
    }
  } catch (error) {
    console.error('Error al buscar los artículos:', error);
  }
}


// Evento cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
  // Obtener los últimos artículos de Wikipedia al cargar la página
  obtenerUltimosArticulos();

  // Evento cuando el usuario escribe en el buscador
  const buscador = document.getElementById('buscador');
  buscador.addEventListener('input', () => {
    const terminoBusqueda = buscador.value.trim();
    buscarArticulos(terminoBusqueda);
  });
});




//Pruebas Unitarias

// Función de prueba para buscarArticulos
async function testBuscarArticulos() {
  const terminoBusqueda = 'JavaScript';

  // Ejecutar la función buscarArticulos con el término de búsqueda
  await buscarArticulos(terminoBusqueda);

  // Verificar que se hayan obtenido los resultados correctamente
  const listaArticulosDiv = document.getElementById('listaArticulos');
  const cards = listaArticulosDiv.getElementsByClassName('card');
  console.log(cards.length > 0 ? 'Prueba exitosa: Se obtuvieron resultados para la búsqueda.' : 'Prueba fallida: No se obtuvieron resultados para la búsqueda.');
}

// Ejecutar la prueba
testBuscarArticulos();

