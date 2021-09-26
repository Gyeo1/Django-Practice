import React from 'react';
import { Button } from 'antd';
import './App.css';
//import "antd/dist/antd.css" //==>App.css에서 추가안할시 .js에서 이렇게 설정

//TODO: TODO list 구현
// function TodoList() {
//   const title = '...';
//   const name = '---';
// }
const actions = {
  init(initialValue) {
    return { value: initialValue };
  },
  increment(prevState) {
    return { value: prevState.value + 1 };
  },
  decrement(prevState) {
    return { value: prevState.value - 1 };
  },
};
class Counter1 extends React.Component {
  state = actions.init(this.props.initialValue); //외부에서 준 initialValue 값을 action.init에 보냄

  render() {
    const { value } = this.state;
    return (
      <div>
        Counter1: {value}
        <Button onClick={() => this.setState(actions.increment)}>+1</Button>
        <Button onClick={() => this.setState(actions.decrement)}>-1</Button>
      </div>
    ); //jsx 문법이다.
  }
}
// class Counter1 extends React.Component {
//   state = {
//     value: this.props.initialValue, //props로 부터 오는 첫번째 값을 Value로 저장
//   };

//   onClick = () => {
//     // const { value } = this.state; //현재 컴포넌트의 state 값을 value라는 상수로 받아옴
//     // //onClick 호출시 실행될 함수, value를 1증가시킨다. setState로 상태값에 대한 변경이 가능!
//     // this.setState({ value: value + 1 });
//     //아니면 아래처럼 선언 가능
//     // const value=this.state.value +1;
//     // this.setState({value}); // value:value랑 같은데 생략 가능
//     this.setState((preState) => {
//       const { value } = preState;
//       return { value: value + 1 };
//     });
//     this.setState((preState) => {
//       const { value } = preState;
//       return { value: value + 1 };
//     });
//     this.setState((preState) => {
//       const { value } = preState;
//       return { value: value + 1 };
//     });
//   };

//   render() {
//     const { value } = this.state;
//     return (
//       <div>
//         Counter1: {value}
//         <Button onClick={this.onClick}>+1</Button>
//       </div>
//     ); //jsx 문법이다.
//   }
// }

function App() {
  return (
    <div>
      <Counter1 initialValue={10} />
    </div>
  );
}

export default App;
