import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bitcoin, Heart, Wallet, ChevronDown } from 'lucide-react';
import { getWallets } from '@talismn/connect-wallets';

const WALLET_OPTIONS = [
  {
    label: "🧿 Talisman",
    type: "talisman",
    checkProperty: "isTalisman",
  },
  {
    label: "🌐 Any Ethereum Wallet",
    type: "ethereum",
    checkProperty: null,
  },
  {
    label: "🦊 MetaMask", 
    type: "metamask",
    checkProperty: "isMetaMask",
  },
  {
    label: "👻 Phantom",
    type: "phantom", 
    checkProperty: "isPhantom",
  },
  {
    label: "🛡️ Trust Wallet",
    type: "trust",
    checkProperty: "isTrustWallet",
  },
  {
    label: "🌈 Rainbow Wallet",
    type: "rainbow",
    checkProperty: "isRainbow",
  },
  {
    label: "⚡ Coinbase Wallet",
    type: "coinbase",
    checkProperty: "isCoinbaseWallet",
  },
];

const Header = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletType, setWalletType] = useState<string | null>(null);
  const [showWalletMenu, setShowWalletMenu] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [talismanWallet, setTalismanWallet] = useState<any>(null);

  const connectSpecificWallet = async (walletOption: typeof WALLET_OPTIONS[0]) => {
    const anyWindow = window as any;
    setIsConnecting(true);
    setError(null);
    setShowWalletMenu(false);
  
    try {
      // For Talisman (using @talismn/connect-wallets)
      if (walletOption.type === "talisman") {
        // Get an array of wallets which are installed
        const installedWallets = getWallets().filter((wallet) => wallet.installed);
        
        // Get Talisman from the array of installed wallets
        const talismanWallet = installedWallets.find(
          (wallet) => wallet.extensionName === 'talisman',
        );
  
        if (!talismanWallet) {
          throw new Error('Talisman wallet not found. Please install Talisman extension.');
        }
  
        try {
          // Enable the wallet
          await talismanWallet.enable('CopyCrush');
        } catch (enableError: any) {
          console.error('Talisman enable error:', enableError);
          throw new Error('Please authorize this dApp in your Talisman wallet. Open Talisman → Settings → Manage Website Access → Allow this website.');
        }
        
        // Store the wallet instance for later use
        setTalismanWallet(talismanWallet);
  
        // Get accounts synchronously first
        const accounts = await talismanWallet.getAccounts();
        
        if (!accounts || accounts.length === 0) {
          throw new Error('No accounts found or authorized in Talisman. Please check your Talisman wallet settings and ensure at least one account is available.');
        }
  
        // Set the first account immediately
        setWalletAddress(accounts[0].address);
        setWalletType('talisman');
  
        // Also subscribe to account changes for future updates
        talismanWallet.subscribeAccounts((newAccounts: any[]) => {
          console.log('Talisman accounts updated:', newAccounts);
          if (newAccounts && newAccounts.length > 0) {
            setWalletAddress(newAccounts[0].address);
          } else {
            // Handle case where all accounts are disconnected
            setWalletAddress(null);
            setWalletType(null);
            setTalismanWallet(null);
          }
        });
  
        return;
      }
  
      // For Ethereum wallets (rest of the code remains the same)
      if (!anyWindow.ethereum) {
        throw new Error('No Ethereum wallet found. Please install MetaMask, Trust Wallet, or another Ethereum-compatible wallet.');
      }
  
      let targetProvider = null;
  
      // Generic Ethereum connection
      if (walletOption.type === "ethereum" || !walletOption.checkProperty) {
        targetProvider = anyWindow.ethereum;
      } else {
        // Specific wallet connection
        if (anyWindow.ethereum.providers && Array.isArray(anyWindow.ethereum.providers)) {
          targetProvider = anyWindow.ethereum.providers.find(
            (provider: any) => provider[walletOption.checkProperty] === true
          );
        } else if (anyWindow.ethereum[walletOption.checkProperty] === true) {
          targetProvider = anyWindow.ethereum;
        }
  
        if (!targetProvider) {
          targetProvider = anyWindow.ethereum;
        }
      }
  
      const accounts = await targetProvider.request({ method: 'eth_requestAccounts' });
      
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found or user denied access.');
      }
  
      setWalletAddress(accounts[0]);
      setWalletType(walletOption.type);
  
    } catch (err: any) {
      console.error(`${walletOption.type} connection error:`, err);
      setError(err.message || `Failed to connect to ${walletOption.label}`);
    } finally {
      setIsConnecting(false);
    }
  };
  

  // Helper function to detect Ethereum wallet type
  const detectWalletType = (provider: any) => {
    if (provider.isMetaMask) return 'metamask';
    if (provider.isPhantom) return 'phantom';
    if (provider.isTrustWallet) return 'trust';
    if (provider.isRainbow) return 'rainbow';
    if (provider.isCoinbaseWallet) return 'coinbase';
    if (provider.isBraveWallet) return 'brave';
    if (provider.isFrame) return 'frame';
    return 'ethereum';
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setWalletType(null);
    setError(null);
    setTalismanWallet(null);
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getWalletPrefix = (type: string | null) => {
    switch (type) {
      case 'talisman': return 'TAL';
      case 'metamask': return 'MM';
      case 'phantom': return 'PH';
      case 'trust': return 'TW';
      case 'rainbow': return 'RB';
      case 'coinbase': return 'CB';
      case 'brave': return 'BR';
      case 'frame': return 'FR';
      case 'ethereum': return 'ETH';
      default: return 'WALLET';
    }
  };

  // Auto-connect logic
  useEffect(() => {
    const checkExistingConnections = async () => {
      const anyWindow = window as any;

      // Check Talisman using the new API
      try {
        const installedWallets = getWallets().filter((wallet) => wallet.installed);
        const talismanWallet = installedWallets.find(
          (wallet) => wallet.extensionName === 'talisman',
        );

        if (talismanWallet) {
          // Try to enable and get accounts
          await talismanWallet.enable('CopyCrush');
          
          talismanWallet.subscribeAccounts((accounts: any[]) => {
            if (accounts && accounts.length > 0) {
              setWalletAddress(accounts[0].address);
              setWalletType('talisman');
              setTalismanWallet(talismanWallet);
              return; // Exit early if Talisman is connected
            }
          });
        }
      } catch (error) {
        console.log('Talisman auto-connect failed:', error);
      }

      // Check Ethereum wallets if Talisman is not connected
      if (anyWindow.ethereum) {
        try {
          const accounts = await anyWindow.ethereum.request({ method: 'eth_accounts' });
          if (accounts && accounts.length > 0) {
            setWalletAddress(accounts[0]);
            const detectedType = detectWalletType(anyWindow.ethereum);
            setWalletType(detectedType);
          }
        } catch (error) {
          console.log('Ethereum auto-connect failed:', error);
        }
      }
    };

    const timer = setTimeout(checkExistingConnections, 1000);
    return () => clearTimeout(timer);
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
            onClick={() => {
              if (walletAddress) {
                disconnectWallet();
              } else {
                setShowWalletMenu(!showWalletMenu);
              }
            }}
            disabled={isConnecting}
            className="flex items-center space-x-2 px-4 py-2 border border-orange-500 rounded-full text-orange-400 hover:bg-orange-500 hover:text-white transition-all duration-300 disabled:opacity-70"
          >
            <Wallet size={18} />
            <span>
              {isConnecting 
                ? 'Connecting...' 
                : walletAddress 
                  ? `${getWalletPrefix(walletType)}: ${shortenAddress(walletAddress)}`
                  : 'Connect Wallet'
              }
            </span>
            {!walletAddress && <ChevronDown size={16} />}
          </button>

          {/* Wallet Selection Menu */}
          {showWalletMenu && !walletAddress && (
            <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
              <div className="py-1">
                {WALLET_OPTIONS.map((option) => (
                  <button
                    key={option.type}
                    onClick={() => connectSpecificWallet(option)}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

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

      {/* Click outside to close menu */}
      {showWalletMenu && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowWalletMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;
