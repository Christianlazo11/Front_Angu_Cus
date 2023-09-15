import { Component } from '@angular/core';
import { Customer } from './customer';
import { CustomerService } from "./customer.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html'
})
export class CustomerComponent {

  customers: Customer[] | undefined;

  constructor(private customerService: CustomerService) {}
  ngOnInit() {
    this.customerService.getCustomers().subscribe(
      customers => this.customers = customers
    );
  }

}
