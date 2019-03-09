// @flow
import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    zIndex: -1,
    // position: 'fixed',
    position: 'absolute',
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // Remove grey highlight
    WebkitTapHighlightColor: 'transparent',
    // Disable scroll capabilities.
    touchAction: 'none'
  },
  /* Styles applied to the root element if `invisible={true}`. */
  invisible: {
    backgroundColor: 'transparent'
  }
};

const Backdrop = React.forwardRef((props, ref) => {
  const {
    classes,
    className,
    invisible,
    open,
    transitionDuration,
    children,
    ...other
  } = props;

  return (
    <Fade in={open} timeout={transitionDuration} {...other}>
      <div
        data-mui-test="Backdrop"
        className={ClassNames(
          classes.root,
          {
            [classes.invisible]: invisible
          },
          className
        )}
        aria-hidden="true"
        ref={ref}
      >
        {children}
      </div>
    </Fade>
  );
});

Backdrop.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   */
  invisible: PropTypes.bool,
  /**
   * If `true`, the backdrop is open.
   */
  open: PropTypes.bool.isRequired,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number })
  ])
};

Backdrop.defaultProps = {
  invisible: false,
  className: ''
};

export default withStyles(styles, { name: 'MuiBackdrop' })(Backdrop);
