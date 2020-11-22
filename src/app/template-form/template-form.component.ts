import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})

export class TemplateFormComponent {

  constructor(private location: Location) {}

  back() {
    this.location.back();
  }

}
