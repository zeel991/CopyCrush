import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      text: "I superliked a trader and doubled my bags 😎",
      author: "@BitcoinMaxi",
      role: "HODLer since 2017",
      avatar: "₿",
      rating: 5,
      bgColor: "from-orange-500 to-yellow-500"
    },
    {
      text: "It's like Tinder for crypto, but less ghosting.",
      author: "@DeFiDegen",
      role: "Yield Farmer",
      avatar: "🌾",
      rating: 5,
      bgColor: "from-green-500 to-teal-500"
    },
    {
      text: "Finally, trading that doesn't bore me to death. The swipe interface is addictive! 🔥",
      author: "@CryptoQueen",
      role: "NFT Collector",
      avatar: "👑",
      rating: 5,
      bgColor: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Bappers</span> Say
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Real feedback from real traders who found their trading soulmates. 💕
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 transition-all duration-300 hover:border-orange-500/50 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10 h-full">
                {/* Rating */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg text-center mb-8 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.bgColor} flex items-center justify-center text-white font-bold text-xl mr-4`}>
                    {testimonial.avatar}
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-orange-400">{testimonial.author}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-xl text-gray-400 mb-8">
            Ready to become a Bapper? Join thousands of traders finding their perfect match! 🚀
          </p>
          <Link to="/demo" className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full font-bold text-lg transition-all duration-300 hover:from-orange-400 hover:to-pink-400 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25">
            Start Crushing It
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;