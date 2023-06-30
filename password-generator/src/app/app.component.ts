import { Component } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public passwordForm: FormGroup;
  public generatedPassword: string = '';

  constructor(private clipboard: Clipboard, private formBuilder: FormBuilder) {
    this.passwordForm = this.createForm();
    this.generate();
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      generatedPassword: new FormControl(null),
      length: new FormControl(12, [
        Validators.required,
        Validators.min(1),
        Validators.max(32),
      ]),
      useLetters: new FormControl(true),
      useNumbers: new FormControl(true),
      useSymbols: new FormControl(true),
    });
  }

  public onLengthChange(): void {
    this.generate();
  }

  public generate(): void {
    if (!this.passwordForm.valid) return;

    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '1234567890';
    const symbols = '!@#$%&*()';

    let validChars = '';
    let generatedPassword = '';

    if (this.passwordForm.controls['useLetters'].value) validChars += letters;
    if (this.passwordForm.controls['useNumbers'].value) validChars += numbers;
    if (this.passwordForm.controls['useSymbols'].value) validChars += symbols;

    for (let i = 0; i <= this.passwordForm.controls['length'].value; i++) {
      var mix = validChars.charAt(
        Math.floor(Math.random() * validChars.length)
      );
      if (mix.match(/[a-z]/i) && Math.random() < 0.5) {
        mix = mix.toUpperCase();
      }
      generatedPassword += mix;
    }
    this.passwordForm.controls['generatedPassword'].setValue(generatedPassword);
  }
}
