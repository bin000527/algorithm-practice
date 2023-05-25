const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [N, ...input] = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split('\n')
    .map((str) => str.split(' ').map((val) => +val));

let testcases = [];

for (let i = 0; i < N; i++) {
    const tc = input.slice(3 * i, 3 * (i + 1));
    testcases.push(tc);
}

class Queue {
    constructor() {
        this.data = [];
        this.tail = 0;
        this.head = 0;
    }

    push(value) {
        this.data[this.tail++] = value;
    }

    shift() {
        return this.data[this.head++];
    }

    isEmpty() {
        return this.tail === this.head;
    }
}

const solution = () => {
    let answer = [];

    const dy = [-2, -1, 1, 2, 2, 1, -1, -2];
    const dx = [1, 2, 2, 1, -1, -2, -2, -1];

    let board = [];

    const BFS = (testcase) => {
        const [size, [sy, sx], [ey, ex]] = testcase;
        const queue = new Queue();

        // 시작 지점을 기준으로 BFS 탐색 시작
        queue.push([sy, sx]);

        while (!queue.isEmpty()) {
            const [y, x] = queue.shift();

            if (y === ey && x === ex) {
                answer.push(board[y][x]);
                return;
            }

            for (let i = 0; i < 8; i++) {
                const ny = y + dy[i];
                const nx = x + dx[i];

                if (ny < 0 || ny >= size || nx < 0 || nx >= size) continue;

                // board를 통해 아직 다음 칸[ny, nx]에 나이트가 도착한 적이 없을 때, BFS탐색 계속 진행
                if (!board[ny][nx]) {
                    board[ny][nx] = board[y][x] + 1; // 다음 칸에 도착 가능한 이동 횟수 : 현재까지 이동 횟수 + 1
                    queue.push([ny, nx]);
                }
            }
        }
    };

    for (let i = 0; i < N; i++) {
        // board: 각 칸에 나이트가 도착할 수 있는 이동 횟 수
        board = Array.from({ length: testcases[i][0] }, () =>
            Array.from({ length: testcases[i][0] }, () => 0)
        );
        BFS(testcases[i]);
    }

    return answer.join('\n');
};

console.log(solution());
