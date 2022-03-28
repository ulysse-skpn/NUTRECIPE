import { Application } from "express";
import { BookmarksCtrl } from "../controllers/bookmarksController";
import { IngredientsCtrl } from "../controllers/ingredientsController";
import { RecipesCtrl } from "../controllers/recipesController";
import { UsersCtrl } from "../controllers/usersController";
import * as swagger from "swagger-ui-express"
import swaggerDocument from "../lib/config/swagger.json"



export class Routes 
{
    constructor(){}
    public ingredientsController: IngredientsCtrl = new IngredientsCtrl()
    public recipesController: RecipesCtrl = new RecipesCtrl()
    public usersController: UsersCtrl = new UsersCtrl()
    public bookmarksController: BookmarksCtrl = new BookmarksCtrl()


    public routes(app: Application): void 
    {
        // SWAGGER UI
        // router.use('/api-docs', swaggerUi.serve);
        // router.get('/api-docs', swaggerUi.setup(swaggerDocument));
        app
            .use("/api-docs" , swagger.serve)
            .route("/api-docs")
            .get(swagger.setup(swaggerDocument))
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

        //================================================
        //  RECIPES
        app
            .route("/recipes")
            .get(this.recipesController.getAll)
            .post(this.recipesController.create)

        app
            .route("/recipes/:id")
            .get(this.recipesController.getById)
            .put(this.recipesController.update)
            .delete(this.recipesController.delete)

        //================================================
        //  USERS
        app
            .route("/users")
            .get(this.usersController.getAll)
            .post(this.usersController.create)

        app
            .route("/users/:id")
            .get(this.usersController.getById)
            .put(this.usersController.update)
            .delete(this.usersController.delete)

        //================================================
        //  BOOKMARKS
        app
            .route("/bookmarks")
            .get(this.bookmarksController.getAll)
            .post(this.bookmarksController.create)

        app
            .route("/bookmarks/:id")
            .get(this.bookmarksController.getById)
            .put(this.bookmarksController.update)
            .delete(this.bookmarksController.delete)
    }
}