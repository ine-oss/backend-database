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
export default sequelize //help imprt in another folderrr
