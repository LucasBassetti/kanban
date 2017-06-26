import React from 'react';
import PropTypes from 'prop-types';

const Remove = props => (
  <svg
    height={props.size}
    width={props.size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path id="circ" d="M19 13H5v-2h14v2z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

Remove.propTypes = {
  size: PropTypes.number,
};

Remove.defaultProps = {
  size: 24,
};

export default Remove;
