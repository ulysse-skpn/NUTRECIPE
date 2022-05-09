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
exports.BookmarkRecipeRepository = void 0;
const BookmarkRecipeEntity_1 = require("../entity/BookmarkRecipeEntity");
const RecipeEntity_1 = require("../entity/RecipeEntity");
const database_1 = require("../lib/config/database");
class BookmarkRecipeRepository {
    constructor() {
        this.recipeRepository = database_1.database.getRepository(RecipeEntity_1.Recipe);
        this.bookmarkRepository = database_1.database.getRepository(BookmarkRecipeEntity_1.BookmarkRecipe);
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookmarkRepository.findAll({
                where: { saved: 1 },
                include: {
                    model: this.recipeRepository
                }
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookmarkRepository.findOne({ where: { recipeId: id },
                include: {
                    model: this.recipeRepository
                }
            });
        });
    }
    updateOrCreate(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundItem = yield this.bookmarkRepository.findOne({ where: { recipeId: id },
                include: {
                    model: this.recipeRepository
                }
            });
            if (!foundItem) {
                return this.bookmarkRepository.create(item);
            }
            const options = {
                where: { recipeId: id }
            };
            return this.bookmarkRepository.update(item, options);
        });
    }
}
exports.BookmarkRecipeRepository = BookmarkRecipeRepository;
//# sourceMappingURL=BookmarkRecipeRepository.js.map