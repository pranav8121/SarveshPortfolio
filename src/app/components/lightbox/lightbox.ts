import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Photo } from '../../services/gallery.service';

@Component({
  selector: 'app-lightbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lightbox.html',
  styleUrl: './lightbox.css',
})
export class LightboxComponent {
  @Input() photos: Photo[] = [];
  @Input() currentIndex = 0;
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();
  @Output() navigate = new EventEmitter<number>();

  get current(): Photo | null {
    return this.photos[this.currentIndex] ?? null;
  }

  get total() { return this.photos.length; }
  get hasPrev() { return this.currentIndex > 0; }
  get hasNext() { return this.currentIndex < this.total - 1; }

  prev() { if (this.hasPrev) this.navigate.emit(this.currentIndex - 1); }
  next() { if (this.hasNext) this.navigate.emit(this.currentIndex + 1); }

  onClose() { this.close.emit(); }

  onBackdropClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('lightbox-backdrop')) {
      this.onClose();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (!this.visible) return;
    if (e.key === 'Escape') this.onClose();
    if (e.key === 'ArrowLeft') this.prev();
    if (e.key === 'ArrowRight') this.next();
  }
}
