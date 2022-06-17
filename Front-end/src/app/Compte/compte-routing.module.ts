import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompteComponent } from './compte.component';

const routes: Routes = [{ path: '', component: CompteComponent },

 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompteRoutingModule { }
