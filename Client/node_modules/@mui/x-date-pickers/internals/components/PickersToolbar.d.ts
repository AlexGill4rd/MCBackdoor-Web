import * as React from 'react';
import { BaseToolbarProps } from '../models/props/baseToolbarProps';
export declare const pickersToolbarClasses: Record<"root" | "content" | "penIconButton" | "penIconButtonLandscape", string>;
export interface PickersToolbarProps<TDate, TValue> extends Pick<BaseToolbarProps<TDate, TValue>, 'getMobileKeyboardInputViewButtonText' | 'isMobileKeyboardViewOpen' | 'toggleMobileKeyboardView'> {
    className?: string;
    viewType?: 'calendar' | 'clock';
    isLandscape: boolean;
    landscapeDirection?: 'row' | 'column';
    toolbarTitle: React.ReactNode;
}
declare type PickersToolbarComponent = (<TDate, TValue>(props: React.PropsWithChildren<PickersToolbarProps<TDate, TValue>> & React.RefAttributes<HTMLDivElement>) => JSX.Element) & {
    propTypes?: any;
};
export declare const PickersToolbar: PickersToolbarComponent;
export {};
