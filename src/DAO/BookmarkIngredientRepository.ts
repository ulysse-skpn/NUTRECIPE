import { UpdateOptions } from "sequelize";
import { BookmarkIngredient } from "../entity/BookmarkIngredientEntity";
import { Ingredient } from "../entity/IngredientEntity";
import { database } from "../lib/config/database";
import { IBookmarkRepository } from "./IBookmarkRepository";

export class BookmarkIngredientRepository implements IBookmarkRepository<BookmarkIngredient>
{

    ingredientRepository = database.getRepository(Ingredient)
    bookmarkRepository = database.getRepository(BookmarkIngredient)

    async findAll(): Promise<BookmarkIngredient[]> 
    {
        return this.bookmarkRepository.findAll({
            where:{saved:1},
            include:
            {
                model:this.ingredientRepository
            }
        })
    }

    async findById(id: number): Promise<BookmarkIngredient | null> 
    {
        return this.bookmarkRepository.findOne({where:{ingredientId:id}
            ,
            include:
            {
                model:this.ingredientRepository
            }
        })
    }

    async updateOrCreate(id: number, item: Partial<BookmarkIngredient>): Promise<BookmarkIngredient | [affectCount: number]> 
    {
        const foundItem = await this.bookmarkRepository.findOne({where:{ingredientId:id}
            ,
            include:
            {
                model:this.ingredientRepository
            }
        })

        if( !foundItem )
        {
            return this.bookmarkRepository.create(item)
        }
        
        const options:UpdateOptions = 
        {
            where: {ingredientId:id}
        }
        
        return this.bookmarkRepository.update(item,options)
    }


}