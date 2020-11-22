import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormValidations {

  static requiredChecked(min = 2) {
    const validator = (formArray: FormArray) => {
      const totalChecked = formArray.controls
        .map(value => value.value)
        .reduce((previousValue, currentValue) => currentValue ? previousValue + currentValue : previousValue, 0);
      return totalChecked >= min ? null : { isValid: false };
    };
    return validator;
  }

  static equalsTo(otherField: string) {
    const validator = (formControl: FormControl) => {
      let field;
      if (formControl.root && <FormGroup>formControl.root) field = (<FormGroup>formControl.root).get(otherField);
      if (field && otherField && field.value !== formControl.value)
        return { equalsTo: 'Campos diferentes' };
      return null;
    };
    return validator;
  }
}