"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const IngredientEntity_1 = require("../../entity/IngredientEntity");
const RecipeEntity_1 = require("../../entity/RecipeEntity");
const UserEntity_1 = require("../../entity/UserEntity");
const winston_1 = require("./winston");
const initEntities_1 = require("./initEntities");
const sequelize_1 = __importDefault(require("sequelize"));
const fetchData_1 = require("../../fetchData");
const IngredientRepository_1 = require("../../DAO/IngredientRepository");
const RecipeRepository_1 = require("../../DAO/RecipeRepository");
const BookmarkIngredientEntity_1 = require("../../entity/BookmarkIngredientEntity");
const BookmarkRecipeEntity_1 = require("../../entity/BookmarkRecipeEntity");
dotenv_1.default.config();
const timezone = () => {
    return `+${String(Math.abs(new Date().getTimezoneOffset() / 60)).padStart(2, "0")}:00`;
};
exports.database = new sequelize_typescript_1.Sequelize({
    repositoryMode: true,
    database: process.env.DATABASE_NAME,
    dialect: "mysql",
    logging: msg => console.log(msg),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    models: [__dirname + "/entity"],
    timezone: timezone()
});
// Entities & Intermediate Table
exports.database.addModels([IngredientEntity_1.Ingredient, RecipeEntity_1.Recipe, UserEntity_1.User, BookmarkIngredientEntity_1.BookmarkIngredient, BookmarkRecipeEntity_1.BookmarkRecipe]);
exports.database.authenticate()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    winston_1.logger.info("Database connected...");
    exports.database.sync()
        .then((res) => __awaiter(void 0, void 0, void 0, function* () {
        yield exports.database.query("show tables", { type: sequelize_1.default.QueryTypes.SHOWTABLES });
        yield exports.database.query("SELECT COUNT(ingredientId) as elem FROM ingredients", { plain: true, raw: true })
            .then((e) => __awaiter(void 0, void 0, void 0, function* () {
            if (e.elem === 0 || e.elem === 1) {
                initEntities_1.InitEntities.init_ingredient();
                const ingredientRepository = new IngredientRepository_1.IngredientRepository();
                const ingredientsList = (0, fetchData_1.fetchIngredients)();
                const half = Math.ceil(ingredientsList.length / 2);
                yield ingredientRepository.bulkCreate(ingredientsList.slice(0, half));
                yield ingredientRepository.bulkCreate(ingredientsList.slice(-half));
            }
            winston_1.logger.info('ingredients table initialized');
        }));
        yield exports.database.query("SELECT COUNT(recipeId) as elem FROM recipes", { plain: true, raw: true })
            .then((e) => __awaiter(void 0, void 0, void 0, function* () {
            if (e.elem === 0 || e.elem === 1) {
                initEntities_1.InitEntities.init_recipe();
                const recipeRepository = new RecipeRepository_1.RecipeRepository();
                const recipesList = (0, fetchData_1.fetchRecipes)();
                yield recipeRepository.bulkCreate(recipesList);
            }
            winston_1.logger.info('recipes table initialized');
        }));
        yield exports.database.query("SELECT COUNT(userId) as elem FROM users", { plain: true, raw: true })
            .then((e) => __awaiter(void 0, void 0, void 0, function* () {
            initEntities_1.InitEntities.init_user();
            winston_1.logger.info('users table initialized');
        }));
    }));
}))
    .catch(err => winston_1.logger.info(`Error : ${err.toString()}`));
//# sourceMappingURL=database.js.map