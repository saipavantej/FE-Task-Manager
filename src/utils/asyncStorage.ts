import AsyncStorage from '@react-native-async-storage/async-storage';

const setItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (e) {
    return false;
  }
};

const setMultipleItems = async (
  items: [string, string][],
): Promise<boolean> => {
  try {
    await AsyncStorage.multiSet(items);
    return true;
  } catch (error) {
    console.error('Error setting multiple items in AsyncStorage:', error);
    return false;
  }
};

const getItem = async (key: string) => {
  try {
    const result = await AsyncStorage.getItem(key);
    if (result) {
      return result;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

const getAllItems = async () => {
  const keys = await AsyncStorage.getAllKeys();
  try {
    return await AsyncStorage.multiGet(keys);
  } catch (error) {
    return false;
  }
};

const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

const removeAllItems = async () => {
  const keys = await AsyncStorage.getAllKeys();
  try {
    await AsyncStorage.multiRemove(keys);
    return true;
  } catch (e) {
    return false;
  }
};

export {
  setItem,
  getItem,
  getAllItems,
  removeItem,
  removeAllItems,
  setMultipleItems,
};
