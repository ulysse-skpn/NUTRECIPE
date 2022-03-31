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
        
        let product_name , ingredient_text , carbohydrates , proteins , fats , salt , calories , nova_group , categories ,serving_size , image;
        
        if( element.fields.product_name !== undefined ) product_name = element.fields.product_name !== null ? element.fields.product_name : element.fields.generic_name
        else product_name = "non renseigné"

        if( element.fields.ingredients_text !== undefined ) ingredient_text = element.fields.ingredients_text
        else ingredient_text = null

        if( element.fields.carbohydrates_100g !== undefined ) carbohydrates = parseFloat(element.fields.carbohydrates_100g).toFixed(2)
        else carbohydrates = null

        if( element.fields.proteins_100g !== undefined ) proteins = parseFloat(element.fields.proteins_100g).toFixed(2)
        else proteins = null

        if( element.fields.fat_100g !== undefined ) fats = parseFloat(element.fields.fat_100g).toFixed(2)
        else fats = null

        if( element.fields.salt_100g !== undefined ) salt = parseFloat(element.fields.salt_100g).toFixed(2)
        else salt = null

        if( element.fields.energy_100g !== undefined ) calories = parseFloat(element.fields.energy_100g).toFixed(2)
        else calories = null

        if( element.fields.nova_group !== undefined ) nova_group = element.fields.nova_group
        else nova_group = 0

        if( element.fields.categories_fr !== undefined ) categories = element.fields.categories_fr || element.fields.categories
        else categories = null

        if( element.fields.serving_size !== undefined ) serving_size = element.fields.serving_size
        else serving_size = null

        if( element.fields.image_url !== undefined ) image = element.fields.image_url || element.fields.image_small_url
        else image = null

        const quantity = 0
        const status = false

        const ingredient = { product_name , ingredient_text , carbohydrates , proteins , fats , salt , calories , nova_group , categories , serving_size , quantity , status , image }

        ingredientList.push(ingredient)
    });

    return ingredientList
}


export const fetchRecipes = () => 
{
    recipes.forEach( (element:any) => {
        let title , prep_time , cooking_time , rest_time , categories , ingredients_list , serving_size , instructions , image;

        if( element.title ) title = element.title
        else title = null
        
        if( element.prep_time ) title = element.prep_time
        else prep_time = null

        if( element.cooking_time ) title = element.cooking_time
        else cooking_time = null

        if( element.rest_time ) title = element.rest_time
        else rest_time = null

        if( element.categories ) title = element.categories
        else categories = null

        if( element.ingredients_list ) title = element.ingredients_list
        else ingredients_list = null

        if( element.serving_size ) title = element.serving_size
        else serving_size = null

        if( element.instructions ) title = element.instructions
        else instructions = null

        if( element.image ) title = element.image
        else image = null

        const recipe = { title , prep_time , cooking_time , rest_time , categories , ingredients_list , serving_size , instructions ,image }
        recipeList.push(recipe)
    })

    return recipeList
}
