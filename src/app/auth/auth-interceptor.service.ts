import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()/* dont give provideIn here */
export class AuthInterceptorService implements HttpInterceptor{
/* edit the request and add the token to all outgoing req */
  constructor(private authService:AuthService){}

  intercept(req:HttpRequest<any>,next:HttpHandler){
    return this.authService.user.pipe(take(1),/* Take only 1 value from observable i.e latest user*/
    exhaustMap( /* The Angular ExhaustMap maps each value from the source observable into an inner observable,
      subscribes to it. It then starts emitting the values from it replacing the original value.
      It then waits for the inner observable to finish. If it receives any new values before the completion of the inner observable it ignores it.
       It receives a new value after completion of the inner observable, then it creates a new inner observable. The whole process repeats itself until the source observable is completes */
       user=>{

        if(!user){/* If we dont have a user already (ex. while signup send req), so handle original req without auth token */
          return next.handle(req);
        }

         const modifiedReq = req.clone({/* clone the request and add auth params */
          /* For firebase, we need to add token as params while in other REST API we need to add in headers*/
          params: new HttpParams().set('auth',user.token)
         });
         return next.handle(modifiedReq);
       }));

  }
}
