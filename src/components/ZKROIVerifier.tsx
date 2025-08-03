import { useState } from 'react';
import { ethers } from 'ethers';
import * as snarkjs from 'snarkjs';

// Update these with your deployed contract details
const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const CONTRACT_ABI = [
  {
    "inputs": [
      {"type": "uint[2]", "name": "_pA"},
      {"type": "uint[2][2]", "name": "_pB"}, 
      {"type": "uint[2]", "name": "_pC"},
      {"type": "uint[1]", "name": "_pubSignals"}
    ],
    "name": "verifyProof",
    "outputs": [{"type": "bool"}],
    "type": "function"
  }
];

interface ProofData {
  pi_a: string[];
  pi_b: string[][];
  pi_c: string[];
}

interface FormattedProof {
  a: [string, string];
  b: [[string, string], [string, string]];
  c: [string, string];
  publicSignals: string[];
}

export default function ZKROIVerifier() {
  const [roi, setRoi] = useState<string>('1050');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [proofData, setProofData] = useState<FormattedProof | null>(null);
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);
  const [txHash, setTxHash] = useState<string>('');
  const [error, setError] = useState<string>('');

  const formatProofForSolidity = (proof: ProofData, publicSignals: string[]): FormattedProof => {
    return {
      a: [proof.pi_a[0], proof.pi_a[1]],
      b: [
        [proof.pi_b[0][1], proof.pi_b[0][0]], 
        [proof.pi_b[1][1], proof.pi_b[1][0]]
      ],
      c: [proof.pi_c[0], proof.pi_c[1]],
      publicSignals
    };
  };

  const generateProof = async (): Promise<void> => {
    setIsGenerating(true);
    setError('');
    
    try {
      // Circuit files should be in public directory
      const wasmPath = "/circuit-files/roi_check.wasm";
      const zkeyPath = "/circuit-files/roi_check.zkey";

      // Input matching your input.json format
      const input = {
        roi: roi
      };

      console.log('Generating proof with input:', input);

      const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        input,
        wasmPath,
        zkeyPath
      );

      console.log('Proof generated successfully!');
      console.log('Public signals:', publicSignals);

      const solidityProof = formatProofForSolidity(proof, publicSignals);
      setProofData(solidityProof);
      
    } catch (error) {
      console.error('Proof generation failed:', error);
      setError(`Proof generation failed: ${(error as Error).message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const verifyOnChain = async (): Promise<void> => {
    if (!proofData) {
      setError('No proof data available. Generate proof first.');
      return;
    }

    setIsVerifying(true);
    setError('');
    
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask not found. Please install MetaMask.');
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      console.log('Submitting proof to contract...');
      const tx = await contract.verifyProof(
        proofData.a,
        proofData.b,
        proofData.c,
        proofData.publicSignals
      );

      setTxHash(tx.hash);
      console.log('Transaction submitted:', tx.hash);

      const receipt = await tx.wait();
      const success = receipt.status === 1;
      
      setVerificationResult(success);

    } catch (error) {
      console.error('On-chain verification failed:', error);
      setError(`Verification failed: ${(error as Error).message}`);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        🔐 ZK ROI Verifier
      </h2>

      {/* ROI Input Section */}
      <div className="mb-6 p-4 border border-gray-200 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ROI Value:
        </label>
        <input
          type="number"
          value={roi}
          onChange={(e) => setRoi(e.target.value)}
          placeholder="Enter ROI (e.g., 1050)"
          className="w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isGenerating || isVerifying}
        />
        <div className="mt-2 text-xs text-gray-500">
          Current input.json: <code className="bg-gray-100 px-1 rounded">{JSON.stringify({roi: roi})}</code>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button 
          onClick={generateProof}
          disabled={isGenerating || isVerifying || !roi}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            isGenerating 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
        >
          {isGenerating ? '⏳ Generating Proof...' : '🔧 Generate Proof'}
        </button>

        <button 
          onClick={verifyOnChain}
          disabled={!proofData || isVerifying || isGenerating}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            (!proofData || isVerifying) 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700'
          } text-white`}
        >
          {isVerifying ? '⏳ Verifying...' : '✅ Verify On-Chain'}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-red-800">❌ {error}</div>
        </div>
      )}

      {/* Proof Data Display */}
      {proofData && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">📜 Generated Proof Data</h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <details className="cursor-pointer">
              <summary className="font-medium text-gray-700">
                View Proof Data (Click to expand)
              </summary>
              <pre className="mt-3 text-xs overflow-auto bg-white p-3 rounded border">
                {JSON.stringify(proofData, null, 2)}
              </pre>
            </details>
          </div>
        </div>
      )}

      {/* Transaction Hash */}
      {txHash && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="font-semibold text-blue-800">🚀 Transaction Hash:</div>
          <code className="text-sm break-all text-blue-600">{txHash}</code>
        </div>
      )}

      {/* Verification Result */}
      {verificationResult !== null && (
        <div className={`p-4 rounded-lg border-2 text-center ${
          verificationResult 
            ? 'bg-green-50 border-green-500 text-green-800' 
            : 'bg-red-50 border-red-500 text-red-800'
        }`}>
          <h3 className="text-xl font-bold">
            {verificationResult ? '🎉 VERIFICATION SUCCESS!' : '❌ VERIFICATION FAILED'}
          </h3>
        </div>
      )}
    </div>
  );
}
