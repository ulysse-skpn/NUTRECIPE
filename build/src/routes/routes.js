"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const ingredientsController_1 = require("../controllers/ingredientsController");
const recipesController_1 = require("../controllers/recipesController");
const usersController_1 = require("../controllers/usersController");
const loginController_1 = require("../controllers/loginController");
const registerController_1 = require("../controllers/registerController");
const forgotPasswordController_1 = require("../controllers/forgotPasswordController");
const rootController_1 = require("../controllers/rootController");
const swagger = __importStar(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../lib/config/swagger.json"));
const bookmarkIngredientController_1 = require("../controllers/bookmarkIngredientController");
const bookmarkRecipeController_1 = require("../controllers/bookmarkRecipeController");
class Routes {
    constructor() {
        this.rootController = new rootController_1.RootCtrl();
        this.loginController = new loginController_1.LoginCtrl();
        this.registerController = new registerController_1.RegisterCtrl();
        this.forgotPasswordController = new forgotPasswordController_1.ForgotPasswordCtrl();
        this.ingredientsController = new ingredientsController_1.IngredientsCtrl();
        this.recipesController = new recipesController_1.RecipesCtrl();
        this.usersController = new usersController_1.UsersCtrl();
        this.bookmarkIngredientController = new bookmarkIngredientController_1.BookmarkIngredientCtrl();
        this.bookmarkRecipeController = new bookmarkRecipeController_1.BookmarkRecipeCtrl();
    }
    routes(app) {
        // SWAGGER UI
        app
            .use("/api-docs", swagger.serve)
            .route("/api-docs")
            .get(swagger.setup(swagger_json_1.default));
        //  APP ROOT
        app
            .route("/")
            .get(this.rootController.root);
        //  LOGIN
        app
            .route("/login")
            .post(this.loginController.login);
        //  REGISTER
        app
            .route("/register")
            .post(this.registerController.register);
        //  FORGOT PASSWORD
        app
            .route("/forgotPassword")
            .post(this.forgotPasswordController.forgotPassword);
        //  INGREDIENTS
        app
            .route("/ingredients")
            .post(this.ingredientsController.create);
        app
            .route("/ingredients/pagination")
            .post(this.ingredientsController.getAll);
        app
            .route("/ingredients/size")
            .get(this.ingredientsController.getAllSize);
        app
            .route("/ingredients/:id")
            .get(this.ingredientsController.getById)
            .put(this.ingredientsController.update)
            .delete(this.ingredientsController.delete);
        //================================================
        //  RECIPES
        app
            .route("/recipes")
            .get(this.recipesController.getAll)
            .post(this.recipesController.create);
        app
            .route("/recipes/pagination")
            .post(this.recipesController.getAllPagination);
        app
            .route("/recipes/size")
            .get(this.recipesController.getAllSize);
        app
            .route("/recipes/:id")
            .get(this.recipesController.getById)
            .put(this.recipesController.update)
            .delete(this.recipesController.delete);
        //================================================
        //  USERS
        app
            .route("/users")
            .get(this.usersController.getAll)
            .post(this.usersController.create);
        app
            .route("/users/pagination")
            .post(this.usersController.getAll);
        app
            .route("/users/size")
            .get(this.usersController.getAllSize);
        app
            .route("/users/:id")
            .get(this.usersController.getById)
            .put(this.usersController.update)
            .delete(this.usersController.delete);
        //================================================
        //  BOOKMARKS
        app
            .route("/userBookmarks/ingredient")
            .get(this.bookmarkIngredientController.getAll);
        app
            .route("/userBookmarks/ingredient/:id")
            .put(this.bookmarkIngredientController.updateOrCreate);
        app
            .route("/userBookmarks/recipe")
            .get(this.bookmarkRecipeController.getAll);
        app
            .route("/userBookmarks/recipe/:id")
            .put(this.bookmarkRecipeController.updateOrCreate);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map