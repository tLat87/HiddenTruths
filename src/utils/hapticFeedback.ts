import { Platform } from 'react-native';

export const triggerHapticFeedback = (type: 'light' | 'medium' | 'heavy' = 'medium') => {
  if (Platform.OS === 'ios') {
    // For iOS, we would use HapticFeedback from react-native-haptic-feedback
    // For now, we'll just log it
    console.log(`Haptic feedback: ${type}`);
  } else if (Platform.OS === 'android') {
    // For Android, we would use Vibration API
    console.log(`Vibration: ${type}`);
  }
};
