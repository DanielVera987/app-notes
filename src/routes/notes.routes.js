const { Router } = require('express');
const router = Router();

const notesController = require('../controllers/notes.controller');
const { isAuthenticated } = require('../helpers/auth');

router.get('/notes', isAuthenticated,notesController.index)

router.get('/notes/add', isAuthenticated, notesController.create);
router.post('/notes/add', isAuthenticated , notesController.store);

router.get('/notes/:id', isAuthenticated, notesController.show);

router.get('/notes/edit/:id', isAuthenticated, notesController.edit);
router.put('/notes/update/:id', isAuthenticated, notesController.update);

router.delete('/notes/destroy/:id', isAuthenticated, notesController.destroy);

module.exports = router;