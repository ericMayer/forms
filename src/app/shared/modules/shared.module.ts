import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';

import { FormDefaultComponent } from '../components/form-default/form-default.component';
import { CustomInputComponent } from '../components/custom-input/custom-input.component';
import { ModalDefaultComponent } from '../components/modal-default/modal-default.component';
import { ModalTermosComponent } from '../components/modal-termos/modal-termos.component';

@NgModule({
  declarations: [
    FormDefaultComponent,
    CustomInputComponent,
    ModalDefaultComponent,
    ModalTermosComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    NgSelectModule,
    RouterModule,
    MatDialogModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    FormDefaultComponent,
    CustomInputComponent,
    NgxMaskModule,
    NgSelectModule,
    MatIconModule,
    MatInputModule
  ],
  entryComponents: [
    ModalDefaultComponent,
    ModalTermosComponent
  ],
})

export class SharedModule { }
