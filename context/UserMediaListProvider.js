import { createContext, useContext, useState } from "react";
import MediaListResource from "../resources/MediaListResource";
import { AuthContext } from "./AuthProvider";

export const UserMediaContext = createContext();

export const UserMediaProvider = ({ children }) => {
  const [mediaList, setMediaList] = useState([]);
  const userMediaList = new MediaListResource();
  const { user } = useContext(AuthContext);

  const getUserMediaList = async () => {
    const list = await userMediaList.getUserMediaList(user.token);
    setMediaList(list);
  };

  const addMediaToUserMediaList = async (media_id, folder) => {
    return await userMediaList.addMediaToList(media_id, folder, user.id);
  };

  const deleteMediaFromList = async (media_id) => {
    return await userMediaList.removeMediaFromList(media_id, user.token);
  };

  const mergeCustomFolderNames = async () => {};

  return (
    <UserMediaContext.Provider
      value={{
        mediaList,
        setMediaList,
        getUserMediaList,
        addMediaToUserMediaList,
        deleteMediaFromList,
        mergeCustomFolderNames,
      }}>
      {children}
    </UserMediaContext.Provider>
  );
};
