const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let [len, ...input] = fs.readFileSync(filePath).toString().split('\n');

let stack = [];
let result = [];

for (let i = 0; i < len; i++) {
    const command = input[i].split(' ')[0].trim();

    switch (command) {
        case 'push':
            const value = input[i].split(' ')[1];
            stack.push(value);
            break;
        case 'pop':
            result.push(stack.pop() || -1);
            break;
        case 'size':
            result.push(stack.length);
            break;
        case 'empty':
            result.push(stack.length === 0 ? 1 : 0);
            break;
        case 'top':
            result.push(stack[stack.length - 1] || -1);
            break;
        default:
            break;
    }
}

console.log(result.join('\n'));
