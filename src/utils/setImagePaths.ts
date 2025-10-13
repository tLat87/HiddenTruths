// Утилита для установки путей к PNG иконкам
// Замените пути на ваши собственные PNG файлы

export const setImagePaths = () => {
  // Пример путей к PNG иконкам
  // Замените эти пути на ваши собственные файлы
  const imagePaths = {
    // Фоновое изображение (опционально, если не указано - будет градиент)
    background: undefined, // 'file:///path/to/your/background.png'
    
    // Иконки для навигации (опционально, если не указано - будут эмодзи)
    stories: undefined,    // 'file:///path/to/your/stories-icon.png'
    saved: undefined,      // 'file:///path/to/your/saved-icon.png'
    progress: undefined,   // 'file:///path/to/your/progress-icon.png'
    settings: undefined,   // 'file:///path/to/your/settings-icon.png'
  };

  return imagePaths;
};

// Инструкции по использованию:
// 1. Создайте PNG иконки для навигации (рекомендуемый размер: 24x24px)
// 2. Поместите их в папку assets или любую другую папку в проекте
// 3. Укажите полные пути к файлам в imagePaths выше
// 4. Или используйте require() для локальных файлов:
//    stories: require('../assets/stories-icon.png')
//    saved: require('../assets/saved-icon.png')
//    progress: require('../assets/progress-icon.png')
//    settings: require('../assets/settings-icon.png')
