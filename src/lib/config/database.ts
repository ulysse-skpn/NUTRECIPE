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
import { InitEntities } from "./initEntities"
import sequelize from "sequelize"

dotenv.config()

const timezone = () => {
    return `+${String(Math.abs(new Date().getTimezoneOffset() / 60)).padStart(2,"0")}:00`
}

export const database = new Sequelize({
    repositoryMode: true,
    database:process.env.DATABASE_NAME,
    dialect:"mysql",
    logging: msg => console.log(msg),
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    models: [__dirname + "/entity"],
    timezone:timezone()
})

// Entities & Intermediate Table
database.addModels([Ingredient , Recipe , User , Bookmark, RecipeIngredients , UserBookmarks , RecipeBookmarks])

database.authenticate()
    .then( async () => {
        logger.info("Database connected...")

        database.sync()
            .then( async (res) => {

                await database.query("show tables" , {type: sequelize.QueryTypes.SHOWTABLES})

                await database.query("SELECT COUNT(id) as elem FROM ingredients" , { plain:true , raw:true} )
                    .then( async () => {
                        if( res ) 
                        {
                            InitEntities.init_ingredient()
                            logger.info( 'ingredients table initialized' )
                        }      
                    })   

                await database.query("SELECT COUNT(id) as elem FROM recipes" , { plain:true , raw:true} )
                    .then( async () => {
                        if( res ) 
                        {
                            InitEntities.init_recipe()
                            logger.info( 'recipes table initialized' )
                        }    
                    })      

                await database.query("SELECT COUNT(id) as elem FROM users" , { plain:true , raw:true} )
                    .then( async () => {
                        if( res ) 
                        {
                            InitEntities.init_user()
                            logger.info( 'users table initialized' )
                        }
                    })       

                await database.query("SELECT COUNT(id) as elem FROM bookmarks" , { plain:true , raw:true} )
                    .then( async () => {
                        if( res ) 
                        {
                            InitEntities.init_bookmark()
                            logger.info( 'boomarks table initialized' )
                        }
                    })    
            })          

    } )
    .catch( err => logger.info(`Error : ${err}`) )

