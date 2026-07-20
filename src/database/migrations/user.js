import sequelize from "../../config/db.js";
import User from"../models/user.js";


export const createUserTable = async () =>{
    //ndebera ni dta base babwite sequlize
    await sequelize.authenticate() ;
await User.sync({ alter:true,logging: false})
 console.log ('user table crated and uplodes');
  };