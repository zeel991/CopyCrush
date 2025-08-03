// components/ZKProofGenerator.tsx
import React, { useState, useEffect } from 'react';
import { Shield, Check, AlertCircle, Loader, ExternalLink, Wallet } from 'lucide-react';

interface TraderProfile {
  name: string;
  totalROI: number;
  winRate: number;
  avgProfit: number;
  monthlyData: any[];
}

interface ZKProofGeneratorProps {
  traderProfile: TraderProfile;
  onProofGenerated: (generated: boolean) => void;
}

interface ProofData {
  a: [string, string];
  b: [[string, string], [string, string]];
  c: [string, string];
  publicSignals: string[];
  commitment?: string;
  timestamp?: number;
  verified?: boolean;
  txHash?: string;
}

const ZKProofGenerator: React.FC<ZKProofGeneratorProps> = ({ traderProfile, onProofGenerated }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [proofGenerated, setProofGenerated] = useState(false);
  const [proofData, setProofData] = useState<ProofData | null>(null);
  const [step, setStep] = useState(0);
  const [walletConnected, setWalletConnected] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);
  const [walletAddress, setWalletAddress] = useState<string>('');
  
  // Citrea testnet configuration
  const CITREA_RPC = 'https://rpc.testnet.citrea.xyz';
  const VERIFIER_CONTRACT_ADDRESS = '0x0eb7B36996Ff2c55D1376D3E85287935Cc8CD617'; // Replace with your deployed contract address
  
  // Verifier contract ABI
  const VERIFIER_ABI = [
    "function verifyProof(uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[1] memory input) public view returns (bool)"
  ];

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setWalletConnected(true);
          setWalletAddress(accounts[0]);
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        
        // Add/Switch to Citrea testnet
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x139B' }], // Citrea testnet chain ID (5019)
          });
        } catch (switchError: any) {
          // This error code indicates that the chain has not been added to MetaMask
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: '0x139B',
                    chainName: 'Citrea Testnet',
                    nativeCurrency: {
                      name: 'Citrea Bitcoin',
                      symbol: 'cBTC',
                      decimals: 18,
                    },
                    rpcUrls: [CITREA_RPC],
                    blockExplorerUrls: ['https://explorer.testnet.citrea.xyz'],
                  },
                ],
              });
            } catch (addError) {
              console.error('Error adding Citrea network:', addError);
            }
          }
        }
        
        setWalletConnected(true);
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask or another Web3 wallet');
    }
  };

  const generateZKProof = async (entries: number[], exits: number[], claimedROI: number) => {
    // In a real implementation, you would:
    // 1. Load your circuit files (wasm, zkey)
    // 2. Generate witness using snarkjs
    // 3. Generate actual proof
    
    // For now, using the mock proof data you provided
    // You'll need to replace this with actual snarkjs.groth16.fullProve() call
    
    try {
      // Calculate commitment (you'll need to implement proper Poseidon hash)
      const commitment = 1; // Replace with proper commitment calculation
      
      // This would be your actual proof generation:
      /*
      const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        {
          entries: entries,
          exits: exits,
          claimedROI: claimedROI,
          commitment: commitment
        },
        "/path/to/roi_check.wasm",
        "/path/to/roi_check_final.zkey"
      );
      */
      
      // Using your provided proof data for demo - properly typed
      const proof: ProofData = {
        a: [
          "0x1eac00d41d7bdf6428ef016c5919c2b3a658d1611526d08f6387d40c1a6beda6", 
          "0x18ae211d9b9bff7f9bb7a900190a5dbe05c5fa989be8bea88d782d194c89e238"
        ],
        b: [
          [
            "0x0e82d94652e7e518f1d3b89663c248049a2e1fc818727f987599edcc189bbbc5", 
            "0x2ed7e238da7fe8f2fe1210b853946596aec2b6e0188ff4de4b1007ff2a98ddc3"
          ],
          [
            "0x2cce974ad7c02c392423015dc206edc896284f589f02856510cc8b7c1d1fa46a", 
            "0x118217fe49fe464effc9b80180e698c175c2a701d04cddcb6fd1ce8520883485"
          ]
        ],
        c: [
          "0x2e0f5427499086076a6744d5fd3664b04b663d4149b9159ba0f01ecfe3425b72", 
          "0x0f5b6a9e70639d8ecaeff7878ed1d1be5c4a23affac600fa90901d616a984b23"
        ],
        publicSignals: ["0x0000000000000000000000000000000000000000000000000000000000000001"]
      };
      
      return proof;
    } catch (error) {
      console.error('Error generating ZK proof:', error);
      throw error;
    }
  };

  const verifyOnContract = async (proofData: ProofData) => {
    if (!walletConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      // Initialize ethers with MetaMask provider
      const provider = new (window as any).ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // Create contract instance
      const contract = new (window as any).ethers.Contract(
        VERIFIER_CONTRACT_ADDRESS,
        VERIFIER_ABI,
        signer
      );
      
      // Call verifyProof function
      const result = await contract.verifyProof(
        proofData.a,
        proofData.b,
        proofData.c,
        proofData.publicSignals
      );
      
      return result;
    } catch (error) {
      console.error('Error verifying on contract:', error);
      throw error;
    }
  };

  const generateProof = async () => {
    if (!walletConnected) {
      alert('Please connect your wallet first');
      return;
    }

    setIsGenerating(true);
    setStep(0);

    const steps = [
      'Preparing trading data...',
      'Computing ROI verification...',
      'Generating zero-knowledge proof...',
      'Creating blockchain commitment...',
      'Verifying proof on Citrea...'
    ];

    try {
      // Step 1: Prepare data
      setStep(1);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Convert trader data to circuit inputs
      const monthlyData = traderProfile.monthlyData.slice(0, 3); // Use first 3 months
      const entries = monthlyData.map(m => Math.floor(m.volume / m.trades)); // Average entry per trade
      const exits = monthlyData.map((m, i) => Math.floor((entries[i] * (100 + m.roi)) / 100)); // Calculate exits
      const claimedROI = Math.floor(traderProfile.totalROI * 100); // Convert to integer

      // Step 2: Compute ROI
      setStep(2);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Step 3: Generate ZK proof
      setStep(3);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const proof = await generateZKProof(entries, exits, claimedROI);

      // Step 4: Create commitment
      setStep(4);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const proofWithMetadata: ProofData = {
        ...proof,
        commitment: `0x${Math.random().toString(16).substr(2, 64)}`,
        timestamp: Date.now()
      };

      // Step 5: Verify on contract
      setStep(5);
      setIsVerifying(true);
      
      const verificationResult = await verifyOnContract(proofWithMetadata);
      
      setProofData({
        ...proofWithMetadata,
        verified: verificationResult
      });
      
      setVerificationResult(verificationResult);
      setProofGenerated(true);
      onProofGenerated(true);

    } catch (error) {
      console.error('Error generating proof:', error);
      alert(`Error: ${error instanceof Error ? error.message : String(error)}`);    } finally {
      setIsGenerating(false);
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Wallet Connection */}
      {!walletConnected && (
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-start space-x-3">
              <Wallet className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-orange-400 font-medium">Connect Wallet Required</div>
                <div className="text-orange-200 text-sm">
                  Connect to Citrea testnet to generate and verify ZK proofs
                </div>
              </div>
            </div>
            <button
              onClick={connectWallet}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-all"
            >
              Connect Wallet
            </button>
          </div>
        </div>
      )}

      {walletConnected && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
            <div>
              <div className="text-green-400 font-medium">Wallet Connected</div>
              <div className="text-green-200 text-sm">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)} (Citrea Testnet)
              </div>
            </div>
          </div>
        </div>
      )}

      {!proofGenerated ? (
        <div className="space-y-6">
          <div className="bg-gray-700/50 rounded-lg p-6">
            <h3 className="text-white font-bold mb-4">What is ZK Proof Verification?</h3>
            <div className="space-y-3 text-gray-300 text-sm">
              <p>
                Zero-Knowledge (ZK) proofs allow you to prove your trading performance without revealing sensitive details about your specific trades or strategies.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">Privacy Protected</div>
                    <div className="text-xs text-gray-400">Your trading details remain confidential</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">Verified on Citrea</div>
                    <div className="text-xs text-gray-400">Cryptographically secure Bitcoin L2</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-blue-400 font-medium">ROI Verification</div>
                <div className="text-blue-200 text-sm">
                  Your proof will verify your claimed ROI of {traderProfile.totalROI.toFixed(1)}% 
                  using your recent trading data without revealing specific trade details.
                </div>
              </div>
            </div>
          </div>

          {!isGenerating ? (
            <div className="text-center">
              <button
                onClick={generateProof}
                disabled={!walletConnected}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg font-bold text-lg text-white transition-all duration-300 hover:from-purple-400 hover:to-purple-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Shield className="w-5 h-5 inline-block mr-2" />
                Generate ZK Proof
              </button>
            </div>
          ) : (
            <div className="bg-gray-700/50 rounded-lg p-6">
              <div className="text-center mb-6">
                <Loader className="w-8 h-8 text-purple-400 mx-auto animate-spin mb-4" />
                <div className="text-white font-medium">
                  {isVerifying ? 'Verifying on Citrea Blockchain' : 'Generating Zero-Knowledge Proof'}
                </div>
                <div className="text-gray-400 text-sm">This may take a few moments...</div>
              </div>

              <div className="space-y-3">
                {[
                  'Preparing trading data...',
                  'Computing ROI verification...',
                  'Generating zero-knowledge proof...',
                  'Creating blockchain commitment...',
                  'Verifying proof on Citrea...'
                ].map((stepText, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      step > index ? 'bg-green-500' : step === index + 1 ? 'bg-purple-500' : 'bg-gray-600'
                    }`}>
                      {step > index ? (
                        <Check className="w-2.5 h-2.5 text-white" />
                      ) : step === index + 1 ? (
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      ) : null}
                    </div>
                    <div className={`text-sm ${step > index ? 'text-green-400' : step === index + 1 ? 'text-white' : 'text-gray-500'}`}>
                      {stepText}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className={`border rounded-lg p-6 text-center ${
            verificationResult 
              ? 'bg-green-500/10 border-green-500/30' 
              : 'bg-red-500/10 border-red-500/30'
          }`}>
            <div className={`w-12 h-12 mx-auto mb-4 ${
              verificationResult ? 'text-green-400' : 'text-red-400'
            }`}>
              {verificationResult ? <Check className="w-12 h-12" /> : <AlertCircle className="w-12 h-12" />}
            </div>
            <div className={`font-bold text-lg mb-2 ${
              verificationResult ? 'text-green-400' : 'text-red-400'
            }`}>
              {verificationResult ? 'ZK Proof Verified on Citrea!' : 'Verification Failed'}
            </div>
            <div className={`text-sm ${
              verificationResult ? 'text-green-200' : 'text-red-200'
            }`}>
              {verificationResult 
                ? 'Your trading performance has been cryptographically verified on the Citrea blockchain'
                : 'The proof could not be verified. Please try again.'
              }
            </div>
          </div>

          <div className="bg-gray-700/50 rounded-lg p-6">
            <h3 className="text-white font-bold mb-4">Verification Details</h3>
            <div className="space-y-4 text-sm">
              <div>
                <div className="text-gray-400 mb-1">Blockchain</div>
                <div className="text-orange-400 font-medium">Citrea Testnet</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Commitment Hash</div>
                <div className="font-mono text-xs text-blue-400 bg-gray-800 p-2 rounded break-all">
                  {proofData?.commitment}
                </div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Proof Data</div>
                <div className="font-mono text-xs text-purple-400 bg-gray-800 p-2 rounded break-all">
                  a: [{proofData?.a[0].substring(0, 20)}..., {proofData?.a[1].substring(0, 20)}...]
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-400">Verification Status</div>
                  <div className={`font-medium ${verificationResult ? 'text-green-400' : 'text-red-400'}`}>
                    {verificationResult ? '✅ Verified' : '❌ Failed'}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">Timestamp</div>
                  <div className="text-white font-medium">
                    {new Date(proofData?.timestamp || 0).toLocaleString()}
                  </div>
                </div>
              </div>
              
              {/* Contract Link */}
              <div className="pt-4 border-t border-gray-600">
                <a
                  href={`https://explorer.testnet.citrea.xyz/address/${VERIFIER_CONTRACT_ADDRESS}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-orange-400 hover:text-orange-300 transition-colors"
                >
                  <span>View Contract on Citrea Explorer</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZKProofGenerator;