const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [[N, M], ...map] = fs
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
    let answer = Array.from({ length: N }, () =>
        Array.from({ length: M }, () => -1)
    );

    const BFS = (sy, sx) => {
        const dy = [0, 1, 0, -1];
        const dx = [1, 0, -1, 0];

        const queue = new Queue();
        queue.push([sy, sx]);

        while (!queue.isEmpty()) {
            const [y, x] = queue.shift();

            for (let i = 0; i < 4; i++) {
                const ny = y + dy[i];
                const nx = x + dx[i];

                if (
                    ny < 0 ||
                    ny >= N ||
                    nx < 0 ||
                    nx >= M ||
                    answer[ny][nx] !== -1
                )
                    continue;

                answer[ny][nx] = answer[y][x] + 1;
                queue.push([ny, nx]);
            }
        }
    };

    let sy, sx;

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (map[i][j] === 2) {
                // 목표지점
                [sy, sx] = [i, j];
                answer[i][j] = 0;
            }
            if (map[i][j] === 0) {
                // 갈 수 없는 땅
                answer[i][j] = 0;
            }
        }
    }

    // 목표지점을 시작으로 BFS 탐색 시작
    BFS(sy, sx);

    return answer.map((arr) => arr.join(' ')).join('\n');
};

console.log(solution());
