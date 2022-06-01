"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pickersToolbarClasses = exports.PickersToolbar = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _clsx = _interopRequireDefault(require("clsx"));

var _Grid = _interopRequireDefault(require("@mui/material/Grid"));

var _Typography = _interopRequireDefault(require("@mui/material/Typography"));

var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));

var _styles = require("@mui/material/styles");

var _material = require("@mui/material");

var _icons = require("./icons");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const pickersToolbarClasses = (0, _material.generateUtilityClasses)('MuiPickersToolbar', ['root', 'content', 'penIconButton', 'penIconButtonLandscape']);
exports.pickersToolbarClasses = pickersToolbarClasses;
const PickersToolbarRoot = (0, _styles.styled)('div', {
  name: 'MuiPickersToolbar',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})(({
  theme,
  ownerState
}) => (0, _extends2.default)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 3)
}, ownerState.isLandscape && {
  height: 'auto',
  maxWidth: 160,
  padding: 16,
  justifyContent: 'flex-start',
  flexWrap: 'wrap'
}));
const PickersToolbarContent = (0, _styles.styled)(_Grid.default, {
  name: 'MuiPickersToolbar',
  slot: 'Content',
  overridesResolver: (props, styles) => styles.content
})({
  flex: 1
});
const PickersToolbarPenIconButton = (0, _styles.styled)(_IconButton.default, {
  name: 'MuiPickersToolbar',
  slot: 'PenIconButton',
  overridesResolver: (props, styles) => styles.penIconButton
})({});

const getViewTypeIcon = viewType => viewType === 'clock' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_icons.Clock, {
  color: "inherit"
}) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_icons.Calendar, {
  color: "inherit"
});

function defaultGetKeyboardInputSwitchingButtonText(isKeyboardInputOpen, viewType) {
  return isKeyboardInputOpen ? `text input view is open, go to ${viewType} view` : `${viewType} view is open, go to text input view`;
}

const PickersToolbar = /*#__PURE__*/React.forwardRef(function PickersToolbar(props, ref) {
  const {
    children,
    className,
    getMobileKeyboardInputViewButtonText = defaultGetKeyboardInputSwitchingButtonText,
    isLandscape,
    isMobileKeyboardViewOpen,
    landscapeDirection = 'column',
    toggleMobileKeyboardView,
    toolbarTitle,
    viewType = 'calendar'
  } = props;
  const ownerState = props;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(PickersToolbarRoot, {
    ref: ref,
    className: (0, _clsx.default)(pickersToolbarClasses.root, className),
    ownerState: ownerState,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
      color: "text.secondary",
      variant: "overline",
      children: toolbarTitle
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(PickersToolbarContent, {
      container: true,
      justifyContent: "space-between",
      className: pickersToolbarClasses.content,
      ownerState: ownerState,
      direction: isLandscape ? landscapeDirection : 'row',
      alignItems: isLandscape ? 'flex-start' : 'flex-end',
      children: [children, /*#__PURE__*/(0, _jsxRuntime.jsx)(PickersToolbarPenIconButton, {
        onClick: toggleMobileKeyboardView,
        className: (0, _clsx.default)(pickersToolbarClasses.penIconButton, isLandscape && pickersToolbarClasses.penIconButtonLandscape),
        ownerState: ownerState,
        color: "inherit",
        "aria-label": getMobileKeyboardInputViewButtonText(isMobileKeyboardViewOpen, viewType),
        children: isMobileKeyboardViewOpen ? getViewTypeIcon(viewType) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_icons.Pen, {
          color: "inherit"
        })
      })]
    })]
  });
});
exports.PickersToolbar = PickersToolbar;