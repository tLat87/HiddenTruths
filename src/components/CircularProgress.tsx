import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface CircularProgressProps {
  progress: number; // 0 to 1
  size: number;
  strokeWidth: number;
  color: string;
  backgroundColor: string;
  title: string;
  subtitle: string;
  centerText: string;
  centerSubtext: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size,
  strokeWidth,
  color,
  backgroundColor,
  title,
  subtitle,
  centerText,
  centerSubtext,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      
      <View style={styles.progressContainer}>
        <View style={[styles.circleContainer, { width: size, height: size }]}>
          {/* Background circle */}
          <View
            style={[
              styles.circle,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: strokeWidth,
                borderColor: backgroundColor,
              },
            ]}
          />
          
          {/* Progress circle */}
          <Animated.View
            style={[
              styles.progressCircle,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: strokeWidth,
                borderColor: color,
                borderTopColor: color,
                borderRightColor: color,
                borderBottomColor: progress >= 1 ? color : 'transparent',
                borderLeftColor: progress >= 1 ? color : 'transparent',
                transform: [
                  {
                    rotate: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              },
            ]}
          />
          
          {/* Center text */}
          <View style={styles.centerTextContainer}>
            <Text style={styles.centerText}>{centerText}</Text>
            <Text style={styles.centerSubtext}>{centerSubtext}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#cccccc',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
    borderStyle: 'solid',
  },
  progressCircle: {
    position: 'absolute',
    borderStyle: 'solid',
  },
  centerTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centerSubtext: {
    color: '#888888',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
  },
});
