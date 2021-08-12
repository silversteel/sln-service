const orderModel = require('./model');
const scheduleModel = requre('../schedule/model');
const orderDetailModel = requre('../detail_order/model');

async function checkEmployeeSchedule(employee_id, schedule) {
    try {
        const result = await scheduleModel.findByEmployeeId(employee_id, schedule);
        if (result.rowCount > 0) {
            return true;
        } else {
            return false;
        }
    } catch(error) {
        throw error;
    }
}

async function create(req, res) {
    try {
        const { 
            order_id, 
            customer_id, 
            employee_id, 
            booking_date, 
            booking_time, 
            is_down_payment, 
            customer_account_name, 
            customer_account_number, 
            customer_payment_nominal, 
            transfer_evidence, 
            detail_order,
            created_by 
        } = req.body;

        const checkOrder = await orderModel.findById(order_id);
        if (checkOrder.rowCount > 0) {
            res.status(400);
            res.json({
                message: 'Order id already exists!',
            });
        } else {
            const isEmployeeHaveSchedule = await checkEmployeeSchedule(employee_id, booking_date + ' ' + booking_time);
            if (!isEmployeeHaveSchedule) {
                //Add schedule
                const addSchedule = await scheduleModel.insert(employee_id, booking_date + ' ' + booking_time, 'booked');
                //Add detail order 
                detail_order.forEach(item => {
                    await orderDetailModel.insert(order_id, item.service_id, item.service_name, item.price);
                });
                //Add order
                const result = await orderModel.insert(order_id, employee_id, customer_id, addSchedule.rows[0].schedule_id, booking_date + ' ' + booking_time, is_down_payment, customer_account_name, customer_account_number, customer_payment_nominal, transfer_evidence, 'unconfirmed', created_by);
                if (result.rowCount > 0) {
                    res.status(200);
                    res.json({
                        message: "Order successfully created!"
                    });
                }
            } else {
                if (result.rowCount > 0) {
                    res.status(400);
                    res.json({
                        message: "Can't create order, because the employee have another schedule!"
                    });
                }
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
        const {             
            order_id, 
            customer_id, 
            employee_id, 
            schedule_id,
            booking_date, 
            booking_time, 
            is_down_payment, 
            customer_account_name, 
            customer_account_number, 
            customer_payment_nominal, 
            transfer_evidence, 
            detail_order,
            status,
            updated_by 
        } = req.body;
        const checkOrder = await orderModel.findById(order_id);
        if (checkOrder.rowCount > 0) {
            const isEmployeeHaveSchedule = await checkEmployeeSchedule(employee_id, booking_date + ' ' + booking_time);
            if (!isEmployeeHaveSchedule) {
                //Remove schedule
                const removeSchedule = await scheduleModel.remove(schedule_id);
                //Add schedule
                const addSchedule = await scheduleModel.insert(employee_id, booking_date + ' ' + booking_time, 'booked');
                //Remove detail order
                const removeOrderDetailModel = await orderDetailModel.removeByOrderId(order_id);
                //Add detail order 
                detail_order.forEach(item => {
                    await orderDetailModel.insert(order_id, item.service_id, item.service_name, item.price);
                });
                //Update order
                const result = await orderModel.update(order_id, employee_id, customer_id, addSchedule.rows[0].schedule_id, booking_date + ' ' + booking_time, is_down_payment, customer_account_name, customer_account_number, customer_payment_nominal, transfer_evidence, status, updated_by);
                if (result.rowCount > 0) {
                    res.status(200);
                    res.json({
                        message: "Order successfully created!"
                    });
                }
            } else {
                if (result.rowCount > 0) {
                    res.status(400);
                    res.json({
                        message: "Can't create order, because the employee have another schedule!"
                    });
                }
            }
        } else {
            res.status(404);
            res.json({
                message: "Order not found!"
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
        const { order_id } = req.body;
        const checkOrder = await orderModel.findById(order_id);
        if (checkOrder.rowCount > 0) {
            const result = await orderModel.remove(order_id);
            if (result.rowCount > 0) {
                res.status(200);
                res.json({
                    message: "Order successfully deleted!"
                });
            }
        } else {
            res.status(404);
            res.json({
                message: "Order not found!"
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
        const response = await orderModel.findById(id);
        if (response.rowCount > 0) {
            res.status(200);
            res.json(response.rows[0]);
        } else {
            res.status(404);
            res.json({
                message: 'Order not found!'
            });
        }
    } catch (error) {
        res.status(500);
        res.json({
            message: error.message
        });
    }
}

async function readAllByCustomerId(req, res) {
    try {
        const response = await orderModel.findAllByCustomerId(req.params.id);
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

async function readAll(req, res) {
    try {
        const response = await orderModel.findAll();
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

async function confirmOrder(req, res) {
    try {
        const { order_id } = req.body;
        const checkOrder = await orderModel.findById(order_id);
        if (checkOrder.rowCount > 0) {
            //Update order
            const result = await orderModel.confirmOrder(order_id);
            if (result.rowCount > 0) {
                res.status(200);
                res.json({
                    message: "Order successfully confirmed!"
                });
            }
        } else {
            res.status(404);
            res.json({
                message: "Order not found!"
            });
        }
    } catch (error) {
        res.status(500);
        res.json({
            message: error.message
        });
    }
}

async function completeOrder(req, res) {
    try {
        const { order_id } = req.body;
        const checkOrder = await orderModel.findById(order_id);
        if (checkOrder.rowCount > 0) {
            //Update order
            const result = await orderModel.completeOrder(order_id);
            if (result.rowCount > 0) {
                res.status(200);
                res.json({
                    message: "Order completed!"
                });
            }
        } else {
            res.status(404);
            res.json({
                message: "Order not found!"
            });
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
    readAllByCustomerId,
    completeOrder,
    confirmOrder
}