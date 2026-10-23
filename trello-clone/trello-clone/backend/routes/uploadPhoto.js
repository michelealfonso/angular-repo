const express = require("express");
const multer = require("multer");
const supabase = require("../supabaseClient");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

async function getUserFromToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startWith("Bearer ")) {
    return res.status(401).json({ error: "Token mancante" });
  }

  const token = authHeader.split(" ")[1];

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data?.user) {
    return res.status(401).json({ error: "Token non valido " });
  }

  req.user = data.user;
  next();
}

/*

// richiesta per tutti gli avatar 

router.get("/upload", async (req, res) => {
  const { data, error } = await supabase.from("profiles").select("avatars");

  if (error) {
    return res.status(500).json({ error: "Errore nel recupero degli avatar" });
  }

  res.status(200).json(data);
});

*/

router.get("/upload", async (req, res) => {

    const userId = req.query.userId;

    if(!userId) {
        return res.status(400).json({ error: 'userId mancante' })
    }

    const { data, error } = await supabase
    .from("profiles")
    .select("avatars")
    .eq("id", userId)
    .single();

    if (error) {
    return res.status(500).json({ error: "Errore nel recupero dei profili" });
    }

    console.log("Profili trovati:", data.avatars);
    res.status(200).json(data.avatars);
});

// API post upload file creiamo la chiamata post che ci permette di caricare l'immagine utente

router.post(
  "/api/upload",
  getUserFromToken,
  upload.single("profile"),
  async (req, res) => {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "File non trovato o mancante " });
    }

    try {
    //   const fileExists = file.originalname.split(" ").pop();
      const fileName = `${uuidv4()}.${fileExt}`;

      // caricamento dal Supabase Storage

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
          upsert: false,
        });

      if (uploadError) {
        return res.status(500).json({ error: "Errore nel caricamento" });
      }

      const { data: publicUrlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      const imageUrl = publicUrlData.publicUrl;

      // Aggiorna il profilo
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: imageUrl })
        .eq("id", req.user.id);

      if (updateError) {
        return res
          .status(500)
          .json({ error: "Errore nel salvataggio del profilo" });
      }

      res.status(200).json({ imageUrl });
    } catch (error) {
      console.log(`errore interno`, error.message);
      return res.status(500).json({ error: "Errore interno al server" });
    }
  }
);

module.exports = router;
