import { Sequelize } from "sequelize-typescript"
import dotenv from "dotenv"
import { Ingredient } from "../../entity/IngredientEntity"
import { Recipe } from "../../entity/RecipeEntity"
import { User } from "../../entity/UserEntity"
import { Bookmark } from "../../entity/BookmarkEntity"
import { logger } from "./winston"
import { RecipeIngredients } from "../../entity/RecipeIngredientsEntity"
import { UserBookmarks } from "../../entity/UserBookmarksEntity"
import { RecipeBookmarks } from "../../entity/RecipeBookmarksEntity"
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
    timezone:"Europe/France"
})

// Entities & Intermediate Table
database.addModels([Ingredient , Recipe , User , Bookmark, RecipeIngredients , UserBookmarks , RecipeBookmarks])

database.authenticate()
    .then( async () => {
        logger.info("Database connected...")
        // database.query("SELECT * FROM ingredients")
        //         .then( (res) => {
        //             if(res[0].length === 0) init_entities.init_ingredient()
        //         })
        // database.query("SELECT * FROM recipes")
        //         .then( (res) => {
        //             if(res[0].length === 0) init_entities.init_recipe()
        //         })
        // database.query("SELECT * FROM users")
        //         .then( (res) => {
        //             if(res[0].length === 0) init_entities.init_user()
        //         })
        // database.query("SELECT * FROM bookmarks")
        //         .then( (res) => {
        //             if(res[0].length === 0) init_entities.init_bookmark()
        //         })
    } )
    .catch( err => logger.info(`Error : ${err}`) )

