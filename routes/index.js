const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));
router.use('/users', require('./users'));
router.use('/books', require('./books'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) {
            return next(err);
        };
        res.redirect('/');
    });
});

module.exports = router;