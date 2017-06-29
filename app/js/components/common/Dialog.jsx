import React from 'react';
import PropTypes from 'prop-types';

const Dialog = (props) => {
  const { opened, title, message } = props;

  return (
    <div className={`dialog-wrapper ${opened ? 'opened' : ''}`}>
      <div className="dialog">
        <div className="header">
          <h2 className="title">{title}</h2>
        </div>
        <div className="content">
          {message}
        </div>
        <div className="footer">
          <a
            className="button cancel"
            onClick={() => props.onCancel()}
          >
            Cancel
          </a>
          <a
            className="button confirm"
            onClick={() => props.onConfirm()}
          >
            Confirm
          </a>
        </div>
      </div>
    </div>
  );
};

Dialog.propTypes = {
  opened: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Dialog;
