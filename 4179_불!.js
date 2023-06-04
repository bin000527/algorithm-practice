const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [info, ...input] = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split('\n');

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

const [R, C] = info.trim().split(' ').map(Number);
const board = input.map((str) => str.split(''));

const solution = () => {
    let answer = 0;

    const dr = [0, 1, 0, -1];
    const dc = [1, 0, -1, 0];

    const queue = new Queue();

    const BFS = () => {
        while (!queue.isEmpty()) {
            const [r, c] = queue.shift();

            for (let i = 0; i < 4; i++) {
                const nr = r + dr[i];
                const nc = c + dc[i];

                // queue에서 shift한 요소의 위치가 number이면 ( 'F'가 아니고, 지훈이가 탈출하고 있는 경과시간이므로 ) 지훈이의 위치이다.
                if (typeof board[r][c] === 'number') {
                    // 가장자리에 접한 부분이므로 탈출
                    if (nr < 0 || nr >= R || nc < 0 || nc >= C) {
                        answer = board[r][c] + 1;
                        return;
                    }

                    if (
                        board[nr][nc] === 'F' ||
                        board[nr][nc] === '#' ||
                        typeof board[nr][nc] === 'number'
                    )
                        continue;
                    else {
                        board[nr][nc] = board[r][c] + 1; // 칸 이동하며 탈출 시간 1 증가
                        queue.push([nr, nc]);
                    }

                    // queue에서 shift한 요소의 위치가 'F'이면 불
                } else if (board[r][c] === 'F') {
                    if (
                        nr < 0 ||
                        nr >= R ||
                        nc < 0 ||
                        nc >= C ||
                        board[nr][nc] === 'F' ||
                        board[nr][nc] === '#'
                    )
                        continue;

                    board[nr][nc] = 'F';
                    queue.push([nr, nc]);
                }
            }
        }

        answer = 'IMPOSSIBLE';
    };

    // 1. 지훈이의 초기 위치를 먼저 찾고 queue에 추가한다.
    for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
            if (board[i][j] === 'J') {
                board[i][j] = 0; // 현재 경과 시간을 board에 기록한다.
                queue.push([i, j]);
                break;
            }
        }
        if (!queue.isEmpty()) break;
    }

    // 2. 불의 위치를 queue에 추가한다.
    for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
            if (board[i][j] === 'F') queue.push([i, j]);
        }
    }

    // 3. BFS 탐색
    BFS();
    return answer;
};

console.log(solution());
