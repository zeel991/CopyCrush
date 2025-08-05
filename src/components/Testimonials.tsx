import React from 'react';
import { Star, Bitcoin, TrendingUp, Heart } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "DeFiDegen",
      role: "Yield Farmer",
      avatar: "🌾",
      rating: 5,
      text: "Found my trading soulmate on CopyCrush! Their DeFi strategies helped me 10x my portfolio. It's like Tinder but for making money! 💰",
      gain: "+2,340%",
      verified: true
    },
    {
      name: "BitcoinMaxi",
      role: "HODLer Supreme",
      avatar: "💎",
      rating: 5,
      text: "Never thought I'd find love AND gains in one place. My copy-trade crush is beating the market consistently. WAGMI! 🚀",
      gain: "+856%",
      verified: true
    },
    {
      name: "CryptoQueen",
      role: "Alt Season Pro",
      avatar: "👑",
      rating: 5,
      text: "CopyCrush changed my life! I went from losing trades to following winners. The swipe interface makes trading fun again. ✨",
      gain: "+1,567%",
      verified: true
    }
  ];

  return (
    <section className="py-20 relative">
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-black/20 z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
            Love Stories & <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Profit Stories</span>
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
            Real Bappers sharing their success stories. From swipes to gains! 💕📈
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group">
              <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-white/20 transition-all duration-300 hover:border-orange-500/50 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-orange-500/10 h-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{testimonial.avatar}</div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-bold text-white">{testimonial.name}</h4>
                        {testimonial.verified && (
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-white/70">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-bold text-sm">{testimonial.gain}</div>
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Testimonial Text */}
                <p className="text-white/90 leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-2 text-orange-400">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">Verified Bapper</span>
                  </div>
                  <div className="flex items-center space-x-1 text-orange-400">
                    <TrendingUp className="w-4 h-4" />
                    <Bitcoin className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-orange-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl p-8 border border-orange-500/30 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Ready to write your own success story? 💕
            </h3>
            <p className="text-white/80 mb-6">
              Join thousands of Bappers who found their trading soulmate on CopyCrush!
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-white/70">
              <span>📱 Swipe</span>
              <span>•</span>
              <span>💝 SuperLike</span>
              <span>•</span>
              <span>📈 Profit</span>
              <span>•</span>
              <span>🚀 Moon</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;