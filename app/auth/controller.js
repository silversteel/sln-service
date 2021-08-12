const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userModel = require('./model');
const { tokenSecret } = require('../config');

function generateAccessToken(username) {
    return jwt.sign(username, tokenSecret);
}

async function login(req, res) {
    try {
        const user = await userModel.getUser(req.body.username, crypto.createHash('md5').update(req.body.password).digest('hex'));
        if (user.rowCount > 0) {
            res.status(200);
            res.json({
                message: 'Successfully login!',
                data: {
                    username: user.rows[0].username,
                    email: user.rows[0].email,
                    role: user.rows[0].role,
                    token: 'Bearer '+ generateAccessToken(user.rows[0].username)
                }
            });
        } else {
            res.status(400);
            res.json({
                message: 'Wrong username or password!',
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
                    message: 'Successfully register!',
                    data: {
                        username: username,
                        email: email,
                        role: role,
                        token: 'Bearer '+ generateAccessToken(username)
                    }
                });
            } else {
                res.status(400);
                res.json({
                    message: 'Wrong username or password!',
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
    updateUser
}