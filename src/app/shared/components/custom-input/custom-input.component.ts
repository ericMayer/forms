import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    }
  ]
})
export class CustomInputComponent implements ControlValueAccessor {

  @Input() label: string;
  @Input() placeholder: string;
  @Input() type: string;
  @Input() icon: string;
  @Input() tooltip: string;
  @Input() mask: string;
  @Input() maxlength: string;
  @Input() isRequired: boolean;
  @Input() error: string;
  @Input() length: string;

  invalid: boolean;
  val: string;
  regexpEmail: RegExp;

  constructor() { 
    this.setPropertiesDefault();
    this.val = '';
    this.regexpEmail = /([?:\w.-])+@([?:\w-])+\.[(\w-.)]+/gi;
  }

  onTouch: any = () => { };
  onChange: any =  () => { };

  get value() {
    return this.val;
  }

  set value(val) {
    if(val !== undefined && this.val !== val) {
      this.val = val;
      this.onChange(val);
      this.onTouch(val);
    }
  }

  writeValue(value: any) {
    this.value = value;
  } 

  registerOnChange(fn: any) { 
    this.onChange = fn;
  }
  
  registerOnTouched(fn: any) { 
    this.onTouch = fn;
  }

  setPropertiesDefault() {
    this.type = 'text';
    this.placeholder = '';
  }

  setInvalid() {    
    if(this.type == 'email' && this.val) this.validEmail();
    else if(this.isRequired && !this.val) this.setError();
    else if (this.maxlength && this.val && this.val.length != Number(this.length)) this.setError(`Por favor, digite um ${this.label} válido.`);
    else this.resetInvalid();
  }

  setError(message?: string) {
    this.invalid = true;
    this.error = message != undefined ? message : 'Esse campo é obrigatório.';
  }

  resetInvalid() {
    this.error = '';
    this.invalid = false;
  }

  validEmail() {
    if(!this.val.match(this.regexpEmail)) this.setError('Por favor, digite um e-mail válido.');
    else this.resetInvalid();
  }

  getBorderSuccess(): boolean {
    return this.val && !this.invalid;
  }

  getLabel(): string {
    return this.isRequired ? `*${this.label}` : this.label;
  }

}
