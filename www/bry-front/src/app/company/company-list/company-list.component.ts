import { Observable } from "rxjs";
import { CompanyService } from "../company.service";
import { Company } from "../company";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  companies: Observable<Company[]>;
  currentUser: Object = {};

  constructor(
    private companyService: CompanyService,
    public authService: AuthService,
    private actRoute: ActivatedRoute,
    public toastService: ToastService
  ) {}


  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.companies = this.companyService.getCompaniesList();
  }

  deleteCompany(id: number) {
    this.companyService.deleteCompany(id)
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
