// 
import dotenv from "dotenv";
import { Sequelize} from "sequelize";
dotenv.config();

const sequelize =new Sequelize (
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,

    {
host:  process.env.DB_HOST,
port:  process.env.DB_PORT,
dialect:'mysql',
dialectoptions:{ConnectionTimedOutError:3000}
    
,
pool: {
    max: 2,
min:0,
acquire:3000,
idle:1000
}
  }
)

export default sequelize
 
//createeuser 
export const createUser = async(req, res) => {
    try {
        const {
            password,
            ...userData
        } = req.body;
        const existing = await User.findOne({ where: { email: userData.email } });
        if (existing)
            return res.status(400).json({ message: "email already used" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({...userData,
            password: hashedPassword
        });
        res.staus(201).json({ message: "user registered successfully", user })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}
