import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TemplateFormRoutingModule } from './template-form-routing.module';
import { TemplateFormComponent } from './template-form.component';
import { SharedModule } from '../shared/modules/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ 
    TemplateFormComponent 
  ],
  imports: [
    CommonModule,
    TemplateFormRoutingModule,
    SharedModule,
    FormsModule,
    MatIconModule,
    NgxMaskModule.forChild(),
  ],
})

export class TemplateFormModule { }