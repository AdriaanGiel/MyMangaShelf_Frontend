import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Helper functions to get and set data in async storage
 */
export default {
  /**
   * Async function to get data from async storage
   * @param {string} name
   * @returns parsed json value
   */
  async getData(name) {
    try {
      const value = await AsyncStorage.getItem(name);
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (error) {
      console.log("GETDATA,", error.message);
    }
  },

  /**
   * Async functon to add data to async storage
   * @param {string} name
   * @param {string} value
   */
  async addData(name, value) {
    try {
      return await AsyncStorage.setItem(name, JSON.stringify(value));
    } catch (e) {
      // saving error
      console.log(e.message);
    }
  },

  /**
   * Async function to remove data from async storage
   */
  async removeItem(name) {
    try {
      await AsyncStorage.removeItem(name);
    } catch (error) {
      console.log("storage remove: ", error.message);
    }
  },
};
