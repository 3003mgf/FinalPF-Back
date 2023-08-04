import Playlists from "../Models/Playlists.js";

export const getAllPlaylists = async() =>{
  const response = await Playlists.findAll();

  return response;
};


export const deleteUserPlaylist = async(playlistId) =>{
  const findPlaylist = await Playlists.findOne({
    where: {
      id: playlistId
    }
  });

  if(!findPlaylist){
    return {data: "Playlist not found"}
  };


  findPlaylist.destroy();

  return {data: "User playlist deleted"};
};



export const createUserPlaylist = async(playlist) =>{
 
  const validatePlaylistName = await Playlists.findOne({
    where: {
      name: playlist.name
    }
  });

  if(validatePlaylistName){
    return {data: "User playlist already exists"};
  };

  const createPlaylist = await Playlists.create(playlist);

  return {
    msg: "User playlist created", 
    data: createPlaylist.dataValues
  };
  
};


export const updateUserPlaylist = async(playlist) =>{
  
  const findPlaylist = await Playlists.findOne({
    where: {
      id: playlist.id
    }
  });

  if(findPlaylist.name === playlist.name){
    return {data: "You already have a playlist with that name"};
  }else{
    findPlaylist.update(playlist);

    return {data: "User playlist updated"};
  };
};