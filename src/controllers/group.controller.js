const service = require('../services/group.service');

exports.getGroups = async (req, res) => {
    try {
        const { data, error } = await service.getGroups();
        if (error) throw error;
        res.json({ status: 200, data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
