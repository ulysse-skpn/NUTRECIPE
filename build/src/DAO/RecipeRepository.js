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
exports.RecipeRepository = void 0;
const database_1 = require("../lib/config/database");
const RecipeEntity_1 = require("../entity/RecipeEntity");
const BookmarkRecipeEntity_1 = require("../entity/BookmarkRecipeEntity");
class RecipeRepository {
    constructor() {
        this.recipeRepository = database_1.database.getRepository(RecipeEntity_1.Recipe);
        this.bookmarkRepository = database_1.database.getRepository(BookmarkRecipeEntity_1.BookmarkRecipe);
    }
    exists(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return !!this.recipeRepository.findByPk(id);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.recipeRepository.findByPk(id, {
                include: {
                    model: this.bookmarkRepository, as: "bookmarkRecipe"
                }
            });
        });
    }
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.recipeRepository.create(item, {
                include: {
                    model: this.bookmarkRepository, as: "bookmarkRecipe"
                }
            });
        });
    }
    bulkCreate(item) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.recipeRepository.bulkCreate(item, {
                include: {
                    model: this.bookmarkRepository, as: "bookmarkRecipe"
                }
            });
        });
    }
    put(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                where: { recipeId: id },
                limit: 1
            };
            return this.recipeRepository.update(item, options);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                where: { recipeId: id },
                limit: 1
            };
            return this.recipeRepository.destroy(options);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.recipeRepository.findAll();
        });
    }
    findAllPagination(limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.recipeRepository.findAll({
                offset: offset,
                limit: limit,
                include: {
                    model: this.bookmarkRepository, as: "bookmarkRecipe"
                }
            });
        });
    }
}
exports.RecipeRepository = RecipeRepository;
//# sourceMappingURL=RecipeRepository.js.map