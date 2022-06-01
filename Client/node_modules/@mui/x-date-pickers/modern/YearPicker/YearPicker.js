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

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root']
  };
  return composeClasses(slots, getYearPickerUtilityClass, classes);
};

const YearPickerRoot = styled('div', {
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
export const YearPicker = /*#__PURE__*/React.forwardRef(function YearPicker(inProps, ref) {
  const now = useNow();
  const theme = useTheme();
  const utils = useUtils();
  const defaultProps = useDefaultDates();
  const props = useThemProps({
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
  const wrapperVariant = React.useContext(WrapperVariantContext);
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

  return /*#__PURE__*/_jsx(YearPickerRoot, {
    ref: ref,
    className: clsx(classes.root, className),
    ownerState: ownerState,
    children: utils.getYearRange(minDate, maxDate).map(year => {
      const yearNumber = utils.getYear(year);
      const selected = yearNumber === currentYear;
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