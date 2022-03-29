import { database } from "./database";

export const init_entities = () => 
{
    // ================ INIT One Ingredient ================
    database.query(`
        INSERT IGNORE INTO ingredients (product_name, ingredient_text, carbohydrates, proteins, fats, salt, calories, nova_group, categories, serving_size, quantity, status, image, created_at, updated_at) 
        VALUES ( "ex_product_name" , "ex_ingredient_text" , 0 , 0 , 0 , 0 , 0 , "2" , "ex_categories" , "ex_serving_size" , 1 , false , "https://static.openfoodfacts.org/images/products/843/604/504/0053/front_fr.6.400.jpg" , "2022-01-01" , "2022-01-01")`
    )

    // ================ INIT One Recipe ================
    database.query(`
        INSERT IGNORE INTO recipes ( title , prep_time , cooking_time , rest_time , categories , ingredients_list , serving_size , instructions , image , created_at, updated_at) 
        VALUES ( "ex_title" , "ex_prep_time" , "ex_cooking_time" , "ex_rest_time" , "ex_categories" , "ex_ingredients_list" , "ex_serving_size" , "ex_instructions" , "http://www.image.com" , "2022-02-02" , "2022-02-02")`
    )

    // ================ INIT One User ================
    database.query(`
        INSERT IGNORE INTO users ( last_name , first_name , phone_number , email , password , role , created_at, updated_at ) 
        VALUES ( "ex_last_name" , "ex_first_name" , "ex_phone_number" , "u.sekpon@gmail.com" , "passwordY" , "admin" , "2022-03-03" , "2022-03-03" )`
    )

    // ================ INIT One Bookmark ================
    database.query(`
        INSERT IGNORE INTO bookmarks ( label , category , saved , created_at, updated_at ) 
        VALUES ( "ex_label" , 1 , true , "2022-04-04" , "2022-04-04" )`
    )
}
