import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService, AuthResponseData} from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl:'./auth.component.html',
  styleUrls:['./auth.component.scss']
})
export class AuthComponent{
  isLoginMode = true;
  isLoading = false;
  error:string = null;

  constructor(private authService:AuthService, private router:Router){}

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form:NgForm){
    if(!form.valid){
      return;
    }
    const email= form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if(this.isLoginMode){
      //login code
     authObs =  this.authService.login(email,password);/* Saved in Observable */
    }
    else{ //signUp code
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe( /* Subscribing saved Observable */
      responseData =>{
        console.log(responseData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage=>{
        console.log(errorMessage);
       this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();

  }

  onCloseErrorAlert(){
    this.error = null;
  }
}
