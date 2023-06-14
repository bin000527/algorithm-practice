const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let [N, ...input] = fs.readFileSync(filePath).toString().trim().split('\n');

N = +N;
input = input.map((str) => str.trim().split(' ').map(Number));

const testCases = Array.from({ length: N }, (_, n) =>
    Array.from({ length: 11 }, (_, i) =>
        Array.from({ length: 11 }, (_, j) => input[i + 11 * n][j])
    )
);

const solution = () => {
    const answer = [];

    // lineup: 최대 능력치의 라인업을 구하는 함수
    const lineup = (t) => {
        let max = 0;

        // 각 포지션에 해당하는 선수 인덱스 배열
        const position = Array.from({ length: 11 }, () => false);

        // L: 선수 인덱스
        // total: 능력치의 합
        const DFS = (L, total) => {
            if (L === 11) {
                max = Math.max(max, total);
                return;
            }

            // i: 각 포지션 인덱스
            for (let i = 0; i < 11; i++) {
                // 능력치가 0이 아니고 현재 i번째 포지션에 선수가 없으면 실행
                if (testCases[t][L][i] !== 0 && position[i] === false) {
                    position[i] = L;
                    DFS(L + 1, total + testCases[t][L][i]);
                    position[i] = false;
                }
            }
        };

        DFS(0, 0);
        answer.push(max);
    };

    for (let i = 0; i < N; i++) {
        lineup(i);
    }

    return answer.join('\n');
};

console.log(solution());
