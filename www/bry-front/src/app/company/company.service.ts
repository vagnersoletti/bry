import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private baseUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  getCompany(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/companies/${id}`);
  }

  createCompany(company: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/api/companies/`, company);
  }

  updateCompany(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/api/companies/${id}`, value);
  }

  deleteCompany(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/companies/${id}`, { responseType: 'text' });
  }

  getCompaniesList(): Observable<any> {
    let api = `${this.baseUrl}/api/companies/`;
    return this.http.get(api).pipe(
      map((res: Response) => {
        return res['data'] || {}
      }),
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

}
