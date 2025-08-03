import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Heart, X, Star, TrendingUp, TrendingDown } from 'lucide-react';

interface TraderCard {
  id: number;
  name: string;
  avatar: string;
  roi: string;
  winRate: string;
  followers: string;
  strategy: string;
  bgGradient: string;
  isPositive: boolean;
}

const traderCards: TraderCard[] = [
  {
    id: 1,
    name: "BitcoinBabe",
    avatar: "₿",
    roi: "+1,234%",
    winRate: "87%",
    followers: "12.5K",
    strategy: "HODLing with leverage 💎",
    bgGradient: "from-orange-500 to-pink-500",
    isPositive: true
  },
  {
    id: 2,
    name: "CryptoKing",
    avatar: "👑",
    roi: "+847%",
    winRate: "92%",
    followers: "8.3K",
    strategy: "DCA + swing trading 🚀",
    bgGradient: "from-purple-500 to-blue-500",
    isPositive: true
  },
  {
    id: 3,
    name: "DeFiMaster",
    avatar: "🌾",
    roi: "+234%",
    winRate: "78%",
    followers: "15.2K",
    strategy: "Yield farming expert 🌱",
    bgGradient: "from-green-500 to-teal-500",
    isPositive: true
  },
  {
    id: 4,
    name: "SatoshiSage",
    avatar: "🧙‍♂️",
    roi: "+567%",
    winRate: "85%",
    followers: "20.1K",
    strategy: "Technical analysis wizard ⚡",
    bgGradient: "from-yellow-500 to-orange-500",
    isPositive: true
  },
  {
    id: 5,
    name: "AltcoinAlice",
    avatar: "🦄",
    roi: "+156%",
    winRate: "73%",
    followers: "6.8K",
    strategy: "Gem hunter & moonshot finder 💫",
    bgGradient: "from-pink-500 to-purple-500",
    isPositive: true
  }
];

