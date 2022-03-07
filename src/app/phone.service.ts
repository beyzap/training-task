import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { exhaustMap, map, take } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

import { Phone } from './phone-item/phone-item.model';
import { PHONES } from './phones-mock';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  phones: Phone[] = PHONES;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getPhones() {
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      return (
        this.http.get<{ [key: string]: Phone }>
          ('https://training-task-37f8f-default-rtdb.firebaseio.com/posts.json?auth=' + user?.token,

        )
      )
    }),
      map(responseData => {
        const phonesArray: Phone[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            phonesArray.push({ ...responseData[key], id: key });
          }
        }
        return phonesArray
      })

    );
  }


  onAddPhone(postData: {
    name: string; price: number; image: string;
    model: string; color: string; screenSize: string;
    description: string; sku: string
  }): Observable<any> {

    return this.authService.user.pipe(take(1), exhaustMap(user => {
      return (
        this.http.post
          ('https://training-task-37f8f-default-rtdb.firebaseio.com/posts.json?auth=' + user?.token,
            postData
          ).pipe(
            map(resp => { return resp })
          )
      )
    }))
  }

  /* onAddPhone(postData: {
    name: string; price: number; image: string;
    model: string; color: string; screenSize: string;
    description: string; sku: string
  }) {
    return this.http.post('https://training-task-37f8f-default-rtdb.firebaseio.com/posts.json', postData)
  } */


  onDeletePhone(id: string): Observable<unknown> {
    const url = `https://training-task-37f8f-default-rtdb.firebaseio.com/posts/${id}/.json?auth=`;
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      return (
        this.http.delete
          (url + user?.token,
        )
      )
    }))
  }

  /*  onDeletePhone(id: string): Observable<unknown> {
     const url = `https://training-task-37f8f-default-rtdb.firebaseio.com/posts/${id}/.json`;
     return this.http.delete(url)
   } */

  onEditPhone(postData: {
    name: string;
    price: number;
    image: string;
    model: string;
    color: string;
    screenSize: string;
    description: string;
    sku: string
  }, id: string): Observable<unknown> {

    const url = `https://training-task-37f8f-default-rtdb.firebaseio.com/posts/${id}/.json?auth=`;

    return this.authService.user.pipe(take(1), exhaustMap(user => {
      return (
        this.http.put(url + user?.token, postData).pipe(
          map(resp => { return postData })

        )
      )
    }))
  }

  /* onEditPhone(postData: {
    name: string;
    price: number;
    image: string;
    model: string;
    color: string;
    screenSize: string;
    description: string;
    sku: string
  }, id: string): Observable<unknown> {

    const url = `https://training-task-37f8f-default-rtdb.firebaseio.com/posts/${id}/.json`;

    return this.http.put(url, postData)
  } */

}
