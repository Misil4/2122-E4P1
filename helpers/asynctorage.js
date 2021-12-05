import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAsyncStorageKey = async (key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.log("ha salido error"+error)
    }
    console.log("todo hecho")
  }
  export const setAsyncStorageKey = async (key,value) => {
          await AsyncStorage.setItem(key,value) 
  }
  export const removeAsyncStorageKey = async (key) => {
       await AsyncStorage.removeItem(key)
  }