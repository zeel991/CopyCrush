import React, { useState, useRef, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Bitcoin, Heart, Zap } from 'lucide-react';

interface DraggableCardProps {
  children: ReactNode;
  initialRotation?: number;
  zIndex?: number;
}

const DraggableCard: React.FC<DraggableCardProps> = ({ 
  children, 
  initialRotation = 0, 
  zIndex = 1 
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    setIsDragging(true);
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate offset from mouse position to card's current position
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !cardRef.current) return;
    
    const container = cardRef.current.parentElement;
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    
    // Calculate new position relative to container
    const newX = e.clientX - containerRect.left - dragOffset.x;
    const newY = e.clientY - containerRect.top - dragOffset.y;
    
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!cardRef.current) return;
    
    setIsDragging(true);
    const touch = e.touches[0];
    const rect = cardRef.current.getBoundingClientRect();
    
    setDragOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    });
    
    e.preventDefault();
    e.stopPropagation();
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !cardRef.current || !e.touches.length) return;
    
    const touch = e.touches[0];
    const container = cardRef.current.parentElement;
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    
    const newX = touch.clientX - containerRect.left - dragOffset.x;
    const newY = touch.clientY - containerRect.top - dragOffset.y;
    
    setPosition({ x: newX, y: newY });
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      // Use passive: false to allow preventDefault
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={cardRef}
      className={`absolute transition-transform duration-200 ${
        isDragging ? 'scale-105 cursor-grabbing' : 'cursor-grab'
      } ${isDragging ? '' : 'transition-transform'}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) rotate(${initialRotation}deg)`,
        zIndex: isDragging ? 1000 : zIndex,
        userSelect: 'none',
        touchAction: 'none' // Prevents default touch behaviors
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {children}
    </div>
  );
};

const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Logo/Brand */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Bitcoin className="w-12 h-12 text-orange-500 animate-bounce" />
              <Heart className="w-6 h-6 text-pink-500 absolute -bottom-1 -right-1 animate-pulse" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent mb-4">
            CopyCrush
          </h1>
        </div>

        {/* Main Content */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
            Swipe. SuperLike. <br />
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Copy Trade.
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto drop-shadow-md">
            The dating app for Bitcoin traders — built on <span className="text-orange-400 font-semibold">Citrea</span>. 
            Swipe through traders, SuperLike the best, and copy their moves. 📈✨
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/demo" className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full font-bold text-lg transition-all duration-300 hover:from-orange-400 hover:to-orange-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25">
              <Zap className="w-5 h-5 inline-block mr-2 group-hover:animate-bounce" />
              Try the Demo
            </Link>
            <Link to="/register-trader" className="px-8 py-4 border-2 border-orange-500 rounded-full font-bold text-lg transition-all duration-300 hover:bg-orange-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25 text-white backdrop-blur-sm">
              Register as a Trader
            </Link>
          </div>

          {/* Draggable Cards Container - Fixed container bounds */}
          <div className="relative max-w-md mx-auto h-96 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Card Stack - Now Draggable with proper positioning */}
              <div className="relative w-64 h-80">
                
                {/* Back Card */}
                <DraggableCard initialRotation={12} zIndex={1}>
                  <div className="w-64 h-80 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-md rounded-2xl border border-gray-600 p-6 shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">₿</span>
                      </div>
                      <div className="ml-3">
                        <div className="font-bold text-white">CryptoKing</div>
                        <div className="text-sm text-gray-400">+847% this year 🚀</div>
                      </div>
                    </div>
                    <div className="text-gray-300 text-sm mb-4">
                      "Diamond hands since 2017. HODL is life! 💎🙌"
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="text-xs text-gray-400 text-center">
                        Drag me around! 🎯
                      </div>
                    </div>
                  </div>
                </DraggableCard>
                
                {/* Middle Card */}
                <DraggableCard initialRotation={-6} zIndex={2}>
                  <div className="w-64 h-80 bg-gradient-to-br from-gray-700/90 to-gray-800/90 backdrop-blur-md rounded-2xl border border-gray-500 p-6 shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">Ξ</span>
                      </div>
                      <div className="ml-3">
                        <div className="font-bold text-white">DeFiMaster</div>
                        <div className="text-sm text-gray-400">+234% ROI 📊</div>
                      </div>
                    </div>
                    <div className="text-gray-300 text-sm mb-4">
                      "Yield farming is my passion. Let's make it rain! 🌧️💰"
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="text-xs text-gray-400 text-center">
                        I'm draggable too! ✨
                      </div>
                    </div>
                  </div>
                </DraggableCard>
                
                {/* Front Card */}
                <DraggableCard initialRotation={0} zIndex={3}>
                  <div className="w-64 h-80 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <span className="text-orange-500 font-bold">₿</span>
                      </div>
                      <div className="ml-3">
                        <div className="font-bold text-white">BitcoinBabe</div>
                        <div className="text-sm text-orange-100">+1,234% gains 💎</div>
                      </div>
                    </div>
                    <div className="text-white text-sm mb-8">
                      "Bitcoin maximalist with a touch of altcoin magic ✨ Let's moon together! 🚀"
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex justify-center space-x-4 mb-2">
                        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                          <span className="text-2xl">👎</span>
                        </div>
                        <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce hover:scale-110 transition-transform cursor-pointer">
                          <span className="text-2xl">⭐</span>
                        </div>
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                          <span className="text-2xl">👍</span>
                        </div>
                      </div>
                      <div className="text-xs text-orange-100 text-center">
                        Drag me anywhere! 🎮
                      </div>
                    </div>
                  </div>
                </DraggableCard>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;