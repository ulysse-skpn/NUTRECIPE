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
exports.BookmarkIngredientCtrl = void 0;
const ApiError_1 = require("../handlers/ApiError");
const winston_1 = require("../lib/config/winston");
const BookmarkIngredientServiceImpl_1 = require("../service/Impl/BookmarkIngredientServiceImpl");
/**
 * @classdesc Controller of bookmark of type ingredient
 */
class BookmarkIngredientCtrl {
    /**
     * Get All bookmarks (ingredient)
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @returns {BookmarkIngredient[]} Array of bookmarks (ingredient)
     * @throws {badRequest}
     */
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * instantiate bookmarkIngredient service implementation
             * @typedef {Object} BookmarkIngredientServiceImpl
             * @type {BookmarkIngredientServiceImpl}
             * @class
             * @instance
             */
            const bookmarkServiceImpl = new BookmarkIngredientServiceImpl_1.BookmarkIngredientServiceImpl();
            try {
                /**
                 * List of all bookmarks (ingredient)
                 * @typedef {Object} BookmarkIngredient[]
                 * @type {BookmarkIngredient[]}
                 */
                const bookmarksList = yield bookmarkServiceImpl.getAllIngredientBookmarks();
                res.status(200).send(bookmarksList);
            }
            catch (err) {
                winston_1.logger.error(`Method => GET ALL Ingredient Bookmarks : ${err.message}`);
                res.status(400).send(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    /**
     * Update a bookmark (ingredient)
     * @async
     * @method
     * @typedef {Object} BookmarkIngredient
     * @param {Request} req express request
     * @param {Response} res express response
     * @returns {(number|BookmarkIngredient)} affected count | Bookmark of ingredient
     * @throws {not_found} When the bookmark is not found (ingredient)
     */
    updateOrCreate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id;
            /**
             * instantiate bookmarkIngredient service implementation
             * @typedef {Object} BookmarkIngredientServiceImpl
             * @type {BookmarkIngredient}
             * @class
             * @instance
             */
            const bookmarkServiceImpl = new BookmarkIngredientServiceImpl_1.BookmarkIngredientServiceImpl();
            try {
                /**
                 * @param {string} req.params.id
                 */
                id = parseInt(req.params.id);
                /**
                 * @throws {Error} Id is not a number
                 */
                if (isNaN(id))
                    throw Error("Bookmark Id is not a number");
                /**
                 * @throws {Error} Object is malformed
                 */
                if (!isBookmark(req.body))
                    throw Error("Bookmark object is malformed");
                /**
                 * Request from client side
                 * @typedef {Object} BookmarkIngredient
                 * @type {BookmarkIngredient}
                 */
                const bookmark = req.body;
                /**
                 * Update a bookmark or create a bookmark if it doesn't exist
                 * @typedef {Object} BookmarkIngredient[]
                 * @type {BookmarkIngredient[]}
                 * @function updateOrCreateIngredientBookmark
                 * @param {number} id
                 * @param {BookmarkIngredient} bookmark
                 */
                const result = yield bookmarkServiceImpl.updateOrCreateIngredientBookmark(id, bookmark);
                if (result)
                    res.status(202).send(result);
                else
                    res.status(404).send(ApiError_1.ApiError.not_found("There is no bookmark with this id"));
            }
            catch (err) {
                winston_1.logger.error(`Method => PUT Ingredient Bookmarks : ${err.message}`);
                res.status(400).send(ApiError_1.ApiError.not_found(err.message));
            }
        });
    }
}
exports.BookmarkIngredientCtrl = BookmarkIngredientCtrl;
/**
 *
 * @param obj
 * @returns {boolean}
 */
const isBookmark = (obj) => {
    if (obj.hasOwnProperty("ingredientId")
        && obj.hasOwnProperty("userId")
        && obj.hasOwnProperty("saved"))
        return true;
    else
        return false;
};
//# sourceMappingURL=bookmarkIngredientController.js.map