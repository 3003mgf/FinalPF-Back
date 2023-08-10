import Playlists from "../Models/Playlists.js";

export const getAllPlaylists = async() =>{
  const response = await Playlists.findAll();

  return response;
};


export const deleteUserPlaylist = async(playlistId) =>{
  const findPlaylist = await Playlists.findOne({
    where: {
      playlistId: playlistId
    }
  });

  if(!findPlaylist){
    return {data: "Playlist not found"}
  };


  findPlaylist.destroy();

  return {msg: "User playlist deleted", data: findPlaylist};
};



export const createUserPlaylist = async(playlist) =>{
 
  const validatePlaylistName = await Playlists.findOne({
    where: {
      name: playlist.name
    }
  });

  if(validatePlaylistName){
    return {msg: "User playlist already exists"};
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

    await findPlaylist.update({
      tracks: playlist.tracks
    });
    await findPlaylist.save();

    return {data: "User playlist updated"};
  };
};


export const toggleUserPlaylist = async(data) =>{
  const { id, tracks } = data;

  const findPlaylist = await Playlists.findOne({
    where: {
      id: id
    }
  });

  await findPlaylist.update({
    tracks: tracks
  });

  await findPlaylist.save();

  return {data: "Playlist toggle success"};
};