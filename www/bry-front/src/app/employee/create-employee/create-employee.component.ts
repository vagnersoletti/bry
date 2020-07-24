import { Observable } from "rxjs";
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { CompanyService } from "../../company/company.service";
import { Company } from "../../company/company";
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee: Employee = new Employee();
  companies: Observable<Company[]>;

  constructor(
    private employeeService: EmployeeService,
    private companyService: CompanyService,
    private router: Router,
    public toastService: ToastService
  ) { }

  ngOnInit() {
    this.companies = this.companyService.getCompaniesList();
  }

  newEmployee(): void {
    this.employee = new Employee();
  }

  save() {
    this.employeeService.createEmployee(this.employee)
    .subscribe(
      data => {
        this.toastService.show(data, {
          classname: 'bg-success text-light',
          delay: 2000 ,
          autohide: true,
          headertext: 'Sucesso'
        });
        this.employee = new Employee();
      },
      error => {
        Object.keys(error['error']).map((element, index) =>{
          this.toastService.show(error['error'][element], {
            classname: 'bg-danger text-light',
            delay: 10000 ,
            autohide: true,
            headertext: 'Erro'
          });
        })
      });

  }

  onSubmit() {
    this.save();
  }
}
