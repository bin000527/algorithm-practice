const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [N, K] = fs.readFileSync(filePath).toString().split(' ');

let queue = [];
let result = [];
let idx = 1;

for (let i = 0; i < N; i++) {
    queue.push(i + 1);
}

while (queue.length > 0) {
    if (idx % K === 0) result.push(queue.shift());
    else queue.push(queue.shift());

    idx++;
}

console.log(`<${result.join(', ')}>`);
