const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim();

const solution = () => {
    let answer = 0;
    let stack = [];

    for (let i = 0; i < input.length; i++) {
        if (input[i] === '(') {
            stack.push('(');
            answer++;
        } else {
            stack.pop();
            if (input[i - 1] === '(') {
                answer--;
                answer += stack.length;
            }
        }
    }

    return answer;
};

console.log(solution());
