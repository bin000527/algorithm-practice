const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [N, ...input] = fs.readFileSync(filePath).toString().split('\n');

const stack = [];
const result = [];

const solution = () => {
    let pushNum = 0;
    for (let i = 0; i < N; i++) {
        while (input[i] > pushNum) {
            stack.push(++pushNum);
            result.push('+');
        }
        if (stack.at(-1) === +input[i]) {
            stack.pop();
            result.push('-');
        } else return 'NO';
    }
    if (stack.length === 0) return result.join('\n');
    return 'NO';
};

console.log(solution());
