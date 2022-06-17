import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AbsenceComponent } from './absence.component';


const routes: Routes = [{ path: '', component: AbsenceComponent },
{ path: 'Menu-listABS', loadChildren: () => import('./ListeABS/abs.module').then(m => m.AbsModule) },
{ path: 'Menu-Presence', loadChildren: () => import('./Presence/pres.module').then(m => m.PresModule) },
{ path: 'Presence', loadChildren: () => import('./employe/employe.module').then(m => m.EmployeModule) },
{ path: 'Absence', loadChildren: () => import('./Liste-Desabs/employe.module').then(m => m.EmployeModule) },
{ path: 'Vacance', loadChildren: () => import('./Vacance/employe.module').then(m => m.EmployeModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbsenceRoutingModule { }
