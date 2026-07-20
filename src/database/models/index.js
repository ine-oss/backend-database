import sequelize from "../../config/db";
import User from "./models/user.js";
import Notification from "./notification.js";
import order from "./order.js";
import payment from "./payment.js";
import product from "./product.js";

const db ={
     sequelize,
    User,
}
    export default db;