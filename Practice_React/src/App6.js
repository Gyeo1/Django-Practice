import React, { useState } from 'react';

//아래는 reducer의 사용 예시이다.
const INITIAL_STATE = { name: 'Tom', age: 10 }; //instal_state라는 객체가 있다.
const reducer = (state, action) => {
  //reducer 함수를 생성 state와 action이란 값을 받음
  switch (
    action.type //action의 타입이 setName인지 setAge인지 확인.
  ) {
    case 'setName':
      return { ...state, name: action.name }; //setName이면 기존 객체값은 기대로 가져오고 action.name만 변경
    case 'setAge':
      return { ...state, age: action.age }; //Age면 기존 객체는 가져오고 age만 변경
    default:
      return state; // 기본적으로는 state를 그냥 return 한다.
  }
};
const Person = () => {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE); //reducer와 install_stat를 Reducer로 사용
  //결과적으론 state즉 상태값을 업데이트하는 로직을 따로 분리하는 것이다. APP에서 수행하는게 아니라!
  //dispatch를 사용함으로 action 객체를 받아서 setter 로직을 수행할 수 있다.
  return (
    <div>
      <p>name : {state.name}</p>
      <p>age: {state.age}</p>
      <input
        type="text"
        value={state.name}
        onChange={
          (e) => dispatch({ type: 'setName', name: e.currentTarget.value })
          //dispatch로 setName이라는 타입과 name은 현재 이벤트 값으로 보낸다
        }
      />
      <input
        type="text"
        value={state.age}
        onChange={(e) =>
          dispatch({ type: 'setAge', age: e.currentTarget.value })
        }
      />
    </div>
  );
};
