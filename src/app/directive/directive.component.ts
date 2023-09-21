import { Component } from '@angular/core';
import Swal from "sweetalert2";

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html'
})
export class DirectiveComponent {
  listCourse: string[] = ['Typescript', 'Javascript', 'Java SE', 'C#'];
  showListCourse: boolean = true;
  constructor() { }
  setShowListCourse(): void {
    this.showListCourse = !this.showListCourse;
  }

  showModal() {
    Swal.fire({
    icon: 'info',
    title:'Hola Mundo',
    text: 'Error 404',});
  }
}
