const express = require('express');
const app = express();
const port = 3000;
// include mongoose
const mongoose = require('mongoose');
const db = require('./config/db');
// connect to DB
db.connect();

// include path
const path = require('path');

// include static
app.use(express.static(path.join(__dirname, '/public')));

// include morgan
const morgan = require('morgan');
app.use(morgan('combined'));

// use middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//include template engine (handlebars)
var exphbs = require('express-handlebars');
app.engine(
    'hbs',
    exphbs({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');

// set custom path for handblebars
app.set('views', path.join(__dirname, 'resources', 'views'));

// include routes directory (/routes/index.js)
const route = require('./routes/index.js');

// All route run here
route(app);

// Run server - the last step
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
