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
exports.Recipe = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const BookmarkRecipeEntity_1 = require("./BookmarkRecipeEntity");
let Recipe = class Recipe extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Recipe.prototype, "recipeId", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Recipe.prototype, "title", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Recipe.prototype, "prep_time", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Recipe.prototype, "cooking_time", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Recipe.prototype, "rest_time", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Recipe.prototype, "categories", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Recipe.prototype, "ingredients_list", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Recipe.prototype, "serving_size", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Recipe.prototype, "instructions", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Recipe.prototype, "image", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => BookmarkRecipeEntity_1.BookmarkRecipe),
    __metadata("design:type", BookmarkRecipeEntity_1.BookmarkRecipe)
], Recipe.prototype, "bookmarkRecipe", void 0);
Recipe = __decorate([
    sequelize_typescript_1.Table
], Recipe);
exports.Recipe = Recipe;
//# sourceMappingURL=RecipeEntity.js.map