const db = require('../../database');

async function insert(employee_id, username, fullname, phone_number, address, is_show, profile_image, created_by) {
    try {
        const result = await db.query('insert into celine.employee(employee_id, username, fullname, phone_number, address, is_show, profile_image, created_by) values($1, $2, $3, $4, $5, $6, $7, $8)', [employee_id, username, fullname, phone_number, address, is_show, profile_image, created_by]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function update(employee_id, username, fullname, phone_number, address, is_show, profile_image, updated_by) {
    try {
        const result = await db.query('update celine.employee set username = $2, fullname = $3, phone_number = $4, address = $5, is_show = $6, profile_image = $7, updated_by = $8, updated = now() where employee_id = $1', [employee_id, username, fullname, phone_number, address, is_show, profile_image, updated_by]);
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

async function hideEmployee(employee_id, updated_by) {
    try {
        const result = await db.query('update celine.employee set is_show = false, updated = now(), updated_by = $2 where employee_id = $1', [employee_id, updated_by]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function findAll(is_show) {
    try {
        let query = 'select * from celine.employee';

        if (is_show) {
            query += ' where is_show = true';
        }

        const result = await db.query(query);
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

async function findByUsername(username) {
    try {
        const result = await db.query('select * from celine.employee where username = $1', [username]);
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
    hideEmployee,
    findAll,
    findById,
    findByUsername
}