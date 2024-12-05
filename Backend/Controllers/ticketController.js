const { supabase } = require('../services/supabaseClient');

exports.getTickets = async (req, res) => {
  try {
    const { data, error } = await supabase.from('tickets').select('*');
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTicket = async (req, res) => {
  try {
    const { title, description, user_id, priority } = req.body;
    const { data, error } = await supabase.from('tickets').insert([{ title, description, user_id, priority }]);
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const { data, error } = await supabase.from('tickets').update({ status }).eq('id', id);
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};