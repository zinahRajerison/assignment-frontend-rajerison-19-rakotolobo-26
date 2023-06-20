import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    login:string = "";
    password: string = ""
    error_msg:string =""
    show:boolean = false
   
    constructor (public ClientServ:AuthService,public router:Router){}

    signUp(){
      type Data = {
        token?: string;
        user? : Object
      };
      this.ClientServ.connect(this.login, this.password)
        .pipe(
          catchError(error => {
            // Handle the error here, log it, show an error message, etc.
            console.error('An error occurred:', error);
            this.show = true
            // this.router.navigate(['/login']);
            // Return a new Observable or throw an error to propagate it further
            return throwError('Something went wrong. Please try again later.');
          })
        )
        .subscribe((data:Data) =>{
          console.log(data.token)
          this.ClientServ.loggedIn = true;
          localStorage.setItem("token",(data.token)?.toString()!);
          localStorage.setItem("user", JSON.stringify(data.user))
        this.ClientServ.isAdmin()
        .then(authentifie => {
          if(authentifie) {
            this.ClientServ.loggedAsAdmin = true 
          }else{
            this.ClientServ.loggedAsAdmin = false 
          }
        })
          // this.toolServ.setUser(user);
          this.router.navigate(['/home']);
        });

    }
      

}
