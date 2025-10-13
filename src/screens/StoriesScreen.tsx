import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Share,
  Alert,
  Image,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { stories } from '../data/stories';
import { Story } from '../types';
import { BackgroundImage } from '../components/BackgroundImage';

interface StoryCardProps {
  story: Story;
  isFavorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
  onShare: () => void;
}

const StoryCard: React.FC<StoryCardProps> = ({
  story,
  isFavorite,
  onPress,
  onToggleFavorite,
  onShare,
}) => (
  <View style={styles.storyCard}>
    <View style={styles.storyImageContainer}>
      <Image source={story.image} style={{width: 120, height: 120}} />
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={onToggleFavorite}
      >
        <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>
    </View>
    
    <View style={styles.storyContent}>
      <Text style={styles.storyTitle}>{story.title}</Text>
      
      <View style={styles.storyActions}>
        <TouchableOpacity style={styles.readButton} onPress={onPress}>
          <Text style={styles.readButtonText}>Read</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.shareButton} onPress={onShare}>
          <Image source={require('../assets/img/share.png')} style={{width: 20, height: 20}} />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export const StoriesScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { state, dispatch } = useApp();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortedStories = useMemo(() => {
    const sorted = [...stories].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    return sorted;
  }, [sortOrder]);

  const handleStoryPress = (story: Story) => {
    dispatch({ type: 'MARK_STORY_READ', payload: story.id });
    navigation.navigate('StoryDetail', { story });
  };

  const handleToggleFavorite = (storyId: string) => {
    const isFavorite = state.userProgress.favorites.includes(storyId);
    if (isFavorite) {
      dispatch({ type: 'REMOVE_FAVORITE', payload: storyId });
    } else {
      dispatch({ type: 'ADD_FAVORITE', payload: storyId });
    }
  };

  const handleShare = async (story: Story) => {
    try {
      await Share.share({
        message: `Check out this fascinating story: "${story.title}" from Hidden Truths app!`,
        title: story.title,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const renderStory = ({ item }: { item: Story }) => {
    const isFavorite = state.userProgress.favorites.includes(item.id);
    
    return (
      <StoryCard
        story={item}
        isFavorite={isFavorite}
        onPress={() => handleStoryPress(item)}
        onToggleFavorite={() => handleToggleFavorite(item.id)}
        onShare={() => handleShare(item)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      
      <View style={styles.header}>
        <View style={styles.profileSection}>
          {/* <Text style={styles.profileIcon}>👤</Text> */}
        </View>
        
        <TouchableOpacity style={styles.sortButton} onPress={toggleSortOrder}>
          <Text style={styles.sortIcon}>A Z</Text>
          <Text style={styles.sortArrow}>{sortOrder === 'asc' ? '↑' : '↓'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={sortedStories}
        renderItem={renderStory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.storiesList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  profileSection: {
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 40,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  sortIcon: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 5,
  },
  sortArrow: {
    color: '#ff4444',
    fontSize: 16,
    fontWeight: 'bold',
  },
  storiesList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  storyCard: {
    backgroundColor: '#9F0000',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  storyImageContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    position: 'relative',
  },
  storyImage: {
    fontSize: 50,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 20,
  },
  storyContent: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  storyActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  readButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  readButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  shareButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    borderRadius: 20,
  },
  shareIcon: {
    fontSize: 18,
  },
});
