import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contactTypes'
})
export class ContactTypesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
   var  contactType = '';
    if(value === 'O'){
      contactType = 'Company Officer'
    } else if(value === 'E'){
      contactType = 'Employee'
    } else if(value === 'C'){
      contactType = 'Consultant'
    } else if(value === 'R'){
      contactType = 'Read Only'
    }
    return contactType;
  }

}
