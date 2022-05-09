"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitEntities = void 0;
const database_1 = require("./database");
class InitEntities {
    // ================ INIT One Ingredient ================
    static init_ingredient() {
        database_1.database.query(`
            INSERT IGNORE INTO ingredients (product_name, ingredient_text, carbohydrates, proteins, fats, salt, calories, nova_group, categories, serving_size, image) 
            VALUES ( "ex_product_name" , "ex_ingredient_text" , 1.1 , 2.2 , 3.3 , 4.4 , 5.5 , "2" , "ex_categories" , "ex_serving_size" , "https://static.openfoodfacts.org/images/products/843/604/504/0053/front_fr.6.400.jpg")`);
    }
    // ================ INIT One Recipe ================
    static init_recipe() {
        database_1.database.query(`
            INSERT IGNORE INTO recipes ( title , prep_time , cooking_time , rest_time , categories , ingredients_list , serving_size , instructions , image ) 
            VALUES ( "ex_title" , "ex_prep_time" , "ex_cooking_time" , "ex_rest_time" , "ex_categories" , "ex_ingredients_list" , "ex_serving_size" , "ex_instructions" , "http://www.image.com")`);
    }
    // ================ INIT One User ================
    static init_user() {
        database_1.database.query(`
            INSERT IGNORE INTO users ( last_name , first_name , phone_number , email , password , role , receiveEmail , receiveNotification ) 
            VALUES ( "SEKPON" , "ulysse" , "0000000000" , "u.sekpon@gmail.com" , "azerty" , "admin" , true , false )`);
    }
}
exports.InitEntities = InitEntities;
//# sourceMappingURL=initEntities.js.map