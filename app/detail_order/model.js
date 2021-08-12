const db = require('../../database');

async function insert(order_id, service_id, service_name, price) {
    try {
        const result = await db.query('insert into celine.order_detail(order_id, service_id, service_name, price) values($1, $2, $3, $4)', [order_id, service_id, service_name, price]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function remove(order_id, service_id) {
    try {
        const result = await db.query('delete from celine.order_detail where order_id = $1 and service_id $= 2', [order_id, service_id]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function removeByOrderId(order_id) {
    try {
        const result = await db.query('delete from celine.order_detail where order_id = $1', [order_id]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function findById(order_id, service_id) {
    try {
        const result = await db.query('select * from celine.order_detail where order_id = $1 and service_id $= 2', [order_id, service_id]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function findAllByOrderId(order_id) {
    try {
        const result = await db.query('select * from celine.order_detail where order_id = $1', [order_id]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

module.exports = {
    insert,
    remove,
    findById,
    findAllByOrderId,
    removeByOrderId
}