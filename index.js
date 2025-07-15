const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const { exec } = require("child_process"); // ✅ Add this to run Python

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/save-data", (req, res) => {
  const data = req.body;
  const filePath = path.join(__dirname, "data", "data.json");

  // Ensure the data directory exists
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  // Write the JSON data to file
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error("❌ Error writing data.json:", err);
      return res.status(500).send("Failed to save data.");
    }

    console.log("✅ JSON file saved.");

    // ✅ Step 2: Run the Python script
    const pythonScript = path.join(__dirname, "generate_graph.py");

    exec(`python "${pythonScript}"`, (error, stdout, stderr) => {
      if (error) {
        console.error("❌ Python error:", error.message);
        return res.status(500).send("Python graph generation failed.");
      }
      if (stderr) {
        console.error("⚠️ Python stderr:", stderr);
      }

      console.log("📈 Python stdout:", stdout);
      res.send("Data saved and graph generated.");
    });
  });
});

app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
