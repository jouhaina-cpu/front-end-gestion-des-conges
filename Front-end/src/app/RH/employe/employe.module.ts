import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeRoutingModule } from './employe-routing.module';
import { EmployeComponent } from './employe.component';
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
import { DialogContent, DialogContentExampleDialog, ListerEmployeComponent } from './lister-employe/lister-employe.component';
import { AjoutEmployeComponent, CreerEmploye } from './ajout-employe/ajout-employe.component';
import { ModifierEmploye, ModifierEmployeComponent } from './modifier-employe/modifier-employe.component';
import { VisualiserEmployeComponent } from './visualiser-employe/visualiser-employe.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { WebRequestService } from 'src/app/web-request.service';

@NgModule({
  declarations: [EmployeComponent,DialogContent,DialogContentExampleDialog,ListerEmployeComponent,
    AjoutEmployeComponent,CreerEmploye,ModifierEmploye,ModifierEmployeComponent,VisualiserEmployeComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatDialogModule,
    HttpClientModule,
    EmployeRoutingModule,
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
    
  ],
  providers:[WebRequestService]
})
export class EmployeModule { }
