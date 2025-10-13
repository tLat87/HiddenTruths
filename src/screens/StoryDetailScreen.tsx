import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Share,
  Alert,
  Animated,
  Image,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { Story } from '../types';
import { triggerHapticFeedback } from '../utils/hapticFeedback';
import { ConfettiAnimation } from '../components/ConfettiAnimation';
import { BackgroundImage } from '../components/BackgroundImage';

interface StoryDetailScreenProps {
  route: { params: { story: Story } };
  navigation: any;
}

export const StoryDetailScreen: React.FC<StoryDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { state, dispatch } = useApp();
  const { story } = route.params;
  const [showQuiz, setShowQuiz] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const isFavorite = state.userProgress.favorites.includes(story.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch({ type: 'REMOVE_FAVORITE', payload: story.id });
    } else {
      dispatch({ type: 'ADD_FAVORITE', payload: story.id });
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this fascinating story: "${story.title}" from Hidden Truths app!`,
        title: story.title,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleAnswer = (answer: boolean) => {
    setUserAnswer(answer);
    setShowQuiz(false);
    setShowExplanation(true);
    
    const correct = answer === story.isTruth;
    setIsCorrect(correct);
    
    dispatch({ type: 'ADD_ANSWER', payload: { isCorrect: correct } });

    if (correct) {
      // Show confetti animation
      setShowConfetti(true);
    } else {
      // Trigger vibration for wrong answer
      if (state.userSettings.vibrationEnabled) {
        triggerHapticFeedback('heavy');
      }
    }
  };

  const handleBack = () => {
    if (showExplanation) {
      setShowExplanation(false);
      setShowQuiz(false);
      setUserAnswer(null);
      setIsCorrect(null);
      setShowConfetti(false);
    } else {
      navigation.goBack();
    }
  };


  if (showExplanation) {
    return (
      <BackgroundImage imagePath={state.userSettings.backgroundImagePath}>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
        
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Explanation</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.resultContainer}>
            <Text style={styles.resultEmoji}>
              {isCorrect ? '🎉' : '❌'}
            </Text>
            <Text style={styles.resultTitle}>
              {isCorrect ? 'Correct!' : 'Not quite right'}
            </Text>
            <Text style={styles.resultSubtitle}>
              The answer is: {story.isTruth ? 'TRUTH' : 'MYTH'}
            </Text>
          </View>

          <View style={styles.explanationContainer}>
            <Text style={styles.explanationTitle}>Explanation</Text>
            <Text style={styles.explanationText}>{story.explanation}</Text>
          </View>

          <TouchableOpacity style={styles.continueButton} onPress={handleBack}>
            <Text style={styles.continueButtonText}>Continue Reading</Text>
          </TouchableOpacity>
        </ScrollView>

        <ConfettiAnimation
          visible={showConfetti}
          onComplete={() => setShowConfetti(false)}
        />
      </BackgroundImage>
    );
  }

  if (showQuiz) {
    return (
      <BackgroundImage imagePath={state.userSettings.backgroundImagePath}>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
        
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Truth or Myth?</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.quizContainer}>
          <Text style={styles.quizTitle}>What do you think?</Text>
          <Text style={styles.quizSubtitle}>
            Is this story based on truth or is it a myth?
          </Text>

          <View style={styles.quizButtons}>
            <TouchableOpacity
              style={[styles.quizButton, styles.truthButton]}
              onPress={() => handleAnswer(true)}
            >
              <Text style={styles.quizButtonText}>TRUTH</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quizButton, styles.mythButton]}
              onPress={() => handleAnswer(false)}
            >
              <Text style={styles.quizButtonText}>MYTH</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BackgroundImage>
    );
  }

  return (
    <BackgroundImage imagePath={state.userSettings.backgroundImagePath}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {story.title}
        </Text>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareIcon}>📤</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.storyImageContainer}>
          <Image source={story.image} style={{width: 320, height: 220, borderRadius: 15}} />
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleToggleFavorite}
          >
            <Text style={styles.favoriteIcon}>
              {isFavorite ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.storyContent}>{story.content}</Text>

        <TouchableOpacity
          style={styles.quizStartButton}
          onPress={() => setShowQuiz(true)}
        >
          <Text style={styles.quizStartButtonText}>Truth or Myth?</Text>
        </TouchableOpacity>
      </ScrollView>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  shareButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareIcon: {
    fontSize: 20,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  storyImageContainer: {
    height: 200,
    backgroundColor: '#3a3a3a',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  storyImage: {
    fontSize: 80,
  },
  favoriteButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 24,
  },
  storyContent: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
  },
  quizStartButton: {
    backgroundColor: '#ff4444',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30,
  },
  quizStartButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quizContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  quizTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  quizSubtitle: {
    color: '#cccccc',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 50,
    lineHeight: 22,
  },
  quizButtons: {
    width: '100%',
    gap: 20,
  },
  quizButton: {
    paddingVertical: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  truthButton: {
    backgroundColor: '#4CAF50',
  },
  mythButton: {
    backgroundColor: '#FF9800',
  },
  quizButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  resultContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  resultEmoji: {
    fontSize: 60,
    marginBottom: 15,
  },
  resultTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  resultSubtitle: {
    color: '#ff4444',
    fontSize: 18,
    fontWeight: '600',
  },
  explanationContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  explanationTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  explanationText: {
    color: '#cccccc',
    fontSize: 16,
    lineHeight: 24,
  },
  continueButton: {
    backgroundColor: '#ff4444',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30,
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
