import { Component, OnInit } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {


  id: number;
  company: Company;
  employees = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService,
    public toastService: ToastService
  ) { }

  ngOnInit() {
    this.company = new Company();

    this.id = this.route.snapshot.params['id'];

    this.companyService.getCompany(this.id)
      .subscribe(data => {
        this.employees = data.employee;
        this.company = data;
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
    this.router.navigate(['companies']);
  }

}
