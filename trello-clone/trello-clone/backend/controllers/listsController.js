const supabase = require("../supabaseClient");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

// Richiesta get per le lists

exports.getLists = async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "token mancante" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const userId = decoded.sub || decoded.user_id || decoded.id;

    if (!userId) {
      return res.status(401).json({ error: "User ID non trovato nel token" });
    }

    const boardId = req.params.boardId;

    if (!boardId) {
      return res.status(400).json({ error: "boardId mancante nei parametri" });
    }

    const { data, error } = await supabase
      .from("lists")
      .select("*")
      .eq("board_id", boardId)
      .order("created_at", { ascending: false });

    if (error) return res.status(400).json({ error: error.message });

    res.status(200).json(data);
  } catch (error) {
    return res.status(401).json({ error: "token non valido" });
  }
};

// Richiesta post per le lists

exports.createLists = async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "token mancante" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const userId = decoded.sub || decoded.user_id || decoded.id;

    if (!userId)
      return res.status(401).json({ error: "User ID non trovato nel token" });

    const { board_id, name, position } = req.body;

    if (!board_id || !name || position === undefined) {
      return res
        .status(401)
        .json({ error: "Dati mancanti: board_id, name, position" });
    }

    const newId = uuidv4();

    const { data, error } = await supabase
      .from("lists")
      .insert({ id: newId, board_id, name, position })
      .select()
      .single();

    if (error) return res.status(400).json({ error: message.error });

    res.status(200).json(data);
  } catch (error) {
    return res.status(401).json({ error: "Token non valido" });
  }
};

// Richiesta put per le list

exports.updateLists = async (req, res) => {

};

// Richiesta delete per le list

exports.deleteLists = async (req, res) => {

};
