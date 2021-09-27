import React from 'react';
import PropTypes from 'prop-types';

class Counter extends React.Component {
  static defaultProps = {
    //부모로 부터 값이 안넘어 올 경우 기본 색은 red다.
    color: 'red',
  };
  static propTypes = {
    color: PropTypes.string, //props를 받는다면 디폴트 타입을 설정해주는게 좋다.
  };
  state = {
    color: this.props.color, //부모로 부터 색을 받음
    value: 0,
  };

  onClick = () => {
    this.setState(({ value }) => ({ value: value + 1 }));
    //state 값을 바꾸고 싶으면 반드시 setter함수(setState)를 사용해야된다.
  };
  onContextMenu = (e) => {
    e.preventDefault(); //이벤트 객체를 쓰는 이유는 원래 우클릭시 나오는 텍스트 상자를 막기 위해서다.
    this.setState(({ value }) => ({ value: value >= 1 ? value - 1 : 0 })); //3항 연산자로 - 방지
  };
  render() {
    const { color, value } = this.state;
    return (
      <div
        onClick={this.onClick}
        onContextMenu={this.onContextMenu} // 마우스 우클릭시
        style={{ ...style, backgroundColor: color }}
      >
        {value}
      </div> //onClick을 컴포넌트 내부에 만들면 this로 호출 가능
    );
  }
}
const style = {
  width: '100px',
  height: '100px',
  display: 'inline-block',
  //   backgroundColor: 'red',
  borderRadius: '50px',
  textAlign: 'center', //text 보이는 위치
  lineHeight: '100px', // 한 줄의 판정을 나타내는 방법
  fontSize: '3rem',
  userSelect: 'none', // 선택(드래그?) 설정
  margin: '1rem', //간격 설정
};
export default Counter;
