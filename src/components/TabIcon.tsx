import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';

interface TabIconProps {
  iconPath?: string;
  emoji?: string;
  size?: number;
  focused?: boolean;
}

export const TabIcon: React.FC<TabIconProps> = ({
  iconPath,
  emoji,
  size = 24,
  focused = false,
}) => {
  if (iconPath) {
    return (
      <View style={[
        styles.iconContainer,
        focused && styles.focusedIconContainer,
        { width: size + 16, height: size + 16 }
      ]}>
        <Image
          source={iconPath}
          style={[
            styles.icon,
            {
              width: size,
              height: size,
              opacity: focused ? 1 : 0.6,
            },
          ]}
          resizeMode="contain"
        />
      </View>
    );
  }

  // Fallback to emoji if no icon path provided
  return (
    <View style={[
      styles.iconContainer,
      focused && styles.focusedIconContainer,
      { width: size + 16, height: size + 16 }
    ]}>
      <Text style={[styles.emojiContainer, { fontSize: size }]}>
        {emoji}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  focusedIconContainer: {
    backgroundColor: '#ff4444',
  },
  icon: {
    tintColor: undefined, // Let the image use its original colors
  },
  emojiContainer: {
    textAlign: 'center',
  },
});