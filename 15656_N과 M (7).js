const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [[N, M], input] = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split('\n')
    .map((str) => str.split(' ').map((val) => +val));

/**
 * 조건
 * 1. N개의 자연수 중에서 M개를 고른 수열
 * 2. 같은 수를 여러 번 골라도 된다.
 */
const solution = () => {
    let answer = [];
    let tmp = Array.from({ length: M }, () => 0);

    input.sort((a, b) => a - b);

    // 15651번 문제와 비슷함.
    // 차이점 : 1 ~ N의 자연수가 아니라 N개의 수가 정해져 있다
    // => input의 인덱스로 접근하여 수열을 만든다.
    const DFS = (L) => {
        if (L === M) {
            answer.push(tmp.join(' '));
            return;
        }

        // 중복이 허용되므로 다른 조건 없이 다음 인덱스에 대해 DFS 탐색
        for (let i = 0; i < N; i++) {
            tmp[L] = input[i];
            DFS(L + 1);
        }
    };

    DFS(0);
    return answer.join('\n');
};

console.log(solution());
