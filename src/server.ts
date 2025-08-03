import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import witnessCalculatorBuilder from "../zk/roi_check/roi_check_js/witness_calculator.js"; // Adjust if named export

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/calculate-witness", async (req, res) => {
  try {
    const input = req.body;

    const wasmPath = path.join(__dirname, "../zk/circuit.wasm");
    const wasmBuffer = await fs.readFile(wasmPath);

    const witnessCalculator = await witnessCalculatorBuilder(wasmBuffer);
    const witnessBuffer = await witnessCalculator.calculateWTNSBin(input, 0);

    res.setHeader("Content-Disposition", "attachment; filename=witness.wtns");
    res.setHeader("Content-Type", "application/octet-stream");
    res.send(witnessBuffer);
  } catch (err) {
    console.error("Error generating witness:", err);
    res.status(500).json({ error: "Failed to generate witness" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
