export interface IBookmarkRepository<T>
{
    exists(id:number):Promise<boolean>
    findAll(limit:number,offset:number):Promise<T[]>
    updateOrCreate(id:number,item: T):Promise< T | [affectCount:number]>
}