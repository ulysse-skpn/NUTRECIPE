import { database } from "./database";

export const init_entities = () => 
{
    // ================ INIT One Ingredient ================
    database.query(`
        INSERT INTO ingredients (product_name, ingredient_text, carbohydrates, proteins, fats, salt, calories, nova_group, categories, serving_size, quantity, status, image, created_at, updated_at) 
        VALUES ( "ex_product_name" , "ex_ingredient_text" , 0 , 0 , 0 , 0 , 0 , "2" , "ex_categories" , "ex_serving_size" , 1 , false , "https://static.openfoodfacts.org/images/products/843/604/504/0053/front_fr.6.400.jpg" , "2022-01-01" , "2022-01-01")`
    )

    // ================ INIT One Recipe ================
    // database.query(`
    //     INSERT INTO ingredients (product_name, ingredient_text, carbohydrates, proteins, fats, salt, calories, nova_group, categories, serving_size, quantity, status, image, created_at, updated_at) 
    //     VALUES ( "ex_product_name" , "ex_ingredient_text" , 0 , 0 , 0 , 0 , 0 , "2" , "ex_categories" , "ex_serving_size" , 1 , false , "https://static.openfoodfacts.org/images/products/843/604/504/0053/front_fr.6.400.jpg" , "2022-01-01" , "2022-01-01")`
    // )

    // ================ INIT One User ================
    // database.query(`
    //     INSERT INTO ingredients (product_name, ingredient_text, carbohydrates, proteins, fats, salt, calories, nova_group, categories, serving_size, quantity, status, image, created_at, updated_at) 
    //     VALUES ( "ex_product_name" , "ex_ingredient_text" , 0 , 0 , 0 , 0 , 0 , "2" , "ex_categories" , "ex_serving_size" , 1 , false , "https://static.openfoodfacts.org/images/products/843/604/504/0053/front_fr.6.400.jpg" , "2022-01-01" , "2022-01-01")`
    // )
}
