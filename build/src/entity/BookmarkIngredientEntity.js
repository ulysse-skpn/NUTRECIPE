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
exports.BookmarkIngredient = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const IngredientEntity_1 = require("./IngredientEntity");
const UserEntity_1 = require("./UserEntity");
let BookmarkIngredient = class BookmarkIngredient extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => IngredientEntity_1.Ingredient),
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], BookmarkIngredient.prototype, "ingredientId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => IngredientEntity_1.Ingredient),
    __metadata("design:type", IngredientEntity_1.Ingredient)
], BookmarkIngredient.prototype, "ingredient", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => UserEntity_1.User),
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], BookmarkIngredient.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => UserEntity_1.User),
    __metadata("design:type", UserEntity_1.User)
], BookmarkIngredient.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], BookmarkIngredient.prototype, "saved", void 0);
BookmarkIngredient = __decorate([
    sequelize_typescript_1.Table
], BookmarkIngredient);
exports.BookmarkIngredient = BookmarkIngredient;
//# sourceMappingURL=BookmarkIngredientEntity.js.map