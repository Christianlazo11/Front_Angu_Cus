import { Component } from '@angular/core';

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
}
