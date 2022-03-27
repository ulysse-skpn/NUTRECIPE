export interface IAbstractService<T>
{
    exists(id: number): Promise<boolean>
    create(item: T): Promise<T>
    update(id:number , item:T): Promise<[affectedCount:number]>
    delete(id: number): Promise<any>
}