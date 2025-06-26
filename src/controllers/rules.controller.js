const service = require('../services/rules.service');
const { v4: uuidv4 } = require('uuid');


// exports.parseAndCreateRule = async (req, res) => {
//     try {
//         const prompt = req.body.prompt;
//         const tenant_id = req.headers['tenant-id']; // or from body if preferred

//         if (!prompt || !tenant_id) {
//             return res.status(400).json({ error: 'Prompt and tenant_id are required' });
//         }

//         const saved = await service.parseAndSave(prompt, tenant_id);
//         res.status(200).json({ status: 200, data: saved.rule });
//     } catch (err) {
//         console.error('Rule creation failed:', err.message);
//         res.status(500).json({ error: err.message });
//     }
// };

exports.parseAndCreateRule = async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const tenant_id = req.body.tenant_id || req.body['tenant-id'] || req.headers['tenant-id'];

        if (!prompt || !tenant_id) {
            return res.status(400).json({ error: 'Prompt and tenant_id are required' });
        }

        const saved = await service.parseAndSave(prompt, tenant_id);
        res.status(200).json({ status: 200, data: saved.rule });
    } catch (err) {
        console.error('Rule creation failed:', err.message);
        res.status(500).json({ error: err.message });
    }
};



exports.createRule = async (req, res) => {
    try {
        const rule = {
            id: uuidv4(),
            tenant_id: req.body.tenant_id,
            name: req.body.name,
            description: req.body.description,
            conditions: req.body.conditions,
            actions: req.body.actions,
            priority: req.body.priority || 0,
            is_active: true
        };
        const { data, error } = await service.createRule(rule);
        if (error) throw error;
        res.json({ status: 200, data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Update Rule by ID
exports.updateRule = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const { data, error } = await service.updateRule(id, updates);
        if (error) throw error;

        res.json({ status: 200, data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Delete Rule by ID
exports.deleteRule = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = await service.deleteRule(id);
        if (error) throw error;

        res.json({ status: 200, message: 'Rule deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Get All Rules for Tenant
exports.getAllRules = async (req, res) => {
    try {
        const tenant_id = req.query.tenant_id;

        const { data, error } = await service.getAllRules(tenant_id); // Pass undefined if not present
        if (error) throw error;

        res.json({ status: 200, data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


//Apply Rules
exports.applyRules = async (req, res) => {
    try {
        const { tenant_id, input } = req.body;

        if (!tenant_id || !input) {
            return res.status(400).json({ error: "tenant_id and input are required" });
        }

        const events = await service.applyRules(tenant_id, input);
        res.json({ status: 200, events });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
