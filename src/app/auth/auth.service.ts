import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "./user.model";

export interface AuthResponseData{
  kind?:string;
  idToken:string;
  email:string;
  refreshToken:string;
  expiresIn:string;
  localId:string;
  registered?:boolean;
}

@Injectable({providedIn:'root'})
export class AuthService{

  /* Have current user */
  user = new BehaviorSubject<User>(null);/* next the User while logging in or logging out(token expired / invalid) */
  private tokenExpirationTimer:any;

  constructor(private http:HttpClient, private router:Router){}

  signUp(email:string,password:string){/* endpoint from Firebase Auth API signup with email and pass  */
   return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey,
    { /* requestBody should match with Firebase API Auth Doc for signUp with email and password */
      email: email,
      password:password,
      returnSecureToken:true
    })
    .pipe(
      catchError(this.handleError),
      tap( responseData =>{
        this.handleAuthentication(responseData.email,responseData.localId,responseData.idToken,+responseData.expiresIn);/* need to convert expiresIn to number by + */
      }));
  }

  login(email:string,password:string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey,
    { /* requestBody should match with Firebase API Auth Doc for signIn with email and password */
      email: email,
      password:password,
      returnSecureToken:true
    }).pipe(catchError(this.handleError),
    tap( responseData =>{
      this.handleAuthentication(responseData.email,responseData.localId,responseData.idToken,+responseData.expiresIn);/* need to convert expiresIn to number by + */
    }));
  }

  autoLogin(){
    const userData: {
       email:string,
       id:string,
       _token:string,
       _tokenExpirationDate:string
    }= JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return;
    }

    const loadedUser =  new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));

    if(loadedUser.token){/* valid token if expirationDate is in future */
      /* set as active user */
      this.user.next(loadedUser);
      /* After reloading expiration timer continues */
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout(){
    this.user.next(null);/* Set user to null to unauthenticate the authenticated user */
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');/* Remove persistent loggedin user data from localStorage */
    /* Stop autoExpiration timer in background */
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer=null;
  }

  autoLogout(expirationDuration:number){/* Taking param as milliseconds */
    console.log(expirationDuration);
    this.tokenExpirationTimer= setTimeout(()=>{
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(email:string, userId:string,token:string, expiresIn:number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000); /* Converting time in milliseconds, responseData.expiresIn is in
    seconds, we need to convert it into milliseconds
    */
    const user = new User(email,userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);/* in millisecs */
    localStorage.setItem('userData', JSON.stringify(user));/* persistence storage for persisting data even after loading */
  }

  private handleError(errorRes:HttpErrorResponse){
    let errorMessage = 'An unknown error occured!';
    /* if error doesnt contain error key */
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }
    switch(errorRes.error.error.message){
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists !';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email not found !';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break;
    }
    return throwError(errorMessage);
  }
}
