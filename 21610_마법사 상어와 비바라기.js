const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [[N, M], ...input] = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split('\n')
    .map((str) => str.trim().split(' ').map(Number));

const solution = () => {
    let answer = 0;

    const water = input.slice(0, N);
    const isCloud = Array.from({ length: N }, (_) =>
        Array.from({ length: N }, (_) => false)
    );

    const direction = Array.from({ length: M }, (_, i) => input[N + i][0]);
    const distance = Array.from({ length: M }, (_, i) => input[N + i][1]);

    const dy = [null, 0, -1, -1, -1, 0, 1, 1, 1];
    const dx = [null, -1, -1, 0, 1, 1, 1, 0, -1];

    let cloud = [
        [N - 1, 0],
        [N - 1, 1],
        [N - 2, 0],
        [N - 2, 1],
    ];

    const move = (idx) => {
        cloud = cloud.map(([y, x]) => {
            const ny = (y + dy[direction[idx]] * distance[idx]) % N;
            const nx = (x + dx[direction[idx]] * distance[idx]) % N;

            return [ny >= 0 ? ny : ny + N, nx >= 0 ? nx : nx + N];
        });

        for (let i = 0; i < cloud.length; i++) {
            isCloud[cloud[i][0]][cloud[i][1]] = true;
        }
    };

    const rain = () => {
        for (let i = 0; i < cloud.length; i++) {
            const y = cloud[i][0];
            const x = cloud[i][1];

            water[y][x]++;
        }
    };

    const copyWater = () => {
        const dy = [-1, -1, 1, 1];
        const dx = [-1, 1, 1, -1];
        for (let i = 0; i < cloud.length; i++) {
            const y = cloud[i][0];
            const x = cloud[i][1];

            let count = 0;
            for (let j = 0; j < 4; j++) {
                const ny = y + dy[j];
                const nx = x + dx[j];

                if (ny < 0 || ny >= N || nx < 0 || nx >= N) continue;
                if (water[ny][nx]) count++;
            }

            water[y][x] += count;
        }

        cloud = [];
    };

    const createCloud = () => {
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                if (isCloud[i][j]) isCloud[i][j] = false;
                else if (water[i][j] >= 2) {
                    cloud.push([i, j]);
                    water[i][j] -= 2;
                }
            }
        }
    };

    for (let i = 0; i < M; i++) {
        move(i);
        rain();
        copyWater();
        createCloud();
    }

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            answer += water[i][j];
        }
    }

    return answer;
};

console.log(solution());
