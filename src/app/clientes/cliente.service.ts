import { Injectable } from '@angular/core';
import { CLIENTES as dataCliente} from "./clientes.json";
import { Cliente } from './cliente';
import { of, Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  getClientes(): Observable<Cliente[]> {
    return of(dataCliente);
  }
}
