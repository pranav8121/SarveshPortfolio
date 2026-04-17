import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryService, InstagramPost } from '../../services/gallery.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-instagram',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './instagram.html',
  styleUrl: './instagram.css',
})
export class InstagramComponent implements OnInit {
  private galleryService = inject(GalleryService);
  posts = signal<InstagramPost[]>([]);

  ngOnInit() {
    this.galleryService.getData().subscribe(data => {
      this.posts.set(data.instagram);
    });
  }

  formatLikes(n: number): string {
    return n >= 1000 ? (n / 1000).toFixed(1) + 'k' : String(n);
  }
}
