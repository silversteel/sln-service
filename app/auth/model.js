const db = require('../../database');

async function checkUser(username) {
    try {
        const result = await db.query('select * from celine.user where username = $1', [username]);
        return result;
    } catch (error) {
        console.log(error.stack);
        throw error;
    }
}

async function getUser(username, password) {
    try {
        const result = await db.query('select * from celine.user where username = $1 and password = $2', [username, password]);
        return result;
    } catch (error) {
        console.log(error.stack);
        throw error;
    }
}

async function createUser(username, password, email, role) {
    try {
        const result = await db.query('insert into celine.user(username, password, email, role) values($1, $2, $3, $4)', [username, password, email, role]);
        return result;
    } catch (error) {
        console.log(error.stack);
        throw error;
    }
}

async function updateUser(username, password, email, role) {
    try {
        const result = await db.query('update celine.user set password = $2, email = $3, role = $4 where username = $1', [username, password, email, role]);
        return result;
    } catch (error) {
        console.log(error.stack);
        throw error;
    }
}

module.exports = {
    getUser,
    createUser,
    checkUser,
    updateUser
}