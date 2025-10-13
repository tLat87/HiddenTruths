import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Share,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { ToggleSwitch } from '../components/ToggleSwitch';
import { BackgroundImage } from '../components/BackgroundImage';

export const SettingsScreen: React.FC = () => {
  const { state, dispatch } = useApp();
  const [showClearFavoritesDialog, setShowClearFavoritesDialog] = useState(false);
  const [showResetProgressDialog, setShowResetProgressDialog] = useState(false);

  const handleMusicToggle = (value: boolean) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: { musicEnabled: value } });
  };

  const handleVibrationToggle = (value: boolean) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: { vibrationEnabled: value } });
  };

  const handleClearFavorites = () => {
    Alert.alert(
      'Clear Favorites',
      'Are you sure you want to delete all favorites? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            dispatch({ type: 'CLEAR_FAVORITES' });
            setShowClearFavoritesDialog(false);
          },
        },
      ]
    );
  };

  const handleResetProgress = () => {
    Alert.alert(
      'Reset Progress',
      'Are you sure you want to reset your progress? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            dispatch({ type: 'RESET_PROGRESS' });
            setShowResetProgressDialog(false);
          },
        },
      ]
    );
  };

  const handleShareApp = async () => {
    try {
      await Share.share({
        message: 'Check out Hidden Truths - an amazing app that explores the stories between fact and fable!',
        title: 'Hidden Truths',
      });
    } catch (error) {
      console.error('Error sharing app:', error);
    }
  };

  const SettingItem: React.FC<{
    title: string;
    icon: string;
    onPress?: () => void;
    rightComponent?: React.ReactNode;
  }> = ({ title, icon, onPress, rightComponent }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingLeft}>
        <Text style={styles.settingIcon}>{icon}</Text>
        <Text style={styles.settingTitle}>{title}</Text>
      </View>
      {rightComponent}
    </TouchableOpacity>
  );

  return (
    <BackgroundImage imagePath={state.userSettings.backgroundImagePath}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        <View style={styles.settingsCard}>
       

          <SettingItem
            title="Vibration"
            icon="📳"
            rightComponent={
              <ToggleSwitch
                value={state.userSettings.vibrationEnabled}
                onValueChange={handleVibrationToggle}
              />
            }
          />

          <SettingItem
            title="Clear Favorites"
            icon="🗑️"
            onPress={() => setShowClearFavoritesDialog(true)}
          />

          <SettingItem
            title="Reset Progress"
            icon="🔄"
            onPress={() => setShowResetProgressDialog(true)}
          />

          <SettingItem
            title="Share App"
            icon="📤"
            onPress={handleShareApp}
          />

         
        </View>
      </ScrollView>

      {showClearFavoritesDialog && (
        <View style={styles.dialogOverlay}>
          <View style={styles.dialogContainer}>
            <Text style={styles.dialogTitle}>
              Are you sure you want to delete all favorites?
            </Text>
            <Text style={styles.dialogMessage}>
              This action cannot be undone.
            </Text>
            
            <View style={styles.dialogButtons}>
              <TouchableOpacity
                style={[styles.dialogButton, styles.cancelButton]}
                onPress={() => setShowClearFavoritesDialog(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.dialogButton, styles.confirmButton]}
                onPress={handleClearFavorites}
              >
                <Text style={styles.confirmButtonText}>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {showResetProgressDialog && (
        <View style={styles.dialogOverlay}>
          <View style={styles.dialogContainer}>
            <Text style={styles.dialogTitle}>
              Are you sure you want to reset your progress?
            </Text>
            <Text style={styles.dialogMessage}>
              This action cannot be undone.
            </Text>
            
            <View style={styles.dialogButtons}>
              <TouchableOpacity
                style={[styles.dialogButton, styles.cancelButton]}
                onPress={() => setShowResetProgressDialog(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.dialogButton, styles.confirmButton]}
                onPress={handleResetProgress}
              >
                <Text style={styles.confirmButtonText}>Reset</Text>
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
    backgroundColor: '#1a1a1a',
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
  settingsCard: {
    backgroundColor: '#9F0000',
    borderRadius: 15,
    padding: 20,
    marginBottom: 50,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  settingTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
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
    backgroundColor: '#2a2a2a',
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
    color: '#cccccc',
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
  cancelButton: {
    backgroundColor: '#444444',
  },
  confirmButton: {
    backgroundColor: '#ff4444',
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
