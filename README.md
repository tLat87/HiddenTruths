# Hidden Truths

**Uncover the stories between fact and fable.**

A React Native app that explores the fascinating world where myths and history intertwine. Each story hides a secret — your task is to decide whether it's true or just a tale.

## Features

### 📖 Stories
- **10 mysterious stories** inspired by real legends and timeless myths
- Beautiful story cards with emoji illustrations
- A-Z / Z-A sorting functionality
- Share stories with friends

### 🧩 Truth or Tale Quiz
- Interactive quiz after each story
- Test your intuition and learn fascinating facts
- Immediate feedback with explanations
- Animated confetti for correct answers
- Haptic feedback for wrong answers

### ⭐ Progress Tracking
- **Truth Accuracy** - Track how often you separate fact from fable
- **Reading Progress** - See how far your curiosity has taken you
- Elegant circular progress bars with smooth animations
- Rank system from "The Unawakened" to "Truth Keeper"
- Reset progress functionality

### 💾 Favorites
- Save your favorite stories for later reading
- Easy access to saved stories
- Remove stories from favorites
- Clear all favorites option

### ⚙️ Settings
- Toggle music on/off
- Toggle vibration on/off
- Clear all favorites
- Reset all progress
- Share the app with friends

### 🎨 Onboarding
- 4-screen onboarding experience
- Swipe navigation between screens
- Introduction to app features
- Skip option available

## Getting Started

### Prerequisites

- Node.js (>= 18)
- React Native development environment
- iOS Simulator or Android Emulator

### Installation

1. Install dependencies:
```bash
npm install
```

2. For iOS:
```bash
cd ios && pod install && cd ..
```

3. Start the Metro bundler:
```bash
npm start
```

4. Run the app:
```bash
# For iOS
npm run ios

# For Android
npm run android
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CircularProgress.tsx
│   ├── ConfettiAnimation.tsx
│   └── ToggleSwitch.tsx
├── context/            # React Context for state management
│   └── AppContext.tsx
├── data/               # Static data
│   └── stories.ts
├── navigation/         # Navigation configuration
│   └── AppNavigator.tsx
├── screens/            # App screens
│   ├── OnboardingScreen.tsx
│   ├── StoriesScreen.tsx
│   ├── StoryDetailScreen.tsx
│   ├── SavedScreen.tsx
│   ├── ProgressScreen.tsx
│   └── SettingsScreen.tsx
├── types/              # TypeScript type definitions
│   └── index.ts
└── utils/              # Utility functions
    └── hapticFeedback.ts
```

## Technologies Used

- **React Native** - Cross-platform mobile development
- **TypeScript** - Type safety and better development experience
- **React Navigation** - Navigation between screens
- **AsyncStorage** - Data persistence
- **React Context** - State management
- **Animated API** - Smooth animations and transitions

## Features Implementation

### State Management
- Uses React Context for global state management
- Persistent storage with AsyncStorage
- User progress, settings, and favorites tracking

### Animations
- Smooth circular progress bars
- Confetti animation for correct answers
- Toggle switch animations
- Screen transitions

### Data Persistence
- User progress automatically saved
- Settings preferences remembered
- Favorites list maintained across app sessions

## Available Scripts

- `npm start` - Start Metro bundler
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## Story Content

The app includes 10 carefully crafted stories covering:
- Ancient Greek mythology and history
- Archaeological discoveries
- Legendary places and events
- Historical figures and their stories
- Modern mysteries and legends

Each story is designed to challenge your knowledge and intuition about what's real and what's myth.

## Contributing

Feel free to contribute to this project by:
- Adding new stories
- Improving the UI/UX
- Adding new features
- Fixing bugs
- Improving performance

## License

This project is for educational and entertainment purposes.