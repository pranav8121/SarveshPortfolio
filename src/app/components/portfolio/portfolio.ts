import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryService, Photo } from '../../services/gallery.service';
import { LightboxComponent } from '../lightbox/lightbox';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, LightboxComponent, ScrollRevealDirective],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class PortfolioComponent implements OnInit {
  private galleryService = inject(GalleryService);

  categories = signal<string[]>(['All']);
  photos = signal<Photo[]>([]);
  activeCategory = signal('All');
  lightboxVisible = signal(false);
  lightboxIndex = signal(0);

  filteredPhotos = computed(() => {
    const cat = this.activeCategory();
    const all = this.photos();
    return cat === 'All' ? all : all.filter(p => p.category === cat);
  });

  ngOnInit() {
    this.galleryService.getData().subscribe(data => {
      this.categories.set(data.categories);
      this.photos.set(data.photos);
    });
  }

  setCategory(cat: string) {
    this.activeCategory.set(cat);
  }

  openLightbox(index: number) {
    this.lightboxIndex.set(index);
    this.lightboxVisible.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.lightboxVisible.set(false);
    document.body.style.overflow = '';
  }

  navigateLightbox(index: number) {
    this.lightboxIndex.set(index);
  }

  trackById(_: number, item: Photo) { return item.id; }
}
