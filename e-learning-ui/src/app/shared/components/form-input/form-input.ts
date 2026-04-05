import { Component, Input } from '@angular/core';
import { ControlContainer, FormControl, FormGroupDirective, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Select } from "primeng/select";
import { RadioButton } from "primeng/radiobutton";

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, TranslateModule,
    Select,
    RadioButton
],
  templateUrl: './form-input.html',
  styles: [`.full-width { width: 100%; }`],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]

})
export class FormInput {
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) label!: string;
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() icon?: string;
  @Input() options?: any[];
  @Input() fieldName: string = ''; // Key for the translation file
  @Input() patternEx?: string;    // Custom pattern message

  constructor(private translate: TranslateService) {}

  getErrorMessage(): string {
    const errors = this.control?.errors;
    if (!errors || !this.control.touched) return '';

    // Pre-translate the field name for use in all messages
    const field = this.translate.instant( this.label);

    if (errors['required']) {
      return field + ' '+ this.translate.instant('validation.required', { field });
    }
    if (errors['minlength']) {
      return field + ' '+ this.translate.instant('validation.min_length_is', {
        field,
        length: errors['minlength'].requiredLength
      });
    }
    if (errors['maxlength']) {
      return field + ' '+ this.translate.instant('validation.max_length_is', {
        field,
        length: errors['maxlength'].requiredLength
      })+ ' ' + errors['maxlength'].requiredLength;
    }
    if (errors['min']) {
      return field + ' '+ this.translate.instant('validation.min_min_is', {
        field,
        min: errors['min'].min
      });
    }
    if (errors['max']) {
      return field + ' '+ this.translate.instant('validation.max_value_is', {
        field,
        max: errors['max'].max
      })+ ' ' + errors['max'].max;
    }
    if (errors['email']) {
      return this.translate.instant('validation.enter_valid_email', { field });
    }
    if (errors['pattern']) {
      return this.patternEx || this.translate.instant('validation.pattern', { field });
    }

    return this.translate.instant('validation.invalid', { field });
  }


  onInput(event: any) {
  let value = event.target.value;

  if (this.type === 'number') {
    value = value === '' ? null : Number(value);
  }

  this.control.setValue(value);
}
}
