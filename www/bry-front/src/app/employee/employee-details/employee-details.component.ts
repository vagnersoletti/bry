import { Employee } from '../employee';
import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  id: number;
  employee: Employee;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    public toastService: ToastService
  ) { }

  ngOnInit() {
    this.employee = new Employee();

    this.id = this.route.snapshot.params['id'];

    this.employeeService.getEmployee(this.id)
      .subscribe(data => {
        this.employee = data;
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

  list(){
    this.router.navigate(['employees']);
  }
}
