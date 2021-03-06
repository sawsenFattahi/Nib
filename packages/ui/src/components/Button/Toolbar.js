import PropTypes from "prop-types";
import React from "react";
import styled from "@emotion/styled";

const ToolbarButton = ({ forwardRef, ...rest }) => {
  return <StyledButton type="button" ref={forwardRef} {...rest} />;
};

export default ToolbarButton;

ToolbarButton.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  forwardRef: PropTypes.object
};

ToolbarButton.defaultProps = {
  forwardRef: undefined
};

const StyledButton = styled.button(
  {
    alignItems: "center",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",

    border: "none",
    height: 28,
    width: 28,
    margin: "0 2px",
    transition: "all 0.2s ease",

    ":focus": {
      outline: "none",
      transform: "scale(1.15)"
    },
    ":hover": {
      transform: "scale(1.15)"
    },
    ":active": {
      transform: "scale(0.95)"
    },
    ":disabled": {
      opacity: "0.5"
    }
  },
  ({ theme: { constants, button } }) => ({
    backgroundColor: constants.color.background.primary,
    color: constants.color.text.primary,
    borderRadius: constants.borderRadius.small,
    fontSize: constants.fontSize.medium,

    ...button.toolbar({ theme: constants })
  })
);
