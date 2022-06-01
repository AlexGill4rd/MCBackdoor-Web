import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
var _excluded = ["parsedValue", "isLandscape", "isMobileKeyboardViewOpen", "onChange", "toggleMobileKeyboardView", "toolbarFormat", "toolbarPlaceholder", "toolbarTitle", "views"];
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { generateUtilityClasses } from '@mui/material';
import { PickersToolbar, pickersToolbarClasses } from '../internals/components/PickersToolbar';
import { useUtils } from '../internals/hooks/useUtils';
import { isYearAndMonthViews, isYearOnlyView } from './shared';
import { jsx as _jsx } from "react/jsx-runtime";
export var datePickerToolbarClasses = generateUtilityClasses('MuiDatePickerToolbar', ['root', 'title']);
var DatePickerToolbarRoot = styled(PickersToolbar, {
  name: 'MuiDatePickerToolbar',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.root;
  }
})(_defineProperty({}, "& .".concat(pickersToolbarClasses.penIconButton), {
  position: 'relative',
  top: 4
}));
var DatePickerToolbarTitle = styled(Typography, {
  name: 'MuiDatePickerToolbar',
  slot: 'Title',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.title;
  }
})(function (_ref) {
  var ownerState = _ref.ownerState;
  return _extends({}, ownerState.isLandscape && {
    margin: 'auto 16px auto auto'
  });
});

/**
 * @ignore - internal component.
 */
export var DatePickerToolbar = /*#__PURE__*/React.forwardRef(function DatePickerToolbar(props, ref) {
  var parsedValue = props.parsedValue,
      isLandscape = props.isLandscape,
      isMobileKeyboardViewOpen = props.isMobileKeyboardViewOpen,
      onChange = props.onChange,
      toggleMobileKeyboardView = props.toggleMobileKeyboardView,
      toolbarFormat = props.toolbarFormat,
      _props$toolbarPlaceho = props.toolbarPlaceholder,
      toolbarPlaceholder = _props$toolbarPlaceho === void 0 ? '––' : _props$toolbarPlaceho,
      _props$toolbarTitle = props.toolbarTitle,
      toolbarTitle = _props$toolbarTitle === void 0 ? 'Select date' : _props$toolbarTitle,
      views = props.views,
      other = _objectWithoutProperties(props, _excluded);

  var utils = useUtils();
  var dateText = React.useMemo(function () {
    if (!parsedValue) {
      return toolbarPlaceholder;
    }

    if (toolbarFormat) {
      return utils.formatByString(parsedValue, toolbarFormat);
    }

    if (isYearOnlyView(views)) {
      return utils.format(parsedValue, 'year');
    }

    if (isYearAndMonthViews(views)) {
      return utils.format(parsedValue, 'month');
    } // Little localization hack (Google is doing the same for android native pickers):
    // For english localization it is convenient to include weekday into the date "Mon, Jun 1".
    // For other locales using strings like "June 1", without weekday.


    return /en/.test(utils.getCurrentLocaleCode()) ? utils.format(parsedValue, 'normalDateWithWeekday') : utils.format(parsedValue, 'normalDate');
  }, [parsedValue, toolbarFormat, toolbarPlaceholder, utils, views]);
  var ownerState = props;
  return /*#__PURE__*/_jsx(DatePickerToolbarRoot, _extends({
    ref: ref,
    toolbarTitle: toolbarTitle,
    isMobileKeyboardViewOpen: isMobileKeyboardViewOpen,
    toggleMobileKeyboardView: toggleMobileKeyboardView,
    isLandscape: isLandscape,
    ownerState: ownerState,
    className: datePickerToolbarClasses.root
  }, other, {
    children: /*#__PURE__*/_jsx(DatePickerToolbarTitle, {
      variant: "h4",
      align: isLandscape ? 'left' : 'center',
      ownerState: ownerState,
      className: datePickerToolbarClasses.title,
      children: dateText
    })
  }));
});