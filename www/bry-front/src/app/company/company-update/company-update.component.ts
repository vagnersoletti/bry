import { Observable } from "rxjs";
import { Component, OnInit } from '@angular/core';
import { Company } from '../company';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-update',
  templateUrl: './company-update.component.html',
  styleUrls: ['./company-update.component.css']
})
export class CompanyUpdateComponent implements OnInit {

  id: number;
  company: Company;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService,
  ) { }

  ngOnInit() {
    this.company = this.companyService.getCompaniesList();

    this.id = this.route.snapshot.params['id'];

    this.companyService.getCompany(this.id)
      .subscribe(data => {
        console.log(data)
        this.company = data;
      }, error => console.log(error));
  }

  updateCompany() {
    this.companyService.updateCompany(this.id, this.company)
      .subscribe(data => console.log(data), error => console.log(error));
    this.company = new Company();
    this.gotoList();
  }

  onSubmit() {
    this.updateCompany();
  }

  gotoList() {
    this.router.navigate(['/companies']);
  }

}
