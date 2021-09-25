import React from 'react';
import { Button } from 'antd';
import './App.css';
//import "antd/dist/antd.css" //==>App.css에서 추가안할시 .js에서 이렇게 설정

//TODO: TODO list 구현
// function TodoList() {
//   const title = '...';
//   const name = '---';
// }
class Counter1 extends React.Component {
  state = {
    value: this.props.initialValue, //props로 부터 오는 첫번째 값을 Value로 저장
  };

  onClick = () => {
    const { value } = this.state; //현재 컴포넌트의 state 값을 value라는 상수로 받아옴
    this.setState({ value: value + 1 }); //onClick 호출시 실행될 함수, value를 1증가시킨다.
  };

  render() {
    const { value } = this.state;
    return (
      <div>
        Counter1: {value}
        <Button onClick={this.onClick}>+1</Button>
      </div>
    ); //jsx 문법이다.
  }
}

class FruitComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>좋아하는 과일</h1>
        <ul>
          {this.props.fruits.map((name, index) => {
            //외부에서 fruits 선언시 pros에서 fruits를 가져온다.
            return <li key={index}>{name}</li>; //map으로 순회, 순회시 key라는 값을 사용해 줘라
          })}
        </ul>
      </div>
    );
  }
}

function App() {
  const fruits = ['바나나', '사과', '딸기'];
  return (
    <div>
      <Counter1 initialValue={10} />
      <FruitComponent fruits={fruits} />
    </div>
  );
}

export default App;
