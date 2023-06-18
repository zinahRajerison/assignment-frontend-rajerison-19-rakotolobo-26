import { Injectable } from '@angular/core';
import { base_url } from '../../environments/environment';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../services/helper.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  loggedAsAdmin = false;
  constructor(private loggingService:LoggingService,
    private http:HttpClient,  public toolServ:HelperService) { }

  // théoriquement, on devrait passer en paramètre le login
  // et le password, cette méthode devrait faire une requête
  // vers un Web Service pour vérifier que c'est ok, renvoyer
  // un token d'authentification JWT etc.
  // elle devrait renvoyer un Observable etc.
  connect(login : string, mdp : string) {
    const options = this.toolServ.formOption();
    let body : any = {
      'login' : login,
      'password' : mdp,
    };
    // this.loggedIn = true;
    return this.http.post(base_url + '/login', body);
  }
  logIn() {
    
    // this.loggedIn = true;
  }
  logOut() {
    console.log("ON SE DELOGGE")

    this.loggedIn = false;
  }

  // si on l'utilisait on ferai isAdmin().then(...)
  isAdmin() {
    type User={
      profil:string
    }
    // Pour le moment, version simplifiée...
    // on suppose qu'on est admin si on est loggué
    const isUserAdminPromise = new Promise((resolve, reject) => {
        if(this.loggedIn){
          var user:User = JSON.parse(localStorage.getItem("user")!);
          if(user.profil == "etudiant"){
            this.loggedAsAdmin = false 
            resolve(false);
          }else{
            this.loggedAsAdmin = true 
            resolve(true)
          }
        }else{
          this.loggedAsAdmin = false 
          resolve(false)
        }
    });

    // on renvoie la promesse qui dit si on est admin ou pas
    return isUserAdminPromise;
  }
}
