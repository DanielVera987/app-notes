const passport = require('passport');
const User = require("../models/User");

const UserController = {

  signUpRender(req, res) {
    res.render('users/signin');
  },

  async signUp(req, res) {
    const errors = [];
    const { name, email, password, confirm_password } = req.body;

    if (password != confirm_password) {
      errors.push({text: 'Password do not match'});
    }

    if(password.length < 4) {
      errors.push({text: 'Password must be at least 4 characters'});
    }

    if(errors.length > 0) {
      res.render('users/signin', {
        errors,
        name,
        email
      });
    }else{
      const emailUser = await User.findOne({email});

      if (emailUser) {
        req.flash('error_msg', 'The email is already in use');
        res.redirect("/users/signup");
      } else {
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'You are registered');
        res.redirect('/users/signin');
      }
    }
  },

  signInRender(req, res) {
    res.render('users/signup');
  },

  signIn() {
    passport.authenticate("local", {
      successRedirect: "/notes",
      failureRedirect: "/users/signin",
      failureFlash: true,
    });
  },

  logout(req, res) {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/signin');
  }
}

module.exports = UserController