const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [N, ...input] = fs.readFileSync(filePath).toString().trim().split('\n');

let map = input.map((str) => str.trim().split('').map(Number));

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
    let count = 0; // 단지 수
    let answer = []; //각 단지의 집 수

    const dr = [0, 1, 0, -1];
    const dc = [1, 0, -1, 0];

    const BFS = (y, x) => {
        const queue = new Queue();
        queue.push([y, x]);

        while (!queue.isEmpty()) {
            const [r, c] = queue.shift();

            for (let i = 0; i < 4; i++) {
                if (
                    r + dr[i] < 0 ||
                    r + dr[i] >= +N ||
                    c + dc[i] < 0 ||
                    c + dc[i] >= +N
                )
                    continue;

                if (map[r + dr[i]][c + dc[i]]) {
                    answer[count]++;
                    map[r + dr[i]][c + dc[i]] = 0;
                    queue.push([r + dr[i], c + dc[i]]);
                }
            }
        }
    };

    for (let y = 0; y < +N; y++) {
        for (let x = 0; x < +N; x++) {
            if (map[y][x]) {
                answer[count] = 1;
                map[y][x] = 0;
                BFS(y, x);
                count++;
            }
        }
    }

    return [count, ...answer.sort((a, b) => a - b)].join('\n');
};

console.log(solution());
