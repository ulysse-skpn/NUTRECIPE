import { Application } from "express";
import { IngredientsCtrl } from "../controllers/ingredientsController";
import { RecipesCtrl } from "../controllers/recipesController";
import { UsersCtrl } from "../controllers/usersController";
import { LoginCtrl } from "../controllers/loginController"
import { RegisterCtrl } from "../controllers/registerController";
import { ForgotPasswordCtrl } from "../controllers/forgotPasswordController";
import { RootCtrl } from "../controllers/rootController";
import { BookmarkIngredientCtrl } from "../controllers/bookmarkIngredientController";
import { BookmarkRecipeCtrl } from "../controllers/bookmarkRecipeController";
// import * as swagger from "swagger-ui-express"
// import swaggerDocument from "../lib/config/swagger.json"
// import { Get, Post , Put , Delete , Route } from "tsoa";



export class Routes 
{
    public rootController: RootCtrl = new RootCtrl()
    public loginController: LoginCtrl = new LoginCtrl()
    public registerController: RegisterCtrl = new RegisterCtrl()
    public forgotPasswordController: ForgotPasswordCtrl = new ForgotPasswordCtrl()
    public ingredientsController: IngredientsCtrl = new IngredientsCtrl()
    public recipesController: RecipesCtrl = new RecipesCtrl()
    public usersController: UsersCtrl = new UsersCtrl()
    public bookmarkIngredientController: BookmarkIngredientCtrl = new BookmarkIngredientCtrl()
    public bookmarkRecipeController: BookmarkRecipeCtrl = new BookmarkRecipeCtrl()


    public routes(app: Application): void 
    {
        // SWAGGER UI
        app
            // .use("/api-docs" , swagger.serve)
            // .route("/api-docs")
            // .get(swagger.setup(swaggerDocument))

            // .use("/api" , swagger.serve)
            // .route("/api")
            // .get(swagger.setup(swaggerDocument))


        //  APP ROOT
        app
            .route("/")
            .get(this.rootController.root)

        //  LOGIN
        app
            .route("/login")
            .post(this.loginController.login)

        //  REGISTER
        app
            .route("/register")
            .post(this.registerController.register)

        //  FORGOT PASSWORD
        app
            .route("/forgotPassword")
            .post(this.forgotPasswordController.forgotPassword)

        //  INGREDIENTS
        app
            .route("/ingredients")
            .post(this.ingredientsController.create)

        app
            .route("/ingredients/pagination")
            .post(this.ingredientsController.getAll)

        app
            .route("/ingredients/size")
            .get(this.ingredientsController.getAllSize)

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
            .route("/recipes/pagination")
            .post(this.recipesController.getAllPagination)

        app
            .route("/recipes/size")
            .get(this.recipesController.getAllSize)

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
            .route("/users/pagination")
            .post(this.usersController.getAll)

        app
            .route("/users/size")
            .get(this.usersController.getAllSize)

        app
            .route("/users/:id")
            .get(this.usersController.getById)
            .put(this.usersController.update)
            .delete(this.usersController.delete)

        //================================================
        //  BOOKMARKS

        app
            .route("/userBookmarks/ingredient")
            .get(this.bookmarkIngredientController.getAll)

        app
            .route("/userBookmarks/ingredient/:id")
            .put(this.bookmarkIngredientController.updateOrCreate)

        app
            .route("/userBookmarks/recipe")
            .get(this.bookmarkRecipeController.getAll)

        app
            .route("/userBookmarks/recipe/:id")
            .put(this.bookmarkRecipeController.updateOrCreate)
    }
}