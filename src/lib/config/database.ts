import { Sequelize } from "sequelize-typescript"
import dotenv from "dotenv"
import { init_entities } from "./initEntities"
import { Ingredient } from "../../entity/IngredientEntity"
import { Recipe } from "../../entity/RecipeEntity"
import { User } from "../../entity/UserEntity"
import { Bookmark } from "../../entity/BookmarkEntity"

dotenv.config()

export const database = new Sequelize({
    repositoryMode: true,
    database:process.env.DATABASE_NAME,
    dialect:"mysql",
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    logging:true,
    models: [__dirname + "/entity"]
})

database.addModels([Ingredient])
database.addModels([Recipe])
database.addModels([User])
database.addModels([Bookmark])

database.authenticate()
    .then( async () => {
        console.log("Database connected...")
        init_entities()
    } )
    .catch( err => console.log(`Error : ${err}`) )