"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateTimePickerToolbarClasses = exports.DateTimePickerToolbar = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _styles = require("@mui/material/styles");

var _material = require("@mui/material");

var _PickersToolbarText = require("../internals/components/PickersToolbarText");

var _PickersToolbar = require("../internals/components/PickersToolbar");

var _PickersToolbarButton = require("../internals/components/PickersToolbarButton");

var _DateTimePickerTabs = require("./DateTimePickerTabs");

var _useUtils = require("../internals/hooks/useUtils");

var _WrapperVariantContext = require("../internals/components/wrappers/WrapperVariantContext");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["ampm", "parsedValue", "dateRangeIcon", "hideTabs", "isMobileKeyboardViewOpen", "onChange", "openView", "setOpenView", "timeIcon", "toggleMobileKeyboardView", "toolbarFormat", "toolbarPlaceholder", "toolbarTitle", "views"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const dateTimePickerToolbarClasses = (0, _material.generateUtilityClasses)('MuiDateTimePickerToolbar', ['root', 'dateContainer', 'timeContainer', 'separator']);
exports.dateTimePickerToolbarClasses = dateTimePickerToolbarClasses;
const DateTimePickerToolbarRoot = (0, _styles.styled)(_PickersToolbar.PickersToolbar, {
  name: 'MuiDateTimePickerToolbar',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({
  paddingLeft: 16,
  paddingRight: 16,
  justifyContent: 'space-around',
  [`& .${_PickersToolbar.pickersToolbarClasses.penIconButton}`]: {
    position: 'absolute',
    top: 8,
    right: 8
  }
});
const DateTimePickerToolbarDateContainer = (0, _styles.styled)('div', {
  name: 'MuiDateTimePickerToolbar',
  slot: 'DateContainer',
  overridesResolver: (props, styles) => styles.dateContainer
})({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start'
});
const DateTimePickerToolbarTimeContainer = (0, _styles.styled)('div', {
  name: 'MuiDateTimePickerToolbar',
  slot: 'TimeContainer',
  overridesResolver: (props, styles) => styles.timeContainer
})({
  display: 'flex'
});
const DateTimePickerToolbarSeparator = (0, _styles.styled)(_PickersToolbarText.PickersToolbarText, {
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

const DateTimePickerToolbar = props => {
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
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const utils = (0, _useUtils.useUtils)();
  const wrapperVariant = React.useContext(_WrapperVariantContext.WrapperVariantContext);
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
    children: [wrapperVariant !== 'desktop' && /*#__PURE__*/(0, _jsxRuntime.jsxs)(DateTimePickerToolbarRoot, (0, _extends2.default)({
      toolbarTitle: toolbarTitle,
      isMobileKeyboardViewOpen: isMobileKeyboardViewOpen,
      toggleMobileKeyboardView: toggleMobileKeyboardView,
      className: dateTimePickerToolbarClasses.root
    }, other, {
      isLandscape: false,
      ownerState: ownerState,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(DateTimePickerToolbarDateContainer, {
        className: dateTimePickerToolbarClasses.dateContainer,
        ownerState: ownerState,
        children: [views.includes('year') && /*#__PURE__*/(0, _jsxRuntime.jsx)(_PickersToolbarButton.PickersToolbarButton, {
          tabIndex: -1,
          variant: "subtitle1",
          onClick: () => setOpenView('year'),
          selected: openView === 'year',
          value: parsedValue ? utils.format(parsedValue, 'year') : '–'
        }), views.includes('day') && /*#__PURE__*/(0, _jsxRuntime.jsx)(_PickersToolbarButton.PickersToolbarButton, {
          tabIndex: -1,
          variant: "h4",
          onClick: () => setOpenView('day'),
          selected: openView === 'day',
          value: dateText
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(DateTimePickerToolbarTimeContainer, {
        className: dateTimePickerToolbarClasses.timeContainer,
        ownerState: ownerState,
        children: [views.includes('hours') && /*#__PURE__*/(0, _jsxRuntime.jsx)(_PickersToolbarButton.PickersToolbarButton, {
          variant: "h3",
          onClick: () => setOpenView('hours'),
          selected: openView === 'hours',
          value: parsedValue ? formatHours(parsedValue) : '--'
        }), views.includes('minutes') && /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(DateTimePickerToolbarSeparator, {
            variant: "h3",
            value: ":",
            className: dateTimePickerToolbarClasses.separator,
            ownerState: ownerState
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_PickersToolbarButton.PickersToolbarButton, {
            variant: "h3",
            onClick: () => setOpenView('minutes'),
            selected: openView === 'minutes',
            value: parsedValue ? utils.format(parsedValue, 'minutes') : '--'
          })]
        }), views.includes('seconds') && /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(DateTimePickerToolbarSeparator, {
            variant: "h3",
            value: ":",
            className: dateTimePickerToolbarClasses.separator,
            ownerState: ownerState
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_PickersToolbarButton.PickersToolbarButton, {
            variant: "h3",
            onClick: () => setOpenView('seconds'),
            selected: openView === 'seconds',
            value: parsedValue ? utils.format(parsedValue, 'seconds') : '--'
          })]
        })]
      })]
    })), showTabs && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DateTimePickerTabs.DateTimePickerTabs, {
      dateRangeIcon: dateRangeIcon,
      timeIcon: timeIcon,
      view: openView,
      onChange: setOpenView
    })]
  });
};

exports.DateTimePickerToolbar = DateTimePickerToolbar;