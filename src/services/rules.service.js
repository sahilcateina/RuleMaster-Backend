import {
    supabase
} from '../config/supabaseClient';

export const createRule = async (ruleData) => {
    const {
        name,
        description,
        priority,
        is_active,
        userId,
        conditions,
        actions
    } = ruleData;

    const {
        data: rule,
        error: ruleError
    } = await supabase
        .from('rules')
        .insert([{
            name,
            description,
            priority,
            is_active,
            user_id: userId
        }])
        .select()
        .single();

    if (ruleError) {
        throw ruleError;
    }

    const ruleId = rule.id;

    if (conditions && conditions.length > 0) {
        const conditionsWithRuleId = conditions.map(condition => ({
            ...condition,
            rule_id: ruleId
        }));
        const {
            error: conditionsError
        } = await supabase
            .from('rule_conditions')
            .insert(conditionsWithRuleId);

        if (conditionsError) {
            // You might want to consider rolling back the rule insertion here
            throw conditionsError;
        }
    }

    if (actions && actions.length > 0) {
        const actionsWithRuleId = actions.map(action => ({
            ...action,
            rule_id: ruleId
        }));
        const {
            error: actionsError
        } = await supabase
            .from('rule_actions')
            .insert(actionsWithRuleId);

        if (actionsError) {
            // You might want to consider rolling back the rule and conditions insertion here
            throw actionsError;
        }
    }

    // To return the full rule object with nested conditions and actions,
    // we'll fetch it after insertion. In a real transaction, you'd handle this differently.
    // For simplicity here, we'll just return the created rule for now.
    // A more robust solution would involve a database transaction and fetching the complete object within it.
    const {
        data: createdRule,
        error: fetchError
    } = await supabase
        .from('rules')
        .select('*, rule_conditions(*), rule_actions(*)')
        .eq('id', ruleId)
        .single();

    if (fetchError) {
        throw fetchError;
    }


    return createdRule;
};

export const getAllRules = async (userId) => {
    const {
        data: rules,
        error
    } = await supabase
        .from('rules')
        .select('*, rule_conditions(*), rule_actions(*)')
        .eq('user_id', userId);

    if (error) {
        throw error;
    }

    return rules;
};

export const updateRule = async (ruleId, updateData) => {
    const {
        conditions,
        actions,
        ...ruleUpdates
    } = updateData;

    // Start a "simulated" transaction. Supabase client doesn't have explicit transaction
    // methods in the standard client library for complex operations like this across tables.
    // A real-world scenario might require using Supabase Functions or a different library
    // that supports transactions across multiple statements.
    // Here, we'll perform operations sequentially and throw errors if any step fails.

    // 1. Update rule details
    const {
        error: ruleError
    } = await supabase
        .from('rules')
        .update(ruleUpdates)
        .eq('id', ruleId);

    if (ruleError) {
        throw ruleError;
    }

    // 2. Update conditions (delete existing, insert new)
    if (conditions !== undefined) {
        const {
            error: deleteConditionsError
        } = await supabase
            .from('rule_conditions')
            .delete()
            .eq('rule_id', ruleId);

        if (deleteConditionsError) {
            throw deleteConditionsError;
        }

        if (conditions.length > 0) {
            const conditionsWithRuleId = conditions.map(condition => ({
                ...condition,
                rule_id: ruleId
            }));
            const {
                error: insertConditionsError
            } = await supabase
                .from('rule_conditions')
                .insert(conditionsWithRuleId);

            if (insertConditionsError) {
                throw insertConditionsError;
            }
        }
    }

    // 3. Update actions (delete existing, insert new)
    if (actions !== undefined) {
        const {
            error: deleteActionsError
        } = await supabase
            .from('rule_actions')
            .delete()
            .eq('rule_id', ruleId);

        if (deleteActionsError) {
            throw deleteActionsError;
        }

        if (actions.length > 0) {
            const actionsWithRuleId = actions.map(action => ({
                ...action,
                rule_id: ruleId
            }));
            const {
                error: insertActionsError
            } = await supabase
                .from('rule_actions')
                .insert(actionsWithRuleId);

            if (insertActionsError) {
                throw insertActionsError;
            }
        }
    }

    // Fetch and return the updated rule with nested conditions and actions
    const {
        data: updatedRule,
        error: fetchError
    } = await supabase
        .from('rules')
        .select('*, rule_conditions(*), rule_actions(*)')
        .eq('id', ruleId)
        .single();

    if (fetchError) {
        throw fetchError;
    }

    return updatedRule;
};


export const updateRuleStatus = async (ruleId, isActive) => {
    const {
        data,
        error
    } = await supabase
        .from('rules')
        .update({
            is_active: isActive
        })
        .eq('id', ruleId);

    if (error) {
        throw error;
    }

    return data;
};

export const deleteRule = async (ruleId) => {
    const {
        data,
        error
    } = await supabase
        .from('rules')
        .delete()
        .eq('id', ruleId);

    if (error) {
        throw error;
    }

    return data;
};
