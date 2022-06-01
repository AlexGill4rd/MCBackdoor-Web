import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { PickersDay } from '../PickersDay/PickersDay';
import { useUtils, useNow } from '../internals/hooks/useUtils';
import { DAY_SIZE, DAY_MARGIN } from '../internals/constants/dimensions';
import { PickersSlideTransition } from './PickersSlideTransition';
import { useIsDayDisabled } from '../internals/hooks/validation/useDateValidation';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const weeksContainerHeight = (DAY_SIZE + DAY_MARGIN * 4) * 6;
const PickersCalendarDayHeader = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});
const PickersCalendarWeekDayLabel = styled(Typography)(({
  theme
}) => ({
  width: 36,
  height: 40,
  margin: '0 2px',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.palette.text.secondary
}));
const PickersCalendarLoadingContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: weeksContainerHeight
});
const PickersCalendarSlideTransition = styled(PickersSlideTransition)({
  minHeight: weeksContainerHeight
});
const PickersCalendarWeekContainer = styled('div')({
  overflow: 'hidden'
});
const PickersCalendarWeek = styled('div')({
  margin: `${DAY_MARGIN}px 0`,
  display: 'flex',
  justifyContent: 'center'
});
/**
 * @ignore - do not document.
 */

export function DayPicker(props) {
  const now = useNow();
  const utils = useUtils();
  const {
    autoFocus,
    onFocusedDayChange,
    className,
    currentMonth,
    selectedDays,
    disabled,
    disableHighlightToday,
    focusedDay,
    isMonthSwitchingAnimating,
    loading,
    onSelectedDaysChange,
    onMonthSwitchingAnimationEnd,
    readOnly,
    reduceAnimations,
    renderDay,
    renderLoading = () => /*#__PURE__*/_jsx("span", {
      children: "..."
    }),
    showDaysOutsideCurrentMonth,
    slideDirection,
    TransitionProps,
    disablePast,
    disableFuture,
    minDate,
    maxDate,
    shouldDisableDate
  } = props;
  const isDateDisabled = useIsDayDisabled({
    shouldDisableDate,
    minDate,
    maxDate,
    disablePast,
    disableFuture
  });
  const handleDaySelect = React.useCallback((day, isFinish = 'finish') => {
    if (readOnly) {
      return;
    }

    onSelectedDaysChange(day, isFinish);
  }, [onSelectedDaysChange, readOnly]);
  const currentMonthNumber = utils.getMonth(currentMonth);
  const validSelectedDays = selectedDays.filter(day => !!day).map(day => utils.startOfDay(day)); // need a new ref whenever the `key` of the transition changes: http://reactcommunity.org/react-transition-group/transition/#Transition-prop-nodeRef.

  const transitionKey = currentMonthNumber; // eslint-disable-next-line react-hooks/exhaustive-deps

  const slideNodeRef = React.useMemo(() => /*#__PURE__*/React.createRef(), [transitionKey]);
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [/*#__PURE__*/_jsx(PickersCalendarDayHeader, {
      children: utils.getWeekdays().map((day, i) => /*#__PURE__*/_jsx(PickersCalendarWeekDayLabel, {
        "aria-hidden": true,
        variant: "caption",
        children: day.charAt(0).toUpperCase()
      }, day + i.toString()))
    }), loading ? /*#__PURE__*/_jsx(PickersCalendarLoadingContainer, {
      children: renderLoading()
    }) : /*#__PURE__*/_jsx(PickersCalendarSlideTransition, _extends({
      transKey: transitionKey,
      onExited: onMonthSwitchingAnimationEnd,
      reduceAnimations: reduceAnimations,
      slideDirection: slideDirection,
      className: className
    }, TransitionProps, {
      nodeRef: slideNodeRef,
      children: /*#__PURE__*/_jsx(PickersCalendarWeekContainer, {
        ref: slideNodeRef,
        role: "grid",
        children: utils.getWeekArray(currentMonth).map(week => /*#__PURE__*/_jsx(PickersCalendarWeek, {
          role: "row",
          children: week.map(day => {
            const pickersDayProps = {
              key: day == null ? void 0 : day.toString(),
              day,
              isAnimating: isMonthSwitchingAnimating,
              disabled: disabled || isDateDisabled(day),
              autoFocus: autoFocus && focusedDay !== null && utils.isSameDay(day, focusedDay),
              today: utils.isSameDay(day, now),
              outsideCurrentMonth: utils.getMonth(day) !== currentMonthNumber,
              selected: validSelectedDays.some(selectedDay => utils.isSameDay(selectedDay, day)),
              disableHighlightToday,
              showDaysOutsideCurrentMonth,
              onDayFocus: onFocusedDayChange,
              onDaySelect: handleDaySelect
            };
            return renderDay ? renderDay(day, validSelectedDays, pickersDayProps) : /*#__PURE__*/_jsx("div", {
              role: "cell",
              children: /*#__PURE__*/_jsx(PickersDay, _extends({}, pickersDayProps))
            }, pickersDayProps.key);
          })
        }, `week-${week[0]}`))
      })
    }))]
  });
}