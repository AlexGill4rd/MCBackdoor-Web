import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
var _excluded = ["ampm", "ampmInClock", "parsedValue", "isLandscape", "isMobileKeyboardViewOpen", "onChange", "openView", "setOpenView", "toggleMobileKeyboardView", "toolbarTitle", "views", "disabled", "readOnly"];
import * as React from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { PickersToolbarText } from '../internals/components/PickersToolbarText';
import { PickersToolbarButton } from '../internals/components/PickersToolbarButton';
import { PickersToolbar, pickersToolbarClasses } from '../internals/components/PickersToolbar';
import { arrayIncludes } from '../internals/utils/utils';
import { useUtils } from '../internals/hooks/useUtils';
import { useMeridiemMode } from '../internals/hooks/date-helpers-hooks';
import { getTimePickerToolbarUtilityClass, timePickerToolbarClasses } from './timePickerToolbarClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var theme = ownerState.theme,
      isLandscape = ownerState.isLandscape,
      classes = ownerState.classes;
  var slots = {
    root: ['root'],
    separator: ['separator'],
    hourMinuteLabel: ['hourMinuteLabel', isLandscape && 'hourMinuteLabelLandscape', theme.direction === 'rtl' && 'hourMinuteLabelReverse'],
    ampmSelection: ['ampmSelection', isLandscape && 'ampmLandscape'],
    ampmLabel: ['ampmLabel']
  };
  return composeClasses(slots, getTimePickerToolbarUtilityClass, classes);
};

var TimePickerToolbarRoot = styled(PickersToolbar, {
  name: 'MuiTimePickerToolbar',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.root;
  }
})(_defineProperty({}, "& .".concat(pickersToolbarClasses.penIconButtonLandscape), {
  marginTop: 'auto'
}));
var TimePickerToolbarSeparator = styled(PickersToolbarText, {
  name: 'MuiTimePickerToolbar',
  slot: 'Separator',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.separator;
  }
})({
  outline: 0,
  margin: '0 4px 0 2px',
  cursor: 'default'
});
var TimePickerToolbarHourMinuteLabel = styled('div', {
  name: 'MuiTimePickerToolbar',
  slot: 'HourMinuteLabel',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.hourMinuteLabel;
  }
})(function (_ref) {
  var theme = _ref.theme,
      ownerState = _ref.ownerState;
  return _extends({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  }, ownerState.isLandscape && {
    marginTop: 'auto'
  }, theme.direction === 'rtl' && {
    flexDirection: 'row-reverse'
  });
});
var TimePickerToolbarAmPmSelection = styled('div', {
  name: 'MuiTimePickerToolbar',
  slot: 'AmPmSelection',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.ampmSelection;
  }
})(function (_ref2) {
  var ownerState = _ref2.ownerState;
  return _extends({
    display: 'flex',
    flexDirection: 'column',
    marginRight: 'auto',
    marginLeft: 12
  }, ownerState.isLandscape && {
    margin: '4px 0 auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexBasis: '100%'
  }, _defineProperty({}, "& .".concat(timePickerToolbarClasses.ampmLabel), {
    fontSize: 17
  }));
});
/**
 * @ignore - internal component.
 */

export var TimePickerToolbar = function TimePickerToolbar(props) {
  var ampm = props.ampm,
      ampmInClock = props.ampmInClock,
      parsedValue = props.parsedValue,
      isLandscape = props.isLandscape,
      isMobileKeyboardViewOpen = props.isMobileKeyboardViewOpen,
      onChange = props.onChange,
      openView = props.openView,
      setOpenView = props.setOpenView,
      toggleMobileKeyboardView = props.toggleMobileKeyboardView,
      _props$toolbarTitle = props.toolbarTitle,
      toolbarTitle = _props$toolbarTitle === void 0 ? 'Select time' : _props$toolbarTitle,
      views = props.views,
      disabled = props.disabled,
      readOnly = props.readOnly,
      other = _objectWithoutProperties(props, _excluded);

  var utils = useUtils();
  var theme = useTheme();
  var showAmPmControl = Boolean(ampm && !ampmInClock);

  var _useMeridiemMode = useMeridiemMode(parsedValue, ampm, onChange),
      meridiemMode = _useMeridiemMode.meridiemMode,
      handleMeridiemChange = _useMeridiemMode.handleMeridiemChange;

  var formatHours = function formatHours(time) {
    return ampm ? utils.format(time, 'hours12h') : utils.format(time, 'hours24h');
  };

  var ownerState = props;
  var classes = useUtilityClasses(_extends({}, ownerState, {
    theme: theme
  }));

  var separator = /*#__PURE__*/_jsx(TimePickerToolbarSeparator, {
    tabIndex: -1,
    value: ":",
    variant: "h3",
    selected: false,
    className: classes.separator
  });

  return /*#__PURE__*/_jsxs(TimePickerToolbarRoot, _extends({
    viewType: "clock",
    landscapeDirection: "row",
    toolbarTitle: toolbarTitle,
    isLandscape: isLandscape,
    isMobileKeyboardViewOpen: isMobileKeyboardViewOpen,
    toggleMobileKeyboardView: toggleMobileKeyboardView,
    ownerState: ownerState,
    className: classes.root
  }, other, {
    children: [/*#__PURE__*/_jsxs(TimePickerToolbarHourMinuteLabel, {
      className: classes.hourMinuteLabel,
      ownerState: ownerState,
      children: [arrayIncludes(views, 'hours') && /*#__PURE__*/_jsx(PickersToolbarButton, {
        tabIndex: -1,
        variant: "h3",
        onClick: function onClick() {
          return setOpenView('hours');
        },
        selected: openView === 'hours',
        value: parsedValue ? formatHours(parsedValue) : '--'
      }), arrayIncludes(views, ['hours', 'minutes']) && separator, arrayIncludes(views, 'minutes') && /*#__PURE__*/_jsx(PickersToolbarButton, {
        tabIndex: -1,
        variant: "h3",
        onClick: function onClick() {
          return setOpenView('minutes');
        },
        selected: openView === 'minutes',
        value: parsedValue ? utils.format(parsedValue, 'minutes') : '--'
      }), arrayIncludes(views, ['minutes', 'seconds']) && separator, arrayIncludes(views, 'seconds') && /*#__PURE__*/_jsx(PickersToolbarButton, {
        variant: "h3",
        onClick: function onClick() {
          return setOpenView('seconds');
        },
        selected: openView === 'seconds',
        value: parsedValue ? utils.format(parsedValue, 'seconds') : '--'
      })]
    }), showAmPmControl && /*#__PURE__*/_jsxs(TimePickerToolbarAmPmSelection, {
      className: classes.ampmSelection,
      ownerState: ownerState,
      children: [/*#__PURE__*/_jsx(PickersToolbarButton, {
        disableRipple: true,
        variant: "subtitle2",
        selected: meridiemMode === 'am',
        typographyClassName: classes.ampmLabel,
        value: utils.getMeridiemText('am'),
        onClick: readOnly ? undefined : function () {
          return handleMeridiemChange('am');
        },
        disabled: disabled
      }), /*#__PURE__*/_jsx(PickersToolbarButton, {
        disableRipple: true,
        variant: "subtitle2",
        selected: meridiemMode === 'pm',
        typographyClassName: classes.ampmLabel,
        value: utils.getMeridiemText('pm'),
        onClick: readOnly ? undefined : function () {
          return handleMeridiemChange('pm');
        },
        disabled: disabled
      })]
    })]
  }));
};