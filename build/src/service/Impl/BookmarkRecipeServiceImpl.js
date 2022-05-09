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
exports.BookmarkRecipeServiceImpl = void 0;
const BookmarkRecipeRepository_1 = require("../../DAO/BookmarkRecipeRepository");
class BookmarkRecipeServiceImpl {
    constructor() {
        this.bookmarkIngredientRepository = new BookmarkRecipeRepository_1.BookmarkRecipeRepository();
    }
    getAllRecipeBookmarks() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookmarkIngredientRepository.findAll();
        });
    }
    getRecipeBookmarkById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookmarkIngredientRepository.findById(id);
        });
    }
    updateOrCreateRecipeBookmark(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookmarkIngredientRepository.updateOrCreate(id, item);
        });
    }
}
exports.BookmarkRecipeServiceImpl = BookmarkRecipeServiceImpl;
//# sourceMappingURL=BookmarkRecipeServiceImpl.js.map