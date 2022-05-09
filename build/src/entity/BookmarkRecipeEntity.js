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
exports.BookmarkRecipe = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const RecipeEntity_1 = require("./RecipeEntity");
const UserEntity_1 = require("./UserEntity");
let BookmarkRecipe = class BookmarkRecipe extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => RecipeEntity_1.Recipe),
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], BookmarkRecipe.prototype, "recipeId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => RecipeEntity_1.Recipe),
    __metadata("design:type", RecipeEntity_1.Recipe)
], BookmarkRecipe.prototype, "recipe", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => UserEntity_1.User),
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], BookmarkRecipe.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => UserEntity_1.User),
    __metadata("design:type", UserEntity_1.User)
], BookmarkRecipe.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], BookmarkRecipe.prototype, "saved", void 0);
BookmarkRecipe = __decorate([
    sequelize_typescript_1.Table
], BookmarkRecipe);
exports.BookmarkRecipe = BookmarkRecipe;
//# sourceMappingURL=BookmarkRecipeEntity.js.map