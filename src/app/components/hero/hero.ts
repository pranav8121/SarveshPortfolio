import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent implements OnInit, OnDestroy {
  shutterOpen = signal(false);
  titleVisible = signal(false);
  subtitleVisible = signal(false);
  ctaVisible = signal(false);
  parallaxOffset = 0;

  private rafId = 0;

  readonly stats = [
    { value: '500+', label: 'Shoots' },
    { value: '8', label: 'Years' },
    { value: '50K+', label: 'Followers' },
  ];

  readonly slides = [
    'https://images.unsplash.com/photo-1542038374951-0ecb7bd3cfe8?w=1600&q=85',
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1600&q=85',
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&q=85',
  ];

  activeSlide = signal(0);
  private slideInterval: ReturnType<typeof setInterval> | null = null;

  ngOnInit() {
    // Shutter open sequence
    setTimeout(() => this.shutterOpen.set(true), 300);
    setTimeout(() => this.titleVisible.set(true), 900);
    setTimeout(() => this.subtitleVisible.set(true), 1300);
    setTimeout(() => this.ctaVisible.set(true), 1700);

    // Slide rotation
    this.slideInterval = setInterval(() => {
      this.activeSlide.update(s => (s + 1) % this.slides.length);
    }, 5000);

    window.addEventListener('scroll', this.handleParallax);
  }

  ngOnDestroy() {
    if (this.slideInterval) clearInterval(this.slideInterval);
    window.removeEventListener('scroll', this.handleParallax);
    cancelAnimationFrame(this.rafId);
  }

  private handleParallax = () => {
    this.parallaxOffset = window.scrollY * 0.35;
  };

  scrollToPortfolio() {
    document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToContact() {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  }
}
