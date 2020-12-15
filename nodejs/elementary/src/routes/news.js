const express = require('express');
const router = express.Router();

// include NewController.js to execute function
const newsController = require('../app/controllers/NewsController');

router.use('/:slug', newsController.show);
router.use('/', newsController.index);

module.exports = router;
