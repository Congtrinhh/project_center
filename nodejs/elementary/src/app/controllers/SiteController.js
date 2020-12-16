const Course = require('../models/Course');

class SiteController {
    // [GET] /
    index(req, res) {
        Course.find({}, function (err, courses) {
            if (!err) {
                res.json(courses);
            } else {
                res.status(404).json('error occured!');
            }
        });
    }
}

module.exports = new SiteController();
