import fs from "fs"

const rawData = fs.readFileSync('data/open-food-facts-products.json')
const products = JSON.parse(rawData.toString())
const ingredientList:Array<object> = []

export const fetchIngredients = () => 
{
    products.forEach( (element: any) => {
        
        const product_name = element.fields.product_name !== null ? element.fields.product_name : element.fields.generic_name
        const ingredient_text = element.fields.ingredients_text
        const carbohydrates = element.fields.carbohydrates_100g
        const proteins = element.fields.proteins_100g
        const fats = element.fields.fat_100g
        const salt = element.fields.salt_100g
        const calories = element.fields.energy_100g
        const nova_group = element.fields.nova_group
        const categories = element.fields.categories_fr || element.fields.categories
        const serving_size = element.fields.serving_size
        const quantity = 0
        const status = false
        const image = element.fields.image_url || element.fields.image_small_url
        const createdAt = new Date()
        const updatedAt = new Date()
        const ingredient = { product_name , ingredient_text , carbohydrates , proteins , fats , salt , calories , nova_group , categories , serving_size , quantity , status , image , createdAt , updatedAt }

        ingredientList.push(ingredient)
    });

    return ingredientList
}

