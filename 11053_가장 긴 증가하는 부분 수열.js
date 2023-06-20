const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let [N, input] = fs.readFileSync(filePath).toString().trim().split('\n');

N = +N;
input = input.trim().split(' ').map(Number);

const solution = () => {
    // len: 각 인덱스의 숫자를 포함하는 부분수열의 최대 길이
    const len = Array.from({ length: N }, () => 0);

    len[0] = 1;

    for (let i = 1; i < N; i++) {
        let max = 0;
        for (let j = i - 1; j >= 0; j--) {
            if (input[j] < input[i]) max = Math.max(len[j], max);
        }
        len[i] = max + 1;
    }

    return Math.max(...len);
};

console.log(solution());
