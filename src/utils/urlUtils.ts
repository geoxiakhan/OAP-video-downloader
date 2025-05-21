import { PlatformType } from '../types';

/**
 * Detects the platform from a video URL
 */
export const detectPlatform = (url: string): PlatformType => {
  if (!url) return 'unknown';
  
  const normalizedUrl = url.toLowerCase();
  
  if (
    normalizedUrl.includes('youtube.com/watch') || 
    normalizedUrl.includes('youtu.be/') ||
    normalizedUrl.includes('youtube.com/shorts/')
  ) {
    return 'youtube';
  }
  
  if (
    normalizedUrl.includes('facebook.com/watch') || 
    normalizedUrl.includes('fb.watch') ||
    normalizedUrl.includes('facebook.com') && normalizedUrl.includes('/videos/')
  ) {
    return 'facebook';
  }
  
  if (
    normalizedUrl.includes('instagram.com/p/') ||
    normalizedUrl.includes('instagram.com/tv/') ||
    normalizedUrl.includes('instagram.com/reel/')
  ) {
    return 'instagram';
  }
  
  return 'unknown';
};

/**
 * Validates if the URL is supported
 */
export const isValidVideoUrl = (url: string): boolean => {
  return detectPlatform(url) !== 'unknown';
};

/**
 * Extracts video ID from YouTube URL
 */
export const getYoutubeVideoId = (url: string): string | null => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
};