const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let [[N, M], ...input] = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split('\n')
    .map((str) => str.trim().split(' ').map(Number));

const solution = () => {
    let max = 0;

    const check = Array.from({ length: N }, () =>
        Array.from({ length: M }, () => false)
    );

    const dy = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];
    const dx = [
        [1, 0],
        [0, -1],
        [-1, 0],
        [0, 1],
    ];

    const DFS = (n, m, total) => {
        for (let i = 0; i < 4; i++) {
            const leftY = n + dy[i][0];
            const leftX = m + dx[i][0];

            const rightY = n + dy[i][1];
            const rightX = m + dx[i][1];

            if (
                leftY < 0 ||
                rightY < 0 ||
                leftY >= N ||
                rightY >= N ||
                leftX < 0 ||
                rightX < 0 ||
                leftX >= M ||
                rightX >= M ||
                check[leftY][leftX] ||
                check[rightY][rightX]
            )
                continue;

            check[leftY][leftX] = true;
            check[rightY][rightX] = true;

            const strength =
                2 * input[n][m] + input[leftY][leftX] + input[rightY][rightX];

            max = Math.max(total + strength, max);

            for (let j = n; j < N; j++) {
                for (let k = 0; k < M; k++) {
                    if (j === n && k <= m) continue;

                    if (!check[j][k]) {
                        check[j][k] = true;
                        DFS(j, k, total + strength);
                        check[j][k] = false;
                    }
                }
            }

            check[leftY][leftX] = false;
            check[rightY][rightX] = false;
        }
    };

    for (let r = 0; r < N; r++) {
        for (let c = 0; c < M; c++) {
            check[r][c] = true;
            DFS(r, c, 0);
            check[r][c] = false;
        }
    }

    return max;
};

console.log(solution());
