const service = require('../services/realm.service');

exports.createRealm = async (req, res) => {
    try {
        const { realm } = req.body;
        const result = await service.createRealm(realm);
        res.status(200).json({
            status: 200,
            statusText: 'Success',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            statusText: 'Error',
            error: error.message,
        });
    }
};
