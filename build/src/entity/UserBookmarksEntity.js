"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBookmarks = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const baseModel_1 = require("../model/baseModel");
const BookmarkIngredientEntity_1 = require("./BookmarkIngredientEntity");
const BookmarkRecipeEntity_1 = require("./BookmarkRecipeEntity");
const UserEntity_1 = require("./UserEntity");
let UserBookmarks = class UserBookmarks extends baseModel_1.BaseModel {
};
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.ForeignKey)(() => UserEntity_1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], UserBookmarks.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.ForeignKey)(() => BookmarkIngredientEntity_1.BookmarkIngredient),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], UserBookmarks.prototype, "ingredientBookmarkId", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.ForeignKey)(() => BookmarkRecipeEntity_1.BookmarkRecipe),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], UserBookmarks.prototype, "recipeBookmarkId", void 0);
UserBookmarks = __decorate([
    sequelize_typescript_1.Table
], UserBookmarks);
exports.UserBookmarks = UserBookmarks;
//# sourceMappingURL=UserBookmarksEntity.js.map