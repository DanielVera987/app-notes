const { Router } = require('express');
const router = Router();
const UserController = require('../controllers/users.controllers');
const passport = require('passport');

router.get('/users/signup', UserController.signUpRender);
router.post('/users/signup', UserController.signUp);

router.get('/users/signin', UserController.signInRender);
router.post('/users/signin', passport.authenticate("local", {
  successRedirect: "/notes",
  failureRedirect: "/users/signin",
  failureFlash: true,
}));

router.get('/users/logout', UserController.logout);

module.exports = router;