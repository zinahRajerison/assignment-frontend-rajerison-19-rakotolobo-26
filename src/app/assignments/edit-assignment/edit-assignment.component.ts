import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
 selector: 'app-edit-assignment',
 templateUrl: './edit-assignment.component.html',
 styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
 assignment!: Assignment | undefined;
 // associées aux champs du formulaire
 nomAssignment!: string;
 dateDeRendu!: Date;
 sujet!: String;

 constructor(
   private assignmentsService: AssignmentsService,
   private route: ActivatedRoute,
   private router: Router,
   private authService:AuthService
 ) {}

 ngOnInit(): void {
   this.getAssignment();
 }
 getAssignment() {
  // on récupère l'id dans le snapshot passé par le routeur
  // le "+" force l'id de type string en "number"
  const id = +this.route.snapshot.params['id'];
  // Exemple de récupération des query params (après le ? dans l'url)
  const queryParams = this.route.snapshot.queryParams;
  console.log(queryParams);
  console.log("nom :"  + queryParams['nom'])
  console.log("matière :" + queryParams['matiere'])
  const _id = queryParams['id']
  console.log("_id :"  + queryParams['id'])
 
  // Exemple de récupération du fragment (après le # dans l'url)
  const fragment = this.route.snapshot.fragment;
  console.log("Fragment = " + fragment);

  this.assignmentsService.getAssignment(_id)
  .subscribe((assignment) => {
    if (!assignment) return;
    this.assignment = assignment;
    // Pour pré-remplir le formulaire
    this.nomAssignment = assignment.nom;
    this.dateDeRendu = assignment.dateDeRendu;
    this.sujet = assignment.sujet;
  });
}
onSaveAssignment() {
  if (!this.assignment) return;

  // on récupère les valeurs dans le formulaire
  this.assignment.nom = this.nomAssignment;
  this.assignment.dateDeRendu = this.dateDeRendu;
  this.assignment.sujet = this.sujet;
  this.assignmentsService
    .updateAssignment(this.assignment)
    .subscribe((message) => {
      console.log(message);

      // navigation vers la home page 
      if(this.authService.loggedAsAdmin){
           this.router.navigate(["/liste"]);
          }
          else{
  
          // On va naviguer vers la page d'accueil pour afficher la liste
          // des assignments
          this.router.navigate(["/home"]);
          }
    });
}
}
