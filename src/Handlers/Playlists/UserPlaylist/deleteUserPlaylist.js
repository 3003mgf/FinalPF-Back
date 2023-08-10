import { deleteUserPlaylist } from "../../../Controllers/Playlists.controllers.js";


export const deleteUserPlaylistHandler = async(req, res)=>{
  try{
    const response = await deleteUserPlaylist(req.params.playlistId);

    if(response.data === "Playlist not found"){
      res.status(500).json(response);
    }else{
      res.status(200).json(response);
    }
  }catch(error){
    console.log(error);
  }
};