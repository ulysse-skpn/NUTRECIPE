import { Model } from "sequelize/types";
import { Ingredient , NOVA_GROUP } from "../entity/IngredientEntity";

export class IngredientDTO extends Model
{
    public id!:number
    public product_name!: string;
    public ingredient_text!: string;
    public carbohydrates!: number;
    public proteins!: number;
    public fats!: number;
    public salt!: number;
    public calories!: number;
    public nova_group!: NOVA_GROUP;
    public categories!: string;
    public serving_size!: string;
    public quantity!: number;
    public status!: boolean;
    public image!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    
    constructor(ingredient: Ingredient)
    {
        super()
        this.id = ingredient.id
        this.product_name = ingredient.product_name
        this.ingredient_text = ingredient.ingredient_text
        this.carbohydrates = ingredient.carbohydrates
        this.proteins = ingredient.proteins
        this.fats = ingredient.fats
        this.salt = ingredient.salt
        this.calories = ingredient.calories
        this.nova_group = ingredient.nova_group
        this.categories = ingredient.categories
        this.serving_size = ingredient.serving_size
        this.quantity = ingredient.quantity
        this.status = ingredient.status
        this.image = ingredient.image
    }
}