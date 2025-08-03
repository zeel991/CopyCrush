import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bitcoin, 
  Heart, 
  Star, 
  Users, 
  TrendingUp, 
  Eye, 
  ThumbsUp, 
  Copy,
  ChevronDown,
  Calendar,
  BarChart3,
  Settings,
  Bell,
  DollarSign,
  Activity,
  Target,
  Trophy
} from 'lucide-react';

interface DashboardStats {
  likes: number;
  superLikes: number;
  followers: number;
  totalCopies: number;
  profileViews: number;
  currentROI: number;
  monthlyProfit: number;
  winRate: number;
  totalTrades: number;
  activeFollowers: number;
}

interface RecentActivity {
  id: string;
  type: 'like' | 'superlike' | 'follow' | 'copy';
  user: string;
  timestamp: string;
  avatar?: string;
}

const TradingDashboard = () => {
  const [timeframe, setTimeframe] = useState('7d');
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    likes: 0,
    superLikes: 0,
    followers: 0,
    totalCopies: 0,
    profileViews: 0,
    currentROI: 0,
    monthlyProfit: 0,
    winRate: 0,
    totalTrades: 0,
    activeFollowers: 0
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For now, showing zero as requested, but with structure for real data
      setDashboardStats({
        likes: 0,
        superLikes: 0,
        followers: 0,
        totalCopies: 0,
        profileViews: 0,
        currentROI: 0,
        monthlyProfit: 0,
        winRate: 0,
        totalTrades: 0,
        activeFollowers: 0
      });

      setRecentActivity([]);
      setIsLoading(false);
    };

    loadDashboardData();
  }, [timeframe]);

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color, 
    change, 
    changeType = 'neutral' 
  }: {
    title: string;
    value: string | number;
    icon: any;
    color: string;
    change?: string;
    changeType?: 'positive' | 'negative' | 'neutral';
  }) => (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <span className={`text-sm font-medium ${
            changeType === 'positive' ? 'text-green-400' : 
            changeType === 'negative' ? 'text-red-400' : 'text-gray-400'
          }`}>
            {change}
          </span>
        )}
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-gray-400 text-sm">{title}</div>
    </div>
  );

  const EmptyState = ({ icon: Icon, title, description }: { 
    icon: any, 
    title: string, 
    description: string 
  }) => (
    <div className="text-center py-12">
      <Icon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-400 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-md mx-auto">{description}</p>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-lg font-medium">Loading Dashboard...</div>
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
                <span className="text-orange-400 font-medium">Dashboard</span>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Trader! 👋</h1>
          <p className="text-gray-400">Here's how your profile is performing on CopyCrush</p>
        </div>

        {/* Timeframe Selector */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
          <div className="relative">
            <select 
              value={timeframe} 
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-gray-800 border border-gray-600 text-white px-4 py-2 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Likes"
            value={dashboardStats.likes}
            icon={Heart}
            color="bg-gradient-to-br from-pink-500 to-pink-600"
            change="+0%"
            changeType="neutral"
          />
          <StatCard
            title="Super Likes"
            value={dashboardStats.superLikes}
            icon={Star}
            color="bg-gradient-to-br from-yellow-500 to-orange-500"
            change="+0%"
            changeType="neutral"
          />
          <StatCard
            title="Followers"
            value={dashboardStats.followers}
            icon={Users}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
            change="+0%"
            changeType="neutral"
          />
          <StatCard
            title="Profile Views"
            value={dashboardStats.profileViews}
            icon={Eye}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
            change="+0%"
            changeType="neutral"
          />
        </div>

        {/* Trading Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Copy Trades"
            value={dashboardStats.totalCopies}
            icon={Copy}
            color="bg-gradient-to-br from-green-500 to-green-600"
            change="+0%"
            changeType="neutral"
          />
          <StatCard
            title="Current ROI"
            value={`${dashboardStats.currentROI}%`}
            icon={TrendingUp}
            color="bg-gradient-to-br from-emerald-500 to-emerald-600"
            change="+0%"
            changeType="neutral"
          />
          <StatCard
            title="Monthly Profit"
            value={`$${dashboardStats.monthlyProfit.toLocaleString()}`}
            icon={DollarSign}
            color="bg-gradient-to-br from-teal-500 to-teal-600"
            change="+0%"
            changeType="neutral"
          />
          <StatCard
            title="Win Rate"
            value={`${dashboardStats.winRate}%`}
            icon={Target}
            color="bg-gradient-to-br from-indigo-500 to-indigo-600"
            change="+0%"
            changeType="neutral"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity Feed */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-orange-500" />
                  Recent Activity
                </h3>
                <span className="text-sm text-gray-400">Live updates</span>
              </div>
              
              {recentActivity.length === 0 ? (
                <EmptyState 
                  icon={Activity}
                  title="No Activity Yet"
                  description="Your likes, super likes, and followers will appear here. Start by optimizing your trading profile to attract more attention!"
                />
              ) : (
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {activity.user.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{activity.user}</div>
                        <div className="text-gray-400 text-sm">
                          {activity.type === 'like' && '❤️ Liked your profile'}
                          {activity.type === 'superlike' && '⭐ Super liked your profile'}
                          {activity.type === 'follow' && '👥 Started following you'}
                          {activity.type === 'copy' && '📊 Started copying your trades'}
                        </div>
                      </div>
                      <div className="text-gray-500 text-xs">
                        {activity.timestamp}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats & Actions */}
          <div className="space-y-6">
            {/* Profile Performance */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-orange-500" />
                Profile Performance
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Profile Completion</span>
                  <span className="text-white font-medium">100%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-orange-500 to-pink-500 h-2 rounded-full" style={{width: '100%'}}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Engagement Rate</span>
                  <span className="text-white font-medium">0%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{width: '0%'}}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Trust Score</span>
                  <span className="text-green-400 font-medium">Verified ✅</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: '100%'}}></div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link 
                  to="/edit-profile"
                  className="flex items-center w-full px-4 py-3 bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30 rounded-lg text-orange-400 hover:bg-orange-500/30 transition-all duration-300"
                >
                  <Settings className="w-4 h-4 mr-3" />
                  Edit Profile
                </Link>
                <Link 
                  to="/analytics"
                  className="flex items-center w-full px-4 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-all duration-300"
                >
                  <BarChart3 className="w-4 h-4 mr-3" />
                  View Analytics
                </Link>
                <Link 
                  to="/boost-profile"
                  className="flex items-center w-full px-4 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 hover:bg-yellow-500/30 transition-all duration-300"
                >
                  <Trophy className="w-4 h-4 mr-3" />
                  Boost Profile
                </Link>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
              <h3 className="text-lg font-bold text-purple-400 mb-3">💡 Pro Tip</h3>
              <p className="text-purple-200 text-sm mb-4">
                Traders with verified performance get 3x more likes! Make sure your ZK proof is up to date.
              </p>
              <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-medium hover:from-purple-400 hover:to-pink-400 transition-all duration-300">
                Update Proof
              </button>
            </div>
          </div>
        </div>

        {/* Getting Started Section (only show when no activity) */}
        {recentActivity.length === 0 && dashboardStats.likes === 0 && (
          <div className="mt-8 bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/30 rounded-xl p-8">
            <div className="text-center">
              <Star className="w-16 h-16 text-orange-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started? 🚀</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Your trading profile is live! Here are some tips to get your first likes and followers:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="bg-gray-800/30 rounded-lg p-4">
                  <div className="text-orange-400 font-bold mb-2">1. Share Your Trades</div>
                  <div className="text-gray-400 text-sm">Post your best trading strategies and results to attract followers</div>
                </div>
                <div className="bg-gray-800/30 rounded-lg p-4">
                  <div className="text-pink-400 font-bold mb-2">2. Engage Others</div>
                  <div className="text-gray-400 text-sm">Like and comment on other traders' profiles to get noticed</div>
                </div>
                <div className="bg-gray-800/30 rounded-lg p-4">
                  <div className="text-purple-400 font-bold mb-2">3. Keep ZK Proof Updated</div>
                  <div className="text-gray-400 text-sm">Regular proof updates show you're an active, trustworthy trader</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradingDashboard;
