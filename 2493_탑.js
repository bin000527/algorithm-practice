const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [N, top] = fs.readFileSync(filePath).toString().split('\n');

const tops = top
    .trim()
    .split(' ')
    .map((h, i) => ({ height: +h, index: i + 1 }));

const result = [0];

const stack = [tops[0]];

let idx = 1;

while (result.length !== +N) {
    if (stack.length === 0) {
        result.push(0);
        stack.push(tops[idx]);
        idx++;
    } else if (stack[stack.length - 1].height >= tops[idx].height) {
        result.push(stack[stack.length - 1].index);
        stack.push(tops[idx]);
        idx++;
    } else {
        stack.pop();
    }
}

console.log(result.join(' '));
