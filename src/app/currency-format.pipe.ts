import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(value: any): string {
    if (isNaN(value)) return value;
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }

}
