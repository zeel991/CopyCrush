// pages/TraderProfile.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bitcoin, 
  Heart, 
  Star, 
  Users, 
  TrendingUp, 
  Eye, 
  Copy,
  ChevronLeft,
  BarChart3,
  Settings,
  Shield,
  Calendar,
  Trophy,
  Target,
  DollarSign,
  Activity,
  MessageCircle,
  Share2
} from 'lucide-react';

interface ProfileStats {
  likes: number;
  superLikes: number;
  followers: number;
  profileViews: number;
  copyTrades: number;
  totalROI: number;
  winRate: number;
  monthlyProfit: number;
  tradingExperience: string;
  strategiesCount: number;
}

interface RecentInteraction {
  id: string;
  type: 'like' | 'superlike' | 'follow' | 'copy';
  user: string;
  timestamp: string;
  avatar: string;
}

const TraderProfile = () => {
  const [profileStats, setProfileStats] = useState<ProfileStats>({
    likes: 47,
    superLikes: 12,
    followers: 234,
    profileViews: 1420,
    copyTrades: 89,
    totalROI: 23.4,
    winRate: 78.5,
    monthlyProfit: 34500,
    tradingExperience: '3-5 years',
    strategiesCount: 4
  });

  const [recentInteractions, setRecentInteractions] = useState<RecentInteraction[]>([
    { id: '1', type: 'superlike', user: 'CryptoWhale92', timestamp: '2 minutes ago', avatar: '🐋' },
    { id: '2', type: 'like', user: 'BitcoinBull', timestamp: '5 minutes ago', avatar: '🐂' },
    { id: '3', type: 'copy', user: 'TraderJoe', timestamp: '12 minutes ago', avatar: '👨‍💼' },
    { id: '4', type: 'follow', user: 'MoonLambo', timestamp: '18 minutes ago', avatar: '🚀' },
    { id: '5', type: 'like', user: 'DiamondHands', timestamp: '25 minutes ago', avatar: '💎' },
    { id: '6', type: 'superlike', user: 'HODLQueen', timestamp: '31 minutes ago', avatar: '👑' },
    { id: '7', type: 'like', user: 'SatoshiFan', timestamp: '45 minutes ago', avatar: '₿' },
    { id: '8', type: 'copy', user: 'AltcoinAce', timestamp: '1 hour ago', avatar: '🎯' }
  ]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading profile data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color, 
    subtitle,
    trend 
  }: {
    title: string;
    value: string | number;
    icon: any;
    color: string;
    subtitle?: string;
    trend?: string;
  }) => (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <span className="text-sm font-medium text-green-400">
            {trend}
          </span>
        )}
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-gray-400 text-sm">{title}</div>
      {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
    </div>
  );

  const InteractionItem = ({ interaction }: { interaction: RecentInteraction }) => {
    const getInteractionColor = (type: string) => {
      switch (type) {
        case 'superlike': return 'text-yellow-400';
        case 'like': return 'text-pink-400';
        case 'follow': return 'text-blue-400';
        case 'copy': return 'text-green-400';
        default: return 'text-gray-400';
      }
    };

    const getInteractionIcon = (type: string) => {
      switch (type) {
        case 'superlike': return '⭐';
        case 'like': return '❤️';
        case 'follow': return '👥';
        case 'copy': return '📊';
        default: return '👤';
      }
    };

    const getInteractionText = (type: string) => {
      switch (type) {
        case 'superlike': return 'super liked your profile';
        case 'like': return 'liked your profile';
        case 'follow': return 'started following you';
        case 'copy': return 'started copying your trades';
        default: return 'interacted with you';
      }
    };

    return (
      <div className="flex items-center space-x-4 p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all duration-300">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-lg">
          {interaction.avatar}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="text-white font-medium">{interaction.user}</span>
            <span className="text-lg">{getInteractionIcon(interaction.type)}</span>
          </div>
          <div className={`text-sm ${getInteractionColor(interaction.type)}`}>
            {getInteractionText(interaction.type)}
          </div>
        </div>
        <div className="text-gray-500 text-xs">
          {interaction.timestamp}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-lg font-medium">Loading your profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link to="/" className="flex items-center space-x-2">
                <div className="relative">
                  <Bitcoin className="w-6 h-6 text-orange-500" />
                  <Heart className="w-3 h-3 text-pink-500 absolute -bottom-1 -right-1" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                  CopyCrush
                </span>
              </Link>
              <nav className="hidden md:flex space-x-6 text-gray-400">
                <Link to="/demo" className="hover:text-orange-400 transition-colors">Demo</Link>
                <span className="text-orange-400 font-medium">My Profile</span>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                BT
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">BitcoinTrader</h1>
                <p className="text-gray-400 mb-2">Diamond hands since 2017. HODL is life! 💎🙌</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {profileStats.tradingExperience}</span>
                  <span className="flex items-center"><Target className="w-4 h-4 mr-1" /> {profileStats.strategiesCount} strategies</span>
                  <span className="flex items-center"><Shield className="w-4 h-4 mr-1 text-green-400" /> ZK Verified</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-white font-medium hover:from-orange-400 hover:to-orange-500 transition-all duration-300">
                <Settings className="w-4 h-4 inline mr-2" />
                Edit Profile
              </button>
              <button className="px-4 py-2 bg-gray-700 rounded-lg text-gray-300 font-medium hover:bg-gray-600 transition-all duration-300">
                <Share2 className="w-4 h-4 inline mr-2" />
                Share
              </button>
            </div>
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-700/30 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{profileStats.totalROI}%</div>
              <div className="text-sm text-gray-400">Total ROI</div>
            </div>
            <div className="text-center p-4 bg-gray-700/30 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">{profileStats.winRate}%</div>
              <div className="text-sm text-gray-400">Win Rate</div>
            </div>
            <div className="text-center p-4 bg-gray-700/30 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">${profileStats.monthlyProfit.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Monthly Profit</div>
            </div>
            <div className="text-center p-4 bg-gray-700/30 rounded-lg">
              <div className="text-2xl font-bold text-orange-400">{profileStats.copyTrades}</div>
              <div className="text-sm text-gray-400">Copy Trades</div>
            </div>
          </div>
        </div>

        {/* Main Stats Grid - Focusing on Likes and Super Likes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Likes"
            value={profileStats.likes}
            icon={Heart}
            color="bg-gradient-to-br from-pink-500 to-pink-600"
            subtitle="People who liked your profile"
            trend="+8 today"
          />
          <StatCard
            title="Super Likes"
            value={profileStats.superLikes}
            icon={Star}
            color="bg-gradient-to-br from-yellow-500 to-orange-500"
            subtitle="Your biggest fans!"
            trend="+3 today"
          />
          <StatCard
            title="Followers"
            value={profileStats.followers}
            icon={Users}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
            subtitle="Active followers"
            trend="+15 this week"
          />
          <StatCard
            title="Profile Views"
            value={profileStats.profileViews}
            icon={Eye}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
            subtitle="Total profile visits"
            trend="+127 today"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Interactions */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-orange-500" />
                  Recent Activity
                </h3>
                <span className="text-sm text-gray-400">Live updates</span>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {recentInteractions.map((interaction) => (
                  <InteractionItem key={interaction.id} interaction={interaction} />
                ))}
              </div>
            </div>
          </div>

          {/* Engagement Summary */}
          <div className="space-y-6">
            {/* Engagement Breakdown */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-orange-500" />
                Engagement Summary
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">Likes Rate</span>
                    <span className="text-pink-400 font-medium">3.3%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-pink-500 to-pink-600 h-2 rounded-full" style={{width: '33%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">Super Like Rate</span>
                    <span className="text-yellow-400 font-medium">0.8%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" style={{width: '8%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">Follow Rate</span>
                    <span className="text-blue-400 font-medium">16.5%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{width: '65%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">Copy Rate</span>
                    <span className="text-green-400 font-medium">6.3%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{width: '25%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Fans */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-orange-500" />
                Top Fans
              </h3>
              
              <div className="space-y-3">
                {recentInteractions.filter(i => i.type === 'superlike').slice(0, 3).map((fan, index) => (
                  <div key={fan.id} className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-sm">
                      {fan.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium text-sm">{fan.user}</div>
                      <div className="text-yellow-400 text-xs">Super Fan ⭐</div>
                    </div>
                    <div className="text-yellow-400 text-lg">#{index + 1}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link 
                  to="/trader-dashboard"
                  className="flex items-center w-full px-4 py-3 bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30 rounded-lg text-orange-400 hover:bg-orange-500/30 transition-all duration-300"
                >
                  <BarChart3 className="w-4 h-4 mr-3" />
                  View Dashboard
                </Link>
                <button className="flex items-center w-full px-4 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-all duration-300">
                  <MessageCircle className="w-4 h-4 mr-3" />
                  Message Fans
                </button>
                <button className="flex items-center w-full px-4 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/30 transition-all duration-300">
                  <DollarSign className="w-4 h-4 mr-3" />
                  Earnings Report
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Banner */}
        <div className="mt-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-8 text-center">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">🎉 Rising Star Achievement!</h3>
          <p className="text-gray-300 mb-4">
            You've received over 10 super likes this month! Your trading skills are getting noticed.
          </p>
          <div className="flex justify-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{profileStats.superLikes}</div>
              <div className="text-sm text-gray-400">Super Likes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">{profileStats.likes}</div>
              <div className="text-sm text-gray-400">Total Likes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{profileStats.followers}</div>
              <div className="text-sm text-gray-400">Followers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraderProfile;
