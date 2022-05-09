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
exports.IngredientRepository = void 0;
const IngredientEntity_1 = require("../entity/IngredientEntity");
const database_1 = require("../lib/config/database");
const BookmarkIngredientEntity_1 = require("../entity/BookmarkIngredientEntity");
class IngredientRepository {
    constructor() {
        this.ingredientRepository = database_1.database.getRepository(IngredientEntity_1.Ingredient);
        this.bookmarkRepository = database_1.database.getRepository(BookmarkIngredientEntity_1.BookmarkIngredient);
    }
    exists(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return !!this.ingredientRepository.findByPk(id);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ingredientRepository.findByPk(id, {
                include: {
                    model: this.bookmarkRepository, as: "bookmarkIngredient"
                }
            });
        });
    }
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ingredientRepository.create(item, {
                include: {
                    model: this.bookmarkRepository, as: "bookmarkIngredient"
                }
            });
        });
    }
    bulkCreate(item) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ingredientRepository.bulkCreate(item, {
                include: {
                    model: this.bookmarkRepository, as: "bookmarkIngredient"
                }
            });
        });
    }
    put(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                where: { ingredientId: id },
                limit: 1
            };
            return this.ingredientRepository.update(item, options);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                where: { ingredientId: id },
                limit: 1
            };
            return this.ingredientRepository.destroy(options);
        });
    }
    findAll(limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ingredientRepository.findAll({
                offset: offset,
                limit: limit,
                include: {
                    model: this.bookmarkRepository, as: "bookmarkIngredient"
                }
            });
        });
    }
}
exports.IngredientRepository = IngredientRepository;
//# sourceMappingURL=IngredientRepository.js.map