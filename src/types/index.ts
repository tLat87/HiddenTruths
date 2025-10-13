export interface Story {
  id: string;
  title: string;
  content: string;
  explanation: string;
  isTruth: boolean;
  image: string;
}

export interface UserProgress {
  totalStories: number;
  readStories: string[];
  correctAnswers: number;
  totalAnswers: number;
  favorites: string[];
}

export interface UserSettings {
  musicEnabled: boolean;
  vibrationEnabled: boolean;
  backgroundImagePath?: string;
  storiesIconPath?: string;
  savedIconPath?: string;
  progressIconPath?: string;
  settingsIconPath?: string;
}

export type OnboardingStep = 'welcome' | 'stories' | 'quiz' | 'progress';
