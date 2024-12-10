const pool = require('./db');
import supabase from './supabase';

(async () => {
    try {
        const client = await pool.connect();
        const res = await client.query('SELECT NOW()');
        console.log('PostgreSQL Connected:', res.rows);
        client.release();
    } catch (err) {
        console.error('Error connecting to PostgreSQL:', err);
    }

    try {
        const { data, error } = await supabase.from('your_table_name').select('*');
        if (error) {
            console.error('Error fetching data from Supabase:', error);
        } else {
            console.log('Supabase Data:', data);
        }
    } catch (err) {
        console.error('Error with Supabase:', err);
    }
})();
