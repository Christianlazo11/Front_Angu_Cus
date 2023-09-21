import { Injectable } from '@angular/core';
import { Customer } from "./customer";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private urlEndpoint: string = 'http://localhost:8080/clientes';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.urlEndpoint);
  }

  create(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.urlEndpoint, customer, {headers: this.httpHeaders})
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.urlEndpoint}/${id}`);
  }

  update(customer:Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.urlEndpoint}/${customer.id}`, customer, {headers: this.httpHeaders});
  }

  delete(id: number): Observable<Customer> {
    return this.http.delete<Customer>(`${this.urlEndpoint}/${id}`, {headers: this.httpHeaders});
  }
}
