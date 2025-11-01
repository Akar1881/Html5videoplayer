import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";
const PORT = "8682";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Home page (just instructions)
app.get("/", (req, res) => {
  res.render("index");
});

// Movie player
app.get("/movie/:id", async (req, res) => {
  const { id } = req.params;
  const apiUrl = `http://dono-03.danbot.host:8680/movie/${id}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    res.render("player", {
      type: "movie",
      id,
      files: data.files || [],
      subtitles: data.subtitles || []
    });
  } catch (err) {
    res.status(500).send("Error loading movie data.");
  }
});

// TV player
app.get("/tv/:id", async (req, res) => {
  const { id } = req.params;
  const apiUrl = `http://dono-03.danbot.host:8680/tv/${id}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    res.render("player", {
      type: "tv",
      id,
      files: data.files || [],
      subtitles: data.subtitles || []
    });
  } catch (err) {
    res.status(500).send("Error loading TV data.");
  }
});

app.listen(PORT, () => console.log("🎬 Server running at http://localhost:3000"));