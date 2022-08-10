var passport=require('passport');
var GitHubStrategy=require('passport-github').Strategy;
var GoogleStrategy=require('passport-google').Strategy;
var User=require('../models/user');


passport.use(new GitHubStrategy({
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL:'/auth/github/callback'
},(accessToken,refreshToken,profile,done)=>{
    console.log(profile);
    var profileData={
        name:profile.displayName,
        username:profile.username,
        email:profile._json.email,
        photo:profile._json.avatar_url
    }
    User.findOne({email:profileData.email},(err,user)=>{
        if(err) return done(err);
        if(!user){
            User.create(profileData,(err,addedUser)=>{
                if(err) return done(err);
                return done(null,addedUser);
            });
        }
        else{
            done(null,user);
        }
    })
}));

passport.use(new GoogleStrategy({
    clientID:process.env.CLIENT_ID_GOOGLE,
    clientSecret:process.env.CLIENT_SECRET_GOOGLE,
    callbackURL:'http://localhost:3000/auth/google/callback'
}),(accessToken,refreshToken,profile,done)=>{
    console.log(profile);
});

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
  });




