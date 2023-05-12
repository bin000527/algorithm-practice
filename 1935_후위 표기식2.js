const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [N, input, ...values] = fs.readFileSync(filePath).toString().split('\n');

const solution = () => {
    let stack = [];
    for (let i = 0; i < input.trim().length; i++) {
        const charCode = input.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            stack.push(+values[charCode - 65]);
        } else {
            const op = input[i];
            const b = stack.pop();
            const a = stack.pop();

            if (op === '+') stack.push(a + b);
            else if (op === '-') stack.push(a - b);
            else if (op === '*') stack.push(a * b);
            else stack.push(a / b);
        }
    }

    return stack[0].toFixed(2);
};

console.log(solution());
