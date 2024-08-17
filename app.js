const express = require('express');
const path = require('path');
const userRoutes = require('./routes/subRoutes');
const homeRoutes = require('./routes/homeRoutes');

const app = express();
// Middleware para parsear JSON
app.use(express.json());
// Middleware para parsear datos de formulario
app.use(express.urlencoded({ extended: true }));
// Configura el motor de plantillas EJS
app.set('view engine', 'ejs');
// Cambia el directorio predeterminado de vistas
app.set('views', './src/views');
// Sirve archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Ruta para la página de inicio
app.get('/', (req, res) => {
  res.redirect('/home')
});

app.use('/home', homeRoutes);
app.use('/subs', userRoutes);

module.exports = app;
