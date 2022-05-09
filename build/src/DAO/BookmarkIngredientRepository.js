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
exports.BookmarkIngredientRepository = void 0;
const BookmarkIngredientEntity_1 = require("../entity/BookmarkIngredientEntity");
const IngredientEntity_1 = require("../entity/IngredientEntity");
const database_1 = require("../lib/config/database");
class BookmarkIngredientRepository {
    constructor() {
        this.ingredientRepository = database_1.database.getRepository(IngredientEntity_1.Ingredient);
        this.bookmarkRepository = database_1.database.getRepository(BookmarkIngredientEntity_1.BookmarkIngredient);
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookmarkRepository.findAll({
                where: { saved: 1 },
                include: {
                    model: this.ingredientRepository
                }
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookmarkRepository.findOne({ where: { ingredientId: id },
                include: {
                    model: this.ingredientRepository
                }
            });
        });
    }
    updateOrCreate(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundItem = yield this.bookmarkRepository.findOne({ where: { ingredientId: id },
                include: {
                    model: this.ingredientRepository
                }
            });
            if (!foundItem) {
                return this.bookmarkRepository.create(item);
            }
            const options = {
                where: { ingredientId: id }
            };
            return this.bookmarkRepository.update(item, options);
        });
    }
}
exports.BookmarkIngredientRepository = BookmarkIngredientRepository;
//# sourceMappingURL=BookmarkIngredientRepository.js.map