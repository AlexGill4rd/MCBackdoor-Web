"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YearPicker = void 0;

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@mui/material/styles");

var _material = require("@mui/material");

var _clsx = _interopRequireDefault(require("clsx"));

var _PickersYear = require("./PickersYear");

var _useUtils = require("../internals/hooks/useUtils");

var _WrapperVariantContext = require("../internals/components/wrappers/WrapperVariantContext");

var _yearPickerClasses = require("./yearPickerClasses");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root']
  };
  return (0, _material.unstable_composeClasses)(slots, _yearPickerClasses.getYearPickerUtilityClass, classes);
};

const YearPickerRoot = (0, _styles.styled)('div', {
  name: 'MuiYearPicker',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  overflowY: 'auto',
  height: '100%',
  margin: '0 4px'
});
const YearPicker = /*#__PURE__*/React.forwardRef(function YearPicker(inProps, ref) {
  const now = (0, _useUtils.useNow)();
  const theme = (0, _styles.useTheme)();
  const utils = (0, _useUtils.useUtils)();
  const defaultProps = (0, _useUtils.useDefaultDates)();
  const props = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiYearPicker'
  });
  const {
    autoFocus,
    className,
    date,
    disabled,
    disableFuture,
    disablePast,
    maxDate = defaultProps.maxDate,
    minDate = defaultProps.minDate,
    onChange,
    readOnly,
    shouldDisableYear
  } = props;
  const ownerState = props;
  const classes = useUtilityClasses(ownerState);
  const selectedDate = date || now;
  const currentYear = utils.getYear(selectedDate);
  const wrapperVariant = React.useContext(_WrapperVariantContext.WrapperVariantContext);
  const selectedYearRef = React.useRef(null);
  const [focusedYear, setFocusedYear] = React.useState(currentYear);
  const isYearDisabled = React.useCallback(dateToValidate => {
    if (disablePast && utils.isBeforeYear(dateToValidate, now)) {
      return true;
    }

    if (disableFuture && utils.isAfterYear(dateToValidate, now)) {
      return true;
    }

    if (minDate && utils.isBeforeYear(dateToValidate, minDate)) {
      return true;
    }

    if (maxDate && utils.isAfterYear(dateToValidate, maxDate)) {
      return true;
    }

    if (shouldDisableYear && shouldDisableYear(dateToValidate)) {
      return true;
    }

    return false;
  }, [disableFuture, disablePast, maxDate, minDate, now, shouldDisableYear, utils]);

  const handleYearSelection = (event, year, isFinish = 'finish') => {
    if (readOnly) {
      return;
    }

    const newDate = utils.setYear(selectedDate, year);
    onChange(newDate, isFinish);
  };

  const focusYear = React.useCallback(year => {
    if (!isYearDisabled(utils.setYear(selectedDate, year))) {
      setFocusedYear(year);
    }
  }, [selectedDate, isYearDisabled, utils]);
  const yearsInRow = wrapperVariant === 'desktop' ? 4 : 3;

  const handleKeyDown = (event, year) => {
    switch (event.key) {
      case 'ArrowUp':
        focusYear(year - yearsInRow);
        event.preventDefault();
        break;

      case 'ArrowDown':
        focusYear(year + yearsInRow);
        event.preventDefault();
        break;

      case 'ArrowLeft':
        focusYear(year + (theme.direction === 'ltr' ? -1 : 1));
        event.preventDefault();
        break;

      case 'ArrowRight':
        focusYear(year + (theme.direction === 'ltr' ? 1 : -1));
        event.preventDefault();
        break;

      default:
        break;
    }
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(YearPickerRoot, {
    ref: ref,
    className: (0, _clsx.default)(classes.root, className),
    ownerState: ownerState,
    children: utils.getYearRange(minDate, maxDate).map(year => {
      const yearNumber = utils.getYear(year);
      const selected = yearNumber === currentYear;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_PickersYear.PickersYear, {
        selected: selected,
        value: yearNumber,
        onClick: handleYearSelection,
        onKeyDown: handleKeyDown,
        autoFocus: autoFocus && yearNumber === focusedYear,
        ref: selected ? selectedYearRef : undefined,
        disabled: disabled || isYearDisabled(year),
        children: utils.format(year, 'year')
      }, utils.format(year, 'year'));
    })
  });
});
exports.YearPicker = YearPicker;
process.env.NODE_ENV !== "production" ? YearPicker.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  autoFocus: _propTypes.default.bool,
  classes: _propTypes.default.object,
  className: _propTypes.default.string,
  date: _propTypes.default.any,
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
  onChange: _propTypes.default.func.isRequired,
  onFocusedDayChange: _propTypes.default.func,
  readOnly: _propTypes.default.bool,

  /**
   * Disable specific years dynamically.
   * Works like `shouldDisableDate` but for year selection view @DateIOType.
   * @template TDate
   * @param {TDate} year The year to test.
   * @returns {boolean} Returns `true` if the year should be disabled.
   */
  shouldDisableYear: _propTypes.default.func
} : void 0;