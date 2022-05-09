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
exports.BookmarkIngredientServiceImpl = void 0;
const BookmarkIngredientRepository_1 = require("../../DAO/BookmarkIngredientRepository");
class BookmarkIngredientServiceImpl {
    constructor() {
        this.bookmarkIngredientRepository = new BookmarkIngredientRepository_1.BookmarkIngredientRepository();
    }
    getAllIngredientBookmarks() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookmarkIngredientRepository.findAll();
        });
    }
    getIngredientBookmarkById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookmarkIngredientRepository.findById(id);
        });
    }
    updateOrCreateIngredientBookmark(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookmarkIngredientRepository.updateOrCreate(id, item);
        });
    }
}
exports.BookmarkIngredientServiceImpl = BookmarkIngredientServiceImpl;
//# sourceMappingURL=BookmarkIngredientServiceImpl.js.map