
import swaggerjsdoc from "swagger-jsdoc";

const options ={
definition: {
openapi: "3.0.0",
info:{
   title:" dev sale API",
   version:"1.0.0",
},
Component: {
    securityschemes:{
        bearerAuth :{
            type:"http",
            scheme:"bearer",//TO BE ABLE ACCES TOKEN
            bearerFormat: "JWT",
        }
    }
}


},
apis:["./src/routes/*.js", "./src/docs/*.yaml"],
}
export default swaggerjsdoc(options);