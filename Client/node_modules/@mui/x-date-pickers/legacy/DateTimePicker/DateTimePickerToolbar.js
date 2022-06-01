import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
var _excluded = ["ampm", "parsedValue", "dateRangeIcon", "hideTabs", "isMobileKeyboardViewOpen", "onChange", "openView", "setOpenView", "timeIcon", "toggleMobileKeyboardView", "toolbarFormat", "toolbarPlaceholder", "toolbarTitle", "views"];
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { generateUtilityClasses } from '@mui/material';
import { PickersToolbarText } from '../internals/components/PickersToolbarText';
import { PickersToolbar, pickersToolbarClasses } from '../internals/components/PickersToolbar';
import { PickersToolbarButton } from '../internals/components/PickersToolbarButton';
import { DateTimePickerTabs } from './DateTimePickerTabs';
import { useUtils } from '../internals/hooks/useUtils';
import { WrapperVariantContext } from '../internals/components/wrappers/WrapperVariantContext';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var dateTimePickerToolbarClasses = generateUtilityClasses('MuiDateTimePickerToolbar', ['root', 'dateContainer', 'timeContainer', 'separator']);
var DateTimePickerToolbarRoot = styled(PickersToolbar, {
  name: 'MuiDateTimePickerToolbar',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.root;
  }
})(_defineProperty({
  paddingLeft: 16,
  paddingRight: 16,
  justifyContent: 'space-around'
}, "& .".concat(pickersToolbarClasses.penIconButton), {
  position: 'absolute',
  top: 8,
  right: 8
}));
var DateTimePickerToolbarDateContainer = styled('div', {
  name: 'MuiDateTimePickerToolbar',
  slot: 'DateContainer',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.dateContainer;
  }
})({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start'
});
var DateTimePickerToolbarTimeContainer = styled('div', {
  name: 'MuiDateTimePickerToolbar',
  slot: 'TimeContainer',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.timeContainer;
  }
})({
  display: 'flex'
});
var DateTimePickerToolbarSeparator = styled(PickersToolbarText, {
  name: 'MuiDateTimePickerToolbar',
  slot: 'Separator',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.separator;
  }
})({
  margin: '0 4px 0 2px',
  cursor: 'default'
});
/**
 * @ignore - internal component.
 */

export var DateTimePickerToolbar = function DateTimePickerToolbar(props) {
  var ampm = props.ampm,
      parsedValue = props.parsedValue,
      dateRangeIcon = props.dateRangeIcon,
      hideTabs = props.hideTabs,
      isMobileKeyboardViewOpen = props.isMobileKeyboardViewOpen,
      onChange = props.onChange,
      openView = props.openView,
      setOpenView = props.setOpenView,
      timeIcon = props.timeIcon,
      toggleMobileKeyboardView = props.toggleMobileKeyboardView,
      toolbarFormat = props.toolbarFormat,
      _props$toolbarPlaceho = props.toolbarPlaceholder,
      toolbarPlaceholder = _props$toolbarPlaceho === void 0 ? '––' : _props$toolbarPlaceho,
      _props$toolbarTitle = props.toolbarTitle,
      toolbarTitle = _props$toolbarTitle === void 0 ? 'Select date & time' : _props$toolbarTitle,
      views = props.views,
      other = _objectWithoutProperties(props, _excluded);

  var utils = useUtils();
  var wrapperVariant = React.useContext(WrapperVariantContext);
  var showTabs = wrapperVariant === 'desktop' ? true : !hideTabs && typeof window !== 'undefined' && window.innerHeight > 667;

  var formatHours = function formatHours(time) {
    return ampm ? utils.format(time, 'hours12h') : utils.format(time, 'hours24h');
  };

  var dateText = React.useMemo(function () {
    if (!parsedValue) {
      return toolbarPlaceholder;
    }

    if (toolbarFormat) {
      return utils.formatByString(parsedValue, toolbarFormat);
    }

    return utils.format(parsedValue, 'shortDate');
  }, [parsedValue, toolbarFormat, toolbarPlaceholder, utils]);
  var ownerState = props;
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [wrapperVariant !== 'desktop' && /*#__PURE__*/_jsxs(DateTimePickerToolbarRoot, _extends({
      toolbarTitle: toolbarTitle,
      isMobileKeyboardViewOpen: isMobileKeyboardViewOpen,
      toggleMobileKeyboardView: toggleMobileKeyboardView,
      className: dateTimePickerToolbarClasses.root
    }, other, {
      isLandscape: false,
      ownerState: ownerState,
      children: [/*#__PURE__*/_jsxs(DateTimePickerToolbarDateContainer, {
        className: dateTimePickerToolbarClasses.dateContainer,
        ownerState: ownerState,
        children: [views.includes('year') && /*#__PURE__*/_jsx(PickersToolbarButton, {
          tabIndex: -1,
          variant: "subtitle1",
          onClick: function onClick() {
            return setOpenView('year');
          },
          selected: openView === 'year',
          value: parsedValue ? utils.format(parsedValue, 'year') : '–'
        }), views.includes('day') && /*#__PURE__*/_jsx(PickersToolbarButton, {
          tabIndex: -1,
          variant: "h4",
          onClick: function onClick() {
            return setOpenView('day');
          },
          selected: openView === 'day',
          value: dateText
        })]
      }), /*#__PURE__*/_jsxs(DateTimePickerToolbarTimeContainer, {
        className: dateTimePickerToolbarClasses.timeContainer,
        ownerState: ownerState,
        children: [views.includes('hours') && /*#__PURE__*/_jsx(PickersToolbarButton, {
          variant: "h3",
          onClick: function onClick() {
            return setOpenView('hours');
          },
          selected: openView === 'hours',
          value: parsedValue ? formatHours(parsedValue) : '--'
        }), views.includes('minutes') && /*#__PURE__*/_jsxs(React.Fragment, {
          children: [/*#__PURE__*/_jsx(DateTimePickerToolbarSeparator, {
            variant: "h3",
            value: ":",
            className: dateTimePickerToolbarClasses.separator,
            ownerState: ownerState
          }), /*#__PURE__*/_jsx(PickersToolbarButton, {
            variant: "h3",
            onClick: function onClick() {
              return setOpenView('minutes');
            },
            selected: openView === 'minutes',
            value: parsedValue ? utils.format(parsedValue, 'minutes') : '--'
          })]
        }), views.includes('seconds') && /*#__PURE__*/_jsxs(React.Fragment, {
          children: [/*#__PURE__*/_jsx(DateTimePickerToolbarSeparator, {
            variant: "h3",
            value: ":",
            className: dateTimePickerToolbarClasses.separator,
            ownerState: ownerState
          }), /*#__PURE__*/_jsx(PickersToolbarButton, {
            variant: "h3",
            onClick: function onClick() {
              return setOpenView('seconds');
            },
            selected: openView === 'seconds',
            value: parsedValue ? utils.format(parsedValue, 'seconds') : '--'
          })]
        })]
      })]
    })), showTabs && /*#__PURE__*/_jsx(DateTimePickerTabs, {
      dateRangeIcon: dateRangeIcon,
      timeIcon: timeIcon,
      view: openView,
      onChange: setOpenView
    })]
  });
};