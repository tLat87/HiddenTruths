// Утилита для установки путей к изображениям
// Вы можете изменить эти пути на ваши собственные PNG файлы

export const defaultImagePaths = {
  // Фоновое изображение для всех экранов
  background: undefined, // 'file:///path/to/your/background.png'
  
  // Иконки для навигации
  stories: undefined,    // 'file:///path/to/your/stories-icon.png'
  saved: undefined,      // 'file:///path/to/your/saved-icon.png'
  progress: undefined,   // 'file:///path/to/your/progress-icon.png'
  settings: undefined,   // 'file:///path/to/your/settings-icon.png'
};

// Функция для установки путей к изображениям
export const setImagePaths = (paths: Partial<typeof defaultImagePaths>) => {
  return {
    backgroundImagePath: paths.background,
    storiesIconPath: paths.stories,
    savedIconPath: paths.saved,
    progressIconPath: paths.progress,
    settingsIconPath: paths.settings,
  };
};

// Пример использования:
// const imagePaths = setImagePaths({
//   background: 'file:///Users/username/Desktop/background.png',
//   stories: 'file:///Users/username/Desktop/stories-icon.png',
//   saved: 'file:///Users/username/Desktop/saved-icon.png',
//   progress: 'file:///Users/username/Desktop/progress-icon.png',
//   settings: 'file:///Users/username/Desktop/settings-icon.png',
// });
