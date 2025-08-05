import React from 'react';
import { Smartphone, Star, TrendingUp } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Smartphone className="w-12 h-12" />,
      title: "Swipe through trader cards",
      description: "Browse profiles like dating apps, but for crypto traders. See their gains, strategies, and vibes.",
      emoji: "📱"
    },
    {
      icon: <Star className="w-12 h-12" />,
      title: "SuperLike your favorite",
      description: "Found a trader you love? Hit that SuperLike button and pay a small BTC fee to start following.",
      emoji: "⭐"
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: "Instantly copy their trades",
      description: "Every move they make, you make too. Sit back and watch your portfolio potentially moon. 🚀",
      emoji: "📈"
    }
  ];

  return (
    <section className="py-20 relative">
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-black/20 z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
            How It <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
            Three simple steps to start copy-trading like a pro. No boring dashboards, just pure trading chemistry. 💫
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-white/20 transition-all duration-300 hover:border-orange-500 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-orange-500/10">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-xl">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="text-orange-400 mb-6 flex items-center justify-center">
                  <div className="relative">
                    {step.icon}
                    <span className="absolute -top-2 -right-2 text-2xl">{step.emoji}</span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-4 text-center text-white">{step.title}</h3>
                <p className="text-white/80 text-center leading-relaxed">{step.description}</p>
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-orange-400 to-pink-500 z-10"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;