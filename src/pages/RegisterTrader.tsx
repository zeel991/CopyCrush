import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bitcoin, Shield, ChevronLeft, BarChart3, CheckCircle, Sparkles } from 'lucide-react';
import MonthlyPerformanceChart from '../components/MonthlyPerformanceChart.tsx';
import ZKProofGenerator from '../components/ZKProofGenerator.tsx';

interface TradeData {
  date: string;
  profit: number;
  volume: number;
  trades: number;
  roi: number;
}

interface TraderProfile {
  name: string;
  bio: string;
  experience: string;
  strategies: string[];
  monthlyData: TradeData[];
  totalROI: number;
  winRate: number;
  avgProfit: number;
}

const RegisterTrader = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [zkProofGenerated, setZkProofGenerated] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  
  const [traderProfile, setTraderProfile] = useState<TraderProfile>({
    name: '',
    bio: '',
    experience: '1-2 years',
    strategies: [],
    monthlyData: [],
    totalROI: 0,
    winRate: 0,
    avgProfit: 0
  });

  const [sampleMonthlyData] = useState<TradeData[]>([
    { date: '2024-01', profit: 15000, volume: 250000, trades: 45, roi: 12.5 },
    { date: '2024-02', profit: 22000, volume: 320000, trades: 52, roi: 18.7 },
    { date: '2024-03', profit: 8000, volume: 180000, trades: 38, roi: 8.2 },
    { date: '2024-04', profit: 31000, volume: 420000, trades: 67, roi: 25.1 },
    { date: '2024-05', profit: 19000, volume: 290000, trades: 49, roi: 15.6 },
    { date: '2024-06', profit: 27000, volume: 380000, trades: 58, roi: 21.3 },
    { date: '2024-07', profit: 35000, volume: 450000, trades: 72, roi: 28.9 },
    { date: '2024-08', profit: 41000, volume: 520000, trades: 81, roi: 32.4 },
    { date: '2024-09', profit: 28000, volume: 390000, trades: 63, roi: 22.8 },
    { date: '2024-10', profit: 33000, volume: 440000, trades: 69, roi: 26.7 },
    { date: '2024-11', profit: 39000, volume: 480000, trades: 75, roi: 31.2 },
    { date: '2024-12', profit: 44000, volume: 550000, trades: 86, roi: 35.8 }
  ]);

  const strategiesOptions = [
    'Swing Trading', 'Day Trading', 'Scalping', 'DCA', 'HODLing', 
    'Arbitrage', 'Grid Trading', 'Mean Reversion', 'Momentum Trading'
  ];

  // Set transparent background on mount and cleanup on unmount
  useEffect(() => {
    document.body.style.background = 'transparent';
    document.documentElement.style.background = 'transparent';
    
    return () => {
      document.body.style.background = '';
      document.documentElement.style.background = '';
    };
  }, []);

  useEffect(() => {
    if (sampleMonthlyData.length > 0) {
      const totalProfit = sampleMonthlyData.reduce((sum, month) => sum + month.profit, 0);
      const totalTrades = sampleMonthlyData.reduce((sum, month) => sum + month.trades, 0);
      const avgROI = sampleMonthlyData.reduce((sum, month) => sum + month.roi, 0) / sampleMonthlyData.length;
      const winningMonths = sampleMonthlyData.filter(month => month.profit > 0).length;
      const winRate = (winningMonths / sampleMonthlyData.length) * 100;
      
      setTraderProfile(prev => ({
        ...prev,
        monthlyData: sampleMonthlyData,
        totalROI: avgROI,
        winRate: winRate,
        avgProfit: totalProfit / totalTrades
      }));
    }
  }, [sampleMonthlyData]);

  const handleInputChange = (field: keyof TraderProfile, value: any) => {
    setTraderProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleStrategyToggle = (strategy: string) => {
    setTraderProfile(prev => ({
      ...prev,
      strategies: prev.strategies.includes(strategy)
        ? prev.strategies.filter(s => s !== strategy)
        : [...prev.strategies, strategy]
    }));
  };

  const submitRegistration = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setRegistrationComplete(true);
      setTimeout(() => navigate('/trader-profile'), 3000);
    }, 2000);
  };

  const nextStep = () => currentStep < 3 && setCurrentStep(currentStep + 1);
  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  // Success screen
  if (registrationComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'transparent' }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 animate-bounce">
                <Sparkles className="w-8 h-8 text-yellow-400" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">🎉 Registration Complete!</h1>
            <p className="text-xl text-gray-300 mb-8">
              Welcome to CopyCrush, <span className="text-orange-400 font-semibold">{traderProfile.name}</span>!
            </p>
            <div className="text-gray-400 text-sm mb-6">Redirecting in 3 seconds...</div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/trader-profile')}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg font-bold text-white transition-all duration-300 hover:scale-105"
              >
                View Profile Now
              </button>
              <Link to="/" className="px-8 py-3 border border-gray-600 rounded-lg font-medium text-gray-300 hover:text-white transition-all">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" style={{ background: 'transparent', minHeight: '100vh' }}>
      {/* Header - Sticky */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-orange-400 hover:text-orange-300">
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Bitcoin className="w-6 h-6 text-orange-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                CopyCrush
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress - Sticky under header */}
      <div className="sticky top-[73px] z-40 bg-gray-900/80 backdrop-blur-md px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-4 mb-3">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step <= currentStep ? 'bg-orange-500 text-white' : 'bg-gray-600 text-gray-300'
                }`}>
                  {step}
                </div>
                {step < 3 && <div className={`w-12 h-1 mx-2 transition-all duration-300 ${
                  step < currentStep ? 'bg-orange-500' : 'bg-gray-600'
                }`} />}
              </div>
            ))}
          </div>
          <div className="text-center text-gray-400 text-sm">
            Step {currentStep} of 3: {
              currentStep === 1 ? 'Profile Setup' :
              currentStep === 2 ? 'Performance Review' : 'ZK Proof Generation'
            }
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6" style={{ background: 'transparent' }}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
            
            {/* Step 1: Profile Setup */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-white mb-2">Create Your Profile</h1>
                  <p className="text-gray-400">Tell traders about yourself</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">Name</label>
                    <input
                      type="text"
                      value={traderProfile.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700/80 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Your trading name"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">Experience</label>
                    <select
                      value={traderProfile.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700/80 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="< 1 year">Less than 1 year</option>
                      <option value="1-2 years">1-2 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5+ years">5+ years</option>
                      <option value="10+ years">10+ years</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2 text-sm">Bio</label>
                  <textarea
                    value={traderProfile.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-700/80 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                    placeholder="Your trading philosophy..."
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-3 text-sm">Strategies</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {strategiesOptions.map((strategy) => (
                      <button
                        key={strategy}
                        onClick={() => handleStrategyToggle(strategy)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          traderProfile.strategies.includes(strategy)
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-700/80 text-gray-300 hover:bg-gray-600/80'
                        }`}
                      >
                        {strategy}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Trading Performance - FIXED VERSION */}
            {currentStep === 2 && (
              <div className="p-6">
                <div className="text-center mb-6">
                  <BarChart3 className="w-10 h-10 text-orange-500 mx-auto mb-3" />
                  <h2 className="text-2xl font-bold text-white mb-2">Your Trading Performance</h2>
                  <p className="text-gray-400 text-sm">Review your monthly statistics and performance metrics</p>
                </div>

                {/* Fixed-height box with internal scrolling - PERFECT IMPLEMENTATION */}
                <div className="h-[500px] bg-gray-700/20 rounded-lg border border-gray-600/30 overflow-hidden">
                  <div className="h-full overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                    
                    {/* Performance Summary Cards - NO OVERLAPPING */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-4 text-center min-h-[90px] flex flex-col justify-center">
                        <div className="text-lg font-bold text-green-400 mb-2">{traderProfile.totalROI.toFixed(1)}%</div>
                        <div className="text-xs text-gray-400">Average ROI</div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg p-4 text-center min-h-[90px] flex flex-col justify-center">
                        <div className="text-lg font-bold text-blue-400 mb-2">{traderProfile.winRate.toFixed(1)}%</div>
                        <div className="text-xs text-gray-400">Win Rate</div>
                      </div>
                      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-4 text-center min-h-[90px] flex flex-col justify-center">
                        <div className="text-lg font-bold text-purple-400 mb-2">${traderProfile.avgProfit.toFixed(0)}</div>
                        <div className="text-xs text-gray-400">Avg Profit/Trade</div>
                      </div>
                      <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-lg p-4 text-center min-h-[90px] flex flex-col justify-center">
                        <div className="text-lg font-bold text-orange-400 mb-2">{traderProfile.monthlyData.reduce((sum, m) => sum + m.trades, 0)}</div>
                        <div className="text-xs text-gray-400">Total Trades</div>
                      </div>
                    </div>

                    {/* Monthly Performance Chart */}
                    <div className="h-80 bg-gray-800/30 rounded-lg p-4">
                      <MonthlyPerformanceChart data={traderProfile.monthlyData} />
                    </div>
                    </div>

                    {/* Data Verification Section */}
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Shield className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="text-yellow-400 font-medium text-sm mb-2">Data Verification</div>
                          <div className="text-yellow-200 text-xs leading-relaxed">
                            Your trading performance will be verified using zero-knowledge proofs to ensure authenticity while maintaining privacy.
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Monthly Breakdown - FIXED NO OVERLAPPING */}
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                      <div className="text-blue-400 font-medium text-sm mb-4">Monthly Breakdown</div>
                      <div className="space-y-3">
                        {traderProfile.monthlyData.slice(0, 6).map((month) => (
                          <div key={month.date} className="flex justify-between items-center py-2 border-b border-blue-500/20 last:border-b-0">
                            <div className="text-gray-300 text-xs font-medium min-w-[70px] flex-shrink-0">
                              {month.date}
                            </div>
                            <div className={`text-xs font-bold text-right ${month.profit > 0 ? 'text-green-400' : 'text-red-400'}`}>
                              ${month.profit.toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Trading Insights */}
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                      <div className="text-purple-400 font-medium text-sm mb-4">Trading Insights</div>
                      <div className="text-purple-200 text-xs space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-1 h-1 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="leading-relaxed">Consistent performance across volatile market conditions</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-1 h-1 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="leading-relaxed">Strong risk management with controlled drawdowns</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-1 h-1 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="leading-relaxed">Diversified strategy approach minimizing correlation risks</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-1 h-1 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="leading-relaxed">Regular profit-taking maintains positive momentum</p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom padding for better scrolling */}
                    <div className="h-6"></div>
                  </div>
              </div>
            )}

            {/* Step 3: ZK Proof */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Shield className="w-10 h-10 text-orange-500 mx-auto mb-3" />
                  <h2 className="text-2xl font-bold text-white mb-2">Generate ZK Proof</h2>
                  <p className="text-gray-400">Verify your ROI privately</p>
                </div>

                <ZKProofGenerator 
                  traderProfile={traderProfile}
                  onProofGenerated={setZkProofGenerated}
                />

                {zkProofGenerated && (
                  <div className="text-center mt-6">
                    <button
                      onClick={submitRegistration}
                      disabled={isLoading}
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg font-bold text-white transition-all hover:scale-105 disabled:opacity-70"
                    >
                      {isLoading ? 'Creating Profile...' : 'Complete Registration'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-700">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-2 bg-gray-700/80 text-white rounded-lg font-medium transition-all hover:bg-gray-600/80 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={nextStep}
                disabled={currentStep === 3 || (currentStep === 1 && !traderProfile.name)}
                className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium transition-all hover:from-orange-400 hover:to-orange-500 disabled:opacity-50"
              >
                {currentStep === 3 ? 'Generate Proof' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Extra space at bottom so Vanta.js is visible */}
      <div className="h-32" style={{ background: 'transparent' }}></div>
    </div>
  );
};

export default RegisterTrader;
