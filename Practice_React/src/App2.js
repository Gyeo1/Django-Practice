import { throwStatement } from '@babel/types';
import React from 'react';

class Wrapper extends React.Component {
  render() {
    return (
      <section style={{ padding: '4em', background: 'papayawhip' }}>
        {this.props.children}
      </section>
    );
  }
}

// const Wrapper = (props) => {
//   //함수형은 props를 인자로 받는다.
//   return (
//     <section style={{ padding: '4em', background: 'papayawhip' }}>
//       {props.children}
//     </section>
//   );
// };

class Title extends React.Component {
  render() {
    const fontSize = this.props.isBig ? '3em' : '1.5em';
    return (
      <h1 style={{ fontSize, textAlign: 'center', color: 'palevioletred' }}>
        {this.props.children}
      </h1>
    );
  } //this.props.childer을 적용해야 내용을 보여 준다!
}

// const Title = (props) => {
//   //함수형은 props를 인자로 받는다.
//   //   const fontSize = props.isBig ? '3em' : '1.5em';
//   const style = {
//     fontSize: props.isBig ? '3em' : '1.5em',
//     textAlign: 'center',
//     color: 'palevioletred',
//   };
//   return <h1 style={{ style }}>{props.children}</h1>;
// };

function App2() {
  const component = <Title>Hello World!</Title>;
  return (
    //
    <Wrapper children={component} />
  );
}

export default App2;
