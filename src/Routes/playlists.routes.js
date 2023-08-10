import { Router } from "express";
import getPlaylistsHandler from "../Handlers/Playlists/getPlaylistsHandler.js";
import getPlaylistsByIdHandler from "../Handlers/Playlists/getPlaylistsByIdHandler.js";
import postPlaylistsHandler from "../Handlers/Playlists/postPlaylistsHandler.js";
import putPlaylistsHandler from "../Handlers/Playlists/putPlaylistsHandler.js";
import deletePlaylistsHandler from "../Handlers/Playlists/deletePlaylistsHandler.js";
import { playlistsToDb } from "../Util/initFetch.js";
import { deleteUserPlaylistHandler } from "../Handlers/Playlists/UserPlaylist/deleteUserPlaylist.js";
import { updateUserPlaylistHandler } from "../Handlers/Playlists/UserPlaylist/updatePlaylist.js";
import createUserPlaylistHandler from "../Handlers/Playlists/UserPlaylist/createPlaylist.js";
import { togglePlaylistHanlder } from "../Handlers/Playlists/UserPlaylist/togglePlaylist.js";

export const playlistsRouter = Router()

playlistsRouter.get('/', getPlaylistsHandler)
playlistsRouter.get('/:id',getPlaylistsByIdHandler)
playlistsRouter.post('/', postPlaylistsHandler)
playlistsRouter.put('/:id', putPlaylistsHandler)
playlistsRouter.delete('/:id', deletePlaylistsHandler)

// User playlists
playlistsRouter.delete('/user/:playlistId', deleteUserPlaylistHandler)
playlistsRouter.put('/user/update', updateUserPlaylistHandler)
playlistsRouter.post('/user/create', createUserPlaylistHandler)
playlistsRouter.put('/user/toggle', togglePlaylistHanlder)




// Ruta para insertar por primera vez las playlists a la DB.
playlistsRouter.get('/db/fetch', playlistsToDb)