const db = require('../../database');

async function insert(service_id, service_name, thumbnail, description, price, is_show, created_by) {
    try {
        const result = await db.query('insert into celine.service(service_id, service_name, thumbnail, description, price, created_by, is_show) values($1, $2, $3, $4, $5, $6, $7)', [service_id, service_name, thumbnail, description, price, created_by, is_show]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function update(service_id, service_name, thumbnail, description, price, is_show, updated_by) {
    try {
        const result = await db.query('update celine.service set service_name = $1, thumbnail = $2, description = $3, price = $4, updated_by = $5, updated = now(), is_show = $7 where service_id = $6', [service_name, thumbnail, description, price, updated_by, service_id, is_show]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function hideService(service_id, updated_by) {
    try {
        const result = await db.query('update celine.service set is_show = false, updated_by = $2, updated = now() where service_id = $1', [service_id, updated_by]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function remove(service_id) {
    try {
        const result = await db.query('delete from celine.service where service_id = $1', [service_id]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function findAll(is_show) {
    try {
        let query = 'select * from celine.service';

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

async function findById(service_id) {
    try {
        const result = await db.query('select * from celine.service where service_id = $1', [service_id]);
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
    hideService
}