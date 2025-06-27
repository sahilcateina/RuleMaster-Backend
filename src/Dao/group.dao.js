const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

exports.getGroups = async () =>
    await supabase.from('groups').select('*').order('name', { ascending: true });
