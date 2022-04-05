import { Ingredient } from "../../entity/IngredientEntity";
import { IIngredientService } from "../IIngredientService";
import { IngredientRepository } from "../../DAO/IngredientRepository";
import { database } from "../../lib/config/database";

export class IngredientServiceImpl implements IIngredientService
{
    ingredientRepository : IngredientRepository = new IngredientRepository()

    async ingredientExist(id: number): Promise<boolean>
    {
        return this.ingredientRepository.exists(id)
    }

    async getAllIngredients(limit:number,offset:number): Promise<Ingredient[]>
    {
        return this.ingredientRepository.findAll(limit,offset)
    }

    async getIngredientById(id: number): Promise<Ingredient>
    {
        return this.ingredientRepository.findById(id)
    }

    async addIngredient(item: Ingredient): Promise<Ingredient>
    {
        return this.ingredientRepository.create(item)
    }

    async updateIngredient(id: number, item: Ingredient): Promise<[affectedcount:number]>
    {
        return this.ingredientRepository.put(id,item)
    }

    async deleteIngredient(id: number): Promise<number>
    {
        return this.ingredientRepository.delete(id)
    }
    
    async getNumberElements()
    {
        return database.query("SELECT COUNT(id) as nbElem FROM `ingredients`");
    }
}