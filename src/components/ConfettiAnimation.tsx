import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface ConfettiAnimationProps {
  visible: boolean;
  onComplete?: () => void;
}

export const ConfettiAnimation: React.FC<ConfettiAnimationProps> = ({
  visible,
  onComplete,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onComplete?.();
      });
    }
  }, [visible]);

  if (!visible) return null;

  const confettiEmojis = ['🎉', '✨', '🌟', '💫', '⭐', '🎊'];

  return (
    <View style={styles.container} pointerEvents="none">
      {confettiEmojis.map((emoji, index) => {
        const randomX = Math.random() * width;
        const randomY = Math.random() * height;
        const randomRotation = Math.random() * 360;
        const randomScale = 0.5 + Math.random() * 0.5;

        return (
          <Animated.View
            key={index}
            style={[
              styles.confetti,
              {
                left: randomX,
                top: randomY,
                opacity: animatedValue,
                transform: [
                  {
                    rotate: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', `${randomRotation}deg`],
                    }),
                  },
                  {
                    scale: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, randomScale],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.confettiText}>{emoji}</Text>
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  confetti: {
    position: 'absolute',
  },
  confettiText: {
    fontSize: 30,
  },
});
