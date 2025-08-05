import React from 'react';
import { BarChart3, Eye, Shield, Zap } from 'lucide-react';

const WhyCopyCrush = () => {
  const features = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: "No boring dashboards",
      description: "Forget complex charts and confusing interfaces. Our swipe-first design makes trading discovery fun and intuitive.",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Discover trading talent visually",
      description: "See trader personalities, strategies, and track records at a glance. It's like LinkedIn meets Tinder for crypto.",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Built on Citrea: fast, cheap, secure",
      description: "Powered by Bitcoin's security with rollup speed. Lightning-fast trades, minimal fees, maximum trust.",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-black/20 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
            Why <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">CopyCrush?</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
            We're not just another trading platform. We're the future of social trading, where connections create alpha. 🔥
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-white/20 transition-all duration-300 hover:border-orange-500/50 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10 h-full">
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-white/80 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-orange-500/20 to-pink-500/20 backdrop-blur-md rounded-3xl p-8 border border-orange-500/30">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">10,000+</div>
              <div className="text-white/80">Active Traders</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">₿2.5M</div>
              <div className="text-white/80">Total Volume</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">94%</div>
              <div className="text-white/80">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyCopyCrush;