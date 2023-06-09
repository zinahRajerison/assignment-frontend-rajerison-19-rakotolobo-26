import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Application de gestion de devoirs à rendre';
  labelConnexion = "Se connecter";
  nom:string = "";
  currentRoute:string = "";
  opened=true

  constructor(private authService:AuthService, 
              private router:Router,
              private assigmmentsService:AssignmentsService) {
    console.log(router.url);

    router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        console.log(event.url);
        this.currentRoute = event.url;
      }
    });
    
    
  }

  login() {
    if(this.authService.loggedIn) {
      this.authService.logOut()
    }
    this.router.navigate(["/login"]);
  }

  isLogged() {
    type User={
      nom:string,
      prenom : string
    }
    if(this.authService.loggedIn) {
      var user:User = JSON.parse(localStorage.getItem("user")!);
      this.nom = user.nom + " " +user.prenom;
      this.labelConnexion = "Se déconnecter";
    }
    return this.authService.loggedIn;
  }

  creerDonneesDeTest() {
    this.assigmmentsService.peuplerBDavecForkJoin()
    .subscribe(() => {
      console.log("Opération terminée, les 1000 données ont été insérées")

      // on refresh la page pour que la liste apparaisse
      // plusieurs manières de faire....
      window.location.reload();
    });
  }
  
  isAdmin() {
    // renvoie si on est loggé ou pas
  return this.authService.loggedAsAdmin
  }
}
