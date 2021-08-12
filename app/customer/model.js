const db = require('../../database');

async function insert(customer_id, username, fullname, phone_number, email, id_number, gender, address, created_by) {
    try {
        const result = await db.query('insert into celine.customer(customer_id, username, fullname, phone_number, email, id_number, gender, address, created_by) values($1, $2, $3, $4, $5, $6, $7, $8, $9)', [customer_id, username, fullname, phone_number, email, id_number, gender, address, created_by]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function update(customer_id, username, fullname, phone_number, email, id_number, gender, address, updated_by) {
    try {
        const result = await db.query('update celine.customer set username = $2, fullname = $3, phone_number = $4, email = $5, id_number = $6, gender = $7, address = $8, updated_by = $9, updated = now() where customer_id = $1', [customer_id, username, fullname, phone_number, email, id_number, gender, address, updated_by]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function remove(customer_id) {
    try {
        const result = await db.query('delete from celine.customer where customer_id = $1', [customer_id]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function findAll() {
    try {
        const result = await db.query('select * from celine.customer');
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function findById(customer_id) {
    try {
        const result = await db.query('select * from celine.customer where customer_id = $1', [customer_id]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

module.exports = {
    insert,
    update,
    remove,
    findAll,
    findById
}