import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ScrollRevealDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactComponent {
  form: ContactForm = { name: '', email: '', subject: '', message: '' };
  submitted = signal(false);
  submitting = signal(false);
  activeField = signal<string | null>(null);

  subjects = [
    'Portrait Session',
    'Wedding Photography',
    'Commercial Shoot',
    'Nature Expedition',
    'Other',
  ];

  socials = [
    { icon: 'instagram', label: 'Instagram', handle: '@sarvesh.createz', href: 'https://instagram.com/sarvesh.createz' },
    { icon: 'email', label: 'Email', handle: 'hello@sarvesh.createz', href: 'mailto:hello@sarvesh.createz' },
  ];

  setActive(field: string | null) {
    this.activeField.set(field);
  }

  onSubmit() {
    if (!this.form.name || !this.form.email || !this.form.message) return;
    this.submitting.set(true);
    setTimeout(() => {
      this.submitting.set(false);
      this.submitted.set(true);
      this.form = { name: '', email: '', subject: '', message: '' };
    }, 1800);
  }

  resetForm() {
    this.submitted.set(false);
  }
}
