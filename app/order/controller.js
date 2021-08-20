const orderModel = require('./model');
const scheduleModel = require('../schedule/model');
const orderDetailModel = require('../detail_order/model');
const { nanoid } = require('nanoid');
const random = require('random');

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

async function checkEmployeeScheduleWithScheduleId(employee_id, schedule, schedule_id) {
    try {
        const result = await scheduleModel.findByEmployeeIdWithScheduleId(employee_id, schedule, schedule_id);
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
        let { 
            order_id, 
            customer_id, 
            employee_id, 
            booking_date, 
            booking_time, 
            is_down_payment, 
            celine_bank_name,
            celine_account_name,
            celine_account_number,
            customer_account_name, 
            customer_account_number, 
            customer_payment_nominal, 
            transfer_evidence, 
            detail_order,
            total_payment,
            created_by 
        } = req.body;

        if (!order_id) {
            order_id = nanoid(10);
        }

        let threedigit = random.int((min = 100), (max = 999));

        if (customer_payment_nominal) {
            total_payment = parseInt(customer_payment_nominal);
        } else {
            detail_order.forEach(x => {
                total_payment = parseInt(total_payment) + x.price;
            });
        }

        total_payment = parseInt(total_payment) + threedigit;

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
                    orderDetailModel.insert(order_id, item.service_id, item.service_name, item.price);
                });
                //Add order
                const result = await orderModel.insert(order_id, employee_id, customer_id, addSchedule.rows[0].schedule_id, booking_date + ' ' + booking_time, is_down_payment, customer_account_name, customer_account_number, customer_payment_nominal, transfer_evidence, 'unconfirmed', celine_bank_name, celine_account_name, celine_account_number, total_payment, created_by);
                if (result.rowCount > 0) {
                    res.status(200);
                    res.json({
                        message: "Order successfully created!"
                    });
                }
            } else {
                res.status(400);
                res.json({
                    message: "Can't create order, because the employee have another schedule!"
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
        let {             
            order_id, 
            customer_id, 
            employee_id, 
            schedule_id,
            booking_date, 
            booking_time, 
            is_down_payment, 
            celine_bank_name,
            celine_account_name,
            celine_account_number,
            customer_account_name, 
            customer_account_number, 
            customer_payment_nominal, 
            transfer_evidence, 
            detail_order,
            total_payment,
            status,
            updated_by 
        } = req.body;

        let threedigit = random.int((min = 100), (max = 999));

        if (customer_payment_nominal) {
            total_payment = customer_payment_nominal;
        } else {
            detail_order.forEach(x => {
                total_payment += x.price;
            });
        }

        total_payment += threedigit;

        const checkOrder = await orderModel.findById(order_id);
        if (checkOrder.rowCount > 0) {
            const isEmployeeHaveSchedule = await checkEmployeeScheduleWithScheduleId(employee_id, booking_date + ' ' + booking_time, schedule_id);
            if (!isEmployeeHaveSchedule) {
                //Remove schedule
                const removeSchedule = await scheduleModel.remove(schedule_id);
                //Add schedule
                const addSchedule = await scheduleModel.insert(employee_id, booking_date + ' ' + booking_time, 'booked');
                //Remove detail order
                const removeOrderDetailModel = await orderDetailModel.removeByOrderId(order_id);
                //Add detail order 
                detail_order.forEach(item => {
                    orderDetailModel.insert(order_id, item.service_id, item.service_name, item.price);
                });
                //Update order
                const result = await orderModel.update(order_id, employee_id, customer_id, addSchedule.rows[0].schedule_id, booking_date + ' ' + booking_time, is_down_payment, customer_account_name, customer_account_number, customer_payment_nominal, transfer_evidence, status, celine_bank_name, celine_account_name, celine_account_number, total_payment, updated_by);
                if (result.rowCount > 0) {
                    res.status(200);
                    res.json({
                        message: "Order successfully updated!"
                    });
                }
            } else {
                res.status(400);
                res.json({
                    message: "Can't create order, because the employee have another schedule!"
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

async function cancelOrder(req, res) {
    try {
        const { order_id } = req.body;
        const checkOrder = await orderModel.findById(order_id);
        if (checkOrder.rowCount > 0) {
            //Update order
            const result = await orderModel.cancelOrder(order_id);
            if (result.rowCount > 0) {
                res.status(200);
                res.json({
                    message: "Order canceled!"
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
    confirmOrder,
    cancelOrder
}