import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis?: Assignment;
  photo?:string;
  nomMatiere?:string
  nomEtudiant?:string

  constructor(private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService:AuthService,) { }

  ngOnInit(): void {
    // appelée avant le rendu du composant
    // on va chercher l'id dans l'url active
    // en mettant + on force la conversion en number
    const id = this.route.snapshot.params['id'];
    console.log("Dans le ngOnInit de detail, id = " + id);

    // on va chercher l'assignment à afficher
    this.assignmentsService.getAssignment(id)
      .subscribe(assignment => {
        
        console.log("assignment")
        console.log(assignment)
        this.assignmentTransmis = assignment;
        this.photo = this.assignmentTransmis?.matiere?.[0]?.image
        this.nomMatiere = this.assignmentTransmis?.matiere?.[0]?.nom 
        this.nomEtudiant = this.assignmentTransmis?.auteur?.[0]?.nom + " " + this.assignmentTransmis?.auteur?.[0]?.prenom
      });
  }

  onDeleteAssignment() {
    if (!this.assignmentTransmis) return;

    console.log("Suppression de l'assignment " + this.assignmentTransmis.nom);
    console.log(this.assignmentTransmis)
    // on demande au service la suppression de l'assignment
    this.assignmentsService.deleteAssignment(this.assignmentTransmis)
      .subscribe(message => {
        console.log(message);
        // Pour cacher le detail, on met l'assignment à null
        this.assignmentTransmis = undefined;

        // et on navigue vers la page d'accueil
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

  onAssignmentRendu() {
    if (!this.assignmentTransmis) return;

    this.assignmentTransmis.rendu = true;

    // on appelle le service pour faire l'update
    this.assignmentsService.updateAssignment(this.assignmentTransmis)
      .subscribe(message => {
        console.log(message);
      });
  }

  onEditAssignment() {
    // navigation vers la page edit
    // équivalent à "/assignment/2/edit" par exemple
    // path = "/assignment/" + this.assignmentTransmis?.id + "/edit";
    // this.router.navigate([path]);
    // c'est pour vous montrer la syntaxe avec [...]
    this.router.navigate(["/assignments", this.assignmentTransmis?._id, "edit"],
    {
      queryParams: {
        nom: this.assignmentTransmis?.nom,
        matiere: "Angular",
        id: this.assignmentTransmis?._id,
      },
      fragment: "edition"
    });
  }

  isAdmin() {
    // renvoie si on est loggé ou pas
  return this.authService.loggedAsAdmin
  }
}
