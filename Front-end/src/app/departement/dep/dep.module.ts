import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepComponent } from './dep.component';
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
import { Dialogliste, ListerComponent } from './lister-dep/lister.component';
import {MatTabsModule} from '@angular/material/tabs';

 
 

import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { AjoutDepComponent, DialogContentExampleDialog } from './ajouter-Dep/ajout-dep.component';
import { DepRoutingModule } from './dep-routing.module';
import { AdministratifComponent } from './administratif/administratif.component';
import { ComptabiliteComponent } from './comptabilite/comptabilite.component';
import { CommercialComponent } from './commercial/commercial.component';
import { LogistiqueComponent } from './logistique/logistique.component';
import { FinanceComponent } from './finance/finance.component';
import { InformatiqueComponent } from './informatique/informatique.component';
import { MarketingComponent } from './marketing/marketing.component';
import { ServiceClientComponent } from './serviceclient/serviceclient.component';
import { MatDialogModule } from '@angular/material/dialog';
import { Dialogmodifier, ModifierDepComponent } from './modifier/modifier-dep.component';

@NgModule({
  declarations: [DepComponent,Dialogmodifier,Dialogliste,ModifierDepComponent,ListerComponent,AjoutDepComponent,
    AdministratifComponent,ComptabiliteComponent,CommercialComponent,LogistiqueComponent,
    FinanceComponent,DialogContentExampleDialog,InformatiqueComponent,MarketingComponent,ServiceClientComponent  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    DepRoutingModule,
    MatDialogModule,
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
export class DepModule { }
