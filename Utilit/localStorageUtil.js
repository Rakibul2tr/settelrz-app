import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveDataToStorage = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to storage:', error);
  }
};

export const getDataFromStorage = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting data from storage:', error);
    return null;
  }
};