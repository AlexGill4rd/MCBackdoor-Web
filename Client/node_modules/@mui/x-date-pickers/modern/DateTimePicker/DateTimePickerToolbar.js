import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["ampm", "parsedValue", "dateRangeIcon", "hideTabs", "isMobileKeyboardViewOpen", "onChange", "openView", "setOpenView", "timeIcon", "toggleMobileKeyboardView", "toolbarFormat", "toolbarPlaceholder", "toolbarTitle", "views"];
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
export const dateTimePickerToolbarClasses = generateUtilityClasses('MuiDateTimePickerToolbar', ['root', 'dateContainer', 'timeContainer', 'separator']);
const DateTimePickerToolbarRoot = styled(PickersToolbar, {
  name: 'MuiDateTimePickerToolbar',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({
  paddingLeft: 16,
  paddingRight: 16,
  justifyContent: 'space-around',
  [`& .${pickersToolbarClasses.penIconButton}`]: {
    position: 'absolute',
    top: 8,
    right: 8
  }
});
const DateTimePickerToolbarDateContainer = styled('div', {
  name: 'MuiDateTimePickerToolbar',
  slot: 'DateContainer',
  overridesResolver: (props, styles) => styles.dateContainer
})({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start'
});
const DateTimePickerToolbarTimeContainer = styled('div', {
  name: 'MuiDateTimePickerToolbar',
  slot: 'TimeContainer',
  overridesResolver: (props, styles) => styles.timeContainer
})({
  display: 'flex'
});
const DateTimePickerToolbarSeparator = styled(PickersToolbarText, {
  name: 'MuiDateTimePickerToolbar',
  slot: 'Separator',
  overridesResolver: (props, styles) => styles.separator
})({
  margin: '0 4px 0 2px',
  cursor: 'default'
});
/**
 * @ignore - internal component.
 */

export const DateTimePickerToolbar = props => {
  const {
    ampm,
    parsedValue,
    dateRangeIcon,
    hideTabs,
    isMobileKeyboardViewOpen,
    openView,
    setOpenView,
    timeIcon,
    toggleMobileKeyboardView,
    toolbarFormat,
    toolbarPlaceholder = '––',
    toolbarTitle = 'Select date & time',
    views
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const utils = useUtils();
  const wrapperVariant = React.useContext(WrapperVariantContext);
  const showTabs = wrapperVariant === 'desktop' ? true : !hideTabs && typeof window !== 'undefined' && window.innerHeight > 667;

  const formatHours = time => ampm ? utils.format(time, 'hours12h') : utils.format(time, 'hours24h');

  const dateText = React.useMemo(() => {
    if (!parsedValue) {
      return toolbarPlaceholder;
    }

    if (toolbarFormat) {
      return utils.formatByString(parsedValue, toolbarFormat);
    }

    return utils.format(parsedValue, 'shortDate');
  }, [parsedValue, toolbarFormat, toolbarPlaceholder, utils]);
  const ownerState = props;
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
          onClick: () => setOpenView('year'),
          selected: openView === 'year',
          value: parsedValue ? utils.format(parsedValue, 'year') : '–'
        }), views.includes('day') && /*#__PURE__*/_jsx(PickersToolbarButton, {
          tabIndex: -1,
          variant: "h4",
          onClick: () => setOpenView('day'),
          selected: openView === 'day',
          value: dateText
        })]
      }), /*#__PURE__*/_jsxs(DateTimePickerToolbarTimeContainer, {
        className: dateTimePickerToolbarClasses.timeContainer,
        ownerState: ownerState,
        children: [views.includes('hours') && /*#__PURE__*/_jsx(PickersToolbarButton, {
          variant: "h3",
          onClick: () => setOpenView('hours'),
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
            onClick: () => setOpenView('minutes'),
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
            onClick: () => setOpenView('seconds'),
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