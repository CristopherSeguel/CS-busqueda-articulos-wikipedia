
// Función para obtener los últimos artículos de Wikipedia
async function obtenerUltimosArticulos() {
    try {
      const response = await axios.get('https://es.wikipedia.org/w/api.php?action=query&list=recentchanges&rcnamespace=0&format=json');
      const articulos = response.data.query.recentchanges;
      const idsArticulos = articulos.map(articulo => articulo.pageid);
      const responseDetalles = await axios.get(`https://es.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&pageids=${idsArticulos.join('|')}`);
      const detallesArticulos = responseDetalles.data.query.pages;
      articulos.forEach(articulo => {
        articulo.extract = detallesArticulos[articulo.pageid]?.extract || '';
      });
  
      // Depuración: imprimir lista de artículos con y sin descripción
      const articulosConDescripcion = articulos.filter(articulo => articulo.extract !== '');
      const articulosSinDescripcion = articulos.filter(articulo => articulo.extract === '');
      console.log('Artículos con descripción:', articulosConDescripcion);
      console.log('Artículos sin descripción:', articulosSinDescripcion);
  
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
    const response = await axios.get(`https://es.wikipedia.org/w/api.php?action=query&list=search&srsearch=${terminoBusqueda}&format=json`);
    const query = response.data?.query; // Verificar si el objeto response.data.query existe
    if (query && query.search) {
      const resultados = query.search;
      mostrarArticulos(resultados);
    } else {
      // Si no hay resultados, mostrar un mensaje o hacer algo apropiado
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
  




// Pruebas Unitarias 

// Función de prueba para mostrarArticulos
function testMostrarArticulos() {
    const articulos = [
      { title: 'Artículo 1', extract: 'Descripción del artículo 1' },
      { title: 'Artículo 2', extract: 'Descripción del artículo 2' },
      { title: 'Artículo 3', extract: '' },
    ];
  
    mostrarArticulos(articulos);
  
    // Verificar que se hayan creado las tarjetas correctamente
    const cards = document.getElementsByClassName('card');
    console.log(cards.length === articulos.length ? 'Prueba exitosa: El número de tarjetas coincide con el número de artículos.' : 'Prueba fallida: El número de tarjetas no coincide con el número de artículos.');
  
    // Verificar que el título y la descripción se hayan agregado correctamente a las tarjetas
    for (let i = 0; i < cards.length; i++) {
      const cardTitle = cards[i].querySelector('.card-title');
      const cardDescription = cards[i].querySelector('.card-text');
      console.log(cardTitle.textContent === articulos[i].title ? `Prueba exitosa: El título de la tarjeta coincide con el título del artículo ${i + 1}.` : `Prueba fallida: El título de la tarjeta no coincide con el título del artículo ${i + 1}.`);
      console.log(cardDescription.textContent === articulos[i].extract || 'No hay descripción disponible.' ? `Prueba exitosa: La descripción de la tarjeta coincide con la descripción del artículo ${i + 1}.` : `Prueba fallida: La descripción de la tarjeta no coincide con la descripción del artículo ${i + 1}.`);
    }
  }
  
  // Función de prueba para buscarArticulos
  async function testBuscarArticulos() {
    const terminoBusqueda = 'JavaScript';
  
    await buscarArticulos(terminoBusqueda);
  
    // Verificar que se hayan obtenido los resultados correctamente
    const cards = document.getElementsByClassName('card');
    console.log(cards.length > 0 ? 'Prueba exitosa: Se obtuvieron resultados para la búsqueda.' : 'Prueba fallida: No se obtuvieron resultados para la búsqueda.');
  }
  
  // Ejecutar las pruebas
  testMostrarArticulos();
  testBuscarArticulos();

  