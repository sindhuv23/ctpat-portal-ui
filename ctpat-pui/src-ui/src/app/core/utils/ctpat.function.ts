export class UtilFunctions {

  static toCbpDateFormat(dateString: string): string{
    if (dateString){
      return new Date(dateString).toLocaleDateString('en-US', {
        timeZone: 'UTC',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    }
    return '';
  }

  static toCbpDateTimeFormat(dateTimeString: string): string{
    if (dateTimeString){
      return new Date(dateTimeString).toLocaleDateString('en-US', {
        // timeZone: 'UTC',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }) + this.addTimezoneOffset(dateTimeString);
    }
    return '';
  }

  static addTimezoneOffset(dateTimeString: string): string {
    let timezoneOffset = '';
    if (dateTimeString && dateTimeString.length > 5){
      const candidate =  dateTimeString.slice(-6);
      if (candidate.startsWith('+') || candidate.startsWith('-')){
        timezoneOffset = candidate;
      }
    }
    return timezoneOffset;
  }

  static toUSDate(dateString: string): Date {
    if (dateString){
      return new Date(new Date(dateString).toLocaleDateString('en-US', {
        timeZone: 'UTC',
      }));
    }
    return null as any;
  }

}
