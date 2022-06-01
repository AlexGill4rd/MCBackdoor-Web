"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DayPicker = DayPicker;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _Typography = _interopRequireDefault(require("@mui/material/Typography"));

var _styles = require("@mui/material/styles");

var _PickersDay = require("../PickersDay/PickersDay");

var _useUtils = require("../internals/hooks/useUtils");

var _dimensions = require("../internals/constants/dimensions");

var _PickersSlideTransition = require("./PickersSlideTransition");

var _useDateValidation = require("../internals/hooks/validation/useDateValidation");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const weeksContainerHeight = (_dimensions.DAY_SIZE + _dimensions.DAY_MARGIN * 4) * 6;
const PickersCalendarDayHeader = (0, _styles.styled)('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});
const PickersCalendarWeekDayLabel = (0, _styles.styled)(_Typography.default)(({
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
const PickersCalendarLoadingContainer = (0, _styles.styled)('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: weeksContainerHeight
});
const PickersCalendarSlideTransition = (0, _styles.styled)(_PickersSlideTransition.PickersSlideTransition)({
  minHeight: weeksContainerHeight
});
const PickersCalendarWeekContainer = (0, _styles.styled)('div')({
  overflow: 'hidden'
});
const PickersCalendarWeek = (0, _styles.styled)('div')({
  margin: `${_dimensions.DAY_MARGIN}px 0`,
  display: 'flex',
  justifyContent: 'center'
});
/**
 * @ignore - do not document.
 */

function DayPicker(props) {
  const now = (0, _useUtils.useNow)();
  const utils = (0, _useUtils.useUtils)();
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
    renderLoading = () => /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
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
  const isDateDisabled = (0, _useDateValidation.useIsDayDisabled)({
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(PickersCalendarDayHeader, {
      children: utils.getWeekdays().map((day, i) => /*#__PURE__*/(0, _jsxRuntime.jsx)(PickersCalendarWeekDayLabel, {
        "aria-hidden": true,
        variant: "caption",
        children: day.charAt(0).toUpperCase()
      }, day + i.toString()))
    }), loading ? /*#__PURE__*/(0, _jsxRuntime.jsx)(PickersCalendarLoadingContainer, {
      children: renderLoading()
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(PickersCalendarSlideTransition, (0, _extends2.default)({
      transKey: transitionKey,
      onExited: onMonthSwitchingAnimationEnd,
      reduceAnimations: reduceAnimations,
      slideDirection: slideDirection,
      className: className
    }, TransitionProps, {
      nodeRef: slideNodeRef,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(PickersCalendarWeekContainer, {
        ref: slideNodeRef,
        role: "grid",
        children: utils.getWeekArray(currentMonth).map(week => /*#__PURE__*/(0, _jsxRuntime.jsx)(PickersCalendarWeek, {
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
            return renderDay ? renderDay(day, validSelectedDays, pickersDayProps) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              role: "cell",
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PickersDay.PickersDay, (0, _extends2.default)({}, pickersDayProps))
            }, pickersDayProps.key);
          })
        }, `week-${week[0]}`))
      })
    }))]
  });
}