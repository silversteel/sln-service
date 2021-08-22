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

async function createUser(username, password, email, image, role) {
    try {
        const result = await db.query('insert into celine.user(username, password, email, image, role) values($1, $2, $3, $4, $5)', [username, password, email, image, role]);
        return result;
    } catch (error) {
        console.log(error.stack);
        throw error;
    }
}

async function updateUser(username, password, email, image, role) {
    try {
        let query = "update celine.user set";
        let params =  [username];
        if (password) {
            let totalParams = parseInt(params.length) + 1;
            query += " password = $"+totalParams+",";
            params.push(password);
        }
        if (email) {
            let totalParams = params.length + 1;
            query += " email = $"+totalParams+",";
            params.push(email);
        }
        if (image) {
            let totalParams = params.length + 1;
            query += " image = $"+totalParams+",";
            params.push(image);
        }
        if (role) {
            let totalParams = params.length + 1;
            query += " role = $"+totalParams+"";
            params.push(role);
        }

        if (!password && !email && !image && !role) {
            throw new Error('all field is empty!');
        }

        query += " where username = $1";

        const result = await db.query(query, params);
        return result;
    } catch (error) {
        console.log(error.stack);
        throw error;
    }
}

async function updateToken(username, token) {
    try {
        const result = await db.query('update celine.user set token = $2 where username = $1 returning username, email, role, token', [username, token]);
        return result;
    } catch (error) {
        console.log(error.stack);
        throw error;
    }
}

async function checkToken(token) {
    try {
        const result = await db.query('select 1 from celine.user where token = $1', [token]);
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
    updateUser,
    updateToken,
    checkToken
}