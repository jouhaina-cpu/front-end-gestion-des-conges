import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjoutBulletinComponent } from './ajout-bulletinpaie/ajout-bulletinpaie.component';

import { BulletinComponent } from './bulletinpaie.component';
import { ListerBulletinComponent } from './lister-bulletinpaie/lister-bulletinpaie.component';
import { ModifierBulletinComponent } from './modifier-bulletinpaie/modifier-bulletinpaie.component';
import { VisualiserBulletinComponent } from './visualiser-bulletinpaie/visualiser-bulletinpaie.component';

const routes: Routes = [{ path: '', component: BulletinComponent , children: [
  { path: 'Ajouter-bulletin-paie', component: AjoutBulletinComponent },
  { path: 'Modifer-bulletin-paie', component: ModifierBulletinComponent },
  { path: 'Lister-bulletin-paie', component: ListerBulletinComponent },
  { path: 'Visualiser-bulletin-paie', component: VisualiserBulletinComponent }]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BulletinRoutingModule { }
