// components/ZKProofGenerator.tsx
import React, { useState } from 'react';
import { Shield, Check, AlertCircle, Loader } from 'lucide-react';

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

const ZKProofGenerator: React.FC<ZKProofGeneratorProps> = ({ traderProfile, onProofGenerated }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [proofGenerated, setProofGenerated] = useState(false);
  const [proofData, setProofData] = useState<any>(null);
  const [step, setStep] = useState(0);

  const generateProof = async () => {
    setIsGenerating(true);
    setStep(0);

    const steps = [
      'Validating trading data...',
      'Computing ROI verification...',
      'Generating zero-knowledge proof...',
      'Creating blockchain commitment...',
      'Finalizing proof verification...'
    ];

    // Simulate ZK proof generation process
    for (let i = 0; i < steps.length; i++) {
      setStep(i + 1);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Generate mock proof data
    const mockProofData = {
      commitment: `0x${Math.random().toString(16).substr(2, 64)}`,
      proof: `0x${Math.random().toString(16).substr(2, 128)}`,
      publicInputs: {
        minROI: Math.max(0, traderProfile.totalROI - 5), // ROI range for privacy
        maxROI: traderProfile.totalROI + 5,
        verified: true
      },
      timestamp: Date.now()
    };

    setProofData(mockProofData);
    setProofGenerated(true);
    setIsGenerating(false);
    onProofGenerated(true);
  };

  return (
    <div className="space-y-6">
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
                    <div className="text-white font-medium">Cryptographically Secure</div>
                    <div className="text-xs text-gray-400">Tamper-proof verification on blockchain</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-blue-400 font-medium">ROI Verification Range</div>
                <div className="text-blue-200 text-sm">
                  Your proof will verify that your ROI is within the range of {Math.max(0, traderProfile.totalROI - 5).toFixed(1)}% to {(traderProfile.totalROI + 5).toFixed(1)}% 
                  without revealing the exact value.
                </div>
              </div>
            </div>
          </div>

          {!isGenerating ? (
            <div className="text-center">
              <button
                onClick={generateProof}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg font-bold text-lg text-white transition-all duration-300 hover:from-purple-400 hover:to-purple-500 hover:scale-105"
              >
                <Shield className="w-5 h-5 inline-block mr-2" />
                Generate ZK Proof
              </button>
            </div>
          ) : (
            <div className="bg-gray-700/50 rounded-lg p-6">
              <div className="text-center mb-6">
                <Loader className="w-8 h-8 text-purple-400 mx-auto animate-spin mb-4" />
                <div className="text-white font-medium">Generating Zero-Knowledge Proof</div>
                <div className="text-gray-400 text-sm">This may take a few moments...</div>
              </div>

              <div className="space-y-3">
                {[
                  'Validating trading data...',
                  'Computing ROI verification...',
                  'Generating zero-knowledge proof...',
                  'Creating blockchain commitment...',
                  'Finalizing proof verification...'
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
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 text-center">
            <Check className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <div className="text-green-400 font-bold text-lg mb-2">ZK Proof Generated Successfully!</div>
            <div className="text-green-200 text-sm">Your trading performance has been cryptographically verified</div>
          </div>

          <div className="bg-gray-700/50 rounded-lg p-6">
            <h3 className="text-white font-bold mb-4">Proof Details</h3>
            <div className="space-y-4 text-sm">
              <div>
                <div className="text-gray-400 mb-1">Commitment Hash</div>
                <div className="font-mono text-xs text-blue-400 bg-gray-800 p-2 rounded break-all">
                  {proofData?.commitment}
                </div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Proof</div>
                <div className="font-mono text-xs text-purple-400 bg-gray-800 p-2 rounded break-all">
                  {proofData?.proof.substring(0, 64)}...
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-400">ROI Range Verified</div>
                  <div className="text-white font-medium">
                    {proofData?.publicInputs.minROI.toFixed(1)}% - {proofData?.publicInputs.maxROI.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">Status</div>
                  <div className="text-green-400 font-medium">✅ Verified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZKProofGenerator;
