// import { produce } from 'immer';
const { produce } = require('immer');
const fruits = ['오랜지', '사과', '레몬', '바나나'];

const newFruits = produce(fruits, (draft) => {
  draft.splice(1, 2, '딸기');
});

console.log(newFruits);

const baseState = [
  { todo: 'Learn typescript', done: true },
  { todo: 'Try immer', done: true },
  { todo: 'Tweet about it' },
];
