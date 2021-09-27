import React from 'react';
import PropTypes from 'prop-types';

class Counter extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
  };

  state = {};

  render() {
    return <div onClick={this.props.onClick}>Counter</div>; //DOM 요소에 이벤트 설정하기.
  }
}

export default Counter;
