import { Component, OnInit, OnDestroy, HostListener, inject, ElementRef, NgZone, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cursor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cursor.html',
  styleUrl: './cursor.css',
})
export class CursorComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private el = inject(ElementRef);

  private mouseX = 0;
  private mouseY = 0;
  private dotX = 0;
  private dotY = 0;
  isHovering = false;
  isClicking = false;
  isOnImage = false;
  label = '';

  private rafId = 0;
  private outerEl: HTMLElement | null = null;
  private dotEl: HTMLElement | null = null;

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.outerEl = this.el.nativeElement.querySelector('.cursor-outer');
    this.dotEl = this.el.nativeElement.querySelector('.cursor-dot');
    this.ngZone.runOutsideAngular(() => this.animate());
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.rafId);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    const target = e.target as HTMLElement;
    const isOnImage = target.tagName === 'IMG' || target.closest('.gallery-item') !== null;
    const isHovering = !!(
      target.closest('a') ||
      target.closest('button') ||
      target.closest('.gallery-item') ||
      target.closest('.ig-post') ||
      target.tagName === 'A' ||
      target.tagName === 'BUTTON'
    );
    const label = isOnImage ? 'VIEW' : '';

    if (this.dotEl) {
      this.dotEl.style.left = `${this.mouseX}px`;
      this.dotEl.style.top = `${this.mouseY}px`;
    }

    if (
      isOnImage !== this.isOnImage ||
      isHovering !== this.isHovering ||
      label !== this.label
    ) {
      this.ngZone.run(() => {
        this.isOnImage = isOnImage;
        this.isHovering = isHovering;
        this.label = label;
      });
    }
  }

  @HostListener('document:mousedown')
  onMouseDown() { this.ngZone.run(() => { this.isClicking = true; }); }

  @HostListener('document:mouseup')
  onMouseUp() { this.ngZone.run(() => { this.isClicking = false; }); }

  private animate() {
    const ease = 0.12;
    this.dotX += (this.mouseX - this.dotX) * ease;
    this.dotY += (this.mouseY - this.dotY) * ease;
    if (this.outerEl) {
      this.outerEl.style.left = `${this.dotX}px`;
      this.outerEl.style.top = `${this.dotY}px`;
    }
    this.rafId = requestAnimationFrame(() => this.animate());
  }
}
