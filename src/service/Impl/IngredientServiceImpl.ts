import { Ingredient } from "../../entity/IngredientEntity";
import { IIngredientService } from "../IIngredientService";
import { IIngredientRepository } from "../../DAO/IIngredientRepository";

export class IngredientServiceImpl implements IIngredientService
{
    ingredientRepository : IIngredientRepository = new IIngredientRepository()

    constructor(){}

    async ingredientExist(id: number): Promise<boolean>
    {
        return this.ingredientRepository.exists(id)
    }

    async getAllIngredients(): Promise<Ingredient[]>
    {
        return this.ingredientRepository.findAll()
    }

    async getIngredientById(id: number): Promise<Ingredient>
    {
        return this.ingredientRepository.findById(id)
    }

    async addIngredient(item: Ingredient): Promise<Ingredient>
    {
        return this.ingredientRepository.create(item)
    }

    async updateIngredient(id: number, item: Ingredient): Promise<number>
    {
        return this.ingredientRepository.put(id,item)
    }

    async deleteIngredient(id: number): Promise<any>
    {
        return this.ingredientRepository.delete(id)
    }
    
}