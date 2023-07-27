const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Configuración para permitir CORS desde tu frontend (http://127.0.0.7:5500)
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.7:5500');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Ruta para obtener los últimos artículos de Wikipedia
app.get('/ultimos-articulos', async (req, res) => {
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

    res.json(articulos);
  } catch (error) {
    console.error('Error al obtener los artículos:', error);
    res.status(500).json({ error: 'Error al obtener los artículos' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
