import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Company } from '../company';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.css']
})
export class CompanyCreateComponent implements OnInit {

  company: Company = new Company();

  constructor(private companyService: CompanyService,
    private router: Router,
    public toastService: ToastService
  ) { }

  ngOnInit(): void {
  }

  newEmployee(): void {
    this.company = new Company();
  }

  save() {
    this.companyService.createCompany(this.company)
    .subscribe(
      data => {
        this.toastService.show(data, {
          classname: 'bg-success text-light',
          delay: 2000 ,
          autohide: true,
          headertext: 'Sucesso'
        });
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
    this.company = new Company();
  }

  onSubmit() {
    this.save();
  }


}
