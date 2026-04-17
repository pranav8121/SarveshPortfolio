import { Component, OnInit, OnDestroy, HostListener, inject, NgZone, ChangeDetectorRef, PLATFORM_ID } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);

  mouseX = 0;
  mouseY = 0;
  dotX = 0;
  dotY = 0;
  isHovering = false;
  isClicking = false;
  isOnImage = false;
  label = '';

  private rafId = 0;

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
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
    this.isOnImage = target.tagName === 'IMG' || target.closest('.gallery-item') !== null;
    this.isHovering = !!(
      target.closest('a') ||
      target.closest('button') ||
      target.closest('.gallery-item') ||
      target.closest('.ig-post') ||
      target.tagName === 'A' ||
      target.tagName === 'BUTTON'
    );
    this.label = this.isOnImage ? 'VIEW' : '';
  }

  @HostListener('document:mousedown')
  onMouseDown() { this.isClicking = true; }

  @HostListener('document:mouseup')
  onMouseUp() { this.isClicking = false; }

  private animate() {
    const ease = 0.12;
    this.dotX += (this.mouseX - this.dotX) * ease;
    this.dotY += (this.mouseY - this.dotY) * ease;
    this.rafId = requestAnimationFrame(() => this.animate());
  }
}
