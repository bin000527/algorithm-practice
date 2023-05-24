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
 */

// 15654번 문제와 비슷하지만 아래와 같은 차이점이 있다.

// 주어진 N개의 자연수 중에서 같은 수가 존재하므로 중복된 수열이 존재할 수 있다.
// ex: 3개의 자연 수, 4 4 2가 주어졌을 때 수열 "2 4"가 만들어지는 경우는 2가지([3번, 1번], [3번, 2번]) 이다.
// 따라서 Set을 이용하여 중복된 값을 제거한다.
const solution = () => {
    let answer = [];
    let tmp = Array.from({ length: M }, () => 0);
    let check = Array.from({ length: N }, () => false);

    input.sort((a, b) => a - b);

    const DFS = (L) => {
        if (L === M) {
            answer.push(tmp.join(' '));
            return;
        }

        for (let i = 0; i < N; i++) {
            if (!check[i]) {
                check[i] = true;
                tmp[L] = input[i];
                DFS(L + 1);
                check[i] = false;
            }
        }
    };

    DFS(0);

    return [...new Set(answer)].join('\n');
};

console.log(solution());
