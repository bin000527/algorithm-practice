const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [[N, L, R], ...input] = fs
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
    const dr = [0, 1, 0, -1];
    const dc = [1, 0, -1, 0];

    const BFS = (position) => {
        const queue = new Queue();
        queue.push(position);

        // count: 하나의 연합에 속하는 나라 수
        let count = 1;
        // total: 하나의 연합에 속하는 인구 수
        let total = input[position[0]][position[1]];

        while (!queue.isEmpty()) {
            const [r, c] = queue.shift();

            for (let i = 0; i < 4; i++) {
                const nr = r + dr[i];
                const nc = c + dc[i];

                if (nr < 0 || nr >= N || nc < 0 || nc >= N || map[nr][nc] !== 0)
                    continue;

                const gap = Math.abs(input[r][c] - input[nr][nc]);

                // 국가간 인구 수 차이가 L이상 R이하이면 연합 국가 수(count)와 연합 총 인구 수(total) 증가 후 BFS 탐색
                if (gap >= L && gap <= R) {
                    map[nr][nc] = map[r][c];
                    count++;
                    total += input[nr][nc];
                    queue.push([nr, nc]);
                }
            }
        }

        // 해당 연합의 평균 인구 수 반환
        return Math.floor(total / count);
    };

    let map = [];
    let answer = 0;
    while (true) {
        let unit = 0; // 연합 수
        let unitPopulation = []; // 각 인덱스에 해당하는 연합의 평균 인구 수 ( 연합 국가의 총 인구수  / 연합 국가 수 )
        // map: 각 나라가 몇 번째 연합(unit)에 속하는지 정수로 표현
        map = Array.from({ length: N }, () =>
            Array.from({ length: N }, () => 0)
        );

        // map이 0이면 ( 아직 어느 연합에 속하지 않은 국가이면 ) unit 1 증가, BFS 탐색
        // BFS의 반환 값: 해당 연합의 평균 인구 수
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                if (map[i][j] === 0) {
                    map[i][j] = ++unit;
                    unitPopulation[unit] = BFS([i, j]);
                }
            }
        }
        // unit이 N*N이면 (어떤 연합도 존재하지 않고 모든 국경선이 닫혀 있음) 더 이상 인구이동 X
        if (unit === N * N) break;

        // 인구 수 조정
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                input[i][j] = unitPopulation[map[i][j]];
            }
        }
        answer++;
    }

    return answer;
};

console.log(solution());
