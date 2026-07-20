import express from "express";
import sequelize from "./src/config/db.js";
import "dotenv/config";

const app =express();
app.use (express.json());
// calling the port WE SET IN DB
const PORT  = process.env.PORT || 5000;



sequelize
 .authenticate().then(
    () =>{
   
        console.log("your database connected succesfully ");
        return sequelize.sync ();

    }
 )
 .then( 
    () =>
        app.listen (PORT, () => console.log (`your server is running on port ${PORT}🙏🙏`) )
 )
.catch((err) => {
    console.error("unable to connect:", err);
}

);
  export default app;