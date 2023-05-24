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
 * 3. 고른 수열은 비내림차순이어야 한다.
 *  길이가 K인 수열 A가 A1 ≤ A2 ≤ ... ≤ AK-1 ≤ AK를 만족하면, 비내림차순이라고 한다.
 */
const solution = () => {
    let answer = [];
    let tmp = Array.from({ length: M }, () => 0);

    input.sort((a, b) => a - b);

    // 15652번 문제와 비슷함.
    // 차이점 : 1 ~ N의 자연수가 아니라 N개의 수가 정해져 있다
    // => input의 인덱스로 접근하여 수열을 만든다.
    const DFS = (S, L) => {
        if (L === M) {
            answer.push(tmp.join(' '));
            return;
        }

        // 현재 숫자부터 다시 탐색할 수 있도록 DFS의 첫 번째 인수로 i + 1이 아닌 i를 전달한다.
        for (let i = S; i < N; i++) {
            tmp[L] = input[i];
            DFS(i, L + 1);
        }
    };

    DFS(0, 0);
    return answer.join('\n');
};

console.log(solution());
