import { database } from "./database";

export class InitEntities 
{
    // ================ INIT One Ingredient ================
    public static init_ingredient()
    {
        database.query(`
            INSERT IGNORE INTO ingredients (product_name, ingredient_text, carbohydrates, proteins, fats, salt, calories, nova_group, categories, serving_size, quantity, status, image) 
            VALUES ( "ex_product_name" , "ex_ingredient_text" , 1.1 , 2.2 , 3.3 , 4.4 , 5.5 , "2" , "ex_categories" , "ex_serving_size" , 1 , false , "https://static.openfoodfacts.org/images/products/843/604/504/0053/front_fr.6.400.jpg")`
        )
    }

    // ================ INIT One Recipe ================
    public static init_recipe()
    {
        database.query(`
            INSERT IGNORE INTO recipes ( title , prep_time , cooking_time , rest_time , categories , ingredients_list , serving_size , instructions , image ) 
            VALUES ( "ex_title" , "ex_prep_time" , "ex_cooking_time" , "ex_rest_time" , "ex_categories" , "ex_ingredients_list" , "ex_serving_size" , "ex_instructions" , "http://www.image.com")`
        )
    }

    // ================ INIT One User ================
    public static init_user()
    {
        database.query(`
            INSERT IGNORE INTO users ( last_name , first_name , phone_number , email , password , role ) 
            VALUES ( "SEKPON" , "ulysse" , "0627410018" , "u.sekpon@gmail.com" , "azerty" , "admin" )`
        )
    }

    // ================ INIT One Bookmark ================
    public static init_bookmark()
    {
        database.query(`
            INSERT IGNORE INTO bookmarks ( label , category , saved ) 
            VALUES ( "ex_label" , 1 , true )`
        )
    }
}
