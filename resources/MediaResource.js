import { AxiosInstance } from "../helpers/AxiosInstance";


export default class MediaResource {
  
  async getMediaList(page = "?page=1") {    

    try {
      /// remove hardcoded ip
      const response = await AxiosInstance.get('/media' + page);      
      const result = response.data;
      
      return result; 
    } catch (error) {

      console.log(error.message);      
      console.error("ERROR ME: response", error.response.message);
    }
  }


  async getSingleMedia(id) {
    try {
      /// remove hardcoded ip
      const response = await AxiosInstance.get(`/media/${id}`);

      return response.data;

    } catch (error) {
      
      console.error("ERROR ME: ", error.message);
    }
  }
}
