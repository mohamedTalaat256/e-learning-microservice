import { Directive, ElementRef, Input, Renderer2, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[showIfCanCreate]',
  standalone: false
})
export class ShowIfCanCreateDirective implements OnInit {

  @Input() appLocalStorage!: string;

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit(): void {
    const show = false;

    if (show) {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    }
  }
}
