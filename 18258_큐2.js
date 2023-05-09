const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let [len, ...input] = fs.readFileSync(filePath).toString().split('\n');

input = input.map((value) => value.trim());

let queue = [];
let front = 0;
let back = -1;
let result = [];

for (let i = 0; i < len; i++) {
    const command = input[i].split(' ')[0];

    switch (command) {
        case 'push':
            const value = input[i].split(' ')[1];
            queue.push(value);
            back++;
            break;
        case 'pop':
            result.push(front <= back ? queue[front++] : -1);
            break;
        case 'size':
            result.push(back - front + 1);
            break;
        case 'empty':
            result.push(back - front < 0 ? 1 : 0);
            break;
        case 'front':
            result.push(front <= back ? queue[front] : -1);
            break;
        case 'back':
            result.push(front <= back ? queue[back] : -1);
            break;
        default:
            break;
    }
}

console.log(result.join('\n'));
