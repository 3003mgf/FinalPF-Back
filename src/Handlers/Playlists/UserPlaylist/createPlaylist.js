import { createUserPlaylist } from "../../../Controllers/Playlists.controllers.js";


const createUserPlaylistHandler = async (req, res) => {
  try{
    const response = await createUserPlaylist(req.body);

    if(response === "User playlist already exists"){
      res.status(500).json(response);
    }else{
      res.status(200).json(response);
    }
  }catch(error){
    console.log(error);
  }
}

export default createUserPlaylistHandler