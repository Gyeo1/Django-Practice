import React, { useEffect, useState } from 'react';

//이번 App에서는 Class형 컴포넌트와 함수형 컴포넌트의 비교를 해본다
//App1은 클래스형으로 만들때 App2는 함수로 만들때다

class App1 extends React.Component {
  state = {
    value1: 0,
    value2: 0,
  };
  onClick = () => {
    this.setState({ value1: 10 });
  };
  render() {
    const { value1 } = this.state;
    return (
      <div>
        Hello APP 1<hr />
        {value1}
        <button onClick={this.onClick}></button>
      </div>
    );
  }
}
function PostDetailComponent({ post }) {
  const { title, content } = post;
  return (
    <div>
      <h1>{title}</h1>
      <h1>{content}</h1>
    </div>
  );
}
function PostDetail({ postId }) {
  const [post, setPost] = useState();
  useEffect(() => {
    setPost({ title: '포스팅 제목', content: `포스팅 내용... #${postId}` });
  }, [postId]);
  return (
    <div>
      <h1>Post #{postId}</h1>
      {!post && '포스팅 로딩중...'}
      {post && <PostDetailComponent post={post} />}
    </div>
  );
}

// function Clock() {
//   const [date, setDate] = useState(new Date());
//   useEffect(() => {
//     const interval = setInterval(() => setImmediate(new Date(), 1000));
//     return () => clearInterval(interval);
//   }, []);
//   return <div>현재 시각은 {date.toISOString().slice(11, 19)} 입니다.</div>;
// }
const Clock = () => {
  const [date, setDate] = React.useState(new Date());
  React.useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  return <div>{date.toISOString().slice(11, 19)}</div>;
};
function App2() {
  //useState란 훅은 상태값을 변경하고 싶을때 사용한다!! ()안에 값넣기.
  const [value1, setvalue] = useState(0);
  const [value2, setvalue1] = useState(0);
  const [value, setValue2] = useState({ value1: 0, value2: 0 });
  const [postId, setPostId] = useState(1);
  //useEffect 훅: 특정 속성값/상태값이 변경되어 수정할 부분이 있는경우
  useEffect(() => {
    console.log('mount시 호출됩니다.');
  }, []); //useEffect 기본형1(함수쓰고 Array)==> mount시에만 호출
  //useEffect(() => {});//기본형2(함수만), ==> render시에 호출 어지간해선 사용 x

  useEffect(() => {
    console.log('Value변경시 호출됩니다.', value);
  }, [value]); //기본형3(속성값, 상태값 쓰기.) ==>value가 변경될 시에만 호출

  const onClick = () => {
    //setValue({ value1: 10 });//이러면 안됨 왜냐면 다른 value의 값만 바뀌기 때문이다. class와 다른점이다.
    setValue2((prevState) => ({ ...prevState, value1: 10 }));
    //위의 방식처럼 해야됨 왜냐면 useState는 매번 전체값을 지정 해 줘야 되기 때문이다.
    //코드의 해석==> setValue2에는 value1,value2가 있다. setValue2를 바꾸기 위해서는 전제 setValue를 불러와라
    //해당 부분이 ...prevState이다. 모든걸 가져오면 value1을 10으로 바꿔준다 끝
  };

  return (
    <div>
      HELLO APP2
      <Clock />
      <hr />
      {value1},{value.value1}클래스처럼 tihs.state안써도 됨
      <button onClick={onClick}>클릭!</button>
      <hr />
      <button onClick={() => setPostId(100)}>100번 글 보기</button>
      <PostDetail postId={postId} />
    </div>
  );
}

export default App2;
