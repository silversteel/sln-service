const serviceModel = require('./model');

async function create(req, res) {
    try {
        const { service_id, service_name, thumbnail, description, price, created_by } = req.body;
        const checkService = await serviceModel.findById(service_id);
        if (checkService.rowCount > 0) {
            res.status(400);
            res.json({
                message: 'Service name already exists!',
            });
        } else {
            const result = await serviceModel.insert(service_id, service_name, thumbnail, description, price, created_by);
            if (result.rowCount > 0) {
                res.status(200);
                res.json({
                    message: "Service successfully created!"
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
        const { service_id, service_name, thumbnail, description, price, updated_by } = req.body;
        const checkService = await serviceModel.findById(service_id);
        if (checkService.rowCount > 0) {
            const result = await serviceModel.update(service_id, service_name, thumbnail, description, price, updated_by);
            if (result.rowCount > 0) {
                res.status(200);
                res.json({
                    message: "Service successfully updated!"
                });
            }
        } else {
            res.status(404);
            res.json({
                message: "Service not found!"
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
        const { service_id } = req.body;
        const checkService = await serviceModel.findById(service_id);
        if (checkService.rowCount > 0) {
            const result = await serviceModel.remove(service_id);
            if (result.rowCount > 0) {
                res.status(200);
                res.json({
                    message: "Service successfully deleted!"
                });
            }
        } else {
            res.status(404);
            res.json({
                message: "Service not found!"
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
        const response = await serviceModel.findById(id);
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
        const response = await serviceModel.findAll();
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
  