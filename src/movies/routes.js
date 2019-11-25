const express = require("express");
const router = express.Router();
const fs = require('fs');
var controller = require('./controller');

//cargar fichero datos
const filePath = './src/movies/data.txt'
const dataread = fs.readFileSync(filePath);
const films = JSON.parse(dataread);

//funcion guardar fichero
function saveFile() {
    data = JSON.stringify(films, null, 2)
    fs.writeFile(filePath, data, saved)
    function saved(err) {
        console.log('saved')
    }
}
//NO ME FUNCIONAN LOS CONTROLADORES SI LO HAGO ASI:
// router.get('/', (req, res) => res.json(controller.getMovies()));
// router.get('/:id', (req, res) => res.json(controller.getMovie()));
// router.post('/', (req, res) => res.json(controller.postMovie()));
// router.delete('/', (req, res) => res.json(controller.deleteMovie()));
// router.put('/', (req, res) => res.json(controller.postMovie()));


//rutas
router.get('/', getMovies);
router.get('/:id', getMovie);
router.get('/liked', getLiked);
router.post('/', postMovie);
router.delete('/', deleteMovie);
router.put('/', putMovie);
router.put('/like/:id', giveLike);
router.put('/unlike/:id', removeLike);


//Controladores

function getMovies(req, res) {
    res.send(films)
}

function getMovie(req, res) {
    var id = req.params.id;
    var film = films.find(movie => movie.ID === parseInt(id));
    res.send(film);
}

//añadir pelicula nueva:
function postMovie(req, res) {
    var title = req.body.title;
    console.log(title)
    if (title != null) { 
        var pushed =
        films.push({
            ID: films[films.length - 1].ID + 1,
            likes: 0,
            title: title
        })
    }
    saveFile();
}
//actualizar pelicula
function putMovie(req, res) {
    var id = req.body.id;
    var title = req.body.title;
    var film = films.findIndex(movie => movie.ID === parseInt(id));
    films[film].title = title;
    saveFile();
}

//eliminar pelicula
function deleteMovie(req, res) {
    var id = req.body.id;
    var film = films.findIndex(movie => movie.ID == parseInt(id));
    if (film >= 0) films.splice(film, 1);
    saveFile();
}

function giveLike(req, res) {
    var id = req.params.id;
    var film = films.findIndex(movie => movie.ID === parseInt(id));
    console.log(film)
    films[film].likes ++
    saveFile();

}

function removeLike(req, res) {
    var id = req.params.id;
    var film = films.findIndex(movie => movie.ID === parseInt(id));
    console.log(film)
    films[film].likes--
    saveFile();
}

//no funciona, en console.log si
function getLiked(req, res) {
    console.log('hola')
    let liked= []
    for (let i = 0; i < films.length; i++) {
        if (films[i].likes > 0) {
            liked.push(films[i])
        }
    }
    console.log(liked)
    return res.send(liked)
}


module.exports = router;

