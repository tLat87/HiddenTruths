import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProgress, UserSettings, Story } from '../types';
import { setImagePaths } from '../utils/setImagePaths';

interface AppState {
  userProgress: UserProgress;
  userSettings: UserSettings;
  hasCompletedOnboarding: boolean;
  stories: Story[];
}

type AppAction =
  | { type: 'SET_HAS_COMPLETED_ONBOARDING'; payload: boolean }
  | { type: 'UPDATE_PROGRESS'; payload: Partial<UserProgress> }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<UserSettings> }
  | { type: 'ADD_FAVORITE'; payload: string }
  | { type: 'REMOVE_FAVORITE'; payload: string }
  | { type: 'MARK_STORY_READ'; payload: string }
  | { type: 'ADD_ANSWER'; payload: { isCorrect: boolean } }
  | { type: 'RESET_PROGRESS' }
  | { type: 'CLEAR_FAVORITES' }
  | { type: 'LOAD_STATE'; payload: AppState };

// Получаем пути к изображениям
const imagePaths = setImagePaths();

const initialState: AppState = {
  userProgress: {
    totalStories: 10,
    readStories: [],
    correctAnswers: 0,
    totalAnswers: 0,
    favorites: [],
  },
  userSettings: {
    musicEnabled: true,
    vibrationEnabled: true,
    backgroundImagePath: imagePaths.background,
    storiesIconPath: imagePaths.stories,
    savedIconPath: imagePaths.saved,
    progressIconPath: imagePaths.progress,
    settingsIconPath: imagePaths.settings,
  },
  hasCompletedOnboarding: false,
  stories: [],
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_HAS_COMPLETED_ONBOARDING':
      return { ...state, hasCompletedOnboarding: action.payload };
    case 'UPDATE_PROGRESS':
      return { ...state, userProgress: { ...state.userProgress, ...action.payload } };
    case 'UPDATE_SETTINGS':
      return { ...state, userSettings: { ...state.userSettings, ...action.payload } };
    case 'ADD_FAVORITE':
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          favorites: [...state.userProgress.favorites, action.payload],
        },
      };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          favorites: state.userProgress.favorites.filter(id => id !== action.payload),
        },
      };
    case 'MARK_STORY_READ':
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          readStories: [...new Set([...state.userProgress.readStories, action.payload])],
        },
      };
    case 'ADD_ANSWER':
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          correctAnswers: state.userProgress.correctAnswers + (action.payload.isCorrect ? 1 : 0),
          totalAnswers: state.userProgress.totalAnswers + 1,
        },
      };
    case 'RESET_PROGRESS':
      return {
        ...state,
        userProgress: {
          ...initialState.userProgress,
          totalStories: state.userProgress.totalStories,
        },
      };
    case 'CLEAR_FAVORITES':
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          favorites: [],
        },
      };
    case 'LOAD_STATE':
      return action.payload;
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load state from AsyncStorage on app start
  useEffect(() => {
    const loadState = async () => {
      try {
        const savedState = await AsyncStorage.getItem('appState');
        if (savedState) {
          const parsedState = JSON.parse(savedState);
          dispatch({ type: 'LOAD_STATE', payload: parsedState });
        }
      } catch (error) {
        console.error('Error loading state:', error);
      }
    };
    loadState();
  }, []);

  // Save state to AsyncStorage whenever it changes
  useEffect(() => {
    const saveState = async () => {
      try {
        await AsyncStorage.setItem('appState', JSON.stringify(state));
      } catch (error) {
        console.error('Error saving state:', error);
      }
    };
    saveState();
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
