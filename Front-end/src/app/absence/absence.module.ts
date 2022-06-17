import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbsenceRoutingModule } from './absence-routing.module';
import { AbsenceComponent } from './absence.component';


@NgModule({
  declarations: [AbsenceComponent],
  imports: [
    CommonModule,
    AbsenceRoutingModule
  ]
})
export class AbsenceModule { }
