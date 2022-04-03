export interface IBaseRepository<T>
{
    exists(id:number):Promise<boolean>
    findAll(limit:number,offset:number):Promise<T[]>
    findById(id:number):Promise<T>
    create(item:T):Promise<T>
    put(id:number,item: T):Promise<[affectCount:number]>
    delete(id:number):Promise<number>
}