import React from 'react';
import { Button } from 'antd';
import './App.css';
//import "antd/dist/antd.css" //==>App.css에서 추가안할시 .js에서 이렇게 설정

//TODO: TODO list 구현
// function TodoList() {
//   const title = '...';
//   const name = '---';
// }

function App() {
  return (
    <div>
      <button>Hello, React!</button>
      <Button type="primary" onClick={() => console.log('clicked!')}>
        Hello, Antd!
      </Button>
    </div>
  );
}

export default App;
