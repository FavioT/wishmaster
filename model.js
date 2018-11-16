const mongoose 			= require('mongoose');

let booksCollection 	= 'books';
let moviesCollection 	= 'movies';
let gamesCollection 	= 'games';

//---------
// SCHEMAS
//---------
let booksSchema = mongoose.Schema({
	title: 		String,
	complete: 	Boolean
});

let moviesSchema = mongoose.Schema({
	title: 		String,
	complete: 	Boolean
});

let gamesSchema = mongoose.Schema({
	title: 		String,
	complete: 	Boolean
});

let books 	= mongoose.model(booksCollection, booksSchema);
let movies 	= mongoose.model(moviesCollection, moviesSchema);
let games 	= mongoose.model(gamesCollection, gamesSchema);

module.exports = {
	books,
	movies,
	games
}