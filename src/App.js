import React from 'react';
import { Button } from 'antd';
import './App.css';
import PropTypes from 'prop-types';
import ThemedButton from './ThemedButton';
import Counter from './Counter.js';
//import "antd/dist/antd.css" //==>App.css에서 추가안할시 .js에서 이렇게 설정

// //TODO: TODO list 구현
// // function TodoList() {
// //   const title = '...';
// //   const name = '---';
// // }
// class PostDetail extends React.Component {
//   static propTypes = {
//     postId: PropTypes.number.isRequired,
//   };

//   state = {
//     postDetail: null,
//   };

//   componentDidMount() {
//     //처음에 호출
//     const { postId } = this.props;
//     this.requestPost(postId); //requestPost로 postID 넘겨줌
//   }

//   componentDidUpdate(preProps) {
//     //마운트 되고 나서 호출
//     const { postId } = this.props;
//     if (postId !== preProps.postId) {
//       this.requestPost(postId);
//     }
//   }
//   requestPost(postId) {
//     console.log(`request post ${postId}`);
//     this.setState({
//       postDetail: null,
//     });
//     setTimeout(() => {
//       this.setState({
//         postDetail: `로딩된 post #${postId}`,
//       });
//     }, 3000);
//   }

//   render() {
//     const { postId } = this.props;
//     const { postDetail } = this.state;
//     return (
//       <div>
//         <ThemedButton theme="success" label="Say Hello" />
//         포스팅 #{postId}
//         <hr />
//         {!postDetail && '로딩중 ..'}
//         {postDetail}
//       </div>
//     );
//   }
// }

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

class App extends React.Component {
  // static = { myquery: '', language: '' };
  // onChange = (e) => {
  //   const { name, value } = e.target;
  //   this.setState({
  //     [name]: value,
  //   });
  // };
  // render() {
  //   return (
  //     <>
  //       <Counter onClick={() => console.log('clicked')} />
  //       <input name="myquery" onChange={this.onChange} />
  //       <input name="language" onChange={this.onChange} />
  //       <hr />
  //       {JSON.stringify(this.state)}
  //     </>
  //   );
  // }
  render() {
    return (
      <div>
        <Counter />
        <Counter color="green" />
        <Counter color="blue" />
      </div>
    );
  }
}

export default App;
