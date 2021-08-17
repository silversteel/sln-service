const db = require('../../database');

async function insert(customer_id, username, fullname, phone_number, email, id_number, gender, address, created_by) {
    try {
        const result = await db.query('with primary_by_username AS (select customer_id from celine_customer where is_primary = true and username = $2) insert into celine.customer(customer_id, username, fullname, phone_number, email, id_number, gender, address, is_primary, created_by) values($1, $2, $3, $4, $5, $6, $7, $8, (CASE WHEN EXISTS(select * from primary_by_username) THEN false ELSE true END), $9)', [customer_id, username, fullname, phone_number, email, id_number, gender, address, created_by]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function update(customer_id, username, fullname, phone_number, email, id_number, gender, address, is_primary, updated_by) {
    try {
        const result = await db.query('with disable_all_secondary(update celine.customer set is_primary = false where username = $2 and $9 = true) update celine.customer set username = $2, fullname = $3, phone_number = $4, email = $5, id_number = $6, gender = $7, address = $8, is_primary = $9, updated_by = $10, updated = now() where customer_id = $1', [customer_id, username, fullname, phone_number, email, id_number, gender, address, is_primary, updated_by]);
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

async function findByUsername(username) {
    try {
        const result = await db.query('select * from celine.customer where username = $1', [username]);
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
    findById,
    findByUsername
}