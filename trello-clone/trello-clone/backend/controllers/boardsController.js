const supabase = require("../supabaseClient");
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// questa è la nostra richiesta get

  exports.getBoards = async (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Token mancante' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const userId = decoded.sub || decoded.user_id || decoded.id;

    if (!userId) return res.status(401).json({ error: 'User ID non trovato nel token' });

    const { data, error } = await supabase
      .from("boards")
      .select("*")
      .eq("profile_id", userId)
      .order("created_at", { ascending: false });

    if (error) return res.status(400).json({ error: error.message });

    res.status(200).json(data);

  } catch (error) {
    return res.status(401).json({ error: 'Token non valido' });
  }
};

// questa è la nostra richiesta post

exports.createBoards = async (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Token mancante' });

  const token = authHeader.split(' ')[1];

  // Verifica token con jwt (o come preferisci)
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const userId = decoded.sub || decoded.user_id || decoded.id;

    if (!userId) return res.status(401).json({ error: 'User ID non trovato nel token' });

    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name mancante' });

    const newId = uuidv4();  // genera un UUID per la nuova board

    const { data, error } = await supabase
      .from('boards')
      .insert({ id: newId, profile_id: userId, name })
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });

    res.status(200).json(data);

  } catch (err) {
    return res.status(401).json({ error: 'Token non valido' });
  }
};


// Richiesta put

exports.updateBoards = async (req, res) => {};

// richiesta di delete

exports.deleteBoards = async (req, res) => {};
