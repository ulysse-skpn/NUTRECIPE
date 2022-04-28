import { Sequelize } from "sequelize-typescript"
import dotenv from "dotenv"
import { Ingredient } from "../../entity/IngredientEntity"
import { Recipe } from "../../entity/RecipeEntity"
import { User } from "../../entity/UserEntity"
import { logger } from "./winston"
import { InitEntities } from "./initEntities"
import sequelize from "sequelize"
import { fetchIngredients, fetchRecipes } from "../../fetchData"
import { IngredientRepository } from "../../DAO/IngredientRepository"
import { RecipeRepository } from "../../DAO/RecipeRepository"
import { BookmarkIngredient } from "../../entity/BookmarkIngredientEntity"
import { BookmarkRecipe } from "../../entity/BookmarkRecipeEntity"

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
database.addModels([Ingredient , Recipe , User , BookmarkIngredient , BookmarkRecipe ])

database.authenticate()
    .then( async () => {
        logger.info("Database connected...")

        database.sync()
            .then( async (res) => {

                await database.query("show tables" , {type: sequelize.QueryTypes.SHOWTABLES})

                await database.query("SELECT COUNT(ingredientId) as elem FROM ingredients" , { plain:true , raw:true} )
                    .then( async (e:any) => {
 
                            
                        if( e.elem === 0 || e.elem === 1 ) 
                        {
                            InitEntities.init_ingredient()

                            const ingredientRepository:any = new IngredientRepository()
                            const ingredientsList = fetchIngredients()

                            const half = Math.ceil( ingredientsList.length / 2 )
                            await ingredientRepository.bulkCreate( ingredientsList.slice(0,half) )
                            await ingredientRepository.bulkCreate( ingredientsList.slice(-half) )
                        }

                        logger.info( 'ingredients table initialized' )
                    })   

                await database.query("SELECT COUNT(recipeId) as elem FROM recipes" , { plain:true , raw:true} )
                    .then( async (e:any) => {


                        if( e.elem === 0 || e.elem === 1 )
                        {
                            InitEntities.init_recipe()
                            
                            const recipeRepository:any = new RecipeRepository()
                            const recipesList = fetchRecipes()

                            await recipeRepository.bulkCreate( recipesList )
                        }

                        logger.info( 'recipes table initialized' )
                    })      

                await database.query("SELECT COUNT(userId) as elem FROM users" , { plain:true , raw:true} )
                    .then( async (e:any) => {
                        InitEntities.init_user()
                        logger.info( 'users table initialized' )
                    })       

            })          

    } )
    .catch( err => logger.info(`Error : ${err.toString()}`) )

