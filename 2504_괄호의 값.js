const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim();

const solution = () => {
    let br_stack = [];
    let res_stack = [];

    for (let i = 0; i < input.length; i++) {
        if (input[i] === '(' || input[i] === '[') {
            res_stack.push(input[i]);
            br_stack.push(input[i]);
        } else if (input[i] === ')') {
            if (br_stack.length === 0 || br_stack.at(-1) !== '(') return 0;
            br_stack.pop();
            if (res_stack.at(-1) === '(') {
                res_stack.pop();
                res_stack.push(2);
            } else {
                let value = 0;
                while (res_stack.at(-1) !== '(') {
                    value += res_stack.pop();
                }
                res_stack.pop();
                res_stack.push(2 * value);
            }
        } else {
            if (br_stack.length === 0 || br_stack.at(-1) !== '[') return 0;
            br_stack.pop();
            if (res_stack.at(-1) === '[') {
                res_stack.pop();
                res_stack.push(3);
            } else {
                let value = 0;
                while (res_stack.at(-1) !== '[') {
                    value += res_stack.pop();
                }
                res_stack.pop();
                res_stack.push(3 * value);
            }
        }
    }

    let result = res_stack.pop();
    while (res_stack.length !== 0) {
        result += res_stack.pop();
    }

    return typeof result === 'number' ? result : 0;
};

console.log(solution());
