import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCfa'
})
export class FormatCfaPipe implements PipeTransform {
  transform(value: number): string {
    if (!value && value !== 0) return '';
    
    // Convertir en string avec des points pour les milliers
    const parts = value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Ajouter ' FCFA' à la fin
    return `${parts} FCFA`;
  }
}
