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
exports.IngredientsCtrl = void 0;
const winston_1 = require("../lib/config/winston");
const ApiError_1 = require("../handlers/ApiError");
const IngredientServiceImpl_1 = require("../service/Impl/IngredientServiceImpl");
/**
 * @classdesc Controller of ingredients
 */
class IngredientsCtrl {
    /**
     * Get All ingredients
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @returns {Ingredient[]} Array of ingredients
     * @typedef {Object} badRequest
     * @throws {badRequest}
     */
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let pageSize, offset;
            /**
             * instantiate ingredient service implementation
             * @typedef {Object} IngredientServiceImpl
             * @type {IngredientServiceImpl}
             * @class
             * @instance
             */
            const ingredientServiceImpl = new IngredientServiceImpl_1.IngredientServiceImpl();
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
                 * @throws {Error} Offset is not a number
                 */
                if (isNaN(offset))
                    throw Error("Offset is not a number");
                /**
                 * Get all ingredients
                 * @typedef {Object} Ingredient[]
                 * @type {Ingredient[]}
                 * @function getAllIngredients
                 * @param {number} pageIndex
                 * @param {number} pageSize
                 */
                const ingredientsList = yield ingredientServiceImpl.getAllIngredients(pageSize, offset);
                res.status(200).send(ingredientsList);
            }
            catch (err) {
                winston_1.logger.error(`Method => POST Pagination Ingredients : ${err.message}`);
                res.status(400).send(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    /**
     * Get the size of All ingredients array
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
             * instantiate ingredient service implementation
             * @typedef {Object} IngredientServiceImpl
             * @type {IngredientServiceImpl}
             * @class
             * @instance
             */
            const ingredientServiceImpl = new IngredientServiceImpl_1.IngredientServiceImpl();
            try {
                /**
                 * Get number of ingredients
                 * @function getNumberElements
                 */
                const size = yield ingredientServiceImpl.getNumberElements();
                res.status(200).send(size[0][0]);
            }
            catch (err) {
                winston_1.logger.error(`Method => GET ALL Ingredients size : ${err.message}`);
                res.status(400).send(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    /**
     * Get an ingredient by id
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @typedef {Object} badRequest
     * @typedef {Object} not_found
     * @throws {badRequest}
     * @throws {not_found} Ingredient was not found in the database
     */
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id;
            /**
             * instantiate Ingredient service implementation
             * @typedef {Object} IngredientServiceImpl
             * @type {IngredientServiceImpl}
             * @class
             * @instance
             */
            const ingredientServiceImpl = new IngredientServiceImpl_1.IngredientServiceImpl();
            try {
                /**
                 * @param {string} req.params.id
                 */
                id = parseInt(req.params.id);
                /**
                 * @throws {Error} Id is not a number
                 */
                if (isNaN(id))
                    throw Error("Ingredient Id is not a number");
                /**
                 * Get a ingrdient by its id
                 * @typedef {Object} Ingredient
                 * @type {Ingredient}
                 * @function getIngredientById
                 * @param {number} id
                 */
                const ingredient = yield ingredientServiceImpl.getIngredientById(id);
                if (ingredient)
                    res.status(200).send(ingredient);
                else
                    res.status(404).send(ApiError_1.ApiError.not_found("There is no ingredient with this id"));
            }
            catch (err) {
                winston_1.logger.error(`Method => GET Ingredient BY ID : ${err.message}`);
                res.status(400).send(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    /**
     * Get create an ingredient
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
             * instantiate Ingredient service implementation
             * @typedef {Object} IngredientServiceImpl
             * @type {IngredientServiceImpl}
             * @class
             * @instance
             */
            const ingredientServiceImpl = new IngredientServiceImpl_1.IngredientServiceImpl();
            try {
                /**
                 * @throws {Error} Object is malformed
                 */
                if (!isIngredient(req.body))
                    throw Error("Ingredient object is malformed");
                /**
                 * Request from client side
                 */
                const ingredient = req.body;
                /**
                 * Add an ingredient
                 * @typedef {Object} Ingredient
                 * @type {Ingredient}
                 * @function addIngredient
                 * @param {Ingredient} ingredient
                 */
                const result = yield ingredientServiceImpl.addIngredient(ingredient);
                res.status(201).send(result);
            }
            catch (err) {
                winston_1.logger.error(`Method => POST Ingredient : ${err.message}`);
                res.status(400).send(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    /**
     * Update an ingredient
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @typedef {Object} not_found
     * @throws {not_found} ingredient is not found
     */
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id;
            /**
             * instantiate Ingredient service implementation
             * @typedef {Object} IngredientServiceImpl
             * @type {IngredientServiceImpl}
             * @class
             * @instance
             */
            const ingredientServiceImpl = new IngredientServiceImpl_1.IngredientServiceImpl();
            try {
                /**
                 * @param {string} req.params.id
                 */
                id = parseInt(req.params.id);
                /**
                 * @throws {Error} Id is not a number
                 */
                if (isNaN(id))
                    throw Error("Ingredient Id is not a number");
                /**
                 * @throws {Error} Object is malformed
                 */
                if (!isIngredient(req.body))
                    throw Error("Ingredient object is malformed");
                /**
                 * Request from client side
                 */
                const ingredient = req.body;
                /**
                 * Update an ingredient
                 * @type {[affectedCount:number]}
                 * @function updateIngredient
                 * @param {number} id
                 * @param {number} ingredient
                 */
                const result = yield ingredientServiceImpl.updateIngredient(id, ingredient);
                if (result)
                    res.status(202).send(result);
                else
                    res.status(404).send(ApiError_1.ApiError.not_found("There is no ingredient with this id"));
            }
            catch (err) {
                winston_1.logger.error(`Method => PUT Ingredient : ${err.message}`);
                res.status(400).send(ApiError_1.ApiError.not_found(err.message));
            }
        });
    }
    /**
     * Delete an ingredient
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @typedef {Object} not_found
     * @throws {not_found} ingredient is not found
     */
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id;
            /**
             * instantiate Ingredient service implementation
             * @typedef {Object} IngredientServiceImpl
             * @type {IngredientServiceImpl}
             * @class
             * @instance
             */
            const ingredientServiceImpl = new IngredientServiceImpl_1.IngredientServiceImpl();
            try {
                /**
                 * @param {string} req.params.id
                 */
                id = parseInt(req.params.id);
                /**
                 * @throws {Error} Id is not a number
                 */
                if (isNaN(id))
                    throw Error("Ingredient Id is not a number");
                /**
                 * Delete an ingredient
                 * @function deleteIngredient
                 * @param {number} id
                 */
                yield ingredientServiceImpl.deleteIngredient(id);
                res.status(204).send(true);
            }
            catch (err) {
                winston_1.logger.error(`Method => DELETE Ingredient : ${err.message}`);
                res.status(400).send(ApiError_1.ApiError.not_found(err.message));
            }
        });
    }
}
exports.IngredientsCtrl = IngredientsCtrl;
/**
 *
 * @param obj
 * @returns {boolean}
 */
const isIngredient = (obj) => {
    if (obj.hasOwnProperty("product_name")
        &&
            obj.hasOwnProperty("ingredient_text")
        &&
            obj.hasOwnProperty("carbohydrates")
        &&
            obj.hasOwnProperty("proteins")
        &&
            obj.hasOwnProperty("fats")
        &&
            obj.hasOwnProperty("salt")
        &&
            obj.hasOwnProperty("calories")
        &&
            obj.hasOwnProperty("nova_group")
        &&
            obj.hasOwnProperty("categories")
        &&
            obj.hasOwnProperty("serving_size")
        &&
            obj.hasOwnProperty("image"))
        return true;
    else
        return false;
};
//# sourceMappingURL=ingredientsController.js.map