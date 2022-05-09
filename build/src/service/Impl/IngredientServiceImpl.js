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
exports.IngredientServiceImpl = void 0;
const IngredientRepository_1 = require("../../DAO/IngredientRepository");
const database_1 = require("../../lib/config/database");
class IngredientServiceImpl {
    constructor() {
        this.ingredientRepository = new IngredientRepository_1.IngredientRepository();
    }
    ingredientExist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ingredientRepository.exists(id);
        });
    }
    getAllIngredients(limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ingredientRepository.findAll(limit, offset);
        });
    }
    getIngredientById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ingredientRepository.findById(id);
        });
    }
    addIngredient(item) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ingredientRepository.create(item);
        });
    }
    updateIngredient(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ingredientRepository.put(id, item);
        });
    }
    deleteIngredient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ingredientRepository.delete(id);
        });
    }
    getNumberElements() {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.database.query("SELECT COUNT(ingredientId) as nbElem FROM `ingredients`");
        });
    }
}
exports.IngredientServiceImpl = IngredientServiceImpl;
//# sourceMappingURL=IngredientServiceImpl.js.map