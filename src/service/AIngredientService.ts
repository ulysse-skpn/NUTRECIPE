import { DestroyOptions, UpdateOptions } from "sequelize";
import { Ingredient } from "../entity/IngredientEntity";
import { IAbstractService } from "./AIAbstractService";

export class IngredientService implements IAbstractService<Ingredient>
{
    async exists(id: number): Promise<boolean> 
    {
        const result = await Ingredient.findByPk(id)
        
        if( result ) return true
        else return false
    }

    async getAllIngredients(): Promise<Ingredient[]>
    {   
        const result = await Ingredient.findAll()
        
        if( result ) return result
        else throw Error(`Unknown error`)
    }

    async getIngredientById(id:number): Promise<Ingredient>
    {   
        const result = await Ingredient.findByPk(id)
        
        if( result ) return result
        else throw Error(`Ingredient with id:'${id}' does not exist`)
    }

    async create(item: Ingredient): Promise<Ingredient> 
    {
        const result = await Ingredient.create(item)
        return result
    }

    async update(id: number, item: Ingredient): Promise<[affectedCount: number]> 
    {
        const exists = await this.exists(id)

        if( exists )
        {
            const options: UpdateOptions = {
                where: {id},
                limit:1
            }

            const result = await Ingredient.update( item , options )
            return result
        }
        else throw Error(`Ingredient doesn't exists, id:${id}`)
    }

    async delete(id: number): Promise<any> 
    {
        const exists = await this.exists(id)

        if( exists )
        {   
            const options: DestroyOptions = {
                where: {id:id},
                limit:1,
            }
            
            const result = await Ingredient.destroy(options)    
            return result
        }
        else throw Error(`Ingredient doesn't exists, id:${id}`)
    }
}