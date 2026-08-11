// seeds idufasha kwa addinga main data in database
import User from "../models/user.js";// to import user so that helps to know how the user profile loooks like and what
import bcrypt from 'bcrypt';//helps to create  a strong passowrd which is hard to steal it and its always complicated
// finction ni block of code yisubiramo to  perform specific task
export const seedUsers = async () => { // async tells the code to wait for certain task to be finished
  try {//protects the code from breaking
    // next step is to submit our ordinaty code so the can be tuned into hard one by the bcrpt
    const hashpassword = await bcrypt.hash('Test123', 8);// HASH ITUMA BATIBA PASSWORD YAWE AHO IHINDURA YOUR PASSWORD YAWE HARD DIGITS 
    const users = [//we created an array that will help hold all members as shown
      {
        fullName: 'INEZA KUNDWA LIENY',
        email: 'kundwalienyineza@gmail.com',
        phoneNumber: '0788234621',
        password: hashpassword,// WE USE THIS BCZ WE DECLARED IT
        role: 'admin',
        status: 'active'
      },
      {
        fullName: 'NDAYAMBAJE JEAN CLAUDE',
        email: 'claudjean123@gmail.com',
        phoneNumber: '0788223622',
        password: hashpassword,
        role: 'customer',
        status: 'inactive'
      },
      {
        fullName: 'CYAMATARE LOUIS',
        email: 'cyamatarelouis@gmail.com',
        phoneNumber: '0788234623',
        password: hashpassword,
        role: 'customer',
        status: 'active'
      },
      {
        fullName: 'mukamana ester',
        email: 'mukamanaester@gmail.com',
        phoneNumber: '0784534624',
        password: hashpassword,
        role: 'customer',
        status: 'active'
      },
    ];

    // Bulk insert using Sequelize (called on the Model, not the array)
    await User.bulkCreate(users, { ignoreDuplicates: true });//saving all users in database at  same time
    // bulk senda all the  members at database at once
    //{ ignoreDuplicates: true } tells the database to skip any user if their email or ID already exists, preventing crash errors.
    console.log("Users seeded successfully!");//gives feed back in terminal
  } catch (error) {
    console.error("Error seeding users:", error);// hanldes error  safely
  }
};//clossing 