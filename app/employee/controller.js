const employeeModel = require('./model');
const { nanoid } = require('nanoid');

async function create(req, res) {
    try {
        let { employee_id, username, fullname, phone_number, address, is_show, profile_image, created_by } = req.body;
        if (!employee_id) {
            employee_id = nanoid(10);
        }
        const checkEmployee = await employeeModel.findById(employee_id);
        if (checkEmployee.rowCount > 0) {
            res.status(400);
            res.json({
                message: 'Employee id already exists!',
            });
        } else {
            const result = await employeeModel.insert(employee_id, username, fullname, phone_number, address, is_show, profile_image, created_by);
            if (result.rowCount > 0) {
                res.status(200);
                res.json({
                    message: "Employee successfully created!"
                });
            }
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
        const { employee_id, username, fullname, phone_number, address, is_show, profile_image, updated_by } = req.body;
        const checkEmployee = await employeeModel.findById(employee_id);
        if (checkEmployee.rowCount > 0) {
            const result = await employeeModel.update(employee_id, username, fullname, phone_number, address, is_show, profile_image, updated_by);
            if (result.rowCount > 0) {
                res.status(200);
                res.json({
                    message: "Employee successfully updated!"
                });
            }
        } else {
            res.status(404);
            res.json({
                message: "Employee not found!"
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
        const { employee_id } = req.body;
        const checkEmployee = await employeeModel.findById(employee_id);
        if (checkEmployee.rowCount > 0) {
            const result = await employeeModel.remove(employee_id);
            if (result.rowCount > 0) {
                res.status(200);
                res.json({
                    message: "Employee successfully deleted!"
                });
            }
        } else {
            res.status(404);
            res.json({
                message: "Employee not found!"
            });
        }
    } catch (error) {
        res.status(500);
        res.json({
            message: error.message
        });
    }
}

async function hideEmployee(req, res) {
    try {
        const { employee_id, updated_by } = req.body;
        const checkEmployee = await employeeModel.findById(employee_id);
        if (checkEmployee.rowCount > 0) {
            const result = await employeeModel.hideEmployee(employee_id);
            if (result.rowCount > 0) {
                res.status(200);
                res.json({
                    message: "Employee successfully hide!"
                });
            }
        } else {
            res.status(404);
            res.json({
                message: "Employee not found!"
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
        const response = await employeeModel.findById(id);
        if (response.rowCount > 0) {
            res.status(200);
            res.json(response.rows[0]);
        } else {
            res.status(404);
            res.json({
                message: 'Employee not found!'
            });
        }
    } catch (error) {
        res.status(500);
        res.json({
            message: error.message
        });
    }
}

async function readByUsername(req, res) {
    try {
        const { id } = req.params;
        const response = await employeeModel.findByUsername(id);
        if (response.rowCount > 0) {
            res.status(200);
            res.json(response.rows[0]);
        } else {
            res.status(404);
            res.json({
                message: 'Employee not found!'
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
        const { show_status } = req.query;
        let is_show = null;
        if (show_status === 'show_only') {
            is_show = true;
        }

        const response = await employeeModel.findAll(is_show);
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
    hideEmployee,
    read,
    readByUsername,
    readAll
}