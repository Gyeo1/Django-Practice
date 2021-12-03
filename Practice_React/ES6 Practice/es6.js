const base10 = (fn) => (x, y) => fn(x, y) + 10;

const mysum = (x, y) => x + y;

const result = base10(mysum);

console.log(result(1, 2));
