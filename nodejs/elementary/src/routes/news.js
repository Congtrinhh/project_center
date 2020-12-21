const express = require('express');
const router = express.Router();

// include NewController.js to execute function
const newsController = require('../app/controllers/NewsController');

router.get('/:slug', newsController.show);
router.get('/', newsController.index);

module.exports = router;
