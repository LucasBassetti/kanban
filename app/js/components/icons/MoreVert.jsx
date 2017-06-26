import React from 'react';
import PropTypes from 'prop-types';

const MoreVert = props => (
  <svg
    height={props.size}
    width={props.size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

MoreVert.propTypes = {
  size: PropTypes.number,
};

MoreVert.defaultProps = {
  size: 24,
};

export default MoreVert;
