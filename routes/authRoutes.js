const passport = require('passport');

module.exports = app => {
    //authentication
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }))

    //exchange code with profile to google
    app.get('/auth/google/callback', passport.authenticate('google')); 

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    })

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    })
};

  