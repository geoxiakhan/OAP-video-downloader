import React, { useState } from 'react';
import { Youtube, Facebook, Instagram, Search, Loader2 } from 'lucide-react';
import { detectPlatform } from '../utils/urlUtils';
import { PlatformType } from '../types';

interface UrlInputProps {
  url: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

const UrlInput: React.FC<UrlInputProps> = ({ url, onChange, onSubmit, loading }) => {
  const [focused, setFocused] = useState(false);
  const platform = detectPlatform(url);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="relative">
      <div 
        className={`flex items-center overflow-hidden border-2 rounded-lg transition-all duration-200
          ${focused ? 'border-blue-500 dark:border-blue-400 shadow-sm' : 'border-gray-200 dark:border-gray-700'}
          ${platform !== 'unknown' && url ? 'border-l-4' : ''}
          ${platform === 'youtube' ? 'border-l-red-500' : ''}
          ${platform === 'facebook' ? 'border-l-blue-600' : ''}
          ${platform === 'instagram' ? 'border-l-pink-500' : ''}
          bg-white dark:bg-gray-900`}
      >
        <div className="p-3 flex items-center justify-center">
          {getPlatformIcon(platform, url)}
        </div>
        
        <input
          type="text"
          placeholder="Paste video URL here..."
          value={url}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKeyDown}
          className="flex-grow px-3 py-3 text-gray-700 dark:text-gray-200 bg-transparent outline-none"
        />
        
        <button
          onClick={onSubmit}
          disabled={loading || !url.trim()}
          className={`p-3 m-1 rounded-md flex items-center justify-center transition-colors duration-200
            ${loading || !url.trim() ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed' : 
            'bg-blue-500 hover:bg-blue-600 text-white'}`}
        >
          {loading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Search size={20} />
          )}
        </button>
      </div>
      
      <div className="flex justify-center gap-6 mt-4">
        <PlatformIndicator platform="youtube" active={platform === 'youtube'} />
        <PlatformIndicator platform="facebook" active={platform === 'facebook'} />
        <PlatformIndicator platform="instagram" active={platform === 'instagram'} />
      </div>
    </div>
  );
};

const getPlatformIcon = (platform: PlatformType, url: string) => {
  if (!url) return <Search size={20} className="text-gray-400" />;
  
  switch (platform) {
    case 'youtube':
      return <Youtube size={20} className="text-red-500" />;
    case 'facebook':
      return <Facebook size={20} className="text-blue-600" />;
    case 'instagram':
      return <Instagram size={20} className="text-pink-500" />;
    default:
      return <Search size={20} className="text-gray-400" />;
  }
};

interface PlatformIndicatorProps {
  platform: PlatformType;
  active: boolean;
}

const PlatformIndicator: React.FC<PlatformIndicatorProps> = ({ platform, active }) => {
  const getIcon = () => {
    switch (platform) {
      case 'youtube':
        return <Youtube size={18} className={`${active ? 'text-red-500' : 'text-gray-400'}`} />;
      case 'facebook':
        return <Facebook size={18} className={`${active ? 'text-blue-600' : 'text-gray-400'}`} />;
      case 'instagram':
        return <Instagram size={18} className={`${active ? 'text-pink-500' : 'text-gray-400'}`} />;
      default:
        return null;
    }
  };
  
  return (
    <div className={`flex items-center gap-1 text-xs ${active ? 'font-medium' : 'text-gray-400'}`}>
      {getIcon()}
      <span className="capitalize">{platform}</span>
    </div>
  );
};

export default UrlInput;