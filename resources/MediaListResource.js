import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosInstance } from "../helpers/AxiosInstance";

export default class MediaListResource {
  async addMediaToListLocal(media, folder) {
    try {
      //   await AsyncStorage.removeItem("userMedia");
      let history = await AsyncStorage.getItem("userMedia");

      console.log("type", typeof history);

      if (history !== null) {
        history = JSON.parse(history);
      } else {
        history = {};
      }

      history[`${media.title}`] = {
        media,
        folder,
      };

      await AsyncStorage.setItem("userMedia", JSON.stringify(history));
    } catch (error) {
      console.log("set local user list", error.message);
    }
  }

  async getUserMediaListLocal() {
    try {
      const mediaList = await AsyncStorage.getItem("userMedia");

      return JSON.parse(mediaList);
    } catch (error) {
      console.log("local user list: ", error.message);
    }
  }

  /**
   * Function to get user media list from database
   * @param {object} user
   * @returns media list
   */
  async getUserMediaList(token) {
    try {
      /// remove hardcoded ip
      AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await AxiosInstance.get(`/user-media-list`);

      return response.data;
    } catch (error) {
      console.error("ERROR ME: ", error.response.message);
    }
  }

  /**
   * Function to add media to users list
   * @param {number} media_id
   * @param {object} folder
   * @param {string} token
   * @returns response status
   */
  async addMediaToList(media_id, folder, token) {
    try {
      AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await AxiosInstance.post(`user-media-list/add`, { media_id, folder });

      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }

  /**
   * Function to remove media from user list
   * @param {number} media_id
   * @param {string} token
   * @returns response status
   */
  async removeMediaFromList(media_id, token) {
    try {
      AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await AxiosInstance.delete(`/user-media-list/remove`, {
        data: {
          media_id: media_id,
        },
      });
      //TODO change response

      return response.status;
    } catch (error) {
      console.log(error.message);
    }
  }

  async getSearchResults(search, token) {
    try {
      AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await AxiosInstance.post("", { search });
    } catch (error) {
      console.log("search results: ", error.message);
    }
  }

  async changeMediaFolder() {
    try {
      const response = await fetch(`/user-media-list/change`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ media_id, user_id }),
      });

      //TODO change response
      return response.status;
    } catch (error) {
      console.log(error.message);
    }
  }
}
