import Albums from '../Models/Albums.js';
import Playlists from '../Models/Playlists.js';
import Users  from '../Models/Users.js'
import { Op } from "sequelize";
import { sendMail } from '../Util/emailCtrl.js';
import { generateToken } from '../Util/jwtEncode.js';
import jwt from "jsonwebtoken";


export const userLogin = async(user) =>{
  const { credential, password } = user;
 
  const findUserByEmail = await Users.findOne({
    where: {
      email: credential
    }
  });

  const findUserByUsername = await Users.findOne({
    where: {
      userName: credential
    }
  });

  if(!findUserByEmail && !findUserByUsername){
    return { data: "Email or Username incorrect" }; 
  };

  if(findUserByEmail && findUserByEmail.deleted || findUserByUsername && findUserByUsername.deleted){
    return {data: "Sorry, your account has been disabled. Please contact support!"}
  }

  if(findUserByEmail || findUserByUsername){

    if(findUserByEmail?.password === password || findUserByUsername?.password === password){
      // Exito
      return {data: findUserByEmail ? findUserByEmail : findUserByUsername}
    }else{
      return { data: "Password Incorrect" }
    }
  };
 
}


export const userCreate = async(newUser) =>{

  const { email, userName } = newUser;

    const validateEmail = await Users.findAndCountAll({where:{email}});
    if(validateEmail.count > 0){
      return({data: "Email Error"});
    };

    const validateUsername = await Users.findAndCountAll({where:{userName}});
    if(validateUsername.count > 0){
      return({data: "UserName Error"});
    };

    const createUser = await Users.create(newUser);

    return {data: "User created"};
}

export const googleAuth = async(newUser) =>{
  const findUser = await Users.findOne({
    where:{
      email: newUser.email
    }
  });

  if(findUser && !findUser.googleUser){
    return {data: "We already have an account registered with that email"}
  }else if(findUser && findUser.deleted){
    return {data: "Sorry, your account has been disabled. Please contact support!"}
  }else if(findUser && findUser.googleUser){
    return {data: findUser};
  }else if(!findUser){
    const createUser = await Users.create({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      avatar: newUser.avatar,
      email: newUser.email,
      password: newUser.password,
      member: false,
      googleUser: true,
      userName: newUser.userName
    });

    // return {data: "User created"};

    return {data: {msg: "User created", user: createUser.dataValues}}
  }
};

export const userFavs = async(data) =>{
  const { userId, productId } = data;

  const findUser = await Users.findOne({
    where:{
      id: userId
    }
  });

  
  // let userFavorites = findUser.dataValues.favorites || [];

  // if(userFavorites.length === 0){
  //   userFavorites.push(productId);
  // }else{
  //   let filter = userFavorites.filter(el => el !== productId);

  //   if(filter.length === userFavorites.length){
  //     userFavorites.push(productId);
  //   }else{
  //     userFavorites = filter;
  //   }
  // }

  // console.log(userFavorites);

  if(findUser.dataValues.favorites.includes(productId)){
    await findUser.update({
      favorites: findUser.dataValues.favorites.filter(el => el !== productId)
    });
  }else{
    await findUser.update({
      favorites: [...findUser.dataValues.favorites, productId]
    });
  }


  await findUser.save();

  return { data: findUser };

};

export const userCart = async (data) => {
  const { userId, product } = data;

  const findUser = await Users.findOne({
    where: {
      id: userId,
    },
  });

  
  let userCart = JSON.parse(findUser.dataValues.cart) || [];
  

  if(userCart?.length === 0){
    userCart?.push(product);

  }else{
    let filter = userCart?.filter(el => el.name !== product.name);

    if(filter?.length === userCart?.length){
      userCart?.push(product);
    }else{
      userCart = filter;
    }
  }

  console.log(userCart);

  const updateUser = await Users.update(
    {
    cart: userCart
    },
    {
      where:{
        id: userId
      }
    }
  );

  return { data: updateUser };
};

export const getUsersById = async(id) =>{
  const findUser = await Users.findOne({
    where: {
      id: id
    }
  });

  if(!findUser){
    return { data: "No user found"};
  };

  return { data: findUser };
};


export const updateUser = async(data) =>{

  const { userId, newData } = data;
  console.log(newData);
  const findUser = await Users.findOne({
    where: {
      id: userId
    }
  });

  if(!findUser){
    return { data: "No user found"};
  }

  if(newData.email){
    findUser.update({
      userName: newData.userName,
      email: newData.email,
      firstName: newData.firstName,
      lastName: newData.lastName
    });
  
    findUser.save();
  }else{
    findUser.update({
      password: newData.password
    });
  
    findUser.save();
  }

  return { data: "User updated" };
};


export const deleteUser = async(userId) =>{
  const findUser = await Users.findOne({
    where: {
      id: userId
    }
  });

  if(!findUser){
    return {data: "No user found"};
  };

  findUser.deleted = !findUser.deleted

  findUser.save()

  return {data: "User deleted"};
};

export const makeMember = async(data) =>{

  const { userId, expire } = data;

  const findUser = await Users.findOne({
    where:{
      id: userId
    }
  });

  if(!findUser){
    return {data:"User not found"};
  }

  findUser.update({
    member: true,
    memberExpire: expire
  });

  findUser.save();

  return {data: "User now is member"};
};

export const getAllUsers = async () => {
  const data = await Users.findAll()
  const total = data.length
  let activos = 0
  let desactivados = 0

  for(let value of data){
    if(value.deleted === false) activos ++;
    else { desactivados ++ }
  }

  return {
    total,
    activos,
    desactivados,
    data
  }
}


export const forgotPassword = async(email) =>{
  
  const findUser = await Users.findOne({
    where:{
      email: email
    }
  });

  if(!findUser){
    return {data: "No user found"};
  };

  const encriptedUser = generateToken(findUser.id);

  const resetURL = `
    <h3>Soul Music Support</h3>
    <p>Please follow this link to reset your password.</p> 
    <a href="http://localhost:3000/reset-password/${encriptedUser}">Click Here<a>`
    
    let data = {
      to: findUser.email,
      text: `Hey ${findUser.userName}`,
      subject: `Hey ${findUser.userName}! Forgot your Password?`,
      htm: resetURL
    };

    sendMail(data);

    return {data:"ForgotP sent"};
};