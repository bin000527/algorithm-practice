const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [[M, N], ...input] = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split('\n')
    .map((str) => str.trim().split(' ').map(Number));

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
    const days = Array.from({ length: N }, () =>
        Array.from({ length: M }, () => -1)
    );

    const dr = [0, 1, 0, -1];
    const dc = [1, 0, -1, 0];

    const BFS = () => {
        while (!queue.isEmpty()) {
            const [r, c] = queue.shift();

            for (let i = 0; i < 4; i++) {
                const nr = r + dr[i];
                const nc = c + dc[i];

                if (
                    nr < 0 ||
                    nr >= N ||
                    nc < 0 ||
                    nc >= M ||
                    days[nr][nc] !== -1 || // 이미 익은 토마토이거나
                    input[nr][nc] === -1 // 비어있는 칸일 경우
                )
                    continue;

                days[nr][nc] = days[r][c] + 1;
                queue.push([nr, nc]);
            }
        }
    };

    // 처음에 익은 토마토의 경우 queue에 push ( BFS 탐색 ), 익을 때까지 걸리는 일 수는 0
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (input[i][j] === 1) {
                queue.push([i, j]);
                days[i][j] = 0;
            }
        }
    }

    BFS();

    let answer = 0;

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (days[i][j] === -1 && input[i][j] !== -1) return -1; // 익을 수 없는 토마토가 존재하는 경우
            answer = Math.max(days[i][j], answer);
        }
    }

    return answer;
};

console.log(solution());
