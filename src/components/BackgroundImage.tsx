import React from 'react';
import { ImageBackground, StyleSheet, ViewStyle, View } from 'react-native';

interface BackgroundImageProps {
  children: React.ReactNode;
  imagePath?: string;
  style?: ViewStyle;
}

export const BackgroundImage: React.FC<BackgroundImageProps> = ({
  children,
  imagePath,
  style,
}) => {
  // Если путь к изображению указан, используем его
  if (imagePath) {
    return (
      <ImageBackground
        source={{ uri: imagePath }}
        style={[styles.container, style]}
        resizeMode="cover"
      >
        {children}
      </ImageBackground>
    );
  }

  // Иначе используем градиентный фон (имитация с помощью View)
  return (
    <View style={[styles.container, style]}>
      <View style={styles.gradientLayer1} />
      <View style={styles.gradientLayer2} />
      <View style={styles.contentContainer}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientLayer1: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#3B3B3B',
  },
  gradientLayer2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(94, 0, 17, 0.3)',
  },
  contentContainer: {
    flex: 1,
    zIndex: 1,
  },
});
