module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/");
    }
  },

  /**
   * Authorization Required middleware.
   */
  isAuthorized: (req, res, next) => {
    const provider = req.path.split("/")[2];
    const token = req.user.tokens.find((token) => token.kind === provider);
    if (token) {
      // Is there an access token expiration and access token expired?
      // Yes: Is there a refresh token?
      //     Yes: Does it have expiration and if so is it expired?
      //       Yes, Quickbooks - We got nothing, redirect to res.redirect(`/auth/${provider}`);
      //       No, Quickbooks and Google- refresh token and save, and then go to next();
      //    No:  Treat it like we got nothing, redirect to res.redirect(`/auth/${provider}`);
      // No: we are good, go to next():
      if (
        token.accessTokenExpires &&
        moment(token.accessTokenExpires).isBefore(
          moment().subtract(1, "minutes")
        )
      ) {
        if (token.refreshToken) {
          if (
            token.refreshTokenExpires &&
            moment(token.refreshTokenExpires).isBefore(
              moment().subtract(1, "minutes")
            )
          ) {
            res.redirect(`/auth/${provider}`);
          } else {
            refresh.requestNewAccessToken(
              `${provider}`,
              token.refreshToken,
              (err, accessToken, refreshToken, params) => {
                User.findById(req.user.id, (err, user) => {
                  user.tokens.some((tokenObject) => {
                    if (tokenObject.kind === provider) {
                      tokenObject.accessToken = accessToken;
                      if (params.expires_in)
                        tokenObject.accessTokenExpires = moment()
                          .add(params.expires_in, "seconds")
                          .format();
                      return true;
                    }
                    return false;
                  });
                  req.user = user;
                  user.markModified("tokens");
                  user.save((err) => {
                    if (err) console.log(err);
                    next();
                  });
                });
              }
            );
          }
        } else {
          res.redirect(`/auth/${provider}`);
        }
      } else {
        next();
      }
    } else {
      res.redirect(`/auth/${provider}`);
    }
  },
};
