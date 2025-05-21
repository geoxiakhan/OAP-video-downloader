import React, { useState } from 'react';
import UrlInput from './UrlInput';
import VideoPreview from './VideoPreview';
import DownloadOptions from './DownloadOptions';
import { detectPlatform } from '../utils/urlUtils';
import { fetchVideoInfo, downloadVideo } from '../utils/apiUtils';
import { VideoInfo, VideoQualityOption, VideoFormatOption } from '../types';

const DownloaderCard: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<string>('720p');
  const [selectedFormat, setSelectedFormat] = useState<string>('mp4');
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleUrlChange = (value: string) => {
    setUrl(value);
    if (videoInfo) {
      setVideoInfo(null);
    }
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (!url.trim()) return;
    
    const platform = detectPlatform(url);
    if (platform === 'unknown') {
      setError('Unsupported URL. Please enter a valid YouTube, Facebook, or Instagram video URL.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const info = await fetchVideoInfo(url);
      setVideoInfo(info);
    } catch (err) {
      setError('Failed to fetch video information. Please check the URL and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!videoInfo) return;
    
    setIsDownloading(true);
    
    try {
      const downloadUrl = await downloadVideo(url, selectedQuality, selectedFormat);
      // Create a temporary anchor element to trigger the download
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `video.${selectedFormat}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      setError('Failed to download video. Please try again.');
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  const qualityOptions: VideoQualityOption[] = [
    { label: '360p', value: '360p', resolution: '640x360' },
    { label: '480p', value: '480p', resolution: '854x480' },
    { label: '720p', value: '720p', resolution: '1280x720' },
    { label: '1080p', value: '1080p', resolution: '1920x1080' },
    { label: '4K', value: '4k', resolution: '3840x2160' },
  ];

  const formatOptions: VideoFormatOption[] = [
    { label: 'MP4', value: 'mp4' },
    { label: 'MP3 (Audio)', value: 'mp3' },
  ];

  return (
    <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-all duration-300 transform">
      <div className="p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Download Videos from Social Media
        </h1>
        
        <UrlInput 
          url={url} 
          onChange={handleUrlChange} 
          onSubmit={handleSubmit}
          loading={loading}
        />
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 rounded-md text-sm">
            {error}
          </div>
        )}
        
        {videoInfo && (
          <>
            <VideoPreview videoInfo={videoInfo} />
            
            <DownloadOptions
              qualityOptions={qualityOptions}
              formatOptions={formatOptions}
              selectedQuality={selectedQuality}
              selectedFormat={selectedFormat}
              onQualityChange={setSelectedQuality}
              onFormatChange={setSelectedFormat}
              onDownload={handleDownload}
              isDownloading={isDownloading}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default DownloaderCard;