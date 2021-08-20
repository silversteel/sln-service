const reportModel = require('./model');

async function readAll(req, res) {
    try {
        const { type } = req.query;
        const response = await reportModel.findAll(type);
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
    readAll
}