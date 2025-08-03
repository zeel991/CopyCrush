import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bitcoin, Heart, Wallet } from 'lucide-react';

const Header = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectMetaMask = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed. Please install MetaMask extension.');
      }

      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found or user denied access.');
      }

      setWalletAddress(accounts[0]);

    } catch (err: any) {
      console.error('MetaMask connection error:', err);
      setError(err.message || 'Failed to connect to MetaMask');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setError(null);
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Auto-connect logic - check if already connected
  useEffect(() => {
    const checkExistingConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ 
            method: 'eth_accounts' 
          });
          if (accounts && accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        } catch (error) {
          console.log('Auto-connect failed:', error);
        }
      }
    };

    checkExistingConnection();

    // Listen for account changes
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          setWalletAddress(null);
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      // Cleanup listener
      return () => {
        if (window.ethereum) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
  }, []);

  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative">
            <Bitcoin className="w-6 h-6 text-orange-500" />
            <Heart className="w-3 h-3 text-pink-500 absolute -bottom-1 -right-1" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
            CopyCrush
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex space-x-6 text-gray-400">
          <Link to="/demo" className="hover:text-orange-400">
            Demo
          </Link>
          {walletAddress && (
            <Link to="/liked" className="hover:text-orange-400">
              Liked Cards
            </Link>
          )}
        </nav>

        {/* Wallet Connection */}
        <div className="relative">
          <button
            onClick={walletAddress ? disconnectWallet : connectMetaMask}
            disabled={isConnecting}
            className="flex items-center space-x-2 px-4 py-2 border border-orange-500 rounded-full text-orange-400 hover:bg-orange-500 hover:text-white transition-all duration-300 disabled:opacity-70"
          >
            <Wallet size={18} />
            <span>
              {isConnecting 
                ? 'Connecting...' 
                : walletAddress 
                  ? `${shortenAddress(walletAddress)}`
                  : 'Connect MetaMask'
              }
            </span>
          </button>

          {/* Error Display */}
          {error && (
            <div className="absolute right-0 mt-2 p-3 bg-red-100 border border-red-300 text-red-800 text-sm rounded-md shadow-lg z-50 max-w-xs">
              {error}
              <button 
                onClick={() => setError(null)}
                className="ml-2 text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;