import { Observable } from "rxjs";
import { EmployeeService } from "../employee.service";
import { Employee } from "../employee";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { ToastService } from '../../services/toast.service';


@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit {
  employees: Observable<Employee[]>;
  currentUser: Object = {};

  constructor(
    private employeeService: EmployeeService,
    public authService: AuthService,
    private actRoute: ActivatedRoute,
    public toastService: ToastService
  ) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.employees = this.employeeService.getEmployeesList();
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
          this.toastService.show(data, {
            classname: 'bg-success text-light',
            delay: 2000 ,
            autohide: true,
            headertext: 'Successo'
          });
          this.reloadData();
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

}
