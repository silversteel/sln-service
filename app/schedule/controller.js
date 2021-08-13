const scheduleModel = require('./model');

async function create(req, res) {
    try {
        let { employee_id, schedule, status } = req.body;
        const checkEmployeeSchedule = await scheduleModel.findByEmployeeId(employee_id, schedule);
        if (checkEmployeeSchedule.rowCount < 1) {
            const result = await scheduleModel.insert( employee_id, schedule, status );
            if (result.rowCount > 0) {
                res.status(200);
                res.json({
                    message: "Schedule successfully created!"
                });
            }
        } else {
            res.status(400);
            res.json({
                message: "Can't update schedule, because the employee have another schedule!"
            });
        }
    } catch (error) {
        res.status(500);
        res.json({
            message: error.message
        });
    }
}

async function update(req, res) {
    try {
        const { schedule_id, employee_id, schedule, status } = req.body;
        const checkSchedule = await scheduleModel.findById(schedule_id);
        if (checkSchedule.rowCount > 0) {
            const checkEmployeeSchedule = await scheduleModel.findByEmployeeId(employee_id, schedule);
            if (checkEmployeeSchedule.rowCount < 1) {
                const result = await scheduleModel.update(schedule_id, employee_id, schedule, status);
                if (result.rowCount > 0) {
                    res.status(200);
                    res.json({
                        message: "Schedule successfully updated!"
                    });
                }
            } else {
                res.status(400);
                res.json({
                    message: "Can't update schedule, because the employee have another schedule!"
                });
            }
        } else {
            res.status(404);
            res.json({
                message: "Schedule not found!"
            });
        }
    } catch (error) {
        res.status(500);
        res.json({
            message: error.message
        });
    }
}

async function remove(req, res) {
    try {
        const { schedule_id } = req.body;
        const checkSchedule = await scheduleModel.findById(schedule_id);
        if (checkSchedule.rowCount > 0) {
            const result = await scheduleModel.remove(schedule_id);
            if (result.rowCount > 0) {
                res.status(200);
                res.json({
                    message: "Schedule successfully deleted!"
                });
            }
        } else {
            res.status(404);
            res.json({
                message: "Schedule not found!"
            });
        }
    } catch (error) {
        res.status(500);
        res.json({
            message: error.message
        });
    }
}

async function read(req, res) {
    try {
        const { id } = req.params;
        const response = await scheduleModel.findById(id);
        if (response.rowCount > 0) {
            res.status(200);
            res.json(response.rows[0]);
        } else {
            res.status(404);
            res.json({
                message: 'Schedule not found!'
            });
        }
    } catch (error) {
        res.status(500);
        res.json({
            message: error.message
        });
    }
}

async function readAll(req, res) {
    try {
        const response = await scheduleModel.findAll();
        if (response.rowCount > 0) {
            res.status(200);
            res.json(response.rows);
        } else {
            res.status(200);
            res.json([]);
        }
    } catch (error) {
        res.status(500);
        res.json({
            message: error.message
        });
    }
}

async function readAllAvailableEmployee(req, res) {
    try {
        const { booking_date, booking_time } = req.body;
        const response = await scheduleModel.findAllEmployeeAvailableSchedule(booking_date + ' ' + booking_time);
        if (response.rowCount > 0) {
            res.status(200);
            res.json(response.rows);
        } else {
            res.status(200);
            res.json([]);
        }
    } catch (error) {
        res.status(500);
        res.json({
            message: error.message
        });
    }
}

module.exports = {
    create,
    update,
    remove,
    read,
    readAll,
    readAllAvailableEmployee
}