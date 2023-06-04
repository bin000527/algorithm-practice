const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [[N, M], ...input] = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split('\n')
    .map((str) => str.trim().split(' ').map(Number));

const solution = () => {
    let max = Number.MIN_SAFE_INTEGER;

    // 치킨을 3종류 뽑는 것이므로 3중 for문을 실행한다
    for (let i = 0; i < M - 2; i++) {
        for (let j = i + 1; j < M - 1; j++) {
            for (let k = j + 1; k < M; k++) {
                // 각 회원에 대한 만족도(선택된 치킨 중 가장 높은 선호도)를 구하고, N명의 만족도를 더한다.
                let sum = 0;
                for (let p = 0; p < N; p++) {
                    sum += Math.max(input[p][i], input[p][j], input[p][k]);
                }

                // 만족도의 합 중 가장 큰 값을 구한다.
                max = Math.max(sum, max);
            }
        }
    }

    return max;
};

console.log(solution());
