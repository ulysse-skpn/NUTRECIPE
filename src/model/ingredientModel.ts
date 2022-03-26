// import { BuildOptions } from "sequelize";
// import { Model, DataTypes } from "sequelize";
// import { fetchIngredients } from "../fetchData";
// import { database } from "../lib/config/database";

// // export interface IngredientInterface
// // {
// //     id:number,
// //     product_name:string,
// //     ingredient_text:string,
// //     carbohydrates:number,
// //     proteins:number,
// //     fats:number,
// //     salt:number,
// //     calories:number,
// //     nova_group:string,
// //     categories:Array<string>
// //     serving_size:[number,string]
// //     quantity:number,
// //     status:boolean,
// //     image:string
// // }

// export class IngredientDTO extends Model
// {
//     public id!:number
//     public product_name!:string
//     public ingredient_text:string = ""
//     public carbohydrates:number = 0
//     public proteins:number = 0
//     public fats:number = 0
//     public salt:number = 0
//     public calories:number = 0
//     public nova_group:string = ""
//     public categories:string = ""
//     public serving_size:string = ""
//     public quantity:number = 0
//     public status!:boolean
//     public image:string = ""
//     public readonly createdAt!:Date;
//     public readonly updatedAt!:Date;
// }

// export const isIngredient = (obj:any) => {
//     if( obj.hasOwnProperty("product_name")
//     &&
//     obj.hasOwnProperty("ingredient_text")
//     &&
//     obj.hasOwnProperty("carbohydrates")
//     &&
//     obj.hasOwnProperty("proteins") 
//     &&
//     obj.hasOwnProperty("fats")
//     &&
//     obj.hasOwnProperty("salt") 
//     &&
//     obj.hasOwnProperty("calories")
//     &&
//     obj.hasOwnProperty("nova_group") 
//     &&
//     obj.hasOwnProperty("categories")
//     &&
//     obj.hasOwnProperty("serving_size")
//     && 
//     obj.hasOwnProperty("quantity") 
//     &&
//     obj.hasOwnProperty("status") 
//     &&
//     obj.hasOwnProperty("image") )    return true
//     else return false
// }

// // Need to declare the static model so `findOne` etc. use correct types. CF DOC API SEQUELIZE
// type IngredientDTOStatic = typeof Model & {
//     new (values?: object, options?: BuildOptions): IngredientDTO
// }


// // * Certains des types sont au Format: DataTypes.JSON car avec sequ
// export const IngredientDto = <IngredientDTOStatic>database.define("ingredients" , {
//         id: 
//         {
//             type: DataTypes.INTEGER.UNSIGNED,
//             autoIncrement: true,
//             primaryKey: true,
//         },
//         product_name: 
//         {
//             type: DataTypes.JSON,
//             // type: DataTypes.STRING(255),
//             // allowNull: false,
//             // unique: true
//         },
//         ingredient_text: { type: DataTypes.JSON },
//         carbohydrates:{ type: DataTypes.FLOAT },
//         proteins:{ type: DataTypes.FLOAT },
//         fats:{ type: DataTypes.FLOAT },
//         salt:{ type: DataTypes.FLOAT },
//         calories:{ type: DataTypes.FLOAT },
//         nova_group:{ type: DataTypes.STRING(1) 
//             // , allowNull: false 
//         },
//         categories:{ type: DataTypes.JSON },
//         serving_size:{ type: DataTypes.STRING(255) },
//         quantity:{ type: DataTypes.INTEGER },
//         status:{ type: DataTypes.BOOLEAN },
//         image:{ type: DataTypes.JSON },
//         created_at:
//         { 
//             type:DataTypes.DATE,
//             field: "created_at"
//         },
//         updated_at:
//         { 
//             type:DataTypes.DATE,
//             field: "updated_at"
//         }
// })


// // const ALL_INGREDIENTS:any = fetchIngredients()
// INIT()
// async function INIT ()
// {
//     IngredientDto.sync({force:true}).then( async(e) => {
//         console.log("The table for the Ingredient model is SYNC")
//         await IngredientDto.create(
//             {
//                 product_name: 'Exemple ingredient',
//                 ingredient_text: 'Exemple ingredient_text',
//                 carbohydrates: 0.0,
//                 proteins: 29.8,
//                 fats: 0.0,
//                 salt: 5.5,
//                 calories: 962,
//                 nova_group: 4,
//                 categories: 'Viandes,Charcuteries,Jambons,Jambons crus,Jambons secs,Jambons Serrano',
//                 serving_size: null,
//                 quantity: 0,
//                 status: false,
//                 image: 'https://static.openfoodfacts.org/images/products/843/604/504/0053/front_fr.6.400.jpg',
//                 created_at: '2022-03-18T11:04:48.703Z',
//                 updated_at: '2022-03-18T11:04:48.703Z'
//             }
//         )
//         // ALL_INGREDIENTS.forEach( async(element:any) => {
//         //     await IngredientDto.create(element)
//         // });

//         // IngredientDto.bulkCreate( ALL_INGREDIENTS )

//         // const LENGTH = ALL_INGREDIENTS.length
//         // const middleIndex:number = Math.ceil( LENGTH / 2 )
//         // const firstHalf:any = ALL_INGREDIENTS.splice(0,middleIndex)
//         // const secondHalf:any = ALL_INGREDIENTS.splice(-middleIndex)

//         // IngredientDto.bulkCreate( firstHalf ).then( () => {
//         //     IngredientDto.bulkCreate( secondHalf )
//         // })
//     })
// }
