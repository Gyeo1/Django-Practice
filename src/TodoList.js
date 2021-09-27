import React from 'react';
import { Input, List } from 'antd';

class TodoList extends React.Component {
  state = {
    todoList: ['파이썬 익히기', '장고 익히기'],
    current: '',
  };

  onChange = (e) => {
    //input 내용이 바뀔때 마다 호출되는 함수다.
    const { value } = e.target;
    this.setState({
      current: value,
    });
    console.log(value); //현재 value 값을 출력
  };

  onKeyDown = (e) => {
    //키가 눌렸을때 발생되는 함수
    if (e.keyCode === 13) {
      //13이 enter 키이다.
      const { todoList, current } = this.state;
      if (current.length > 0) {
        this.setState({
          current: '',
          todoList: [...todoList, current], //이렇게 하는 이유 ==>state 값을 push 같은걸로 함부로 건들면 안됨
        });
      }
    }
  };
  render() {
    return (
      <div style={{ width: '300px', margin: '10px auto' }}>
        <List
          header={'TodoList'}
          dataSource={this.state.todoList}
          bordered={true}
          renderItem={(todo) => <List.Item>{todo}</List.Item>}
          style={{ marginBottom: '5px' }}
        />
        <Input
          type="text"
          value={this.state.current}
          placeholder="할일을 입력해 주세요"
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
        {/* <ul>
          {this.state.todoList.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))}
         
        </ul>
        <input
          value={this.state.current}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          placeholder="할 일을 입력해 주세요"
        />
        <hr />
        {JSON.stringify(this.state)} */}
      </div>
    );
  }
}
//JSON.stringify는 JSON에서 지원해주는 문자 변환 함수이다.
//여기서는 todo list의 내용 2개가 나오고 input에 값을 넣으면 반영되는 current도 즉각적으로 나온다.

export default TodoList;
