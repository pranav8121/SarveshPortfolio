import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent {
  skills = [
    { label: 'Portrait', value: 95 },
    { label: 'Landscape', value: 88 },
    { label: 'Street', value: 82 },
    { label: 'Post-Processing', value: 90 },
  ];

  gear = [
    { type: 'Body', name: 'Sony A7 IV' },
    { type: 'Lens', name: '35mm f/1.8' },
    { type: 'Lens', name: '85mm f/1.4' },
    { type: 'Edit', name: 'Lightroom + Capture One' },
  ];
}
