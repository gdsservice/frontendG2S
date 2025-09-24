import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatMontant'
})
export class FormatMontantPipe implements PipeTransform {

  transform(value: number | string): string {
    if (value === null || value === undefined) return '';
    
    const montant = typeof value === 'string' ? parseFloat(value) : value;
    
    return montant.toLocaleString('fr-FR') + ' F CFA';
  }

}
