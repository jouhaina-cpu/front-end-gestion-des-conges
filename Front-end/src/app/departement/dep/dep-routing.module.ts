import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministratifComponent } from './administratif/administratif.component';
import { AjoutDepComponent } from './ajouter-Dep/ajout-dep.component';
import { CommercialComponent } from './commercial/commercial.component';
import { ComptabiliteComponent } from './comptabilite/comptabilite.component';
import { DepComponent } from './dep.component';
import { FinanceComponent } from './finance/finance.component';
import { InformatiqueComponent } from './informatique/informatique.component';
import { ListerComponent } from './lister-dep/lister.component';
import { LogistiqueComponent } from './logistique/logistique.component';
import { MarketingComponent } from './marketing/marketing.component';
import { ModifierDepComponent } from './modifier/modifier-dep.component';
import { ServiceClientComponent } from './serviceclient/serviceclient.component';

const routes: Routes = [{ path: '', component: DepComponent , children: [
  { path: 'Lister-dep', component: ListerComponent },
  { path: 'Ajouter-dep', component: AjoutDepComponent },
  { path: 'Administratif', component: AdministratifComponent },
  { path: 'Comptabilite', component: ComptabiliteComponent },
  { path: 'Commercial', component: CommercialComponent },
  { path: 'Logistique', component: LogistiqueComponent },
  { path: 'Finance', component: FinanceComponent },
  { path: 'Informatique', component: InformatiqueComponent },
  { path: 'Marketing', component: MarketingComponent },
  { path: 'ServiceClient', component: ServiceClientComponent },
  { path: 'Modifier', component: ModifierDepComponent },
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepRoutingModule { }
