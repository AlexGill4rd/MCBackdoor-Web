"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonthPicker = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _styles = require("@mui/material/styles");

var _material = require("@mui/material");

var _PickersMonth = require("./PickersMonth");

var _useUtils = require("../internals/hooks/useUtils");

var _monthPickerClasses = require("./monthPickerClasses");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["className", "date", "disabled", "disableFuture", "disablePast", "maxDate", "minDate", "onChange", "shouldDisableMonth", "readOnly"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root']
  };
  return (0, _material.unstable_composeClasses)(slots, _monthPickerClasses.getMonthPickerUtilityClass, classes);
};

const MonthPickerRoot = (0, _styles.styled)('div', {
  name: 'MuiMonthPicker',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({
  width: 310,
  display: 'flex',
  flexWrap: 'wrap',
  alignContent: 'stretch',
  margin: '0 4px'
});
const MonthPicker = /*#__PURE__*/React.forwardRef(function MonthPicker(inProps, ref) {
  const utils = (0, _useUtils.useUtils)();
  const now = (0, _useUtils.useNow)();
  const defaultDates = (0, _useUtils.useDefaultDates)();
  const props = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiMonthPicker'
  });
  const {
    className,
    date: propDate,
    disabled,
    disableFuture,
    disablePast,
    maxDate = defaultDates.maxDate,
    minDate = defaultDates.minDate,
    onChange,
    shouldDisableMonth,
    readOnly
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const ownerState = props;
  const classes = useUtilityClasses(ownerState);
  const currentDate = propDate != null ? propDate : now;
  const currentMonth = utils.getMonth(currentDate);

  const isMonthDisabled = month => {
    const firstEnabledMonth = utils.startOfMonth(disablePast && utils.isAfter(now, minDate) ? now : minDate);
    const lastEnabledMonth = utils.startOfMonth(disableFuture && utils.isBefore(now, maxDate) ? now : maxDate);

    if (utils.isBefore(month, firstEnabledMonth)) {
      return true;
    }

    if (utils.isAfter(month, lastEnabledMonth)) {
      return true;
    }

    if (!shouldDisableMonth) {
      return false;
    }

    return shouldDisableMonth(month);
  };

  const onMonthSelect = month => {
    if (readOnly) {
      return;
    }

    const newDate = utils.setMonth(currentDate, month);
    onChange(newDate, 'finish');
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(MonthPickerRoot, (0, _extends2.default)({
    ref: ref,
    className: (0, _clsx.default)(classes.root, className),
    ownerState: ownerState
  }, other, {
    children: utils.getMonthArray(currentDate).map(month => {
      const monthNumber = utils.getMonth(month);
      const monthText = utils.format(month, 'monthShort');
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_PickersMonth.PickersMonth, {
        value: monthNumber,
        selected: monthNumber === currentMonth,
        onSelect: onMonthSelect,
        disabled: disabled || isMonthDisabled(month),
        children: monthText
      }, monthText);
    })
  }));
});
exports.MonthPicker = MonthPicker;
process.env.NODE_ENV !== "production" ? MonthPicker.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * className applied to the root element.
   */
  className: _propTypes.default.string,

  /**
   * Date value for the MonthPicker
   */
  date: _propTypes.default.any,

  /**
   * If `true` picker is disabled
   */
  disabled: _propTypes.default.bool,

  /**
   * If `true` future days are disabled.
   * @default false
   */
  disableFuture: _propTypes.default.bool,

  /**
   * If `true` past days are disabled.
   * @default false
   */
  disablePast: _propTypes.default.bool,

  /**
   * Maximal selectable date. @DateIOType
   */
  maxDate: _propTypes.default.any,

  /**
   * Minimal selectable date. @DateIOType
   */
  minDate: _propTypes.default.any,

  /**
   * Callback fired on date change.
   */
  onChange: _propTypes.default.func.isRequired,

  /**
   * If `true` picker is readonly
   */
  readOnly: _propTypes.default.bool,

  /**
   * Disable specific months dynamically.
   * Works like `shouldDisableDate` but for month selection view @DateIOType.
   * @template TDate
   * @param {TDate} month The month to check.
   * @returns {boolean} If `true` the month will be disabled.
   */
  shouldDisableMonth: _propTypes.default.func,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object])
} : void 0;