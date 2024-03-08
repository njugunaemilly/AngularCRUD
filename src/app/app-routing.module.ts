import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateEmployeesComponent } from './update-employees/update-employees.component';

const routes: Routes = [
  {path: 'update-employee', component:UpdateEmployeesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
