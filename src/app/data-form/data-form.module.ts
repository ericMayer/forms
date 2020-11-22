import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataFormRoutingModule } from './data-form-routing.module';
import { DataFormComponent } from './data-form.component';
import { SharedModule } from '../shared/modules/shared.module';



@NgModule({
  declarations: [
    DataFormComponent,
  ],
  imports: [
    CommonModule,
    DataFormRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
  ]
})
export class DataFormModule { }
