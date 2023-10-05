import { Injectable } from '@angular/core';
import { Customer } from "./customer";
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private urlEndpoint: string = 'http://localhost:8080/clientes';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient, private router:Router) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.urlEndpoint);
  }

  create(customer: Customer): Observable<Customer> {
    return this.http.post(this.urlEndpoint, customer, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Customer),
      catchError(e => {
        console.log(e.error.message);
        Swal.fire(e.error.message, e.error.error, "error");
        return throwError(() => Error(e));
      })
    )
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.urlEndpoint}/${id}`).pipe(
      map((response: any) => response.cliente as Customer),
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.log(e.error.message);
        Swal.fire(e.error.message, e.error.error, "error");
        return throwError(() => new Error(e));
      })
    );
  }

  update(customer:Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.urlEndpoint}/${customer.id}`, customer, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Customer),
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.log(e.error.message);
        Swal.fire(e.error.message, e.error.error, "error");
        return throwError(() => new Error(e));
      })
    );
  }

  delete(id: number): Observable<Customer> {
    return this.http.delete<Customer>(`${this.urlEndpoint}/${id}`, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Customer),
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.log(e.error.message);
        Swal.fire(e.error.message, e.error.error, "error");
        return throwError(() => new Error(e));
      })
    );
  }
}
