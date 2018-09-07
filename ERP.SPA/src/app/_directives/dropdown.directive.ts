import { Directive,
  HostListener,
  ElementRef, Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
private isOpen = false;

constructor(private elementRef: ElementRef, private renderer: Renderer2) {
}

@HostListener('click') onClick() {
  const dropdown = this.elementRef.nativeElement.nextElementSibling;
  if (!this.isOpen) {
    this.renderer.addClass(dropdown, 'show');
  } else {
    this.renderer.removeClass(dropdown, 'show');
  }
  
  this.isOpen = !this.isOpen;
  }
}