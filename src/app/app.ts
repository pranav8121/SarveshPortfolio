import { Component, OnInit, AfterViewInit, signal, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CursorComponent } from './components/cursor/cursor';
import { NavbarComponent } from './components/navbar/navbar';
import { HeroComponent } from './components/hero/hero';
import { PortfolioComponent } from './components/portfolio/portfolio';
import { AboutComponent } from './components/about/about';
import { InstagramComponent } from './components/instagram/instagram';
import { ContactComponent } from './components/contact/contact';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    CursorComponent,
    NavbarComponent,
    HeroComponent,
    PortfolioComponent,
    AboutComponent,
    InstagramComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  loaded = signal(false);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.loaded.set(true), 100);
    }
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initSkillBars();
  }

  private initSkillBars() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const fills = e.target.querySelectorAll<HTMLElement>('.skill-fill');
            fills.forEach((fill) => {
              fill.style.width = fill.dataset['width'] || fill.style.width;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('.about-skills').forEach((el) => observer.observe(el));
  }
}
