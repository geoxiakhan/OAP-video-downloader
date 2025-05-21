import React from 'react';
import { Download, Loader2 } from 'lucide-react';
import { VideoQualityOption, VideoFormatOption } from '../types';

interface DownloadOptionsProps {
  qualityOptions: VideoQualityOption[];
  formatOptions: VideoFormatOption[];
  selectedQuality: string;
  selectedFormat: string;
  onQualityChange: (quality: string) => void;
  onFormatChange: (format: string) => void;
  onDownload: () => void;
  isDownloading: boolean;
}

const DownloadOptions: React.FC<DownloadOptionsProps> = ({
  qualityOptions,
  formatOptions,
  selectedQuality,
  selectedFormat,
  onQualityChange,
  onFormatChange,
  onDownload,
  isDownloading
}) => {
  return (
    <div className="mt-6 animate-fadeIn">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Download Options</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="quality" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Quality
          </label>
          <select
            id="quality"
            value={selectedQuality}
            onChange={(e) => onQualityChange(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {qualityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} ({option.resolution})
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="format" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Format
          </label>
          <select
            id="format"
            value={selectedFormat}
            onChange={(e) => onFormatChange(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {formatOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <button
        onClick={onDownload}
        disabled={isDownloading}
        className={`w-full py-3 px-4 rounded-md font-medium transition-all duration-300 flex items-center justify-center
          ${isDownloading 
            ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' 
            : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg'}`}
      >
        {isDownloading ? (
          <>
            <Loader2 size={20} className="mr-2 animate-spin" />
            <span>Preparing Download...</span>
          </>
        ) : (
          <>
            <Download size={20} className="mr-2" />
            <span>Download Now</span>
          </>
        )}
      </button>
    </div>
  );
};

export default DownloadOptions;