import * as React from 'react';
import { PickersDayProps } from '../PickersDay/PickersDay';
import { PickerOnChangeFn } from '../internals/hooks/useViews';
import { SlideDirection, SlideTransitionProps } from './PickersSlideTransition';
import { DayValidationProps } from '../internals/hooks/validation/models';
export interface ExportedDayPickerProps<TDate> extends DayValidationProps<TDate>, Pick<PickersDayProps<TDate>, 'disableHighlightToday' | 'showDaysOutsideCurrentMonth'> {
    autoFocus?: boolean;
    /**
     * If `true` renders `LoadingComponent` in calendar instead of calendar view.
     * Can be used to preload information and show it in calendar.
     * @default false
     */
    loading?: boolean;
    /**
     * Custom renderer for day. Check the [PickersDay](https://mui.com/x/api/date-pickers/pickers-day/) component.
     * @template TDate
     * @param {TDate} day The day to render.
     * @param {Array<TDate | null>} selectedDays The days currently selected.
     * @param {PickersDayProps<TDate>} pickersDayProps The props of the day to render.
     * @returns {JSX.Element} The element representing the day.
     */
    renderDay?: (day: TDate, selectedDays: TDate[], pickersDayProps: PickersDayProps<TDate>) => JSX.Element;
    /**
     * Component displaying when passed `loading` true.
     * @returns {React.ReactNode} The node to render when loading.
     * @default () => "..."
     */
    renderLoading?: () => React.ReactNode;
}
export interface DayPickerProps<TDate> extends ExportedDayPickerProps<TDate> {
    autoFocus?: boolean;
    className?: string;
    currentMonth: TDate;
    selectedDays: (TDate | null)[];
    onSelectedDaysChange: PickerOnChangeFn<TDate>;
    disabled?: boolean;
    focusedDay: TDate | null;
    isMonthSwitchingAnimating: boolean;
    onFocusedDayChange: (newFocusedDay: TDate) => void;
    onMonthSwitchingAnimationEnd: () => void;
    readOnly?: boolean;
    reduceAnimations: boolean;
    slideDirection: SlideDirection;
    TransitionProps?: Partial<SlideTransitionProps>;
}
/**
 * @ignore - do not document.
 */
export declare function DayPicker<TDate>(props: DayPickerProps<TDate>): JSX.Element;
