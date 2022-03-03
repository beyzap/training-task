import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Subject, tap } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean,
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA59cMvWe958MpNFKILLHlnl3ifM3srgR4',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
      }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA59cMvWe958MpNFKILLHlnl3ifM3srgR4',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
      }));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth'])
  }

  autoLogin() {
   const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string;

    } = JSON.parse(localStorage.getItem('userData') || '{}');

   if(!userData){
     return;
   }
   
   const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))

   if(loadedUser.token){
     this.user.next(loadedUser);
   }
    
  }

  private handleAuthentication(email: string, localId: string, token: string, expiresIn: number) {
    const expreationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email, localId, token, expreationDate);

    localStorage.setItem('userData', JSON.stringify(user));

    this.user.next(user);
  }
}
