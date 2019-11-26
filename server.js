const express = require("express")
const fs = require("fs");
const morgan = require('morgan');
const moviesRouter = require("./src/movies/routes");
const methodOverride = require('method-override');
const notifier = require('node-notifier');


const app = express();
app.use(express.json());
app.use(morgan('combined'));



//MIDDLEWARE, solo funciona antes de las rutas
app.use(function (req, res, next) {
  console.log('Se ha realizado una petición. Time:', Date.now());
  next();
});

app.use('/movies', moviesRouter);



//Usar solo en modo desarrollo

if (process.env.NODE_ENV === 'development') {
  app.use(methodOverride());
  app.use(errorHandler);
} 


// app.listen(3000, () => console.log('Ready on port 3000!'));

var server = app.listen(process.env.PORT || 3000, listen);

function listen() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Ready at http://' + host + ':' + port);
  }


//MIDDELWARE MANEJO DE ERRORES, solo funciona al final de las rutas

function errorHandler(err, req, res, next) {
  if (!err) { return next(); }
  const message = `Error en ${req.method} ${req.url}`;
  // notifier.notify({ title: 'Error', message });
  res.status(404).json({ title: 'error', message })
  console.log('ERROR: ' + message)
  res.status(500).send('Algo se ha roto');
  }

app.use(errorHandler);



// app.get('/hello', helloWorld);

// function helloWorld(req, res) {
//     res.send('hello world');
// }