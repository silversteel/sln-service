const serviceModel = require('./model');
const { nanoid } = require('nanoid');

async function create(req, res) {
    try {
        let { service_id, service_name, thumbnail, description, price, is_show, created_by } = req.body;
        if (!service_id) {
            service_id = nanoid(10);
        }
        const checkService = await serviceModel.findById(service_id);
        if (checkService.rowCount > 0) {
            res.status(400);
            res.json({
                message: 'Service name already exists!',
            });
        } else {
            const result = await serviceModel.insert(service_id, service_name, thumbnail, description, price, is_show, created_by);
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
        const { service_id, service_name, thumbnail, description, price, is_show, updated_by } = req.body;
        const checkService = await serviceModel.findById(service_id);
        if (checkService.rowCount > 0) {
            const result = await serviceModel.update(service_id, service_name, thumbnail, description, price, is_show, updated_by);
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

async function hideService(req, res) {
    try {
        const { service_id, updated_by } = req.body;
        const checkService = await serviceModel.findById(service_id);
        if (checkService.rowCount > 0) {
            const result = await serviceModel.hideService(service_id, updated_by);
            if (result.rowCount > 0) {
                res.status(200);
                res.json({
                    message: "Service successfully hide!"
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
        const { show_status } = req.params;
        let is_show = null;
        if (show_status === 'show_only') {
            is_show = true;
        }
        const response = await serviceModel.findAll(is_show);
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
    hideService
}
  