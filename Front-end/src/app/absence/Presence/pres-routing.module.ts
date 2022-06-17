import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PresComponent } from './pres.component';
import { ListerPresComponent } from './lister-pres/lister-pres.component';

const routes: Routes = [{ path: '', component: PresComponent , children: [
  { path: 'Lister-pres', component: ListerPresComponent },
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresRoutingModule { }
