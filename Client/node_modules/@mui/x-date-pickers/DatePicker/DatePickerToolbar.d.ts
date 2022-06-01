import * as React from 'react';
import { BaseToolbarProps } from '../internals/models/props/baseToolbarProps';
export declare const datePickerToolbarClasses: Record<"root" | "title", string>;
declare type DatePickerToolbarComponent = (<TDate>(props: BaseToolbarProps<TDate, TDate | null> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
    propTypes?: any;
};
/**
 * @ignore - internal component.
 */
export declare const DatePickerToolbar: DatePickerToolbarComponent;
export {};
