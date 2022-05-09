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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipesCtrl = void 0;
const winston_1 = require("../lib/config/winston");
const ApiError_1 = require("../handlers/ApiError");
const RecipeServiceImpl_1 = require("../service/Impl/RecipeServiceImpl");
/**
 * @classdesc Controller of brecipes
 */
class RecipesCtrl {
    /**
     * Get All recipe
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @returns {Recipe[]} Array of recipes
     * @typedef {Object} badRequest
     * @throws {badRequest}
     */
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * instantiate recipe service implementation
             * @typedef {Object} RecipeServiceImpl
             * @type {RecipeServiceImpl}
             * @class
             * @instance
             */
            const recipeServiceImpl = new RecipeServiceImpl_1.RecipeServiceImpl();
            try {
                /**
                 * Get all recipes
                 * @typedef {Object} Recipe[]
                 * @type {Recipe[]}
                 * @function getAllRecipes
                 */
                const recipesList = yield recipeServiceImpl.getAllRecipes();
                res.status(200).send(recipesList);
            }
            catch (err) {
                winston_1.logger.error(`Method => GET ALL Recipes : ${err.message}`);
                res.status(400).send(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    /**
     * Get All recipe with pagination
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @returns {Recipe[]} Array of recipes
     * @typedef {Object} badRequest
     * @throws {badRequest}
     */
    getAllPagination(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let pageSize, offset;
            /**
             * instantiate recipe service implementation
             * @typedef {Object} RecipeServiceImpl
             * @type {RecipeServiceImpl}
             * @class
             * @instance
             */
            const recipeServiceImpl = new RecipeServiceImpl_1.RecipeServiceImpl();
            try {
                /**
                 * @param {string} req.params.pageSize
                 */
                pageSize = parseInt(req.body.pageSize);
                /**
                 * @param {string} req.params.pageSize
                 * @param {string} req.params.pageIndex
                 */
                offset = parseInt(req.body.pageIndex) * parseInt(req.body.pageSize);
                /**
                 * @throws {Error} Limit is not a number
                 */
                if (isNaN(pageSize))
                    throw Error("Limit is not a number");
                /**
                 * @throws {Error} Limit is not a number
                 */
                if (isNaN(offset))
                    throw Error("Offset is not a number");
                /**
                 * Get all recipe
                 * @typedef {Object} Recipe[]
                 * @type {Recipe[]}
                 * @function getAllRecipesPagination
                 * @param {number} pageIndex
                 * @param {number} pageSize
                 */
                const recipesList = yield recipeServiceImpl.getAllRecipesPagination(pageSize, offset);
                res.status(200).send(recipesList);
            }
            catch (err) {
                winston_1.logger.error(`Method => GET ALL Recipes : ${err.message}`);
                res.status(400).send(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    /**
     * Get the size of All recipes array
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @typedef {Object} badRequest
     * @throws {badRequest}
     */
    getAllSize(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * instantiate recipe service implementation
             * @typedef {Object} RecipeServiceImpl
             * @type {RecipeServiceImpl}
             * @class
             * @instance
             */
            const recipeServiceImpl = new RecipeServiceImpl_1.RecipeServiceImpl();
            try {
                /**
                 * Get number of recipes
                 * @function getNumberElements
                 */
                const size = yield recipeServiceImpl.getNumberElements();
                res.status(200).send(size[0][0]);
            }
            catch (err) {
                winston_1.logger.error(`Method => GET ALL Recipes size : ${err.message}`);
                res.status(400).send(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    /**
     * Get an recipe by id
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @typedef {Object} badRequest
     * @typedef {Object} not_found
     * @throws {badRequest}
     * @throws {not_found} Recipe was not found in the database
     */
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id;
            /**
             * instantiate recipe service implementation
             * @typedef {Object} RecipeServiceImpl
             * @type {RecipeServiceImpl}
             * @class
             * @instance
             */
            const recipeServiceImpl = new RecipeServiceImpl_1.RecipeServiceImpl();
            try {
                /**
                 * @param {string} req.params.id
                 */
                id = parseInt(req.params.id);
                /**
                 * @throws {Error} Id is not a number
                 */
                if (isNaN(id))
                    throw Error("Recipe Id is not a number");
                /**
                 * Get a recipe by its id
                 * @typedef {Object} Recipe
                 * @type {Recipe}
                 * @function getRecipeById
                 * @param {number} id
                 */
                const recipe = yield recipeServiceImpl.getRecipeById(id);
                if (recipe)
                    res.status(200).send(recipe);
                else
                    res.status(404).send(ApiError_1.ApiError.not_found("There is no recipe with this id"));
            }
            catch (err) {
                winston_1.logger.error(`Method => GET Recipe BY ID : ${err.message}`);
                res.status(400).send(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    /**
     * Get an recipe by id
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @typedef {Object} badRequest
     * @throws {badRequest}
     */
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * instantiate recipe service implementation
             * @typedef {Object} RecipeServiceImpl
             * @type {RecipeServiceImpl}
             * @class
             * @instance
             */
            const recipeServiceImpl = new RecipeServiceImpl_1.RecipeServiceImpl();
            try {
                /**
                 * @throws {Error} Object is malformed
                 */
                if (!isRecipe(req.body))
                    throw Error("Recipe object is malformed");
                /**
                 * Request from client side
                 */
                const recipe = req.body;
                /**
                 * Add a Recipe
                 * @typedef {Object} Recipe
                 * @type {Recipe}
                 * @function addRecipe
                 * @param {Recipe} recipe
                 */
                const result = yield recipeServiceImpl.addRecipe(recipe);
                res.status(201).send(result);
            }
            catch (err) {
                winston_1.logger.error(`Method => POST Recipe : ${err.message}`);
                res.status(400).send(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    /**
     * Update a recipe
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @typedef {Object} not_found
     * @throws {not_found} recipe is not found
     */
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id;
            /**
             * instantiate recipe service implementation
             * @typedef {Object} RecipeServiceImpl
             * @type {RecipeServiceImpl}
             * @class
             * @instance
             */
            const recipeServiceImpl = new RecipeServiceImpl_1.RecipeServiceImpl();
            try {
                /**
                 * @param {string} req.params.id
                 */
                id = parseInt(req.params.id);
                /**
                 * @throws {Error} Id is not a number
                 */
                if (isNaN(id))
                    throw Error("Recipe Id is not a number");
                /**
                 * @throws {Error} Object is malformed
                 */
                if (!isRecipe(req.body))
                    throw Error("Recipe object is malformed");
                /**
                 * Request from client side
                 */
                const recipe = req.body;
                /**
                 * update a recipe
                 * @typedef {Object} Recipe
                 * @type {Recipe}
                 * @function updateRecipe
                 * @param {number} id
                 * @param {Recipe} recipe
                 */
                const result = yield recipeServiceImpl.updateRecipe(id, recipe);
                if (result)
                    res.status(202).send(result);
                else
                    res.status(404).send(ApiError_1.ApiError.not_found("There is no recipe with this id"));
            }
            catch (err) {
                winston_1.logger.error(`Method => PUT Recipe : ${err.message}`);
                res.status(400).send(ApiError_1.ApiError.not_found(err.message));
            }
        });
    }
    /**
     * Delete a recipe
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @typedef {Object} not_found
     * @throws {not_found} recipe is not found
     */
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id;
            /**
             * instantiate recipe service implementation
             * @typedef {Object} RecipeServiceImpl
             * @type {RecipeServiceImpl}
             * @class
             * @instance
             */
            const recipeServiceImpl = new RecipeServiceImpl_1.RecipeServiceImpl();
            try {
                /**
                 * @param {string} req.params.id
                 */
                id = parseInt(req.params.id);
                /**
                 * @throws {Error} Id is not a number
                 */
                if (isNaN(id))
                    throw Error("Recipe Id is not a number");
                /**
                 * Delete a recipe
                 * @function deleteRecipe
                 * @param {number} id
                 */
                yield recipeServiceImpl.deleteRecipe(id);
                res.status(204).send(true);
            }
            catch (err) {
                winston_1.logger.error(`Method => DELETE Recipe : ${err.message}`);
                res.status(400).send(ApiError_1.ApiError.not_found(err.message));
            }
        });
    }
}
exports.RecipesCtrl = RecipesCtrl;
/**
 *
 * @param obj
 * @returns {boolean}
 */
const isRecipe = (obj) => {
    if (obj.hasOwnProperty("title")
        && obj.hasOwnProperty("prep_time")
        && obj.hasOwnProperty("cooking_time")
        && obj.hasOwnProperty("rest_time")
        && obj.hasOwnProperty("categories")
        && obj.hasOwnProperty("ingredients_list")
        && obj.hasOwnProperty("serving_size")
        && obj.hasOwnProperty("instructions")
        && obj.hasOwnProperty("image"))
        return true;
    else
        return false;
};
//# sourceMappingURL=recipesController.js.map