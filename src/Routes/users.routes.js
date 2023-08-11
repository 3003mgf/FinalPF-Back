import { Router } from "express";
import getUsersHandler from "../Handlers/Users/getUsersHandler.js";
import getUsersByIdHandler from "../Handlers/Users/getUsersByIdHandler.js";
import putUsersHandler from "../Handlers/Users/putUsersHandler.js";
import deleteUsersHandler from "../Handlers/Users/deleteUsersHandler.js";
import { loginUserHandler } from "../Handlers/Users/loginUserHandler.js";
import { createUserHandler } from "../Handlers/Users/createUserHandler.js";
import { favsUserHandler } from "../Handlers/Users/favsUserHandler.js";
import { putUserCartHandler } from "../Handlers/Users/putUsersCatHandler.js";
import { googleAuthHandler } from "../Handlers/Users/googleAuthHandler.js";
import { makeMemberHandler } from "../Handlers/Users/makeMemberHandler.js";
import { forgotPHandler } from "../Handlers/Users/forgotPHandler.js";
import { destroyUserHandler } from "../Handlers/Users/destroyUserHandler.js";

export const usersRouter = Router()

usersRouter.post('/googleAuth', googleAuthHandler)
usersRouter.post('/login', loginUserHandler)
usersRouter.post('/register', createUserHandler)
usersRouter.put('/favs', favsUserHandler)
usersRouter.put("/cart", putUserCartHandler);
usersRouter.get('/:id',getUsersByIdHandler)
usersRouter.put('/', putUsersHandler);
usersRouter.delete('/:id', deleteUsersHandler);
usersRouter.delete('/destroy/:userId', destroyUserHandler);
usersRouter.put('/member', makeMemberHandler);
usersRouter.get('/', getUsersHandler)
usersRouter.put('/forgot-password', forgotPHandler)


//info para admin 
usersRouter.get('/', getUsersHandler)
