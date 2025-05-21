export type PlatformType = 'youtube' | 'facebook' | 'instagram' | 'unknown';

export interface VideoInfo {
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
  platform: PlatformType;
}

export interface VideoQualityOption {
  label: string;
  value: string;
  resolution: string;
}

export interface VideoFormatOption {
  label: string;
  value: string;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}