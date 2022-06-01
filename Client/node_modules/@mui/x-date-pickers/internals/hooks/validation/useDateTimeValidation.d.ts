import { ValidationProps, Validator } from './useValidation';
import { DateValidationError, ExportedDateValidationProps } from './useDateValidation';
import { TimeValidationError, ExportedTimeValidationProps } from './useTimeValidation';
export interface DateTimeValidationProps<TInputDate, TDate> extends ExportedDateValidationProps<TDate>, ExportedTimeValidationProps<TDate>, ValidationProps<DateTimeValidationError, TInputDate | null> {
}
export declare const validateDateTime: Validator<any, DateTimeValidationProps<any, any>>;
export declare type DateTimeValidationError = DateValidationError | TimeValidationError;
export declare function useDateTimeValidation<TInputDate, TDate>(props: DateTimeValidationProps<TInputDate, TDate>): DateTimeValidationError;
