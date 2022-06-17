import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepartementComponent } from './departement.component';

const routes: Routes = [{ path: '', component: DepartementComponent },
{ path: 'Menu-listerdep', loadChildren: () => import('./dep/dep.module').then(m => m.DepModule) },
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartementRoutingModule { }
