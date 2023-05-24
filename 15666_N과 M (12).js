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

// 15657번 문제와 비슷하지만 아래와 같은 차이점이 있다.

// 주어진 N개의 자연수 중에서 같은 수가 존재하므로 중복된 수열이 존재할 수 있다.
// ex: 3개의 자연 수, 4 4 2가 주어졌을 때 수열 "2 4"가 만들어지는 경우는 2가지([3번, 1번], [3번, 2번]) 이다.

const solution = () => {
    let answer = [];
    let tmp = Array.from({ length: M }, () => 0);

    input.sort((a, b) => a - b);

    const DFS = (S, L) => {
        if (L === M) {
            answer.push(tmp.join(' '));
            return;
        }

        for (let i = S; i < N; i++) {
            tmp[L] = input[i];
            DFS(i, L + 1);
        }
    };

    DFS(0, 0);
    return [...new Set(answer)].join('\n');
};

console.log(solution());
