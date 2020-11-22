import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataFormComponent } from './data-form.component';


const routes : Routes = [
  { path: '', component: DataFormComponent, children: [
  
  ]}
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class DataFormRoutingModule { }