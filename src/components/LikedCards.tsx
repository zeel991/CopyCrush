// components/LikedCards.tsx
import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { ArrowLeft, Heart, Star, TrendingUp, TrendingDown, Trash2 } from 'lucide-react';

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
  position: { x: number; y: number };
}

interface DraggableCardProps {
  children: ReactNode;
  card: TraderCard;
  onPositionChange: (id: number, position: { x: number; y: number }) => void;
  onDelete: (id: number) => void;
}

const DraggableCard: React.FC<DraggableCardProps> = ({ 
  children, 
  card, 
  onPositionChange,
  onDelete 
}) => {
  const [position, setPosition] = useState(card.position);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    setIsDragging(true);
    
    // ★ Calculate offset inside the card itself (distance from pointer to card's top-left corner)
    const rect = cardRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,   // distance from pointer to card's left
      y: e.clientY - rect.top     // distance from pointer to card's top
    });
    
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !cardRef.current) return;
    
    const container = document.querySelector('.cards-container');
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    
    // ★ Keep the same offset while translating to container coordinates
    const newX = e.clientX - containerRect.left - dragOffset.x;
    const newY = e.clientY - containerRect.top - dragOffset.y;
    
    // Constrain to container bounds
    const cardWidth = 280;
    const cardHeight = 360;
    const constrainedX = Math.max(0, Math.min(containerRect.width - cardWidth, newX));
    const constrainedY = Math.max(0, Math.min(containerRect.height - cardHeight, newY));
    
    setPosition({ x: constrainedX, y: constrainedY });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    onPositionChange(card.id, position);
  };

  // Touch handlers - same treatment as mouse handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!cardRef.current) return;
    
    const touch = e.touches[0];
    const rect = cardRef.current.getBoundingClientRect();
    
    setIsDragging(true);
    
    // ★ Same idea as with the mouse - offset inside the card
    setDragOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    });
    
    e.preventDefault();
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !cardRef.current || !e.touches.length) return;
    
    const touch = e.touches[0];
    const container = document.querySelector('.cards-container');
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    
    // ★ Keep the same offset calculation
    const newX = touch.clientX - containerRect.left - dragOffset.x;
    const newY = touch.clientY - containerRect.top - dragOffset.y;
    
    const cardWidth = 280;
    const cardHeight = 360;
    const constrainedX = Math.max(0, Math.min(containerRect.width - cardWidth, newX));
    const constrainedY = Math.max(0, Math.min(containerRect.height - cardHeight, newY));
    
    setPosition({ x: constrainedX, y: constrainedY });
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    onPositionChange(card.id, position);
  };

  useEffect(() => {
    if (isDragging) {
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
  }, [isDragging, dragOffset, position]);

  return (
    <div
      ref={cardRef}
      className={`absolute transition-all duration-200 ${
        isDragging ? 'scale-105 cursor-grabbing z-50' : 'cursor-grab'
      } ${showDeleteButton ? 'z-40' : 'z-10'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        userSelect: 'none',
        touchAction: 'none',
        // Disable transitions while dragging for smoother movement
        transition: isDragging ? 'none' : 'all 0.2s'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onMouseEnter={() => !isDragging && setShowDeleteButton(true)}
      onMouseLeave={() => setShowDeleteButton(false)}
    >
      {/* Delete Button */}
      {showDeleteButton && !isDragging && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(card.id);
          }}
          className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors z-10 shadow-lg"
        >
          <Trash2 className="w-4 h-4 text-white" />
        </button>
      )}
      
      {children}
    </div>
  );
};

const LikedCards = () => {
  // Sample liked cards data - you can replace this with actual data from props or context
  const [likedCards, setLikedCards] = useState<TraderCard[]>([
    {
      id: 1,
      name: "BitcoinBabe",
      avatar: "₿",
      roi: "+1,234%",
      winRate: "87%",
      followers: "12.5K",
      strategy: "HODLing with leverage 💎",
      bgGradient: "from-orange-500 to-pink-500",
      isPositive: true,
      position: { x: 50, y: 50 }
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
      isPositive: true,
      position: { x: 350, y: 100 }
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
      isPositive: true,
      position: { x: 650, y: 150 }
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
      isPositive: true,
      position: { x: 200, y: 300 }
    }
  ]);

  const handlePositionChange = (id: number, newPosition: { x: number; y: number }) => {
    setLikedCards(prev => 
      prev.map(card => 
        card.id === id ? { ...card, position: newPosition } : card
      )
    );
  };

  const handleDeleteCard = (id: number) => {
    setLikedCards(prev => prev.filter(card => card.id !== id));
  };

  const resetPositions = () => {
    setLikedCards(prev => prev.map((card, index) => ({
      ...card,
      position: { 
        x: 50 + (index % 4) * 320, // Increased spacing
        y: 50 + Math.floor(index / 4) * 400 
      }
    })));
  };

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
        <h1 className="text-2xl font-bold text-white flex items-center">
          <Heart className="w-6 h-6 text-pink-500 mr-2" />
          Liked Traders
        </h1>
        <button
          onClick={resetPositions}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-medium transition-colors"
        >
          Reset Layout
        </button>
      </div>

      {/* Instructions */}
      <div className="relative z-20 text-center mb-4">
        <p className="text-gray-300 text-sm">
          Drag cards anywhere on the screen • Hover to delete • {likedCards.length} traders in your collection
        </p>
      </div>

      {/* Cards Container */}
      <div className="cards-container relative w-full h-full overflow-hidden" style={{ minHeight: 'calc(100vh - 150px)' }}>
        {likedCards.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-400 mb-2">No Liked Traders Yet</h2>
              <p className="text-gray-500">Start swiping in the demo to build your collection!</p>
            </div>
          </div>
        ) : (
          likedCards.map((card) => (
            <DraggableCard
              key={card.id}
              card={card}
              onPositionChange={handlePositionChange}
              onDelete={handleDeleteCard}
            >
              <div className={`bg-gradient-to-br ${card.bgGradient} rounded-2xl p-4 shadow-2xl border-2 border-white/20 hover:shadow-3xl transition-shadow duration-300`} style={{ width: '280px', height: '360px' }}>
                {/* Avatar */}
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl mb-3 mx-auto">
                    {card.avatar}
                  </div>
                  <h3 className="text-lg font-bold text-white">{card.name}</h3>
                </div>

                {/* Stats */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center bg-white/10 rounded-lg p-2">
                    <span className="text-white/80 text-sm">ROI</span>
                    <div className="flex items-center">
                      {card.isPositive ? (
                        <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-400 mr-1" />
                      )}
                      <span className="text-white font-bold text-sm">{card.roi}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center bg-white/10 rounded-lg p-2">
                    <span className="text-white/80 text-sm">Win Rate</span>
                    <span className="text-white font-bold text-sm">{card.winRate}</span>
                  </div>
                  
                  <div className="flex justify-between items-center bg-white/10 rounded-lg p-2">
                    <span className="text-white/80 text-sm">Followers</span>
                    <span className="text-white font-bold text-sm">{card.followers}</span>
                  </div>
                </div>

                {/* Strategy */}
                <div className="bg-white/10 rounded-lg p-3">
                  <h4 className="text-white font-bold text-sm mb-1">Strategy</h4>
                  <p className="text-white/90 text-xs leading-relaxed">{card.strategy}</p>
                </div>

                {/* Liked indicator */}
                <div className="absolute top-2 right-2">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white fill-current" />
                  </div>
                </div>
              </div>
            </DraggableCard>
          ))
        )}
      </div>

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-pink-500/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-orange-500/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-purple-500/10 rounded-full animate-pulse delay-500"></div>
      </div>
    </div>
  );
};

export default LikedCards;
