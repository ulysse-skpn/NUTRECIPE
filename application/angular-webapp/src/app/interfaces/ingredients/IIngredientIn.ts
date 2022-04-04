export interface IIngredientIn
{
    product_name:string
    ingredient_text:string
    carbohydrates:number
    proteins:number
    fats:number
    salt:number
    calories:number
    nova_group:NOVA_GROUP
    categories:string
    serving_size:string
    quantity:number
    status:boolean
    image:string
}

enum NOVA_GROUP
{
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4
}