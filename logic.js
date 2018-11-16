const chalk     = require('chalk');
const low       = require('lowdb');
const FileSync  = require('lowdb/adapters/FileSync');

const adapter   = new FileSync('db.json');
const db        = low(adapter);

const dbFile    = require('./dbconfig');

// Set some defaults (required if your JSON file is empty)
db.defaults({ wishlist: [] }).write();

function newItem (sentence) {
    db.get('wishlist')
        .push({
            title:      sentence,
            complete:   false
        })
        .write();
}

function getBooks () {
    dbFile.listBooks({}, function(list) {
        let index = 1;
        list.forEach(wish => {
            let wishText = `${index++}. ${wish.title}`;
            if (wish.complete) {
                wishText += ' ✔ ️'; // add a check mark    
            }
            console.log(chalk.yellow(chalk.strikethrough(wishText)));
        })
    });
}

function getMovies () {
    dbFile.listMovies({}, function(list) {
        let index = 1;
        list.forEach(wish => {
            let wishText = `${index++}. ${wish.title}`;
            if (wish.complete) {
                wishText += ' ✔ ️'; // add a check mark    
            }
            console.log(chalk.yellow(chalk.strikethrough(wishText)));
        })
    });
}

function getGames () {
    dbFile.listGames({}, function(list) {
        let index = 1;
        list.forEach(wish => {
            let wishText = `${index++}. ${wish.title}`;
            if (wish.complete) {
                wishText += ' ✔ ️'; // add a check mark    
            }
            console.log(chalk.yellow(chalk.strikethrough(wishText)));
        })
    });
}

function newBook (data) {
    dbFile.createBook({ title: data, complete: false}, function() { return; });
}

function newMovie (data) {
    dbFile.createMovie({ title: data, complete: false }, function() { return; });
}

function newGame (data) {
    dbFile.createGame({ title: data, complete: false }, function() { return; });
}

function completeItem (id) {

    let n = Number(id);

    // check if the value is a number
    if (isNaN(n)) {
        console.log(chalk.red('please provide a valid number for complete command'));
        return;
    }

    // check if correct length of values has been passed
    let wishlistLength = db.get('wishlist').value().length;
    if (n > wishlistLength) {
        console.log(chalk.red('invalid number passed for complete command.'));
        return;
    }

    // update the todo item marked as complete
    db.set(`wishlist[${n - 1}].complete`, true).write();
}

// DB connection
dbFile.connectDB(dbFile.DB_URI, function(err) {
    if (err) return console.log('Error on DB connection: ' + err);
    console.log(chalk.green('DB connected!'));
})

// exports all methods
module.exports = { 
    getBooks,
    getMovies,
    getGames,
    newBook,
    newMovie,
    newGame,
    completeItem 
};