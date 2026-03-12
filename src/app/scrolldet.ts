import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appScrolldet]',
  standalone: true
})
export class Scrolldet implements OnInit {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0')
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(80px) scale(0.9)')
    
    this.renderer.setStyle(this.el.nativeElement, 'transition-property', 'opacity, transform')
    this.renderer.setStyle(this.el.nativeElement, 'transition-duration', '0.8s')
    this.renderer.setStyle(this.el.nativeElement, 'transition-timing-function', 'cubic-bezier(0.2, 1, 0.2, 1)')

    let observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.setStyle(this.el.nativeElement, 'opacity', '1')
          this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(0) scale(1)')
          observer.unobserve(this.el.nativeElement)
        }
      })
    }, {
      threshold: 0.15
    })

    observer.observe(this.el.nativeElement)
  }
}