import React from 'react';
import { Clock, User } from 'lucide-react';
import { VideoInfo } from '../types';

interface VideoPreviewProps {
  videoInfo: VideoInfo;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ videoInfo }) => {
  const { title, thumbnail, duration, author, platform } = videoInfo;

  const getPlatformColorClass = () => {
    switch (platform) {
      case 'youtube':
        return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      case 'facebook':
        return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      case 'instagram':
        return 'text-pink-500 bg-pink-50 dark:bg-pink-900/20';
      default:
        return 'text-gray-500 bg-gray-100 dark:bg-gray-800';
    }
  };

  return (
    <div className="mt-8 animate-fadeIn">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Video Preview</h2>
      
      <div className="rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800/50">
        <div className="relative aspect-video">
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 right-3">
            <span className="px-2 py-1 rounded text-xs font-medium bg-black/70 text-white">
              {duration}
            </span>
          </div>
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getPlatformColorClass()}`}>
              {platform}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2 mb-2">{title}</h3>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center mr-4">
              <User size={14} className="mr-1" />
              <span className="truncate max-w-[200px]">{author}</span>
            </div>
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>{duration}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;