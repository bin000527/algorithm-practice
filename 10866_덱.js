const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [N, ...input] = fs.readFileSync(filePath).toString().split('\n');

const solution = () => {
    let deque = [];
    let answer = [];

    for (let i = 0; i < N; i++) {
        const command = input[i].trim().split(' ')[0];
        const value = input[i].trim().split(' ')[1];

        switch (command) {
            case 'push_front':
                deque.unshift(value);
                break;
            case 'push_back':
                deque.push(value);
                break;
            case 'pop_front':
                answer.push(deque.shift() || -1);
                break;
            case 'pop_back':
                answer.push(deque.pop() || -1);
                break;
            case 'size':
                answer.push(deque.length);
                break;
            case 'empty':
                answer.push(deque.length === 0 ? 1 : 0);
                break;
            case 'front':
                answer.push(deque[0] || -1);
                break;
            case 'back':
                answer.push(deque.at(-1) || -1);
                break;
            default:
                break;
        }
    }

    return answer.join('\n');
};

console.log(solution());
