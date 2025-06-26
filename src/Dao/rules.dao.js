const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

exports.createRule = async (rule) => {
    let query = supabase
    .from('rules')
    .insert(rule)
    .select()
    .single();

    return await query;
};

exports.updateRule = async (id, updates) => {
    let query = supabase
    .from('rules')
    .update(updates)
    .eq('id', id)
    .select().single();

    return await query;
};

exports.deleteRule = async (id) => {
    let query = supabase
    .from('rules')
    .delete()
    .eq('id', id);

    return await query;
};

exports.getAllRules = async (tenantId) => {
    let query = supabase
        .from('rules')
        .select('*')
        .eq('is_active', true)
        .order('priority', { ascending: true });

    if (tenantId) {
        query = query.eq('tenant_id', tenantId);
    }

    return await query;
};

