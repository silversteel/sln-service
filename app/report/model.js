const db = require('../../database');

async function findAll(type) {
    try {
        let period = "day";
        if (type === "daily") {
            period = "day";
            console.log('disini');
        } else if (type === "weekly") {
            period = "week";
        } else if (type === "monthly") {
            period = "month";
        } else if (type === "yearly") {
            period = "year";
        }
        console.log(period);
        let query = "with detail_order as ( select od.order_id, string_agg(od.service_name, ', ') as service_names from celine.order_detail od group by od.order_id ) select c.fullname as customer_name, c.phone_number as customer_phone_number, od.service_names, e.fullname as employee_name, o.* from celine.order o join celine.customer c on c.customer_id = o.customer_id join celine.employee e on e.employee_id = o.employee_id join detail_order od on od.order_id = o.order_id where o.created between date_trunc('"+period+"', now()) and now()";
        console.log(query);
        const result = await db.query(query);
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
}

module.exports = {
    findAll
}