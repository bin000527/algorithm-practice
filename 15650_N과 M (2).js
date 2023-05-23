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
 * 1. 1부터 N까지 자연수 중에서 중복 없이 M개를 고른 수열
 * 2. 고른 수열은 오름차순이어야 한다.
 */
const solution = () => {
    let answer = [];
    let tmp = Array.from({ length: M }, () => 0);

    // 오름차순 => DFS의 인수로 각 인덱스에 탐색을 시작할 숫자를 전달 ( check 배열 필요X )
    // ex: 현재까지 만들어진 수열의 0번째 인덱스에 2가 있다면, 1번째 인덱스는 3부터 탐색 시작
    const DFS = (S, L) => {
        if (L === M) {
            answer.push(tmp.join(' '));
            return;
        }

        for (let i = S; i <= N; i++) {
            tmp[L] = i;
            DFS(i + 1, L + 1);
        }
    };

    DFS(1, 0);

    return answer.join('\n');
};

console.log(solution());
