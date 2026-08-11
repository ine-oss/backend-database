import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db.js";



class User extends Model {}
User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'customer', 'seller', 'manager'),
        defaultValue: 'customer',
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'blocked'),
        defaultValue: 'active',
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true//this
})
export default User