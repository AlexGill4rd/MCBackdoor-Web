import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { NonNullablePickerChangeHandler } from '../internals/hooks/useViews';
import { MonthPickerClasses } from './monthPickerClasses';
import { MonthValidationProps } from '../internals/hooks/validation/models';
export interface MonthPickerProps<TDate> extends MonthValidationProps<TDate> {
    /**
     * className applied to the root element.
     */
    className?: string;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<MonthPickerClasses>;
    /** Date value for the MonthPicker */
    date: TDate | null;
    /** If `true` picker is disabled */
    disabled?: boolean;
    /** Callback fired on date change. */
    onChange: NonNullablePickerChangeHandler<TDate>;
    /** If `true` picker is readonly */
    readOnly?: boolean;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
}
declare type MonthPickerComponent = (<TDate>(props: MonthPickerProps<TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
    propTypes?: any;
};
export declare const MonthPicker: MonthPickerComponent;
export {};
