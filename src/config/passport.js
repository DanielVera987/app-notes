const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async function(email, password, done){

  // Match email user
  const user = await User.findOne({email});
  if(!user) {
    return done(null, false, { message: 'Not user found' });
  }else{
    const match = await user.matchPassword(password);
    if (match) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect Password' })
    }
  }
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});