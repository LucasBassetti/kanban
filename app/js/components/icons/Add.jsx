import React from 'react';
import PropTypes from 'prop-types';

const Add = props => (
  <svg
    height={props.size}
    width={props.size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

Add.propTypes = {
  size: PropTypes.number,
};

Add.defaultProps = {
  size: 24,
};

export default Add;
