import * as React from 'react';
import { ExportedDayPickerProps } from './DayPicker';
import { PickerOnChangeFn } from '../internals/hooks/useViews';
import { ExportedCalendarHeaderProps, PickersCalendarHeaderSlotsComponent, PickersCalendarHeaderSlotsComponentsProps } from './PickersCalendarHeader';
import { CalendarPickerView } from '../internals/models';
import { CalendarPickerClasses } from './calendarPickerClasses';
import { MonthValidationProps, YearValidationProps } from '../internals/hooks/validation/models';
export interface CalendarPickerSlotsComponent extends PickersCalendarHeaderSlotsComponent {
}
export interface CalendarPickerSlotsComponentsProps extends PickersCalendarHeaderSlotsComponentsProps {
}
export interface CalendarPickerProps<TDate> extends ExportedDayPickerProps<TDate>, YearValidationProps<TDate>, MonthValidationProps<TDate>, ExportedCalendarHeaderProps<TDate> {
    className?: string;
    classes?: Partial<CalendarPickerClasses>;
    /**
     * Overrideable components.
     * @default {}
     */
    components?: Partial<CalendarPickerSlotsComponent>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    componentsProps?: Partial<CalendarPickerSlotsComponentsProps>;
    date: TDate | null;
    /**
     * Default calendar month displayed when `value={null}`.
     */
    defaultCalendarMonth?: TDate;
    /**
     * If `true`, the picker and text field are disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * Callback fired on view change.
     * @param {CalendarPickerView} view The new view.
     */
    onViewChange?: (view: CalendarPickerView) => void;
    /**
     * Callback fired on date change
     */
    onChange: PickerOnChangeFn<TDate>;
    /**
     * Initially open view.
     * @default 'day'
     */
    openTo?: CalendarPickerView;
    /**
     * Make picker read only.
     * @default false
     */
    readOnly?: boolean;
    /**
     * Disable heavy animations.
     * @default typeof navigator !== 'undefined' && /(android)/i.test(navigator.userAgent)
     */
    reduceAnimations?: boolean;
    /**
     * Component displaying when passed `loading` true.
     * @returns {React.ReactNode} The node to render when loading.
     * @default () => <span data-mui-test="loading-progress">...</span>
     */
    renderLoading?: () => React.ReactNode;
    /**
     * Controlled open view.
     */
    view?: CalendarPickerView;
    /**
     * Views for calendar picker.
     * @default ['year', 'day']
     */
    views?: readonly CalendarPickerView[];
    /**
     * Callback firing on year change @DateIOType.
     * @template TDate
     * @param {TDate} year The new year.
     */
    onYearChange?: (year: TDate) => void;
    /**
     * Callback firing on month change @DateIOType.
     * @template TDate
     * @param {TDate} month The new month.
     * @returns {void|Promise} -
     */
    onMonthChange?: (month: TDate) => void | Promise<void>;
}
export declare type ExportedCalendarPickerProps<TDate> = Omit<CalendarPickerProps<TDate>, 'date' | 'view' | 'views' | 'openTo' | 'onChange' | 'changeView' | 'slideDirection' | 'currentMonth' | 'className' | 'classes' | 'components' | 'componentsProps'>;
declare type CalendarPickerComponent = (<TDate>(props: CalendarPickerProps<TDate> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
    propTypes?: any;
};
/**
 *
 * Demos:
 *
 * - [Date Picker](https://mui.com/x/react-date-pickers/date-picker/)
 *
 * API:
 *
 * - [CalendarPicker API](https://mui.com/x/api/date-pickers/calendar-picker/)
 */
declare const CalendarPicker: CalendarPickerComponent;
export { CalendarPicker };
