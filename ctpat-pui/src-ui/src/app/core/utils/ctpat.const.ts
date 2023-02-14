export class CtpatConstants {
  static readonly APP_CONTEXT = './';
  static readonly APP_NAME = 'CTPAT Portal';
  static readonly DEFAULT_TIMEOUT = 60000;
  static readonly MAX_FILE_SIZE = 10485760;
  static readonly alphanumericNoSpacesPattern = '[a-zA-Z0-9]+';
  static readonly alphanumericHypenatePattern = '[a-zA-Z0-9-]+';

  static readonly numericPattern = '-?[0-9]*(\.[0-9]+)?';
  static readonly numPattern = '[0-9]+';
  static readonly trimNumPattern = '\\s*[0-9]+\\s*';
  static readonly zipCodePattern = '(^(?!0{5})(\d{5})(?!-?0{4})(|-\d{4})?$)';
  static readonly zipCodePattern2 ='^[0-9]{5}(?:-[0-9]{4})?$'
  static readonly streetPattern = '^[^&]*$';
  static readonly cityNamePattern = '^([a-zA-Z\u0080-\u024F]+(?:. |-| |\'|.))*[a-zA-Z\u0080-\u024F]*$';

  static readonly emailPattern = '^[a-zA-Z0-9.!#$%&�*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$';
  static readonly wildCardPattern = '/(.{2,}[*])|(^[^*]*$)/';
  static readonly alphaNumericPattern = '/^[a-zA-Z0-9]*$/';
  static readonly phoneFaxPattern = '^[0-9]+$|^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$';

  static readonly datePattern = '(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])\/((19|20)\d\d)';
  static readonly time24HourPattern = '([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]';
  static readonly mmddyyyy = '^(((0?[1-9]|1[012])/(0?[1-9]|1\d|2[0-8])|(0?[13456789]|1[012])/(29|30)|(0?[13578]|1[02])/31)/(19|[2-9]\d)\d{2}|0?2/29/((19|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([2468][048]|[3579][26])00)))$';
  static readonly nonEmptyName = '(.|\n)*[a-zA-Z0-9](.|\n)*';

  static readonly docsRequiredTeam = '^[0-9]{3}(?:-[0-9]{4})?$'
  // Used for configuration in app.module.ts
  static readonly CTPAT_DATE_FORMATS = {
    parse: {
      dateInput: 'MM/DD/YYYY',
    },
    display: {
      dateInput: 'MM/DD/YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    },
  };

  // user role groups
  static readonly ROLES_NON_TRADE = [];

	static readonly extensions = ['gif', 'jpg', 'csv', 'pdf', 'txt', 'xlsx', 'xls', 'docx', 'doc'];
  static readonly spreadsheet_extensions = ['csv', 'xlsx', 'xls'];
  static readonly attachment_extensions = ['gif', 'jpg', 'csv', 'pdf', 'txt', 'xlsx', 'docx'];
}
