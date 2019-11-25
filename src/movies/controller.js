let films = [{
    ID: 0,
    likes: 0,
    title: "El misterio de los cuadros"
},
{
    ID: 1,
    likes: 0,
    title: "Apocalipsis final"
},
{
    ID: 2,
    likes: 0,
    title: "One bullet three deads"
}
];


function getMovies(req, res) {
    return res.send('porfin')
}

function getMovie(req, res) {
    var id = req.params.id;
    var film = films.find(movie => movie.ID === id);
    return film;
}

function postMovie(req, res) {
    var title = req.body.title;
    if (title != null) films.push({
        id: films[films.length - 1].id + 1,
        likes: 0,
        title: title
    })
};


function putMovie(req, res) {
    var id = req.body.id;
    var film = films.find(movie => movie.ID === id);
    return film;
}

function deleteMovie(req, res) {
    var id = req.body.id;
    var film = films.findIndex(movie => movie.ID == id);
    if (film >= 0) films.splice(film, 1);
    return films;
}

module.exports = {
    getMovies,
    getMovie,
    postMovie,
    putMovie,
    deleteMovie
}
