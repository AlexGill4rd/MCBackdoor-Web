import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme, styled, useThemeProps as useThemProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import clsx from 'clsx';
import { PickersYear } from './PickersYear';
import { useUtils, useNow, useDefaultDates } from '../internals/hooks/useUtils';
import { WrapperVariantContext } from '../internals/components/wrappers/WrapperVariantContext';
import { getYearPickerUtilityClass } from './yearPickerClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['root']
  };
  return composeClasses(slots, getYearPickerUtilityClass, classes);
};

var YearPickerRoot = styled('div', {
  name: 'MuiYearPicker',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.root;
  }
})({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  overflowY: 'auto',
  height: '100%',
  margin: '0 4px'
});
export var YearPicker = /*#__PURE__*/React.forwardRef(function YearPicker(inProps, ref) {
  var now = useNow();
  var theme = useTheme();
  var utils = useUtils();
  var defaultProps = useDefaultDates();
  var props = useThemProps({
    props: inProps,
    name: 'MuiYearPicker'
  });
  var autoFocus = props.autoFocus,
      className = props.className,
      date = props.date,
      disabled = props.disabled,
      disableFuture = props.disableFuture,
      disablePast = props.disablePast,
      _props$maxDate = props.maxDate,
      maxDate = _props$maxDate === void 0 ? defaultProps.maxDate : _props$maxDate,
      _props$minDate = props.minDate,
      minDate = _props$minDate === void 0 ? defaultProps.minDate : _props$minDate,
      onChange = props.onChange,
      readOnly = props.readOnly,
      shouldDisableYear = props.shouldDisableYear;
  var ownerState = props;
  var classes = useUtilityClasses(ownerState);
  var selectedDate = date || now;
  var currentYear = utils.getYear(selectedDate);
  var wrapperVariant = React.useContext(WrapperVariantContext);
  var selectedYearRef = React.useRef(null);

  var _React$useState = React.useState(currentYear),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      focusedYear = _React$useState2[0],
      setFocusedYear = _React$useState2[1];

  var isYearDisabled = React.useCallback(function (dateToValidate) {
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

  var handleYearSelection = function handleYearSelection(event, year) {
    var isFinish = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'finish';

    if (readOnly) {
      return;
    }

    var newDate = utils.setYear(selectedDate, year);
    onChange(newDate, isFinish);
  };

  var focusYear = React.useCallback(function (year) {
    if (!isYearDisabled(utils.setYear(selectedDate, year))) {
      setFocusedYear(year);
    }
  }, [selectedDate, isYearDisabled, utils]);
  var yearsInRow = wrapperVariant === 'desktop' ? 4 : 3;

  var handleKeyDown = function handleKeyDown(event, year) {
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

  return /*#__PURE__*/_jsx(YearPickerRoot, {
    ref: ref,
    className: clsx(classes.root, className),
    ownerState: ownerState,
    children: utils.getYearRange(minDate, maxDate).map(function (year) {
      var yearNumber = utils.getYear(year);
      var selected = yearNumber === currentYear;
      return /*#__PURE__*/_jsx(PickersYear, {
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
process.env.NODE_ENV !== "production" ? YearPicker.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  autoFocus: PropTypes.bool,
  classes: PropTypes.object,
  className: PropTypes.string,
  date: PropTypes.any,
  disabled: PropTypes.bool,

  /**
   * If `true` future days are disabled.
   * @default false
   */
  disableFuture: PropTypes.bool,

  /**
   * If `true` past days are disabled.
   * @default false
   */
  disablePast: PropTypes.bool,

  /**
   * Maximal selectable date. @DateIOType
   */
  maxDate: PropTypes.any,

  /**
   * Minimal selectable date. @DateIOType
   */
  minDate: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  onFocusedDayChange: PropTypes.func,
  readOnly: PropTypes.bool,

  /**
   * Disable specific years dynamically.
   * Works like `shouldDisableDate` but for year selection view @DateIOType.
   * @template TDate
   * @param {TDate} year The year to test.
   * @returns {boolean} Returns `true` if the year should be disabled.
   */
  shouldDisableYear: PropTypes.func
} : void 0;