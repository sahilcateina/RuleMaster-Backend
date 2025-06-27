const service = require('../services/user.service');

exports.createUser = async (req, res) => {
    try {
        const { data, error } = await service.createUser(req.body);
        if (error) throw error;
        res.json({ status: 200, data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const { data, error } = await service.getUsers();
        if (error) throw error;
        res.json({ status: 200, data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { data, error } = await service.updateUser(req.params.id, req.body);
        if (error) throw error;
        res.json({ status: 200, data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { error } = await service.deleteUser(req.params.id);
        if (error) throw error;
        res.json({ status: 200, message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
