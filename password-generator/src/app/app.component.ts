import { Component, ViewEncapsulation } from '@angular/core';
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
  encapsulation: ViewEncapsulation.None,
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

  public teste(value: any): void {
    console.log('aaaa');

    console.log(value);
  }

  public onLengthChange(): void {
    this.generate();
  }

  public generate(): void {}
}
