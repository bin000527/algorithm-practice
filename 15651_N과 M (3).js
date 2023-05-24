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
 */
const solution = () => {
    let answer = [];
    let tmp = Array.from({ length: M }, () => 0);

    const DFS = (L) => {
        if (L === M) {
            answer.push(tmp.join(' '));
            return;
        }

        // 중복이 허용되므로 다른 조건 없이 다음 인덱스에 대해 DFS 탐색
        for (let i = 1; i <= N; i++) {
            tmp[L] = i;
            DFS(L + 1);
        }
    };

    DFS(0);
    return answer.join('\n');
};

console.log(solution());
