const db = require('../../database');

async function findAll() {
    try {
        const result = await db.query('select * from celine.order');
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

module.exports = {
    findAll
}