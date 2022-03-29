import { Ingredient } from "../entity/IngredientEntity"
import { IBaseRepository } from "./IBaseRepository"
import { database } from "../lib/config/database"
import { UpdateOptions , DestroyOptions } from "sequelize"

export class IngredientRepository implements IBaseRepository<Ingredient>
{
    ingredientRepository = database.getRepository(Ingredient)

    async exists(id: number): Promise<boolean> 
    {
        return !!this.ingredientRepository.findByPk(id)
    }

    async findById(id: number): Promise<Ingredient | any> 
    {
        return this.ingredientRepository.findByPk(id)
    }

    async create(item: Ingredient): Promise<Ingredient> 
    {
        return this.ingredientRepository.create(item)
    }

    async put(id: number, item: Ingredient): Promise<[affectedCount:number]> 
    {
        const options:UpdateOptions = 
        {
            where:{id:id},
            limit:1
        }
        return this.ingredientRepository.update(item,options)
    }

    async delete(id: number): Promise<number> 
    {
        const options:DestroyOptions = 
        {
            where:{id:id},
            limit:1
        }
        return this.ingredientRepository.destroy(options)
    }

    async findAll(): Promise<Ingredient[]> 
    {
        return this.ingredientRepository.findAll()
    }

}