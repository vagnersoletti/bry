import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import { CreateEmployeeComponent } from './employee/create-employee/create-employee.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeUpdateComponent } from './employee/employee-update/employee-update.component';

import { CompanyUpdateComponent } from './company/company-update/company-update.component';
import { CompanyDetailsComponent } from './company/company-details/company-details.component';
import { CompanyCreateComponent } from './company/company-create/company-create.component';
import { CompanyListComponent } from './company/company-list/company-list.component';

import { AuthGuard } from "./shared/auth.guard";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },

  { path: 'employees', component: EmployeeListComponent, canActivate: [AuthGuard] },
  { path: 'employees/create', component: CreateEmployeeComponent, canActivate: [AuthGuard] },
  { path: 'employees/update/:id', component: EmployeeUpdateComponent, canActivate: [AuthGuard] },
  { path: 'employees/details/:id', component: EmployeeDetailsComponent, canActivate: [AuthGuard] },

  { path: 'companies', component: CompanyListComponent, canActivate: [AuthGuard] },
  { path: 'companies/create', component: CompanyCreateComponent, canActivate: [AuthGuard] },
  { path: 'companies/update/:id', component: CompanyUpdateComponent, canActivate: [AuthGuard] },
  { path: 'companies/details/:id', component: CompanyDetailsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
