const jwt = require('jsonwebtoken');
const passport = require('passport');
const crypto = require('crypto');
const userModel = require('./model');
const { tokenSecret } = require('../config');
const { getToken } = require('../utils/get-token');

function generateAccessToken(username) {
    return jwt.sign(username, tokenSecret);
}

async function localStrategy(username, password, done){
    try {
        const user = await userModel.getUser(username, crypto.createHash('md5').update(password).digest('hex'));
        if (user.rowCount > 0) {
            const { password, token, ...userWithoutPasswordAndToken} =  user.rows[0];
            return done(null, userWithoutPasswordAndToken);
        }
    } catch(err) {
        return done(err, null);
    }
    done();
}

function me(req, res, next) {
    if (!req.user) {
        return res.json({
            message: "You're not logged in or token expired"
        });
    }
    return res.json(req.user);
}

async function login(req, res, next) {
    passport.authenticate('local', async function(err, user) {
        if (err) {
            console.log(err.stack);
            return next(err)
        }; 
        if (!user) return res.json({ message: 'username or password incorrect!' });

        let signed = jwt.sign(user, tokenSecret); // <--- ganti secret key dengan keymu sendiri, bebas yang sulit ditebak
        
        await userModel.updateToken(user.username, signed);
        return res.json({
            message: 'Successfully login!',
            data: {
                username: user.username,
                email: user.email,
                role: user.role,
                token: signed
            }
        });
    })(req, res, next);
}

async function logout(req, res) {
    try {
        let token = getToken(req);

        if (!req.user) {
            return res.json({
                message: "You're not logged in or token expired"
            });
        }

        const user = await userModel.updateToken(req.user.username, null);

        if (user.rowCount < 1) {
            res.status(404);
            return res.json({
                message: "User not found!"
            });
        }

        return res.json({
            message: "Successfully logged out!"
        });
    } catch(err) {
        console.log(err.stack);
        res.status(500);
        res.json({
            message: err.message
        });
    }
}

async function register(req, res) {
    try {
        const { username, password, email, role } = req.body;
        const checkUser = await userModel.checkUser(username);
        if (checkUser.rowCount > 0) {
            res.status(400);
            res.json({
                message: 'Username already taken!',
            });
        } else {
            const user = await userModel.createUser(username, crypto.createHash('md5').update(password).digest('hex'), email, role);
            if (user.rowCount > 0) {
                res.status(200);
                res.json({
                    message: 'Successfully register!'
                });
            }
        }
    } catch(err) {
        console.log(err.stack);
        res.status(500);
        res.json({
            message: err.message
        });
    }
}

async function updateUser(req, res) {
    try {
        const { username, password, email, role } = req.body;
        const user = await userModel.updateUser(username, crypto.createHash('md5').update(password).digest('hex'), email, role);
        if (user.rowCount > 0) {
            res.status(200);
            res.json({
                message: 'Successfully update!',
                data: {
                    username: username,
                    role: role,
                    email: email,
                    token: 'Bearer '+ generateAccessToken(username)
                }
            });
        } else {
            res.status(400);
            res.json({
                message: 'Wrong username!',
            });
        }
    } catch(err) {
        console.log(err.stack);
        res.status(500);
        res.json({
            message: err.message
        });
    }
}

module.exports = {
    login,
    register,
    logout,
    me,
    updateUser,
    localStrategy
}