import { toggleUserPlaylist } from "../../../Controllers/Playlists.controllers.js";


export const togglePlaylistHanlder = async(req, res) =>{
  try{
    const {data} = await toggleUserPlaylist(req.body);

    if(data === "Playlist toggle success"){
      return res.status(200).json(data);
    }else{
      return res.status(500).json({data: "Error"});
    }
  }catch(error){
    console.log(error);
  }
};