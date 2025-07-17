import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPhone'
})
export class FormatPhonePipe implements PipeTransform {

  transform(value: number | string): string {
    if (value === null || value === undefined) return '';
    
    // Convertir en string et supprimer tous les espaces existants
    const phoneStr = value.toString().replace(/\s/g, '');
    
    // Vérifier que ce ne sont que des chiffres
    if (!/^\d+$/.test(phoneStr)) return value.toString();
    
    // Formater avec un espace tous les 2 chiffres
    const formatted = phoneStr.match(/.{1,2}/g)?.join(' ') || '';
    
    return formatted;
  }
}