import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';

import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { Routes, RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {MatSidenavModule} from '@angular/material/sidenav';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDialogModule} from '@angular/material/dialog';

import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { authGuard } from './shared/auth.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';  
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatiereComponent } from './matiere/matiere.component';
import { DialogComponent } from './dialog/dialog.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: AssignmentsComponent
  },
  {
    path: 'assignment',
    component: AssignmentsComponent
  },
  {
    path: 'add',
    component: AddAssignmentComponent
  },
  {
    path: 'assignments/:id',
    component: AssignmentDetailComponent
  },
  {
    path: 'assignments/:id/edit',
    component: EditAssignmentComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'liste',
    component: HomeComponent
  }, {
    path: 'dialog',
    component: DialogComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    LoginComponent,
    HomeComponent,
    MatiereComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, RouterModule.forRoot(routes),
    HttpClientModule,
    MatNativeDateModule, ScrollingModule,
    MatButtonModule, MatIconModule, MatDividerModule,
    MatInputModule, MatFormFieldModule, MatDatepickerModule,
    MatListModule, MatCardModule, MatCheckboxModule, MatSlideToggleModule,
    MatTableModule, MatPaginatorModule, MatSidenavModule, MatToolbarModule, MatSelectModule,DragDropModule, MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
