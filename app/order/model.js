const db = require('../../database');

async function insert(order_id, employee_id, customer_id, schedule_id, booking_date, is_down_payment, customer_account_name, customer_account_number, customer_payment_nominal, transfer_evidence, status, created_by) {
    try {
        const result = await db.query('insert into celine.order(order_id, employee_id, customer_id, schedule_id, booking_date, is_down_payment, customer_account_name, customer_account_number, customer_payment_nominal, transfer_evidence, status, created_by) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)', [order_id, employee_id, customer_id, schedule_id, booking_date, is_down_payment, customer_account_name, customer_account_number, customer_payment_nominal, transfer_evidence, status, created_by]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function update(order_id, employee_id, customer_id, schedule_id, booking_date, is_down_payment, customer_account_name, customer_account_number, customer_payment_nominal, transfer_evidence, status, updated_by) {
    try {
        const result = await db.query('update celine.order set employee_id = $2, customer_id = $3, schedule_id = $4, booking_date = $5, is_down_payment = $6, customer_account_name = $7, customer_account_number = $8, customer_payment_nominal = $9, transfer_evidence = $10, status = $11, updated_by = $12 where order_id = $1', [order_id, employee_id, customer_id, schedule_id, booking_date, is_down_payment, customer_account_name, customer_account_number, customer_payment_nominal, transfer_evidence, status, updated_by]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function remove(order_id) {
    try {
        const result = await db.query('delete from celine.order where order_id = $1', [order_id]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function findAll() {
    try {
        const result = await db.query('select * from celine.order');
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function findAllByCustomerId(customer_id) {
    try {
        const result = await db.query('select * from celine.order where customer_id = $1', [customer_id]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function findById(order_id) {
    try {
        const result = await db.query('select * from celine.order where order_id = $1', [order_id]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function confirmOrder(order_id) {
    try {
        const result = await db.query("update celine.order set status = 'confirmed' where order_id = $1", [order_id]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function completeOrder(order_id) {
    try {
        const result = await db.query("with update_order_status as (update celine.order set status = 'completed' where order_id = $1 returning *) update celine.schedule set status = 'complete' where schedule_id = (select schedule_id from update_order_status)", [order_id]);
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
    findAllByCustomerId,
    findById,
    confirmOrder,
    completeOrder
}