const { Router } = require('express');
const IndexController = require('../controllers/index.controllers');

const router = Router();

router.get('/', IndexController.renderIndex);

router.get('/about', IndexController.renderAbout);

module.exports = router;