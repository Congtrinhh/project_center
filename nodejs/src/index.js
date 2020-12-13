const express = require('express')
const path = require('path') // include path to project
const app = express()
const port = 3000

// https log
const morgan = require('morgan')
app.use(morgan('combined'))

// handle bars
const exphbs  = require('express-handlebars');
app.engine('.hbs', exphbs({extname: '.hbs'}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views')
);
// static
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.render('home');
})

app.get('/introduction', function (req, res) {
  res.render('intro');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})