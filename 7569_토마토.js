const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [[M, N, H], ...input] = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split('\n')
    .map((str) => str.trim().split(' ').map(Number));

const box = Array.from({ length: H }, (_, h) =>
    Array.from({ length: N }, (_, n) =>
        Array.from({ length: M }, (_, m) => input[N * h + n][m])
    )
);

class Queue {
    constructor() {
        this.data = [];
        this.head = 0;
        this.tail = 0;
    }

    push(value) {
        this.data[this.tail++] = value;
    }

    shift() {
        return this.data[this.head++];
    }

    isEmpty() {
        return this.head === this.tail;
    }
}

const solution = () => {
    const queue = new Queue();

    // 각 토마토가 익을 때까지 걸리는 일 수 (기본 값: -1)
    const days = Array.from({ length: H }, () =>
        Array.from({ length: N }, () => Array.from({ length: M }, () => -1))
    );

    const dh = [0, 0, 0, 0, 1, -1];
    const dr = [0, 1, 0, -1, 0, 0];
    const dc = [1, 0, -1, 0, 0, 0];

    const BFS = () => {
        while (!queue.isEmpty()) {
            const [h, r, c] = queue.shift();

            for (let i = 0; i < 6; i++) {
                const nh = h + dh[i];
                const nr = r + dr[i];
                const nc = c + dc[i];

                if (
                    nh < 0 ||
                    nh >= H ||
                    nr < 0 ||
                    nr >= N ||
                    nc < 0 ||
                    nc >= M ||
                    days[nh][nr][nc] !== -1 || // 이미 익은 토마토이거나
                    box[nh][nr][nc] === -1 // 비어있는 칸일 경우
                )
                    continue;

                days[nh][nr][nc] = days[h][r][c] + 1;
                queue.push([nh, nr, nc]);
            }
        }
    };

    // 처음에 익은 토마토의 경우 queue에 push ( BFS 탐색 ), 익을 때까지 걸리는 일 수는 0
    for (let i = 0; i < H; i++) {
        for (let j = 0; j < N; j++) {
            for (let k = 0; k < M; k++) {
                if (box[i][j][k] === 1) {
                    queue.push([i, j, k]);
                    days[i][j][k] = 0;
                }
            }
        }
    }

    BFS();

    let answer = 0;

    for (let i = 0; i < H; i++) {
        for (let j = 0; j < N; j++) {
            for (let k = 0; k < M; k++) {
                if (days[i][j][k] === -1 && box[i][j][k] !== -1) return -1; // 익을 수 없는 토마토가 존재하는 경우
                answer = Math.max(days[i][j][k], answer);
            }
        }
    }

    return answer;
};

console.log(solution());
