import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkGroupComponent } from './component/work-group/work-group.component';
import { MainComponent } from './pageComponent/main/main.component';

const routes: Routes = [
  { path: 'work-group/:id', component: WorkGroupComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