const Demo = () => {
  const [cards, setCards] = useState(traderCards);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | 'super' | null>(null);
  const [rotation, setRotation] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentCard = cards[currentCardIndex];

  // Desktop drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    setIsDragging(true);
    const rect = cardRef.current.getBoundingClientRect();
    
    setDragOffset({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2
    });
    
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !cardRef.current || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const newX = e.clientX - containerRect.left - containerRect.width / 2 - dragOffset.x;
    const newY = e.clientY - containerRect.top - containerRect.height / 2 - dragOffset.y;
    
    const newRotation = newX * 0.1;
    
    setPosition({ x: newX, y: newY });
    setRotation(newRotation);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    const threshold = 100;
    if (Math.abs(position.x) > threshold) {
      if (position.x > 0) {
        handleSwipe('right');
      } else {
        handleSwipe('left');
      }
    } else if (Math.abs(position.y) > threshold && position.y < 0) {
      handleSwipe('super');
    } else {
      setPosition({ x: 0, y: 0 });
      setRotation(0);
    }
  };

  // Touch handlers for mobile - Fixed types
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!cardRef.current) return;
    
    const touch = e.touches[0];
    const rect = cardRef.current.getBoundingClientRect();
    
    setDragOffset({
      x: touch.clientX - rect.left - rect.width / 2,
      y: touch.clientY - rect.top - rect.height / 2
    });
    
    setIsDragging(true);
    e.preventDefault();
  };

  // Fixed: Native TouchEvent for document listener
  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !cardRef.current || !containerRef.current || !e.touches.length) return;
    
    const touch = e.touches[0];
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const newX = touch.clientX - containerRect.left - containerRect.width / 2 - dragOffset.x;
    const newY = touch.clientY - containerRect.top - containerRect.height / 2 - dragOffset.y;
    
    const newRotation = newX * 0.1;
    
    setPosition({ x: newX, y: newY });
    setRotation(newRotation);
    
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    const threshold = 100;
    if (Math.abs(position.x) > threshold) {
      if (position.x > 0) {
        handleSwipe('right');
      } else {
        handleSwipe('left');
      }
    } else if (Math.abs(position.y) > threshold && position.y < 0) {
      handleSwipe('super');
    } else {
      setPosition({ x: 0, y: 0 });
      setRotation(0);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      // Fixed: Now uses native TouchEvent type
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, dragOffset, position]);

  const handleSwipe = (direction: 'left' | 'right' | 'super') => {
    setSwipeDirection(direction);
    
    if (direction === 'left') {
      setPosition({ x: -400, y: 0 });
      setRotation(-30);
    } else if (direction === 'right') {
      setPosition({ x: 400, y: 0 });
      setRotation(30);
    } else if (direction === 'super') {
      setPosition({ x: 0, y: -400 });
      setRotation(0);
    }
    
    setTimeout(() => {
      if (currentCardIndex < cards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
      } else {
        setCurrentCardIndex(0);
      }
      setSwipeDirection(null);
      setPosition({ x: 0, y: 0 });
      setRotation(0);
    }, 300);
  };

  if (!currentCard) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">No more traders! 🎉</h2>
          <p className="text-gray-400 mb-8">You've seen all available traders. Check back later for more!</p>
          <button 
            onClick={() => setCurrentCardIndex(0)}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full font-bold"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 relative overflow-hidden">
      {/* Header */}
      <div className="relative z-20 p-4 flex items-center justify-between">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center text-white hover:text-orange-400 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
          Back
        </button>
        <div className="text-white font-bold">
          {currentCardIndex + 1} / {cards.length}
        </div>
      </div>

      {/* Card Container */}
      <div 
        ref={containerRef}
        className="relative flex-1 flex items-center justify-center p-4"
        style={{ height: 'calc(100vh - 200px)' }}
      >
        {/* Current Card */}
        <div
          ref={cardRef}
          className={`relative w-80 h-[480px] transition-all duration-300 ${
            isDragging ? 'cursor-grabbing scale-105' : 'cursor-grab'
          } ${
            swipeDirection === 'left' ? 'opacity-0' :
            swipeDirection === 'right' ? 'opacity-0' :
            swipeDirection === 'super' ? 'opacity-0 scale-110' : ''
          }`}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
            userSelect: 'none',
            touchAction: 'none'
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className={`w-full h-full bg-gradient-to-br ${currentCard.bgGradient} rounded-3xl p-6 shadow-2xl border-4 border-white/20`}>
            {/* Avatar */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl mb-4 mx-auto">
                {currentCard.avatar}
              </div>
              <h2 className="text-2xl font-bold text-white">{currentCard.name}</h2>
            </div>

            {/* Stats */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center bg-white/10 rounded-xl p-3">
                <span className="text-white/80">ROI</span>
                <div className="flex items-center">
                  {currentCard.isPositive ? (
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
                  )}
                  <span className="text-white font-bold">{currentCard.roi}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center bg-white/10 rounded-xl p-3">
                <span className="text-white/80">Win Rate</span>
                <span className="text-white font-bold">{currentCard.winRate}</span>
              </div>
              
              <div className="flex justify-between items-center bg-white/10 rounded-xl p-3">
                <span className="text-white/80">Followers</span>
                <span className="text-white font-bold">{currentCard.followers}</span>
              </div>
            </div>

            {/* Strategy */}
            <div className="bg-white/10 rounded-xl p-4 mb-6">
              <h3 className="text-white font-bold mb-2">Strategy</h3>
              <p className="text-white/90">{currentCard.strategy}</p>
            </div>

            {/* Drag Instructions */}
            <div className="text-center text-white/60 text-sm">
              <div className="md:hidden">
                Drag to swipe or use buttons below
              </div>
              <div className="hidden md:block">
                Drag left/right to swipe, up for SuperLike!
              </div>
            </div>

            {/* Visual feedback for drag direction */}
            {isDragging && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {position.x > 50 && (
                  <div className="bg-green-500/20 border-4 border-green-500 rounded-full p-4">
                    <Heart className="w-12 h-12 text-green-500" />
                  </div>
                )}
                {position.x < -50 && (
                  <div className="bg-red-500/20 border-4 border-red-500 rounded-full p-4">
                    <X className="w-12 h-12 text-red-500" />
                  </div>
                )}
                {position.y < -50 && Math.abs(position.x) < 50 && (
                  <div className="bg-yellow-500/20 border-4 border-yellow-500 rounded-full p-4">
                    <Star className="w-12 h-12 text-yellow-500" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="relative z-20 flex justify-center items-center space-x-6 pb-8">
        <button
          onClick={() => handleSwipe('left')}
          className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          disabled={isDragging}
        >
          <X className="w-8 h-8 text-white" />
        </button>
        
        <button
          onClick={() => handleSwipe('super')}
          className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-pulse"
          disabled={isDragging}
        >
          <Star className="w-10 h-10 text-white" />
        </button>
        
        <button
          onClick={() => handleSwipe('right')}
          className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          disabled={isDragging}
        >
          <Heart className="w-8 h-8 text-white" />
        </button>
      </div>

      {/* Action Labels */}
      <div className="relative z-20 flex justify-center items-center space-x-6 pb-4">
        <span className="text-red-400 text-sm font-medium w-16 text-center">Pass</span>
        <span className="text-yellow-400 text-sm font-medium w-20 text-center">SuperLike</span>
        <span className="text-green-400 text-sm font-medium w-16 text-center">Like</span>
      </div>
    </div>
  );
};

export default Demo;
