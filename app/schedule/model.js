const db = require('../../database');

async function insert(employee_id, schedule, status) {
    try {
        const result = await db.query("insert into celine.schedule(employee_id, schedule, status) values($1, $2::timestamp at time zone 'Asia/Jakarta', $3) returning *", [employee_id, schedule, status]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function update(schedule_id, employee_id, schedule, status) {
    try {
        const result = await db.query("update celine.schedule set employee_id = $2, schedule = $3::timestamp at time zone 'Asia/Jakarta', status = $4 where schedule_id = $1", [schedule_id, employee_id, schedule, status]);
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
        const result = await db.query('select e.employee_id, e.fullname, e.phone_number, s.* from celine.schedule s join celine.employee e on e.employee_id = s.employee_id');
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function findAllEmployeeAvailableSchedule(schedule) {
    try {
        const result = await db.query("select e.* from celine.schedule s right join celine.employee e on e.employee_id = s.employee_id where (s.status = 'complete' OR ($1::timestamp < s.schedule OR s.schedule + '3 hour'::interval >= $1::timestamp)) OR (s.status is null)", [schedule]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function findById(schedule_id) {
    try {
        const result = await db.query('select e.employee_id, e.fullname, e.phone_number, s.* from celine.schedule s join celine.employee e on e.employee_id = s.employee_id where s.schedule_id = $1', [schedule_id]);
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

async function findByEmployeeIdWithScheduleId(employee_id, schedule, schedule_id) {
    try {
        const result = await db.query("select * from celine.schedule where employee_id = $1 and schedule_id != $4 and (CASE WHEN status != 'complete' THEN (schedule >= $2::timestamp and schedule < $2::timestamp + '3 hour'::interval) or status = $3 ELSE false END)", [employee_id, schedule, 'on-progress', schedule_id]);
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
    findByEmployeeId,
    findByEmployeeIdWithScheduleId,
    findAllEmployeeAvailableSchedule
}