const db = require('../../database');

async function insert(employee_id, username, fullname, phone_number, address, created_by) {
    try {
        const result = await db.query('insert into celine.employee(employee_id, username, fullname, phone_number, address, created_by) values($1, $2, $3, $4, $5, $6)', [employee_id, username, fullname, phone_number, address, created_by]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function update(employee_id, username, fullname, phone_number, address, updated_by) {
    try {
        const result = await db.query('update celine.employee set username = $2, fullname = $3, phone_number = $4, address = $5, updated_by = $6, updated = now() where employee_id = $1', [employee_id, username, fullname, phone_number, address, updated_by]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function remove(employee_id) {
    try {
        const result = await db.query('delete from celine.employee where employee_id = $1', [employee_id]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function findAll() {
    try {
        const result = await db.query('select * from celine.employee');
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function findById(employee_id) {
    try {
        const result = await db.query('select * from celine.employee where employee_id = $1', [employee_id]);
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