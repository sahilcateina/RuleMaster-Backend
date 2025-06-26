const { Engine } = require('json-rules-engine');
const rulesDAO = require('../Dao/rules.dao');
const { v4: uuidv4 } = require('uuid');
const NLPService = require('../services/nlp.service');



exports.parseAndSave = async (prompt, tenant_id) => {
    const parsed = await NLPService.parseToRule(prompt);

    const rule = {
        id: uuidv4(),
        tenant_id,
        name: parsed.name,
        description: parsed.description,
        conditions: parsed.conditions,
        actions: parsed.event,
        priority: parsed.priority || 0,
        is_active: true
    };

    const { data, error } = await rulesDAO.createRule(rule);
    if (error) throw error;

    return { rule: data };
};

exports.createRule = async (rule) => {
    return await rulesDAO.createRule(rule);
};

exports.updateRule = async (id, updates) => {
    return await rulesDAO.updateRule(id, updates);
};

exports.deleteRule = async (id) => {
    return await rulesDAO.deleteRule(id);
};

exports.getAllRules = async (tenantId) => {
    return await rulesDAO.getAllRules(tenantId);
};

exports.applyRules = async (tenantId, inputData) => {
    const { data: rules, error } = await rulesDAO.getAllRules(tenantId);
    if (error) throw new Error('Failed to fetch rules');

    const engine = new Engine();

    for (const rule of rules) {
        engine.addRule({
            conditions: rule.conditions,
            event: rule.actions,
            name: rule.name,
            priority: rule.priority
        });
    }

    const results = await engine.run(inputData);
    return results.events;
};
