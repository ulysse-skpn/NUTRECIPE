import { Sequelize } from "sequelize-typescript"
import dotenv from "dotenv"
import { Ingredient, NOVA_GROUP } from "../../entity/IngredientEntity"
import { init_entities } from "./initEntities"

dotenv.config()

export const database = new Sequelize({
    repositoryMode: true,
    database:process.env.DATABASE_NAME,
    dialect:"mysql",
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
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
    .then( async () => {
        console.log("Database connected...")
        // init_entities()
    } )
    .catch( err => console.log(`Error : ${err}`) )