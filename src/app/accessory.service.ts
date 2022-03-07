import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Accessory } from './accessory-item/accessory-item.model';
import { ACCESSORIES } from './accessories-mock';
import { Observable, map, take, exhaustMap } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccessoryService {

  accessories: Accessory[] = ACCESSORIES;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAccessories() {
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      return (
        this.http.get<{ [key: string]: Accessory }>
          ('https://training-task-37f8f-default-rtdb.firebaseio.com/accessories.json?auth=' + user?.token,
        )
      )
    }),
      map(responseData => {
        const accessoriesArray: Accessory[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            accessoriesArray.push({ ...responseData[key], id: key });
          }
        }
        return accessoriesArray
      })
    );
  }

  onAddAccessory(postData: {
    name: string; price: number; image: string; id: string
  }): Observable<any> {
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      return (
        this.http.post
          ('https://training-task-37f8f-default-rtdb.firebaseio.com/accessories.json?auth=' + user?.token,
            postData
          ).pipe(
            map(resp => { return postData })

          )
      )
    }
    ))
  }

  /* onAddAccessory(postData: {
    name: string; price: number; image: string
  }): void {
    this.http.post('https://training-task-37f8f-default-rtdb.firebaseio.com/accessories.json', postData)
      .subscribe(responseData => { console.log(responseData) })
  } */

  onDeleteAccessory(id: string): Observable<any> {

    const url = `https://training-task-37f8f-default-rtdb.firebaseio.com/accessories/${id}/.json?auth=`;

    return this.authService.user.pipe(take(1), exhaustMap(user => {
      return (
        this.http.delete
          (url + user?.token,
        ).pipe(
          map(resp => { return id })

        )
      )
    }))
  }

  /* onDeleteAccessory(id: string): Observable<any> {
    const url = `https://training-task-37f8f-default-rtdb.firebaseio.com/accessories/${id}/.json`;
    return this.http.delete(url)
  } */

  onEditAccessory(postData: {
    name: string;
    price: number;
    image: string
  }, id: string): Observable<any> {

    const url = `https://training-task-37f8f-default-rtdb.firebaseio.com/accessories/${id}/.json?auth=`;

    return this.authService.user.pipe(take(1), exhaustMap(user => {
      return (
        this.http.put(url + user?.token, postData).pipe(
          map(resp => { return postData })

        )
      )
    }))
  }

  /* onEditAccessory(postData: {
    name: string;
    price: number;
    image: string
  }, id: string): Observable<unknown> {

    const url = `https://training-task-37f8f-default-rtdb.firebaseio.com/accessories/${id}/.json`;

    return this.http.put(url, postData)
  } */
}
