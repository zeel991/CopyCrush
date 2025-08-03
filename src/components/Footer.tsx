import React from 'react';
import { Link } from 'react-router-dom';
import { Bitcoin, Heart, MessageCircle, Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-orange-500/10 to-pink-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join the <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Movement</span>
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Become a Bapper and discover the future of social trading. Your trading soulmate is just a swipe away! 💫
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/demo" className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full font-bold text-lg transition-all duration-300 hover:from-orange-400 hover:to-orange-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25">
              <Zap className="w-5 h-5 inline-block mr-2 group-hover:animate-bounce" />
              Try Demo
            </Link>
            <button className="group px-8 py-4 border-2 border-blue-500 rounded-full font-bold text-lg transition-all duration-300 hover:bg-blue-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25">
              <MessageCircle className="w-5 h-5 inline-block mr-2 group-hover:animate-pulse" />
              Join Telegram
            </button>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            {/* Logo */}
            <div className="flex items-center mb-8">
              <div className="relative mr-3">
                <Bitcoin className="w-8 h-8 text-orange-500" />
                <Heart className="w-4 h-4 text-pink-500 absolute -bottom-1 -right-1" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                CopyCrush
              </span>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-wrap justify-center gap-8 mb-8 text-gray-400">
              <a href="#" className="hover:text-orange-400 transition-colors">About</a>
              <a href="#" className="hover:text-orange-400 transition-colors">How it Works</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Traders</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Security</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Support</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Blog</a>
            </nav>

            {/* Social Links */}
            <div className="flex space-x-6 mb-8">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <span className="text-2xl">𝕏</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <span className="text-2xl">📱</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <span className="text-2xl">💬</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <span className="text-2xl">🤖</span>
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center text-gray-500 border-t border-gray-800 pt-8 w-full">
              <p className="mb-2">
                © 2025 CopyCrush. Built with 💜 on Citrea. All rights reserved.
              </p>
              <p className="text-sm">
                Not financial advice. Trade responsibly. WAGMI! 🚀
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;