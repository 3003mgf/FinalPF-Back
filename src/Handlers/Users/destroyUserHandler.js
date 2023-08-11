import { destroyUser } from "../../Controllers/Users.controllers.js";


export const destroyUserHandler = async(req, res) =>{
  try{
    const { data } = await destroyUser(req.params.userId);

    if(data === "No user found"){
      res.status(500).json(data);
    }else{
      res.status(200).json(data);
    }
  }catch(error){
    console.log(error);
  }
};