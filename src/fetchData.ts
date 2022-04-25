import fs from "fs"

const rawDataIngredients = fs.readFileSync('data/open-food-facts-products.json')
const rawDataRecipes = fs.readFileSync('data/recipes.json')
const ingredients = JSON.parse(rawDataIngredients.toString())
const recipes = JSON.parse(rawDataRecipes.toString())
const ingredientList:Array<object> = []
const recipeList:Array<object> = []

export const fetchIngredients = () => 
{
    ingredients.forEach( (element: any) => {
        
        let product_name = "/"
        let nova_group = 0
        let ingredient_text , carbohydrates , proteins , fats , salt , calories , categories , serving_size , image = null
        
        if( element.fields.product_name !== undefined ) product_name = element.fields.product_name || element.fields.generic_name

        if( element.fields.ingredients_text !== undefined ) ingredient_text = JSON.stringify(element.fields.ingredients_text.split(","))

        if( element.fields.carbohydrates_100g !== undefined ) carbohydrates = parseFloat(element.fields.carbohydrates_100g).toFixed(2)

        if( element.fields.proteins_100g !== undefined ) proteins = parseFloat(element.fields.proteins_100g).toFixed(2)

        if( element.fields.fat_100g !== undefined ) fats = parseFloat(element.fields.fat_100g).toFixed(2)

        if( element.fields.salt_100g !== undefined ) salt = parseFloat(element.fields.salt_100g).toFixed(2)

        if( element.fields.energy_100g !== undefined ) calories = parseFloat(element.fields.energy_100g).toFixed(2)

        if( element.fields.nova_group !== undefined ) nova_group = element.fields.nova_group

        if( element.fields.categories_fr !== undefined ) categories = JSON.stringify(element.fields.categories_fr.split(",")) || JSON.stringify(element.fields.categories.split(","))

        if( element.fields.serving_size !== undefined ) serving_size = element.fields.serving_size

        if( element.fields.image_url !== undefined ) image = element.fields.image_url || element.fields.image_small_url

        const ingredient = { product_name , ingredient_text , carbohydrates , proteins , fats , salt , calories , nova_group , categories , serving_size , image }

        ingredientList.push(ingredient)
    });

    return ingredientList
}


export const fetchRecipes = () => 
{
    recipes.forEach( (element:any) => {
        let title = "/"
        let prep_time , cooking_time , rest_time , categories , ingredients_list , serving_size , instructions , image = null

        if( element.title ) title = element.title
        
        if( element.prep ) prep_time = element.prep

        if( element.cookingTime ) cooking_time = element.cookingTime

        if( element.rest ) rest_time = element.rest

        if( element.categories ) categories = JSON.stringify(element.categories)

        if( element.ingredients ) ingredients_list = JSON.stringify(element.ingredients)

        if( element.serving_size ) serving_size = element.serving_size

        if( element.instructions ) instructions = JSON.stringify(element.instructions)

        if( element.image ) image = element.image

        const recipe = { title , prep_time , cooking_time , rest_time , categories , ingredients_list , serving_size , instructions , image }
        recipeList.push(recipe)
    })

    return recipeList
}
