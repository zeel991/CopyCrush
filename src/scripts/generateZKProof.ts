// scripts/generateZKProof.ts
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

export async function generateZKProof(traderProfile: any) {
  const input = {
    roi: Math.floor(traderProfile.totalROI * 100), // assuming you defined `signal input roi`
    min: 0,
    max: 10000,
  };

  const inputPath = path.join(__dirname, "input.json");
  const witnessPath = path.join(__dirname, "witness.wtns");
  const proofPath = path.join(__dirname, "proof.json");
  const publicPath = path.join(__dirname, "public.json");

  fs.writeFileSync(inputPath, JSON.stringify(input));

  execSync(
    `node roi_check_js/generate_witness.cjs roi_check_js/roi_check.wasm ${inputPath} ${witnessPath}`
  );

  execSync(
    `snarkjs groth16 prove roi_check_final.zkey ${witnessPath} ${proofPath} ${publicPath}`
  );

  const proof = JSON.parse(fs.readFileSync(proofPath, "utf8"));
  const pub = JSON.parse(fs.readFileSync(publicPath, "utf8"));

  return { proof, publicSignals: pub };
}
