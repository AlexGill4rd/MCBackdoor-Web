import { MuiPickersAdapter } from '../models';
interface FindClosestDateParams<TDate> {
    date: TDate;
    disableFuture?: boolean;
    disablePast?: boolean;
    maxDate: TDate;
    minDate: TDate;
    isDateDisabled: (date: TDate) => boolean;
    utils: MuiPickersAdapter<TDate>;
}
export declare const findClosestEnabledDate: <TDate>({ date, disableFuture, disablePast, maxDate, minDate, isDateDisabled, utils, }: FindClosestDateParams<TDate>) => TDate | null;
export declare const parsePickerInputValue: <TDate>(utils: MuiPickersAdapter<TDate>, value: TDate | null) => TDate | null;
export {};
