import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import clsx from 'clsx';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { generateUtilityClasses } from '@mui/material';
import { Pen, Calendar, Clock } from './icons';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export const pickersToolbarClasses = generateUtilityClasses('MuiPickersToolbar', ['root', 'content', 'penIconButton', 'penIconButtonLandscape']);
const PickersToolbarRoot = styled('div', {
  name: 'MuiPickersToolbar',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})(({
  theme,
  ownerState
}) => _extends({
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
const PickersToolbarContent = styled(Grid, {
  name: 'MuiPickersToolbar',
  slot: 'Content',
  overridesResolver: (props, styles) => styles.content
})({
  flex: 1
});
const PickersToolbarPenIconButton = styled(IconButton, {
  name: 'MuiPickersToolbar',
  slot: 'PenIconButton',
  overridesResolver: (props, styles) => styles.penIconButton
})({});

const getViewTypeIcon = viewType => viewType === 'clock' ? /*#__PURE__*/_jsx(Clock, {
  color: "inherit"
}) : /*#__PURE__*/_jsx(Calendar, {
  color: "inherit"
});

function defaultGetKeyboardInputSwitchingButtonText(isKeyboardInputOpen, viewType) {
  return isKeyboardInputOpen ? `text input view is open, go to ${viewType} view` : `${viewType} view is open, go to text input view`;
}

export const PickersToolbar = /*#__PURE__*/React.forwardRef(function PickersToolbar(props, ref) {
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
  return /*#__PURE__*/_jsxs(PickersToolbarRoot, {
    ref: ref,
    className: clsx(pickersToolbarClasses.root, className),
    ownerState: ownerState,
    children: [/*#__PURE__*/_jsx(Typography, {
      color: "text.secondary",
      variant: "overline",
      children: toolbarTitle
    }), /*#__PURE__*/_jsxs(PickersToolbarContent, {
      container: true,
      justifyContent: "space-between",
      className: pickersToolbarClasses.content,
      ownerState: ownerState,
      direction: isLandscape ? landscapeDirection : 'row',
      alignItems: isLandscape ? 'flex-start' : 'flex-end',
      children: [children, /*#__PURE__*/_jsx(PickersToolbarPenIconButton, {
        onClick: toggleMobileKeyboardView,
        className: clsx(pickersToolbarClasses.penIconButton, isLandscape && pickersToolbarClasses.penIconButtonLandscape),
        ownerState: ownerState,
        color: "inherit",
        "aria-label": getMobileKeyboardInputViewButtonText(isMobileKeyboardViewOpen, viewType),
        children: isMobileKeyboardViewOpen ? getViewTypeIcon(viewType) : /*#__PURE__*/_jsx(Pen, {
          color: "inherit"
        })
      })]
    })]
  });
});