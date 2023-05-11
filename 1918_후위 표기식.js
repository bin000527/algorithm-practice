const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim();

const result = [];

const opStack = [];

for (let i = 0; i < input.length; i++) {
    if (input[i] === '(') {
        opStack.push(input[i]);
    } else if (input[i] === ')') {
        while (true) {
            const last = opStack.pop();
            if (last === '(') break;
            result.push(last);
        }
    } else if (input[i] === '*' || input[i] === '/') {
        if (opStack.at(-1) === '*' || opStack.at(-1) === '/') {
            result.push(opStack.pop());
        }
        opStack.push(input[i]);
    } else if (input[i] === '+' || input[i] === '-') {
        while (
            opStack.at(-1) === '*' ||
            opStack.at(-1) === '/' ||
            opStack.at(-1) === '+' ||
            opStack.at(-1) === '-'
        ) {
            result.push(opStack.pop());
        }

        opStack.push(input[i]);
    } else {
        result.push(input[i]);
    }
}

while (opStack.length !== 0) {
    result.push(opStack.pop());
}

console.log(result.join(''));
