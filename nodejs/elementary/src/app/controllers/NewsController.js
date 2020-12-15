class NewsController {
    // [GET] /news
    index(req, res) {
        res.render('news');
    }

    // [GET] /news/:slug
    show(req, res) {
        res.send('hello, this is the show function from news/:slug');
    }
}

module.exports = new NewsController();
