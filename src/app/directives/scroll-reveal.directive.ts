import { Directive, ElementRef, Input, OnInit, OnDestroy, inject } from '@angular/core';

@Directive({
  selector: '[scrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input() revealClass = 'reveal';
  @Input() revealDelay = 0;
  @Input() revealThreshold = 0.15;

  private el = inject(ElementRef);
  private observer!: IntersectionObserver;

  ngOnInit() {
    const nativeEl: HTMLElement = this.el.nativeElement;
    nativeEl.classList.add(this.revealClass);
    if (this.revealDelay) {
      nativeEl.style.transitionDelay = `${this.revealDelay}ms`;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: this.revealThreshold, rootMargin: '0px 0px -60px 0px' }
    );

    this.observer.observe(nativeEl);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
