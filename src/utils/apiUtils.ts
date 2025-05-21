import { VideoInfo, PlatformType } from '../types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const fetchVideoInfo = async (url: string): Promise<VideoInfo> => {
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/download-video`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch video information');
    }

    const data = await response.json();
    return {
      title: data.title || 'Video Title',
      thumbnail: data.thumbnail || 'https://images.pexels.com/photos/2882566/pexels-photo-2882566.jpeg',
      duration: data.duration || '0:00',
      author: data.author || 'Unknown',
      platform: detectPlatformFromUrl(url),
    };
  } catch (error) {
    console.error('Error fetching video info:', error);
    throw error;
  }
};

export const downloadVideo = async (
  url: string,
  quality: string,
  format: string
): Promise<string> => {
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/download-video`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, quality, format }),
    });

    if (!response.ok) {
      throw new Error('Failed to get download URL');
    }

    const { downloadUrl } = await response.json();
    return downloadUrl;
  } catch (error) {
    console.error('Error downloading video:', error);
    throw error;
  }
};

const detectPlatformFromUrl = (url: string): PlatformType => {
  if (url.includes('youtube') || url.includes('youtu.be')) {
    return 'youtube';
  } else if (url.includes('facebook') || url.includes('fb.watch')) {
    return 'facebook';
  } else if (url.includes('instagram')) {
    return 'instagram';
  }
  return 'unknown';
};