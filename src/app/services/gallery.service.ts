import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Photo {
  id: number;
  title: string;
  category: string;
  src: string;
  srcFull: string;
  width: number;
  height: number;
  tags: string[];
  featured: boolean;
}

export interface InstagramPost {
  id: string;
  src: string;
  likes: number;
  caption: string;
  link: string;
}

export interface GalleryData {
  categories: string[];
  photos: Photo[];
  instagram: InstagramPost[];
}

@Injectable({ providedIn: 'root' })
export class GalleryService {
  private http = inject(HttpClient);
  private dataUrl = 'assets/gallery-data.json';

  getData(): Observable<GalleryData> {
    return this.http.get<GalleryData>(this.dataUrl).pipe(
      catchError(() => of({ categories: [], photos: [], instagram: [] }))
    );
  }
}
