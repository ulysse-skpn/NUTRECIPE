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
exports.RecipeServiceImpl = void 0;
const RecipeRepository_1 = require("../../DAO/RecipeRepository");
const database_1 = require("../../lib/config/database");
class RecipeServiceImpl {
    constructor() {
        this.recipeRepository = new RecipeRepository_1.RecipeRepository();
    }
    recipeExist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.recipeRepository.exists(id);
        });
    }
    getAllRecipes() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.recipeRepository.findAll();
        });
    }
    getAllRecipesPagination(limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.recipeRepository.findAllPagination(limit, offset);
        });
    }
    getRecipeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.recipeRepository.findById(id);
        });
    }
    addRecipe(item) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.recipeRepository.create(item);
        });
    }
    updateRecipe(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.recipeRepository.put(id, item);
        });
    }
    deleteRecipe(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.recipeRepository.delete(id);
        });
    }
    getNumberElements() {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.database.query("SELECT COUNT(recipeId) as nbElem FROM `recipes`");
        });
    }
}
exports.RecipeServiceImpl = RecipeServiceImpl;
//# sourceMappingURL=RecipeServiceImpl.js.map