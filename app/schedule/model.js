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
        const result = await db.query("with non_available as ( select employee_id, schedule, status from celine.schedule s where ( case when s.status IN ('complete', 'canceled') then false else ( $1 :: timestamp at time zone 'Asia/Jakarta' >= s.schedule and $1 :: timestamp at time zone 'Asia/Jakarta' < s.schedule + '3 hour' :: interval ) end ) ) select distinct on (employee_id) e.* from celine.schedule s right join celine.employee e on e.employee_id = s.employee_id where e.employee_id not in ( select employee_id from non_available ) or s.schedule_id is null", [schedule]);
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
        const result = await db.query("select * from celine.schedule s where s.employee_id = $1 and ( case when s.status IN ('complete', 'canceled') then false else ( $2 :: timestamp at time zone 'Asia/Jakarta' >= s.schedule and $2 :: timestamp at time zone 'Asia/Jakarta' < s.schedule + '3 hour' :: interval ) end )", [employee_id, schedule]);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

async function findByEmployeeIdWithScheduleId(employee_id, schedule, schedule_id) {
    try {
        const result = await db.query("select * from celine.schedule s where s.employee_id = $1 and s.schedule_id != $3 and ( case when s.status IN ('complete', 'canceled') then false else ( $2 :: timestamp at time zone 'Asia/Jakarta' >= s.schedule and $2 :: timestamp at time zone 'Asia/Jakarta' < s.schedule + '3 hour' :: interval ) end )", [employee_id, schedule, schedule_id]);
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