const detailOrderModel = require('./model');

async function create(req, res) {
    try {
        let { order_id, service_id, service_name, price } = req.body;
        const checkDetailOrder = await detailOrderModel.findById(order_id, service_id);
        if (checkDetailOrder.rowCount > 0) {
            res.status(400);
            res.json({
                message: 'Detail order id already exists!',
            });
        } else {
            const result = await detailOrderModel.insert(order_id, service_id, service_name, price);
            if (result.rowCount > 0) {
                res.status(200);
                res.json({
                    message: "Detail Order successfully created!"
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

async function remove(req, res) {
    try {
        const { order_id, service_id } = req.body;
        const checkDetailOrder = await detailOrderModel.findById(order_id, service_id);
        if (checkDetailOrder.rowCount > 0) {
            const result = await detailOrderModel.remove(order_id, service_id,);
            if (result.rowCount > 0) {
                res.status(200);
                res.json({
                    message: "Detail Order successfully deleted!"
                });
            }
        } else {
            res.status(404);
            res.json({
                message: "Detail Order not found!"
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
        const response = await detailOrderModel.findAllByOrderId(req.params.id);
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
    remove,
    readAll
}