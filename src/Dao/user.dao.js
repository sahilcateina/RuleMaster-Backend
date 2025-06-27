const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

exports.createUser = async (user) =>
    await supabase.from('users').insert(user).select().single();

exports.getUsers = async () =>
    await supabase
    .from('users')
    .select(`
        id, first_name, last_name, email, created_at,
        group:group_id (id, name)
    `)
    .order('created_at', { ascending: false });


exports.updateUser = async (id, updates) =>
    await supabase.from('users').update(updates).eq('id', id).select().single();

exports.deleteUser = async (id) =>
    await supabase.from('users').delete().eq('id', id);
