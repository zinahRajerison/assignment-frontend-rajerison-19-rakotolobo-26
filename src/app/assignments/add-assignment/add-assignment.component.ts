import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { Matiere } from '../../matiere/matiere.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit{

  // champs du formulaire
  nomDevoir = "";
  dateDeRendu!: Date;
  sujet = "";
  rendu!: boolean;
  id_auteur!: String;
  id_matiere = "";
  note!: Number;
  remarques!: String;
  matieres:Matiere[] = [];


  constructor(private assignmentsService: AssignmentsService,
              private router:Router) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    console.log("sdfghjkljhgf------------------------------------");
    this.getMatieres();
  }

  getMatieres(){
    this.assignmentsService.getMatieres()
    .subscribe(data => {
      this.matieres = data;
      console.log("Données reçues");
      console.log(data);
    });
  }

  onSubmit(event: any) {
    // On vérifie que les champs ne sont pas vides
    if (this.nomDevoir === "") return;
    if (this.dateDeRendu === undefined) return;

    let nouvelAssignment = new Assignment();
    // génération d'id, plus tard ce sera fait dans la BD
    // nouvelAssignment.id = Math.abs(Math.random() * 1000000000000000);
    nouvelAssignment.nom = this.nomDevoir;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;
    nouvelAssignment.sujet = this.sujet;
    nouvelAssignment.id_auteur = "";
    console.log("matiere------------------" +this.id_matiere);
    nouvelAssignment.id_matiere = this.id_matiere;

    // on demande au service d'ajouter l'assignment
    this.assignmentsService.addAssignment(nouvelAssignment)
      .subscribe(message => {
        console.log(message);

        // On va naviguer vers la page d'accueil pour afficher la liste
        // des assignments
        this.router.navigate(["/home"]);

      });
  }
}
