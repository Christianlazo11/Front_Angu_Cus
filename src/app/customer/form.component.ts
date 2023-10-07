import { Component } from '@angular/core';
import { Customer } from './customer';
import { CustomerService } from './customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from "sweetalert2";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  faUser = faUser;

  customer: Customer = new Customer();
  title: string = "Crear Cliente";
  errors: string[] = [];

  constructor(private customerService: CustomerService, private router: Router,
    private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadCustomer()
  }

  loadCustomer(): void {
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.customerService.getCustomer(id).subscribe((customer) => this.customer = customer);
        this.title = "Actualizar Cliente";
      }
      //console.log("Customer=> ", this.customer);
    })
  }

  // public create(): void {
  //   this.customerService.create(this.customer).subscribe(
  //     response => {
  //       console.log(response);
  //       this.router.navigate(['/clientes'])
  //       Swal.fire('Nuevo Cliente', `Cliente ${response.name} creado con exito`, 'success');
  //     },
  //     err => {
  //       this.errors = err.error.errors as string[];
  //       console.log("Código de error desde el backend: " + err.status);
  //       console.log(err.error.errors);
  //     }
  //   )
  // }

  public create(): void {
    this.customerService.create(this.customer)
      .pipe(
        tap((response) => {
          console.log("Entro al create jajajja");
          this.router.navigate(['/clientes']);
          Swal.fire('Nuevo Cliente', `Cliente ${response.name} creado con éxito`, 'success');
        }),
        catchError((err) => {
          console.log("Entro en el Error!!!!")
          this.errors = err as string[];
          console.log("Código de error desde el backend: " + err);
          return throwError(() => new Error(err));
        })
      )
      .subscribe();
  }

  // update(): void {
  //   this.customerService.update(this.customer).subscribe(customer => {
  //     this.router.navigate(['/clientes'])
  //     Swal.fire("Cliente actualizado", `Cliente ${customer.name} actualizado con éxito!`, 'success')
  //   },
  //     err => {
  //       this.errors = err.error.error as string[];
  //       console.log("Código de error desde el backend: " + err.status);
  //       console.log(err.error.errors);
  //     }
  //   )
  // }

  update():void {
    this.customerService.update(this.customer)
    .pipe(
      tap((response) => {
        this.router.navigate(['/clientes'])
        Swal.fire("Cliente actualizado", `Cliente ${response.name} actualizado con éxito!`, 'success')
      }),
      catchError((err) => {
        this.errors = err;
        
        console.log("Código de error desde el backend: " + this.errors);
        return throwError(() => new Error(err));
      })
    )
    .subscribe();
  }

}
