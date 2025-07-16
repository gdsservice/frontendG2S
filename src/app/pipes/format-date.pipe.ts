import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

    transform(value: Date | string | null): string {
    if (!value) return '';

    const date = new Date(value);

    // Formatage personnalisé : 15 juillet 2025 à 10:30
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

}
