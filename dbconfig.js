const mongoose 	= require('mongoose');
const model    	= require('./model');

const DB_URI	= 'mongodb://localhost:27017/wishlist';

function connectDB(url, callback) {
	mongoose.connect(url, { useNewUrlParser: true }, function(err) {
		if (callback !== null) callback(err);
	});	
}

function listBooks(filter, callback) {
	model.books.find(filter, function(err, books) {
		if (!err) {
			books.sort(function(a, b) {
				return a['_id'] > b['_id'] ? 1 : -1;
			});

			let data = new Array;

			books.forEach(function(book, index, books) {
				data.push(book);
			});

			callback(data);
		} else {
			console.log('error en RD DB');
		}
	});
}

function listMovies(filter, callback) {
	model.movies.find(filter, function(err, movies) {
		if (!err) {
			movies.sort(function(a, b) {
				return a['_id'] > b['_id'] ? 1 : -1;
			});

			let data = new Array;

			movies.forEach(function(movie, index, movies) {
				data.push(movie);
			});

			callback(data);
		} else {
			console.log('error en RD DB');
		}
	});
}

function listGames(filter, callback) {
	model.games.find(filter, function(err, games) {
		if (!err) {
			games.sort(function(a, b) {
				return a['_id'] > b['_id'] ? 1 : -1;
			});

			let data = new Array;

			games.forEach(function(game, index, games) {
				data.push(game);
			});

			callback(data);
		} else {
			console.log('error en RD DB');
		}
	});
}

function createBook(data, callback) {
	let book = new model.books(data);
	book.save(function(err, doc) {
		if (!err) {
			if (callback !== null) callback();
		} else {
			console.log('Write DB error');
		}
	});
}

function createMovie(data, callback) {
	let movie = new model.movies(data);
	movie.save(function(err, doc) {
		if (!err) {
			if (callback !== null) callback();
		} else {
			console.log('Write DB error');
		}
	});
}

function createGame(data, callback) {
	let game = new model.games(data);
	game.save(function(err, doc) {
		if (!err) {
			if (callback !== null) callback();
		} else {
			console.log('Write DB error');
		}
	});
}

module.exports = {
	DB_URI,
	connectDB,
	listBooks,
	listMovies,
	listGames,
	createBook,
	createMovie,
	createGame
}