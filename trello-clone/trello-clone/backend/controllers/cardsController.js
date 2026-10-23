const supabase = require("../supabaseClient");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

exports.getCards = async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "token mancante" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const userId = decoded.sub || decoded.user_id || decoded.id;

    if (!userId) {
      return res.status(401).json({ error: "User ID non trovato nel token" });
    }

    const listId = req.params.listId;

    console.log(`lista delle cards al momento del get`, listId);

    if (!listId) {
      return res.status(400).json({ error: "listId mancante nei parametri" });
    }

    const { data, error } = await supabase
      .from("cards")
      .select("*")
      .eq("list_id", listId)
      .order("created_at", { ascending: false });

    if (error) return res.status(400).json({ error: error.message });

    res.status(200).json(data);
  } catch (error) {
    return res.status(401).json({ error: "token non valido" });
  }
};

// Richiesta post per le cards

exports.createCards = async (req, res) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return res.status(401).json({ error: "token mancante" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const userId = decoded.sub || decoded.user_id || decoded.id;

    if (!userId)
      return res.status(401).json({ error: "User ID non trovato nel token" });

    const { list_id, title, description, position, due_date, status } =
      req.body;

    const cardStatus = status || "pending";

    if (
      !list_id ||
      !title ||
      !description ||
      position === undefined ||
      due_date === undefined
    ) {
      return res.status(401).json({
        error:
          "Dati mancanti: list_id, title, description, position e due_date",
      });
    }

    const newId = uuidv4();

    const { data, error } = await supabase
      .from("cards")
      .insert({
        id: newId,
        list_id,
        title,
        description,
        position,
        due_date,
        status: cardStatus,
      })
      .select()
      .single();

    if (error) return res.status(401).json({ error: error.message });

    res.status(200).json(data);
  } catch (error) {
    return res.status(401).json({ error: "token non valido" });
  }
};

exports.updateCard = async (req, res) => {
  const cardId = req.params.id;

  console.log(`cardId ricevuto nel momento dell'update`, cardId);

  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Non autorizzato" });
  }

  // Estrarre i campi da aggiornare dal body
  const { title, description, position, due_date, is_done, status } = req.body;

  // Costruisci un oggetto con solo i campi definiti per update
  const updateData = {};
  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (position !== undefined) updateData.position = position;
  if (due_date !== undefined) updateData.due_date = due_date;
  if (is_done !== undefined) updateData.is_done = is_done;
  if (status !== undefined) updateData.status = status;

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ message: "Nessun campo da aggiornare" });
  }

  try {
    const { data, error } = await supabase
      .from("cards")
      .update(updateData)
      .select()
      .eq("id", cardId)
      .single();

    if (error) {
      console.error("Supabase update error:", error);
      return res.status(500).json({ message: "Errore aggiornamento card" });
    }

    if (!data) {
      return res.status(404).json({ message: "Card non trovata" });
    }

    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Errore interno server" });
  }
};

// Richiesta delete per le cards

exports.deleteCards = async (req, res) => {
  const cardId = req.params.id;

  console.log("cardId ricevuto al momneto del delete", cardId);

  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "token mancante" });
  }

  try {
      const { data, error } = await supabase
    .from("cards")
    .delete()
    .eq("id", cardId)

  if (error)
    return res
      .status(500)
      .json({ error: `errore nell'eliminazione della card` });

  if (!data) {
    return res.status(404).json({ message: "Card non trovata" });
  }

  return resstatu(200).json(data, {message: 'card eliminata con successo'});
  }  
  catch(error) {
    return res.status(500).json({ error: 'Errore interno al server '});
  }
};
