// var passport=require('passport');
// var GitHubStrategy=require('passport-github').Strategy;
// var User=require('../models/user');

// passport.use(new GitHubStrategy({
//     clientID:process.env.CLIENT_ID,
//     clientSecret:process.env.CLIENT_SECRET,
//     callbackURL:'/auth/github/callback'
// },(accessToken,refreshToken,profile,done)=>{
//     console.log(profile);
//     var profileData={
//         name:profile.displayName,
//         username:profile.username,
//         email:profile._json.email,
//         photo:profile._json.avatar_url
//     }
//     console.log(profileData);
//     User.find({email:profileData.email},(err,user)=>{
//         if(err) return done(err);
//         if(!user){
//             User.create(profileData,(addedUser,err)=>{
//                 if(err) return done(err);
//                 return done(null,addedUser);
//             });
//         }
//         else{
//             return done(null,user);
//         }
//     });

// }));

// passport.serializeUser((user,done)=>{
//     done(null,user.id);
// })

// passport.deserializeUser(function(id,done){
//     User.findById(id,(err,user)=>{
//         done(err,user);
//     })
// })


var passport=require('passport');
var GitHubStrategy=require('passport-github').Strategy;
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
    console.log(profileData);
    User.findOne({email:profileData.email},(err,user)=>{
        if(err) return done(err);
        if(!user){
            User.create(profileData,(err,addedUser)=>{
                if(err) return done(err);
                return done(null,addedUser);
            })
        }
        else{
            done(null,user);
        }
    })
}));

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser(function(id,done){
    User.findById(id,(err,user)=>{
        done(err,user);
    })
})





