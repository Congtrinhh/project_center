const express = require('express');
const router = express.Router();

// include SiteController
const siteController = require('../app/controllers/SiteController');

router.get('/', siteController.index);

module.exports = router;
