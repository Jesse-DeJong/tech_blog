module.exports = {
    withAuth: (req, res, next) => {

        if (!req.session.loggedIn) {
            res.redirect('/api/users/');
        } else {
            next();
        }
    }
};