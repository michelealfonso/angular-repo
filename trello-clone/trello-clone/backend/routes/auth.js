const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");
const jwt = require('jsonwebtoken');

// GET api/auth/profiles
router.get("/profiles", async (req, res) => {
  const { data, error } = await supabase.from("profiles").select("*");

  if (error) {
    console.error("Errore nel recupero dei profili:", error.message);
    return res.status(500).json({ error: "Errore nel recupero dei profili" });
  }

  console.log("Profili trovati:", data);
  res.status(200).json(data);
});

// POST /api/auth/register

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const userId = data.user.id;

    const { error: profileError } = await supabase
      .from("profiles")
      .insert([{ id: userId, username, email }]);

    if (profileError) {
      return res.status(400).json({ error: profileError.message });
    }

    res.status(200).json({ token: data.session?.access_token });
  } catch (err) {
    console.error("Errore generale:", err);
    res.status(500).json({ error: "Errore interno al server" });
  }
});

// POST /api/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const userId = data.user.id;

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", userId)
      .single();

    if (profileError) {
      return res.status(400).json({ error: profileError.message });
    }

      const token = jwt.sign(
      { sub: userId, email },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: '1h' }
    )

    res.status(200).json({
      token,
      username: profileData.username
    });
  } catch (err) {
    console.error("Errore interno login:", err);
    res.status(500).json({ error: "Errore interno al server" });
  }
});

module.exports = router;
