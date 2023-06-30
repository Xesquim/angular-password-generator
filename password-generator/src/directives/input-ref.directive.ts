import { Directive, HostListener, OnInit, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[inputRef]',
})
export class InputRefDirective implements OnInit {
  @HostListener('input', ['$event'])
  onClick(event: Event) {
    let value: number = Number((event.target as HTMLInputElement).value);
    this.ngControl?.control?.setValue(value, { emitEvent: false });

    // console.log(this.ngControl);
  }

  constructor(@Optional() private ngControl: NgControl) {}

  ngOnInit(): void {
    this.ngControl?.valueChanges?.subscribe((event) => {
      let value: number = Number((event.target as HTMLInputElement).value);
      this.ngControl?.control?.setValue(value, { emitEvent: false });
    });
  }
}
