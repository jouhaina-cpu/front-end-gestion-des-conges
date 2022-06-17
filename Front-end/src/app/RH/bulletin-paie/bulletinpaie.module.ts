import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BulletinRoutingModule } from './bulletinpaie-routing.module';
import { BulletinComponent } from './bulletinpaie.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableFilterModule } from 'mat-table-filter';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ListerBulletinComponent, PDFDialog, SupprimerDialog } from './lister-bulletinpaie/lister-bulletinpaie.component';
import { AjoutBulletinComponent, AjoutBulltein } from './ajout-bulletinpaie/ajout-bulletinpaie.component';
import { ModifierBulletinComponent, ModifierBulltein} from './modifier-bulletinpaie/modifier-bulletinpaie.component';
import { VisualiserBulletinComponent } from './visualiser-bulletinpaie/visualiser-bulletinpaie.component';
import {MatTabsModule} from '@angular/material/tabs';

 
 

import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BulletinComponent,ModifierBulltein,PDFDialog,SupprimerDialog,
    AjoutBulltein,ListerBulletinComponent,AjoutBulletinComponent,
    ModifierBulletinComponent,VisualiserBulletinComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatDialogModule,
    BulletinRoutingModule,
    MatFormFieldModule,
    MatStepperModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MatTableFilterModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,MatCardModule,NgxMatFileInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTableModule,
    FormsModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSortModule
    
  ]
})
export class BulletinModule { }
