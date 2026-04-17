import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  scrolled = signal(false);
  menuOpen = signal(false);

  navItems = [
    { label: 'Work', href: '#portfolio' },
    { label: 'About', href: '#about' },
    { label: 'Instagram', href: '#instagram' },
    { label: 'Contact', href: '#contact' },
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 60);
  }

  toggleMenu() {
    const open = !this.menuOpen();
    this.menuOpen.set(open);
    document.body.classList.toggle('menu-open', open);
  }

  closeMenu() {
    this.menuOpen.set(false);
    document.body.classList.remove('menu-open');
  }

  scrollTo(href: string) {
    this.closeMenu();
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
