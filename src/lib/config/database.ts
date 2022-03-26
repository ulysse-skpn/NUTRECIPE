// import { Sequelize } from "sequelize";
import { Sequelize } from "sequelize-typescript"
import dotenv from "dotenv"
import { Ingredient } from "../../entity/IngredientEntity"

dotenv.config()

export const database = new Sequelize({
    database:"test",
    dialect:"mysql",
    username:"root",
    password:"",
    logging:true,
    models: [__dirname + "/entity"],
    define:
    {
        timestamps:false
    }
})

database.addModels([Ingredient])
// export const database = new Sequelize( 'test' , 'root' , 'azerty' , {
//     port:5432,
//     host:process.env.DB_HOST,
//     dialect: 'postgres',
//     logging: true
// });


database.authenticate()
    .then( () => console.log("Database connected...") )
    .catch( err => console.log(`Error : ${err}`) )