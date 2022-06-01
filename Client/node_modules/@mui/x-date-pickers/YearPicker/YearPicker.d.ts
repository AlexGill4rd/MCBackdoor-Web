/// <reference types="react" />
import { NonNullablePickerChangeHandler } from '../internals/hooks/useViews';
import { YearPickerClasses } from './yearPickerClasses';
import { YearValidationProps } from '../internals/hooks/validation/models';
export interface YearPickerProps<TDate> extends YearValidationProps<TDate> {
    autoFocus?: boolean;
    className?: string;
    classes?: YearPickerClasses;
    date: TDate | null;
    disabled?: boolean;
    onChange: NonNullablePickerChangeHandler<TDate>;
    onFocusedDayChange?: (day: TDate) => void;
    readOnly?: boolean;
}
declare type YearPickerComponent = (<TDate>(props: YearPickerProps<TDate>) => JSX.Element) & {
    propTypes?: any;
};
export declare const YearPicker: YearPickerComponent;
export {};
