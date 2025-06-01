require('dotenv').config();


const { createClient } = require('@supabase/supabase-js');
const { config } = require('./config');


if (!config.supabaseUrl || !config.supabaseServiceRoleKey) {
  console.error('❌ Missing Supabase URL or Service Role Key in .env');
  process.exit(1);
}

const supabase = createClient(config.supabaseUrl, config.supabaseServiceRoleKey);
module.exports = supabase;