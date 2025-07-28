// Local storage utility functions for notes app

export const STORAGE_KEYS = {
  CATEGORIES: 'notes-app-categories',
  NOTES: 'notes-app-notes',
  SELECTED_CATEGORY: 'notes-app-selected-category'
};

export const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

export const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

export const clearAllData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

export const exportData = () => {
  try {
    const data = {
      categories: loadFromLocalStorage(STORAGE_KEYS.CATEGORIES, []),
      notes: loadFromLocalStorage(STORAGE_KEYS.NOTES, []),
      selectedCategory: loadFromLocalStorage(STORAGE_KEYS.SELECTED_CATEGORY, null),
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `notes-backup-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    return true;
  } catch (error) {
    console.error('Error exporting data:', error);
    return false;
  }
};

export const importData = (file) => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          
          // Validate data structure
          if (!data.categories || !Array.isArray(data.categories) || 
              !data.notes || !Array.isArray(data.notes)) {
            throw new Error('Invalid data format');
          }
          
          // Save imported data
          saveToLocalStorage(STORAGE_KEYS.CATEGORIES, data.categories);
          saveToLocalStorage(STORAGE_KEYS.NOTES, data.notes);
          if (data.selectedCategory) {
            saveToLocalStorage(STORAGE_KEYS.SELECTED_CATEGORY, data.selectedCategory);
          }
          
          resolve(data);
        } catch (parseError) {
          reject(new Error('Invalid JSON file or data format'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };
      
      reader.readAsText(file);
    } catch (error) {
      reject(error);
    }
  });
};
