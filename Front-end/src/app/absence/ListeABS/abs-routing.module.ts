import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AbsComponent } from './abs.component';
const routes: Routes = [{ path: '', component: AbsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbsRoutingModule { }
