const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [info, ...input] = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split('\n');

const [N, M] = info.trim().split(' ').map(Number);

// 중복이 허용되지 않는 Set
const S = new Set(Array.from({ length: N }, (_, i) => input[i].trim()));

const inputStr = Array.from({ length: M }, (_, i) => input[N + i].trim());

const solution = () => {
    let answer = 0;

    for (let i = 0; i < M; i++) {
        // Set에서 제공하는 has함수를 이용하여 문자열이 집합S에 포함되는지 확인
        if (S.has(inputStr[i])) answer++;
    }

    return answer;
};

console.log(solution());
