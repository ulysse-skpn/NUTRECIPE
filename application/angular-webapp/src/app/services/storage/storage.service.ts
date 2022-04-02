import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  async get(item:string)
  {
    return localStorage.getItem(item)
  }

  async set(name:string,value:string)
  {
    return localStorage.setItem( name , value )
  }

  async remove(item:string)
  {
    return localStorage.removeItem(item)
  }
}
