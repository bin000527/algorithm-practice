const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [[W, H], ...input] = fs
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
    let asnwer = 0;

    let check = Array.from({ length: H }, () =>
        Array.from({ length: W }, () => false)
    );

    const map = Array.from({ length: H }, () =>
        Array.from({ length: W }, () => 1)
    );

    // 건물 벽들 내부에 있는 빈 공간을 1로 채우기 위한 초기 작업
    const initialize_BFS = () => {
        const queue = new Queue();

        for (let i = 0; i < H; i++) {
            for (let j = 0; j < W; j++) {
                if (i !== 0 && j !== 0 && i !== H - 1 && j !== W - 1) continue;

                if (input[i][j] === 0 && !check[i][j]) {
                    map[i][j] = 0;
                    check[i][j] = true;
                    queue.push([i, j]);
                }
            }
        }

        while (!queue.isEmpty()) {
            const [y, x] = queue.shift();

            const dy = [1, 1, 0, -1, -1, 0];
            const dx =
                y % 2 === 0 ? [0, 1, 1, 1, 0, -1] : [-1, 0, 1, 0, -1, -1];

            for (let i = 0; i < 6; i++) {
                const ny = y + dy[i];
                const nx = x + dx[i];

                if (ny < 0 || ny >= H || nx < 0 || nx >= W || check[ny][nx])
                    continue;

                if (input[ny][nx] === 0) {
                    map[ny][nx] = 0;
                    check[ny][nx] = true;
                    queue.push([ny, nx]);
                }
            }
        }
    };

    initialize_BFS();

    // 외부와 맞닿아 있는 부분이 있으면 answer++
    const BFS = (r, c) => {
        const queue = new Queue();

        check[r][c] = true;
        queue.push([r, c]);

        while (!queue.isEmpty()) {
            const [y, x] = queue.shift();

            const dy = [1, 1, 0, -1, -1, 0];
            const dx =
                y % 2 === 0 ? [0, 1, 1, 1, 0, -1] : [-1, 0, 1, 0, -1, -1];

            for (let i = 0; i < 6; i++) {
                const ny = y + dy[i];
                const nx = x + dx[i];

                if (ny < 0 || ny >= H || nx < 0 || nx >= W || map[ny][nx] === 0)
                    asnwer++;
                else if (!check[ny][nx]) {
                    check[ny][nx] = true;
                    queue.push([ny, nx]);
                }
            }
        }
    };

    check = Array.from({ length: H }, () =>
        Array.from({ length: W }, () => false)
    );

    for (let i = 0; i < H; i++) {
        for (let j = 0; j < W; j++) {
            if (map[i][j] === 1 && !check[i][j]) {
                BFS(i, j);
            }
        }
    }

    return asnwer;
};

console.log(solution());
