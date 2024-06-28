const express = require('express');
const app = express();

// Configura el motor de plantillas EJS
app.set('view engine', 'ejs');

// Cambia el directorio predeterminado de vistas
app.set('views', './src/views');

// Sirve archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Ruta para la página de inicio
app.get('/', (req, res) => {
  res.redirect('/dashboard')
});

// Ruta para la página de inicio
app.get('/dashboard', (req, res) => {
  res.render('index');
});

// Ruta para la página acerca de
app.get('/subscriptions', (req, res) => {
  res.render('subscriptions');
});

// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
