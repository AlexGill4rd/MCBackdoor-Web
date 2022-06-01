import * as React from 'react';
export interface PickersArrowSwitcherSlotsComponent {
    LeftArrowButton: React.ElementType;
    LeftArrowIcon: React.ElementType;
    RightArrowButton: React.ElementType;
    RightArrowIcon: React.ElementType;
}
export interface PickersArrowSwitcherSlotsComponentsProps {
    leftArrowButton: Record<string, any>;
    rightArrowButton: Record<string, any>;
}
export interface ExportedArrowSwitcherProps {
    /**
     * Overrideable components.
     * @default {}
     */
    components?: Partial<PickersArrowSwitcherSlotsComponent>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    componentsProps?: Partial<PickersArrowSwitcherSlotsComponentsProps>;
    /**
     * Left arrow icon aria-label text.
     * @deprecated
     */
    leftArrowButtonText?: string;
    /**
     * Right arrow icon aria-label text.
     * @deprecated
     */
    rightArrowButtonText?: string;
}
interface ArrowSwitcherProps extends ExportedArrowSwitcherProps, Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
    children?: React.ReactNode;
    isLeftDisabled: boolean;
    isLeftHidden?: boolean;
    isRightDisabled: boolean;
    isRightHidden?: boolean;
    onLeftClick: () => void;
    onRightClick: () => void;
}
export declare const PickersArrowSwitcher: React.ForwardRefExoticComponent<Omit<ArrowSwitcherProps, "as"> & React.RefAttributes<HTMLDivElement>>;
export {};
