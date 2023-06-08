const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [N, M] = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split(' ')
    .map(Number);

const solution = () => {
    let answer = 0;

    // 넴모가 격자판에 채워져있는지 확인
    const check = Array.from({ length: N }, () =>
        Array.from({ length: M }, () => false)
    );

    const DFS = (L) => {
        // 마지막칸 까지 DFS 탐색을 마쳤을 때
        if (L === N * M) {
            let isFinished = true;
            // 이중 for문으로 격자판을 탐색하며 넴모가 올라간 칸 네 개가 2*2 사각형을 이루는 부분이 없으면 answer + 1
            for (let i = 0; i < N - 1; i++) {
                for (let j = 0; j < M - 1; j++) {
                    if (
                        check[i][j] &&
                        check[i + 1][j] &&
                        check[i][j + 1] &&
                        check[i + 1][j + 1]
                    ) {
                        isFinished = false;
                        break;
                    }
                }
                if (!isFinished) break;
            }
            if (isFinished) answer++;
            return;
        }

        const y = Math.floor(L / M);
        const x = L % M;

        check[y][x] = true;
        DFS(L + 1);
        check[y][x] = false;
        DFS(L + 1);
    };

    DFS(0);

    return answer;
};

console.log(solution());
