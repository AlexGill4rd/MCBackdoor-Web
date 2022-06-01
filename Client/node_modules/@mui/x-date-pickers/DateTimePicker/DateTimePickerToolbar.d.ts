/// <reference types="react" />
import { BaseToolbarProps } from '../internals/models/props/baseToolbarProps';
export declare const dateTimePickerToolbarClasses: Record<"root" | "separator" | "dateContainer" | "timeContainer", string>;
/**
 * @ignore - internal component.
 */
export declare const DateTimePickerToolbar: <TDate extends unknown>(props: BaseToolbarProps<TDate, TDate | null>) => JSX.Element;
