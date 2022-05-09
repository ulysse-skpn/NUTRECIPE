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
exports.RootCtrl = void 0;
const winston_1 = require("../lib/config/winston");
const ApiError_1 = require("../handlers/ApiError");
const RecipeServiceImpl_1 = require("../service/Impl/RecipeServiceImpl");
/**
 * @classdesc Controller of root page : it retrieves all recipe for displaying them on the home screen of the application
 */
class RootCtrl {
    /**
     * Get All Recipes
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @returns {Recipe[]} Array of recipes
     * @typedef {Object} badRequest
     * @throws {badRequest}
     */
    root(req, res) {
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
                 * List of all recipes
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
}
exports.RootCtrl = RootCtrl;
//# sourceMappingURL=rootController.js.map