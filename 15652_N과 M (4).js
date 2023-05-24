const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [N, M] = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split(' ')
    .map((val) => +val);

/**
 * 조건
 * 1. 1부터 N까지 자연수 중에서 M개를 고른 수열
 * 2. 같은 수를 여러 번 골라도 된다.
 * 3. 고른 수열은 비내림차순이어야 한다.
 *  길이가 K인 수열 A가 A1 ≤ A2 ≤ ... ≤ AK-1 ≤ AK를 만족하면, 비내림차순이라고 한다.
 */
const solution = () => {
    let answer = [];
    let tmp = Array.from({ length: M }, () => 0);

    const DFS = (S, L) => {
        if (L === M) {
            answer.push(tmp.join(' '));
            return;
        }

        // 15650번 문제와 비슷하지만 중복을 허용한다는 차이점이 있다.
        // 따라서 현재 숫자부터 다시 탐색할 수 있도록 DFS의 첫 번째 인수로 i + 1이 아닌 i를 전달한다.
        for (let i = S; i <= N; i++) {
            tmp[L] = i;
            DFS(i, L + 1);
        }
    };

    DFS(1, 0);
    return answer.join('\n');
};

console.log(solution());
