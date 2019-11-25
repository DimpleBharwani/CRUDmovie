
const express = require("express")
const fs = require("fs");
const morgan = require('morgan');
const moviesRouter = require("./src/movies/routes");
const app = express();

app.use(express.json());
app.use(morgan('combined'));


app.use('/movies', moviesRouter);

// app.listen(3000, () => console.log('Ready on port 3000!'));

var server = app.listen(process.env.PORT || 3000, listen);

function listen() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Ready at http://' + host + ':' + port);
  }

app.get('/hello', helloWorld);

function helloWorld(req, res) {
    res.send('hello world');
}