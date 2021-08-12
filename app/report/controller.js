const customerModel = require('./model');

async function create(req, res) {
    try {
        const { customer_id, username, fullname, phone_number, email, id_number, gender, address, created_by } = req.body;
        const checkCustomer = await customerModel.findById(customer_id);
        if (checkCustomer.rowCount > 0) {
            res.status(400);
            res.json({
                message: 'Customer id already exists!',
            });
        } else {
            const result = await customerModel.insert( customer_id, username, fullname, phone_number, email, id_number, gender, address, created_by );
            if (result.rowCount > 0) {
                res.status(200);
                res.json({
                    message: "Customer successfully created!"
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
        const { customer_id, username, fullname, phone_number, email, id_number, gender, address, updated_by } = req.body;
        const checkCustomer = await customerModel.findById(customer_id);
        if (checkCustomer.rowCount > 0) {
            const result = await customerModel.update(customer_id, username, fullname, phone_number, email, id_number, gender, address, updated_by);
            if (result.rowCount > 0) {
                res.status(200);
                res.json({
                    message: "Customer successfully updated!"
                });
            }
        } else {
            res.status(404);
            res.json({
                message: "Customer not found!"
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
        const { customer_id } = req.body;
        const checkCustomer = await customerModel.findById(customer_id);
        if (checkCustomer.rowCount > 0) {
            const result = await customerModel.remove(customer_id);
            if (result.rowCount > 0) {
                res.status(200);
                res.json({
                    message: "Customer successfully deleted!"
                });
            }
        } else {
            res.status(404);
            res.json({
                message: "Customer not found!"
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
        const response = await customerModel.findById(id);
        if (response.rowCount > 0) {
            res.status(200);
            res.json(response.rows[0]);
        } else {
            res.status(404);
            res.json({
                message: 'Customer not found!'
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
        const response = await customerModel.findAll();
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
    readAll
}