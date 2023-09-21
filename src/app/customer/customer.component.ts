import { Component } from '@angular/core';
import { Customer } from './customer';
import { CustomerService } from "./customer.service";
import Swal from "sweetalert2";

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

  delete(customer: Customer): void {

    Swal.fire({
      title: 'Estas seguro?',
      text: `Esta seguro que desea eliminar al cliente ${customer.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {

        if(customer.id) {
          this.customerService.delete(customer.id).subscribe(
            response => {
              this.customers = this.customers?.filter((cus) => cus != customer)
            }
          )
          Swal.fire(
            'Cliente eliminado!',
            `Cliente ${customer.name} eliminado con éxito`,
            'success'
          )
        }


      }
    })
  }

}
