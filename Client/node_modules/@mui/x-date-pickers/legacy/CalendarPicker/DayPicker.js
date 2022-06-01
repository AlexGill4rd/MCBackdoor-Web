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
var weeksContainerHeight = (DAY_SIZE + DAY_MARGIN * 4) * 6;
var PickersCalendarDayHeader = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});
var PickersCalendarWeekDayLabel = styled(Typography)(function (_ref) {
  var theme = _ref.theme;
  return {
    width: 36,
    height: 40,
    margin: '0 2px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.text.secondary
  };
});
var PickersCalendarLoadingContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: weeksContainerHeight
});
var PickersCalendarSlideTransition = styled(PickersSlideTransition)({
  minHeight: weeksContainerHeight
});
var PickersCalendarWeekContainer = styled('div')({
  overflow: 'hidden'
});
var PickersCalendarWeek = styled('div')({
  margin: "".concat(DAY_MARGIN, "px 0"),
  display: 'flex',
  justifyContent: 'center'
});
/**
 * @ignore - do not document.
 */

export function DayPicker(props) {
  var now = useNow();
  var utils = useUtils();
  var autoFocus = props.autoFocus,
      onFocusedDayChange = props.onFocusedDayChange,
      className = props.className,
      currentMonth = props.currentMonth,
      selectedDays = props.selectedDays,
      disabled = props.disabled,
      disableHighlightToday = props.disableHighlightToday,
      focusedDay = props.focusedDay,
      isMonthSwitchingAnimating = props.isMonthSwitchingAnimating,
      loading = props.loading,
      onSelectedDaysChange = props.onSelectedDaysChange,
      onMonthSwitchingAnimationEnd = props.onMonthSwitchingAnimationEnd,
      readOnly = props.readOnly,
      reduceAnimations = props.reduceAnimations,
      renderDay = props.renderDay,
      _props$renderLoading = props.renderLoading,
      renderLoading = _props$renderLoading === void 0 ? function () {
    return /*#__PURE__*/_jsx("span", {
      children: "..."
    });
  } : _props$renderLoading,
      showDaysOutsideCurrentMonth = props.showDaysOutsideCurrentMonth,
      slideDirection = props.slideDirection,
      TransitionProps = props.TransitionProps,
      disablePast = props.disablePast,
      disableFuture = props.disableFuture,
      minDate = props.minDate,
      maxDate = props.maxDate,
      shouldDisableDate = props.shouldDisableDate;
  var isDateDisabled = useIsDayDisabled({
    shouldDisableDate: shouldDisableDate,
    minDate: minDate,
    maxDate: maxDate,
    disablePast: disablePast,
    disableFuture: disableFuture
  });
  var handleDaySelect = React.useCallback(function (day) {
    var isFinish = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'finish';

    if (readOnly) {
      return;
    }

    onSelectedDaysChange(day, isFinish);
  }, [onSelectedDaysChange, readOnly]);
  var currentMonthNumber = utils.getMonth(currentMonth);
  var validSelectedDays = selectedDays.filter(function (day) {
    return !!day;
  }).map(function (day) {
    return utils.startOfDay(day);
  }); // need a new ref whenever the `key` of the transition changes: http://reactcommunity.org/react-transition-group/transition/#Transition-prop-nodeRef.

  var transitionKey = currentMonthNumber; // eslint-disable-next-line react-hooks/exhaustive-deps

  var slideNodeRef = React.useMemo(function () {
    return /*#__PURE__*/React.createRef();
  }, [transitionKey]);
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [/*#__PURE__*/_jsx(PickersCalendarDayHeader, {
      children: utils.getWeekdays().map(function (day, i) {
        return /*#__PURE__*/_jsx(PickersCalendarWeekDayLabel, {
          "aria-hidden": true,
          variant: "caption",
          children: day.charAt(0).toUpperCase()
        }, day + i.toString());
      })
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
        children: utils.getWeekArray(currentMonth).map(function (week) {
          return /*#__PURE__*/_jsx(PickersCalendarWeek, {
            role: "row",
            children: week.map(function (day) {
              var pickersDayProps = {
                key: day == null ? void 0 : day.toString(),
                day: day,
                isAnimating: isMonthSwitchingAnimating,
                disabled: disabled || isDateDisabled(day),
                autoFocus: autoFocus && focusedDay !== null && utils.isSameDay(day, focusedDay),
                today: utils.isSameDay(day, now),
                outsideCurrentMonth: utils.getMonth(day) !== currentMonthNumber,
                selected: validSelectedDays.some(function (selectedDay) {
                  return utils.isSameDay(selectedDay, day);
                }),
                disableHighlightToday: disableHighlightToday,
                showDaysOutsideCurrentMonth: showDaysOutsideCurrentMonth,
                onDayFocus: onFocusedDayChange,
                onDaySelect: handleDaySelect
              };
              return renderDay ? renderDay(day, validSelectedDays, pickersDayProps) : /*#__PURE__*/_jsx("div", {
                role: "cell",
                children: /*#__PURE__*/_jsx(PickersDay, _extends({}, pickersDayProps))
              }, pickersDayProps.key);
            })
          }, "week-".concat(week[0]));
        })
      })
    }))]
  });
}