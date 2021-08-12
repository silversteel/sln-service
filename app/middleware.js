function checkUser(req, res, next) {
    if (!req.user) {
        res.status(403);
        return res.json({
            message: "You're not logged in or token expired"
        });
    }
    next();
}

module.exports = {
    checkUser
}