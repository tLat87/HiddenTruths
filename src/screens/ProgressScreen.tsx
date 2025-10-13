import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { CircularProgress } from '../components/CircularProgress';
import { BackgroundImage } from '../components/BackgroundImage';

export const ProgressScreen: React.FC = () => {
  const { state, dispatch } = useApp();
  const [showResetDialog, setShowResetDialog] = useState(false);

  const truthAccuracy = state.userProgress.totalAnswers > 0 
    ? state.userProgress.correctAnswers / state.userProgress.totalAnswers 
    : 0;

  const readingProgress = state.userProgress.totalStories > 0
    ? state.userProgress.readStories.length / state.userProgress.totalStories
    : 0;

  const getAccuracyRank = (accuracy: number): string => {
    if (accuracy === 0) return 'The Unawakened';
    if (accuracy < 0.2) return 'The Curious';
    if (accuracy < 0.4) return 'The Seeker';
    if (accuracy < 0.6) return 'The Discerner';
    if (accuracy < 0.8) return 'The Wise';
    if (accuracy < 1) return 'The Enlightened';
    return 'Truth Keeper';
  };

  const getReadingRank = (progress: number): string => {
    if (progress === 0) return 'The Unawakened';
    if (progress < 0.2) return 'The Curious';
    if (progress < 0.4) return 'The Seeker';
    if (progress < 0.6) return 'The Discerner';
    if (progress < 0.8) return 'The Wise';
    if (progress < 1) return 'The Enlightened';
    return 'Truth Keeper';
  };

  const handleResetProgress = () => {
    Alert.alert(
      'Reset Progress',
      'Are you sure you want to reset your progress? All progress will be permanently lost. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            dispatch({ type: 'RESET_PROGRESS' });
            setShowResetDialog(false);
          },
        },
      ]
    );
  };

  return (
    <BackgroundImage imagePath={state.userSettings.backgroundImagePath}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Progress</Text>
        </View>

        <CircularProgress
          progress={truthAccuracy}
          size={200}
          strokeWidth={8}
          color="#ff4444"
          backgroundColor="#333333"
          title="Truth Accuracy"
          subtitle="Your accuracy score — see how often you separate fact from fable."
          centerText={getAccuracyRank(truthAccuracy)}
          centerSubtext={`${state.userProgress.correctAnswers}/${state.userProgress.totalAnswers}`}
        />

        <CircularProgress
          progress={readingProgress}
          size={200}
          strokeWidth={8}
          color="#ff4444"
          backgroundColor="#333333"
          title="Reading Progress"
          subtitle="See how far your curiosity has taken you through the world of legends."
          centerText={getReadingRank(readingProgress)}
          centerSubtext={`${state.userProgress.readStories.length}/${state.userProgress.totalStories}`}
        />

        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => setShowResetDialog(true)}
        >
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </ScrollView>

      {showResetDialog && (
        <View style={styles.dialogOverlay}>
          <View style={styles.dialogContainer}>
            <Text style={styles.dialogTitle}>
              Are you sure you want to reset your progress?
            </Text>
            <Text style={styles.dialogMessage}>
              All progress will be permanently lost. Continue?
            </Text>
            
            <View style={styles.dialogButtons}>
              <TouchableOpacity
                style={[styles.dialogButton, styles.noButton]}
                onPress={() => setShowResetDialog(false)}
              >
                <Text style={styles.noButtonText}>No</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.dialogButton, styles.yesButton]}
                onPress={handleResetProgress}
              >
                <Text style={styles.yesButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9F0000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#ff4444',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 50,
  },
  resetButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dialogOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  dialogContainer: {
    backgroundColor: '#9F0000',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    width: '100%',
  },
  dialogTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  dialogMessage: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  dialogButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  dialogButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
  },
  noButton: {
    backgroundColor: '#4CAF50',
  },
  yesButton: {
    backgroundColor: '#ff4444',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  noButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  yesButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
