import { Application } from "express";
import { IngredientsCtrl } from "../controllers/ingredientsController";
import { Ingredient } from "../entity/IngredientEntity";
import { IngredientService } from "../service/AIngredientService";


export class Routes 
{
    constructor(){}
    public ingredientsController: IngredientsCtrl = new IngredientsCtrl()


    public routes(app: Application): void 
    {

        //  INGREDIENTS
        app
            .route("/ingredients")
            .get(this.ingredientsController.getAll)
            .post(this.ingredientsController.create)

        app
            .route("/ingredients/:id")
            .get(this.ingredientsController.getById)
            .put(this.ingredientsController.update)
            .delete(this.ingredientsController.delete)

        // //================================================
        // //  RECIPES
        // app
        //     .route("/recipes")
        //     .get(this.recipesController.getAll)
        //     .post(this.recipesController.create)

        // app
        //     .route("/recipes/:id")
        //     .get(this.recipesController.getById)
        //     .put(this.recipesController.update)
        //     .delete(this.recipesController.delete)

        // //================================================
        // //  USERS
        // app
        //     .route("/users")
        //     .get(this.usersController.getAll)
        //     .post(this.usersController.create)

        // app
        //     .route("/users/:id")
        //     .get(this.usersController.getById)
        //     .put(this.usersController.update)
        //     .delete(this.usersController.delete)

        // //================================================
        // //  BOOKMARKS
        // app
        //     .route("/bookmarks")
        //     .get(this.bookmarksController.getAll)
        //     .post(this.bookmarksController.create)

        // app
        //     .route("/bookmarks/:id")
        //     .get(this.bookmarksController.getById)
        //     .put(this.bookmarksController.update)
        //     .delete(this.bookmarksController.delete)
    }
}