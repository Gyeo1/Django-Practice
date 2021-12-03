//Context API 사용하기
import React, { createContext, useContext } from 'react';
import Counter from './Counter';
//createContext로 context생성하기,
const MessageContext = React.createContext('default message');

const App7 = () => {
  //context를 제공하는 Provider를 생성하고 Level1 하위 컴포넌트로 전달
  <MessageContext.Provider value="Hello Context API">
    {/* <Level2 /> */}
    <Level2Wrapper />
  </MessageContext.Provider>;
};
//
// const Level1 = () => {
//   <div>
//     Level1
//     <Level2 />
//   </div>;
// };
// const Level2 = () => (
//   <div>
//     Level2
//     <Level3 />
//   </div>
// );
// //Level3까지 내려왔을때 consumer가 나옴 Consumer가 발동되면 Provider가 있는 곳 까지 올라간다.
// const Level3 = () => (
//   <div>
//     <MessageContext.Consumer>
//       {(message) => <>Level:{message}</>}
//     </MessageContext.Consumer>
//   </div>
// );
const Level2Wrapper = () => (
  // 여기서 const message=useContext(MessageContext)를 사용하면 Consummer사용x
  <div>
    <MessageContext.Consumer>
      {(message) => <Level2 message={message} />}
    </MessageContext.Consumer>
  </div>
);
const Level2 = ({ message }) => <div>Level2:{message}</div>;

// 하위 컴포넌트에서 Context 데이터 수정 하는 코드
const CounterContext = createContext();
const App = () => {
  const [value, setValue] = React.useState(0); //useState를 활용해 state값 생성
  const onIncrement = () => {
    setValue((prevValue) => prevValue + 1); //이전값에 +1을 해주는 함수 생성
  };
  return (
    <div>
      App:{value}
      <button onClick={onIncrement}>+1 </button>
      <CounterContext.Provider value={{ value, onIncrement }}>
        <LevleN />
      </CounterContext.Provider>
    </div>
  ); //클릭시 값이 +1 된다.
};
const LevleN = () => {
  const { value, onIncrement } = useContext(CounterContext);
  //이렇게 참조하면 이 함수 모든 구역에서 CounterContext사용 가능
  return (
    <div>
      Level3: {value}
      <button onClick={onIncrement}>+1</button>
    </div>
  );
};

export default App;
