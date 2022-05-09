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
exports.NOVA_GROUP = exports.Ingredient = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const BookmarkIngredientEntity_1 = require("./BookmarkIngredientEntity");
let Ingredient = class Ingredient extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Ingredient.prototype, "ingredientId", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Ingredient.prototype, "product_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Ingredient.prototype, "ingredient_text", void 0);
__decorate([
    sequelize_typescript_1.IsFloat,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.FLOAT),
    __metadata("design:type", Number)
], Ingredient.prototype, "carbohydrates", void 0);
__decorate([
    sequelize_typescript_1.IsFloat,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.FLOAT),
    __metadata("design:type", Number)
], Ingredient.prototype, "proteins", void 0);
__decorate([
    sequelize_typescript_1.IsFloat,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.FLOAT),
    __metadata("design:type", Number)
], Ingredient.prototype, "fats", void 0);
__decorate([
    sequelize_typescript_1.IsFloat,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.FLOAT),
    __metadata("design:type", Number)
], Ingredient.prototype, "salt", void 0);
__decorate([
    sequelize_typescript_1.IsFloat,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.FLOAT),
    __metadata("design:type", Number)
], Ingredient.prototype, "calories", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.CHAR(1)),
    __metadata("design:type", Number)
], Ingredient.prototype, "nova_group", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Ingredient.prototype, "categories", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Ingredient.prototype, "serving_size", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Ingredient.prototype, "image", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => BookmarkIngredientEntity_1.BookmarkIngredient),
    __metadata("design:type", BookmarkIngredientEntity_1.BookmarkIngredient)
], Ingredient.prototype, "bookmarkIngredient", void 0);
Ingredient = __decorate([
    sequelize_typescript_1.Table
], Ingredient);
exports.Ingredient = Ingredient;
var NOVA_GROUP;
(function (NOVA_GROUP) {
    NOVA_GROUP[NOVA_GROUP["ONE"] = 1] = "ONE";
    NOVA_GROUP[NOVA_GROUP["TWO"] = 2] = "TWO";
    NOVA_GROUP[NOVA_GROUP["THREE"] = 3] = "THREE";
    NOVA_GROUP[NOVA_GROUP["FOUR"] = 4] = "FOUR";
})(NOVA_GROUP = exports.NOVA_GROUP || (exports.NOVA_GROUP = {}));
//# sourceMappingURL=IngredientEntity.js.map