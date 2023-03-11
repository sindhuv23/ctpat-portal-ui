import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accountStatus'
})
export class AccountStatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    status = '';
    if(value === '7'){
      status = 'Validated'
    }
    return status;
  }

}
