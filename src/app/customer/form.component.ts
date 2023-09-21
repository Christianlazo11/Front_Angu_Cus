import { Component } from '@angular/core';
import { Customer } from './customer';
import { CustomerService } from './customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent {

  customer: Customer = new Customer();
  title:string = "Crear Cliente";

  constructor(private customerService: CustomerService, private router:Router, 
    private activateRoute: ActivatedRoute){}

  ngOnInit() {
    this.loadCustomer()
  }

  loadCustomer():void {
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if(id) {
        this.customerService.getCustomer(id).subscribe((customer) => this.customer = customer);
      }
    })
  }

  public create(): void {
    this.customerService.create(this.customer).subscribe(
      response => {
        this.router.navigate(['/clientes'])
        Swal.fire('Nuevo Cliente', `Cliente ${this.customer.name} creado con exito`, 'success');
      }
    )
  }

  update():void {
    this.customerService.update(this.customer).subscribe(customer => {
      this.router.navigate(['/clientes'])
      Swal.fire("Cliente actualizado", `Cliente ${customer.name} actualizado con éxito!`, 'success')
    })
  }

}
