const express = require('express')
const app = express()
const port = 3000

// include path
const path = require('path')

// include static
app.use(express.static(path.join(__dirname, '/public')))

// include morgan
var morgan = require('morgan')
app.use(morgan('combined'))
//include template engine (handlebars)
var exphbs  = require('express-handlebars');
app.engine('hbs', exphbs({
  "extname": ".hbs"
}));
app.set('view engine', 'hbs');

// set custom path for handblebars 
app.set('views', path.join(__dirname, 'resources', 'views'));

app.get('/', (req, res) => {
  console.log(res);
  res.render('home')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})