import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AssignmentsService } from '../shared/assignments.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem,CdkDrag} from '@angular/cdk/drag-drop';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Assignment } from '../assignments/assignment.model';
export interface DialogData {
  note: number;
  remarques: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  opened= true
  devoirsRendus:any
  devoirsPasRendus:any
  id_user:string =''
  animal: string ="";
  name: string="";
  constructor(public assignmentService:AssignmentsService, public dialog:MatDialog) { }
  ngOnInit(): void {
    
    type User={
      _id:string,
    }
    var user:User = JSON.parse(localStorage.getItem("user")!);
    console.log(user)
    this.id_user = user._id
    this.assignmentService.findAssignmentAdmin(this.id_user).subscribe((data:any)=>{
      this.devoirsPasRendus = data.pasrendu
      this.devoirsRendus = data.rendu
    });
  }
  
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
     
    } else {
      var toUpdate=this.devoirsPasRendus[event.previousIndex]
      console.log(toUpdate)
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.updateCommande(toUpdate)
    }
  }
  updateCommande(toUpdate:any)
  {
    this.openDialog(toUpdate)
    
  }
  openDialog(toUpdate:any){
    const dialogRef = this.dialog.open(DialogComponent,{
      data: {note: toUpdate.note, remarques: toUpdate.remarques},
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      toUpdate.note = result.note;
      toUpdate.remarques = result.remarques;
      let devToUpdate = new Assignment(    )
      devToUpdate._id = toUpdate._id
      devToUpdate.dateDeRendu = toUpdate.dateDeRendu
      devToUpdate.rendu = true
      devToUpdate.id_auteur = toUpdate.id_auteur
      devToUpdate.id_matiere = toUpdate.id_matiere
      devToUpdate.nom =toUpdate.nom
      devToUpdate.sujet = devToUpdate.sujet
      devToUpdate.remarques  = toUpdate.remarques
      devToUpdate.note  = toUpdate.note
      console.log('apress')
      console.log(devToUpdate)
      this.assignmentService.updateAssignment(devToUpdate).subscribe((data:any)=>{
        console.log('Notation faite')
      });
    });
    
  }
}
