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

