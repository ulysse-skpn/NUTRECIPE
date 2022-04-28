export interface IBookmarkRepository<T>
{
    findAll(id:number,string:string):Promise<T[]>
    findById(id:number):Promise<T | null>
    updateOrCreate(id:number,item: T):Promise<T | [affectCount:number]>
}