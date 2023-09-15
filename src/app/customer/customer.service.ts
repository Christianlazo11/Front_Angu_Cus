import { Injectable } from '@angular/core';
import { Customer } from "./customer";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private urlEndpoint: string = 'http://localhost:8080/clientes';

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.urlEndpoint);
  }
}
