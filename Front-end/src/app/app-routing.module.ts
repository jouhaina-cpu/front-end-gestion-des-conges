import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnexionComponent } from './Authentification/menu.component';
import { MenuComponent } from './menu/menu.component';
 

const routes: Routes = [
  { path: '', redirectTo: 'Connexion', pathMatch: 'full' },
    {path: 'Connexion', component: ConnexionComponent},  
    {path: 'Menu', component: MenuComponent, children: [      
      { path: 'Menu-dep', loadChildren: () => import('./departement/departement.module').then(m => m.DepartementModule) },    
      { path: 'Menu-abs', loadChildren: () => import('./absence/absence.module').then(m => m.AbsenceModule) },    
      { path: 'Menu-RH', loadChildren: () => import('./rh/rh.module').then(m => m.RhModule) },
      { path: 'Compte', loadChildren: () => import('./Compte/compte.module').then(m => m.CompteModule) },
     ]
  }
] 


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
