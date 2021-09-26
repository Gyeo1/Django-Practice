import React from 'react';
import PropTypes from 'prop-types';

function ThemedButton({ theme, label, ...restProps }) {
  return (
    <button className={`btn btn-${theme}`} {...restProps}>
      {label}
    </button>
  );
}
//모든 속성에 대해서 테마를 지정 해주기!
ThemedButton.defaultProps = {
  theme: 'default',
};

ThemedButton.propTypes = {
  theme: PropTypes.string,
  label: PropTypes.string.isRequired,
};
export default ThemedButton;
