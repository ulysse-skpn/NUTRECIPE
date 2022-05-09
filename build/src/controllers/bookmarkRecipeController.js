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
exports.BookmarkRecipeCtrl = void 0;
const ApiError_1 = require("../handlers/ApiError");
const winston_1 = require("../lib/config/winston");
const BookmarkRecipeServiceImpl_1 = require("../service/Impl/BookmarkRecipeServiceImpl");
/**
 * @classdesc Controller of bookmark of type recipe
 */
class BookmarkRecipeCtrl {
    /**
     * Get All bookmarks (recipe)
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @returns {BookmarkRecipe[]} Array of bookmarks (recipe)
     * @throws {badRequest}
     */
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * instantiate bookmarkRecipe service implementation
             * @typedef {Object} BookmarkRecipeServiceImpl
             * @type {BookmarkRecipeServiceImpl}
             * @class
             * @instance
             */
            const bookmarkServiceImpl = new BookmarkRecipeServiceImpl_1.BookmarkRecipeServiceImpl();
            try {
                /**
                 * List of all bookmarks (recipe)
                 * @typedef {Object} BookmarkRecipe[]
                 * @type {BookmarkRecipe[]}
                 */
                const bookmarksList = yield bookmarkServiceImpl.getAllRecipeBookmarks();
                res.status(200).send(bookmarksList);
            }
            catch (err) {
                winston_1.logger.error(`Method => GET ALL Recipe Bookmarks : ${err.message}`);
                res.status(400).send(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    updateOrCreate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id;
            /**
             * instantiate bookmarkRecipe service implementation
             * @typedef {Object} BookmarkRecipeServiceImpl
             * @type {BookmarkRecipeServiceImpl}
             * @class
             * @instance
             */
            const bookmarkServiceImpl = new BookmarkRecipeServiceImpl_1.BookmarkRecipeServiceImpl();
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
                 * @typedef {Object} BookmarkRecipe
                 * @type {BookmarkRecipe}
                 */
                const bookmark = req.body;
                /**
                 * Update a bookmark or create a bookmark if it doesn't exist
                 * @typedef {Object} BookmarkRecipe[]
                 * @type {BookmarkRecipe[]}
                 * @function updateOrCreateRecipeBookmark
                 * @param {number} id
                 * @param {BookmarkRecipe} bookmark
                 */
                const result = yield bookmarkServiceImpl.updateOrCreateRecipeBookmark(id, bookmark);
                if (result)
                    res.status(202).send(result);
                else
                    res.status(404).send(ApiError_1.ApiError.not_found("There is no bookmark with this id"));
            }
            catch (err) {
                winston_1.logger.error(`Method => PUT Recipe Bookmarks : ${err.message}`);
                res.status(400).send(ApiError_1.ApiError.not_found(err.message));
            }
        });
    }
}
exports.BookmarkRecipeCtrl = BookmarkRecipeCtrl;
/**
 *
 * @param obj
 * @returns {boolean}
 */
const isBookmark = (obj) => {
    if (obj.hasOwnProperty("recipeId")
        && obj.hasOwnProperty("userId")
        && obj.hasOwnProperty("saved"))
        return true;
    else
        return false;
};
//# sourceMappingURL=bookmarkRecipeController.js.map