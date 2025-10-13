import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Alert,
  Image,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { stories } from '../data/stories';
import { Story } from '../types';
import { BackgroundImage } from '../components/BackgroundImage';

interface SavedStoryCardProps {
  story: Story;
  onPress: () => void;
  onRemove: () => void;
}

const SavedStoryCard: React.FC<SavedStoryCardProps> = ({
  story,
  onPress,
  onRemove,
}) => (
  <View style={styles.storyCard}>
    <View style={styles.storyImageContainer}>
      <Text style={styles.storyImage}>{story.image}</Text>
    </View>
    
    <View style={styles.storyContent}>
      <Text style={styles.storyTitle}>{story.title}</Text>
      
      <View style={styles.storyActions}>
        <TouchableOpacity style={styles.readButton} onPress={onPress}>
          <Text style={styles.readButtonText}>Read</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
          <Text style={styles.removeIcon}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export const SavedScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { state, dispatch } = useApp();

  const favoriteStories = stories.filter(story =>
    state.userProgress.favorites.includes(story.id)
  );

  const handleStoryPress = (story: Story) => {
    navigation.navigate('StoryDetail', { story });
  };

  const handleRemoveFavorite = (storyId: string) => {
    Alert.alert(
      'Remove from Favorites',
      'Are you sure you want to remove this story from your favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => dispatch({ type: 'REMOVE_FAVORITE', payload: storyId }),
        },
      ]
    );
  };

  const renderStory = ({ item }: { item: Story }) => (
    <SavedStoryCard
      story={item}
      onPress={() => handleStoryPress(item)}
      onRemove={() => handleRemoveFavorite(item.id)}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Image source={require('../assets/img/no.png')} style={{width: 80, height: 180}} />
      <Text style={styles.emptyTitle}>No favorites yet</Text>
      <Text style={styles.emptySubtitle}>
        Add stories you like to read them later
      </Text>
      <TouchableOpacity
        style={styles.exploreButton}
        onPress={() => navigation.navigate('Stories')}
      >
        <Text style={styles.exploreButtonText}>Explore Stories</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <BackgroundImage imagePath={state.userSettings.backgroundImagePath}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved Stories</Text>
        <Text style={styles.headerSubtitle}>
          {favoriteStories.length} {favoriteStories.length === 1 ? 'story' : 'stories'} saved
        </Text>
      </View>

      {favoriteStories.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={favoriteStories}
          renderItem={renderStory}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.storiesList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  headerSubtitle: {
    color: '#888888',
    fontSize: 16,
  },
  storiesList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  storyCard: {
    backgroundColor: '#2a2a2a',
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
  },
  storyImage: {
    fontSize: 50,
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
  removeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    borderRadius: 20,
  },
  removeIcon: {
    fontSize: 18,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtitle: {
    color: '#888888',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  exploreButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  exploreButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
