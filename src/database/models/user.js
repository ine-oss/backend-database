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
        type: DataTypes.STRING,
        enum: ["admin", "customer", "seller"],
        defaultValue: "customer",
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        enum: ["active", "inactive", 'blocked'],
    },
}, {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true
})

export default User;