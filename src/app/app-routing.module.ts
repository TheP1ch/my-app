import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkGroupComponent } from './component/work-group/work-group.component';
import { MainComponent } from './pageComponent/main/main.component';
import { LoginPageComponent } from './pageComponent/login/login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [{ path: 'work-group/:id', component: WorkGroupComponent }],
  },
  { path: 'login', component: LoginPageComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
