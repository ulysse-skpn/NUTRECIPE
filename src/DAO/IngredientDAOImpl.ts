// import { DestroyOptions , UpdateOptions } from "sequelize";
// // import { IngredientDTO , IngredientDto } from "../model/ingredientModel";
// import { IngredientDAO } from "./IngredientDAO";

// export class IngredientDAOImpl implements IngredientDAO
// {
//     private model:any

//     constructor(model:any)
//     {
//         this.model = model
//     }

//     async exists(id: number): Promise<boolean> 
//     {
//         const result = await IngredientDto.findByPk(id)
//         return !!result === true
//     }

//     async getAllIngredients(): Promise<IngredientDTO[]> 
//     {
//         const result = await IngredientDto.findAll({})
//         return result
//     }

//     async getIngredientById(ingredientId: number): Promise<IngredientDTO> 
//     {
//         const result = await IngredientDto.findByPk(ingredientId)
//         if( result ) return result
//         else throw Error(`Ingredient with id:'${ingredientId}' does not exist`)
//     }


//     async create(ingredient: IngredientDTO): Promise<IngredientDTO> 
//     {
//         const exists = await this.exists(ingredient.id)
        
//         if( !exists )
//         {   
//             const result = await IngredientDto.create({...ingredient})
//             return result
//         }
//         else throw Error(`Ingredient with text:'${ingredient.ingredient_text}' already exists`)
//     }

//     async update(id: number, ingredient: IngredientDTO): Promise<[affectedCount: number]> 
//     {
//         const exists = await this.exists(id)

//         if( exists )
//         {
//             const options: UpdateOptions = {
//                 where: {id:id},
//                 limit:1,
//             }

//             const result = await IngredientDto.update(ingredient , options)
//             return result            
//         }
//         else throw Error(`Ingredient doesn't exists, id:${id}`)
//     }
    
//     async delete(id: number): Promise<any>
//     {
//         const exists = await this.exists(id)

//         if( exists )
//         {   
//             const options: DestroyOptions = {
//                 where: {id:id},
//                 limit:1,
//             }
            
//             const result = await IngredientDto.destroy(options)    
//             return result
//         }
//         else throw Error(`Ingredient doesn't exists, id:${id}`)
//     }


// }