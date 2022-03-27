export interface IBaseRepository<T>
{
    exists(id:number):Promise<boolean>
    findAll():Promise<T[]>
    findById(id:number):Promise<T>
    create(item:T):Promise<T>
    put(id:number,item: T):Promise<number>
    delete(id:number):Promise<T>
}