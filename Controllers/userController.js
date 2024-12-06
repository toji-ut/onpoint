const { supabase } = require('../services/supabaseClient');

exports.getAllUsers = async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const { data, error } = await supabase.from('users').insert([{ name, email, role }]);
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};