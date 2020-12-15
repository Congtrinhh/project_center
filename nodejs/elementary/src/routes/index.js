const newsRouter = require('./news'); // include router from news.js
const siteRouter = require('./site'); // include router from site.js

function route(app) {
    app.use('/', siteRouter);
    app.use('/news', newsRouter);
}

module.exports = route;
