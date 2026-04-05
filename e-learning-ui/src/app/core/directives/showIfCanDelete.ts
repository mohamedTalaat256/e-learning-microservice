import { Directive, ElementRef, Input, Renderer2, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[showIfCanDelete]',
  standalone: false
})
export class ShowIfCanDeleteDirective implements OnInit {

  @Input() appLocalStorage!: string;

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit(): void {
    const show = true;

    if (show) {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    }
  }
}
