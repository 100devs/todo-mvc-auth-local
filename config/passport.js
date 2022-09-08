// const mongoose = require("mongoose");
const User = require("../models/User");
const passport = require("passport");
const refresh = require("passport-oauth2-refresh");
const { Strategy: LocalStrategy } = require("passport-local");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
// const { Strategy: GitHubStrategy } = require("passport-github2");

/**
 * Sign in using Email and Password.
 */

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { msg: `Email ${email} not found.` });
      }
      if (!user.password) {
        return done(null, false, {
          msg: "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
        });
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, { msg: "Invalid email or password." });
      });
    });
  })
);

/**
 * Sign in with Google.
 */
// const googleStrategyConfig = new GoogleStrategy(
//   {
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "auth/google/callback",
//     passReqToCallback: true,
//   },
//   (req, accessToken, refreshToken, params, profile, done) => {
//     if (req.user) {
//       User.findOne({ google: profile.id }, (err, existingUser) => {
//         if (err) {
//           return done(err);
//         }
//         if (existingUser && existingUser.id !== req.user.id) {
//           req.flash("errors", {
//             msg: "There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.",
//           });
//           done(err);
//         } else {
//           User.findById(req.user.id, (err, user) => {
//             if (err) {
//               return done(err);
//             }
//             user.google = profile.id;
//             user.tokens.push({
//               kind: "google",
//               accessToken,
//               accessTokenExpires: moment()
//                 .add(params.expires_in, "seconds")
//                 .format(),
//               refreshToken,
//             });
//             user.profile.name = user.profile.name || profile.displayName;
//             user.profile.gender = user.profile.gender || profile._json.gender;
//             user.profile.picture =
//               user.profile.picture || profile._json.picture;
//             user.save((err) => {
//               req.flash("info", { msg: "Google account has been linked." });
//               done(err, user);
//             });
//           });
//         }
//       });
//     } else {
//       User.findOne({ google: profile.id }, (err, existingUser) => {
//         if (err) {
//           return done(err);
//         }
//         if (existingUser) {
//           return done(null, existingUser);
//         }
//         User.findOne(
//           { email: profile.emails[0].value },
//           (err, existingEmailUser) => {
//             if (err) {
//               return done(err);
//             }
//             if (existingEmailUser) {
//               req.flash("errors", {
//                 msg: "There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.",
//               });
//               done(err);
//             } else {
//               const user = new User();
//               user.email = profile.emails[0].value;
//               user.google = profile.id;
//               user.tokens.push({
//                 kind: "google",
//                 accessToken,
//                 accessTokenExpires: moment()
//                   .add(params.expires_in, "seconds")
//                   .format(),
//                 refreshToken,
//               });
//               user.profile.name = profile.displayName;
//               user.profile.gender = profile._json.gender;
//               user.profile.picture = profile._json.picture;
//               user.save((err) => {
//                 done(err, user);
//               });
//             }
//           }
//         );
//       });
//     }
//   }
// );

const googleStrategyConfig = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    const newUser = {
      google: profile.id,
      profile: {
        name: `${profile.name.familyName + " " + profile.name.givenName}`,
        picture: profile.photos[0].value,
      },
    };
    try {
      let user = await User.findOne({ google: profile.id });
      if (user) {
        done(null, user);
      } else {
        user = await User.create(newUser);
        done(null, user);
      }
    } catch (err) {
      console.error(err);
    }
  }
);
passport.use("google", googleStrategyConfig);
refresh.use("google", googleStrategyConfig);

/**
 * Sign in with GitHub.
 */

// passport.use(
//   new GitHubStrategy(
//     {
//       clientID: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//       callbackURL: `${process.env.BASE_URL}/auth/github/callback`,
//       passReqToCallback: true,
//       scope: ["user:email"],
//     },
//     (req, accessToken, refreshToken, profile, done) => {
//       if (req.user) {
//         User.findOne({ github: profile.id }, (err, existingUser) => {
//           if (existingUser) {
//             req.flash("errors", {
//               msg: "There is already a GitHub account that belongs to you. Sign in with that account or delete it, then link it with your current account.",
//             });
//             done(err);
//           } else {
//             User.findById(req.user.id, (err, user) => {
//               if (err) {
//                 return done(err);
//               }
//               user.github = profile.id;
//               user.tokens.push({ kind: "github", accessToken });
//               user.profile.name = user.profile.name || profile.displayName;
//               user.profile.picture =
//                 user.profile.picture || profile._json.avatar_url;
//               user.profile.location =
//                 user.profile.location || profile._json.location;
//               user.profile.website = user.profile.website || profile._json.blog;
//               user.save((err) => {
//                 req.flash("info", { msg: "GitHub account has been linked." });
//                 done(err, user);
//               });
//             });
//           }
//         });
//       } else {
//         User.findOne({ github: profile.id }, (err, existingUser) => {
//           if (err) {
//             return done(err);
//           }
//           if (existingUser) {
//             return done(null, existingUser);
//           }
//           if (profile._json.email === null) {
//             User.findOne(
//               { email: profile.emails[0].value },
//               (err, existingEmailUser) => {
//                 if (err) {
//                   return done(err);
//                 }
//                 if (existingEmailUser) {
//                   req.flash("errors", {
//                     msg: "There is already an account using this email address. Sign in to that account and link it with GitHub manually from Account Settings.",
//                   });
//                   done(err);
//                 } else {
//                   const user = new User();
//                   user.email = _.get(
//                     _.orderBy(
//                       profile.emails,
//                       ["primary", "verified"],
//                       ["desc", "desc"]
//                     ),
//                     [0, "value"],
//                     null
//                   );
//                   user.github = profile.id;
//                   user.tokens.push({ kind: "github", accessToken });
//                   user.profile.name = profile.displayName;
//                   user.profile.picture = profile._json.avatar_url;
//                   user.profile.location = profile._json.location;
//                   user.profile.website = profile._json.blog;
//                   user.save((err) => {
//                     done(err, user);
//                   });
//                 }
//               }
//             );
//           } else {
//             User.findOne(
//               { email: profile._json.email },
//               (err, existingEmailUser) => {
//                 if (err) {
//                   return done(err);
//                 }
//                 if (existingEmailUser) {
//                   req.flash("errors", {
//                     msg: "There is already an account using this email address. Sign in to that account and link it with GitHub manually from Account Settings.",
//                   });
//                   done(err);
//                 } else {
//                   const user = new User();
//                   user.email = _.get(
//                     _.orderBy(
//                       profile.emails,
//                       ["primary", "verified"],
//                       ["desc", "desc"]
//                     ),
//                     [0, "value"],
//                     null
//                   );
//                   user.github = profile.id;
//                   user.tokens.push({ kind: "github", accessToken });
//                   user.profile.name = profile.displayName;
//                   user.profile.picture = profile._json.avatar_url;
//                   user.profile.location = profile._json.location;
//                   user.profile.website = profile._json.blog;
//                   user.save((err) => {
//                     done(err, user);
//                   });
//                 }
//               }
//             );
//           }
//         });
//       }
//     }
//   )
// );

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});
