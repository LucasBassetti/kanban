import React from 'react';
import PropTypes from 'prop-types';

const ArrowLeft = props => (
  <svg
    height={props.size}
    width={props.size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
    <path d="M0-.5h24v24H0z" fill="none" />
  </svg>
);

ArrowLeft.propTypes = {
  size: PropTypes.number,
};

ArrowLeft.defaultProps = {
  size: 24,
};

export default ArrowLeft;
