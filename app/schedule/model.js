const db = require('../../database');

async function insert(employee_id, schedule, status) {
    try {
        const result = await db.query('insert into celine.schedule(employee_id, schedule, status) values($1, $2, $3)', [employee_id, schedule, status]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function update(schedule_id, employee_id, schedule, status) {
    try {
        const result = await db.query('update celine.schedule set employee_id = $2, schedule = $3, status = $4 where schedule_id = $1', [schedule_id, employee_id, schedule, status]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function remove(schedule_id) {
    try {
        const result = await db.query('delete from celine.schedule where schedule_id = $1', [schedule_id]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function findAll() {
    try {
        const result = await db.query('select * from celine.schedule');
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function findById(schedule_id) {
    try {
        const result = await db.query('select * from celine.schedule where schedule_id = $1', [schedule_id]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function findByEmployeeId(employee_id, schedule) {
    try {
        const result = await db.query("select * from celine.schedule where employee_id = $1 and (CASE WHEN status != 'complete' THEN (schedule >= $2::timestamp and schedule < $2::timestamp + '3 hour'::interval) or status = $3 ELSE false END)", [employee_id, schedule, 'on-progress']);
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
    findByEmployeeId
}