const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [N, K] = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split(' ')
    .map(Number);

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
        return this.tail === this.head;
    }
}

const solution = () => {
    let answer;

    const BFS = () => {
        let queue = new Queue();
        queue.push(N);

        // 각 칸마다 수빈이가 도착할 수 있는 최소 시간.
        // N은 순간이동으로 오른쪽으로만 이동할 수 있기 때문에 N이 K보다 큰 경우는 X - 1 씩 왼쪽으로만 이동한다.
        // => N번째(초기 위치)까지 이동 가능(필요한 배열의 길이: N + 1)
        // K가 N보다 클 때에는 K의 2배인 인덱스까지 이동(순간이동) 가능하므로 2 * K
        let visited = Array.from({ length: N > K ? N + 1 : 2 * K }, () => -1);
        visited[N] = 0;

        while (true) {
            const position = queue.shift();
            if (position === K) {
                answer = visited[position];
                break;
            }
            const np = [2 * position, position - 1, position + 1];
            for (let i = 0; i < 3; i++) {
                // 아직 해당 칸에 도착한 적 없는 경우
                if (visited[np[i]] === -1) {
                    if (i === 0) visited[np[i]] = visited[position];
                    else visited[np[i]] = visited[position] + 1;
                    queue.push(np[i]);
                }
            }
        }
    };

    BFS();

    return answer;
};

console.log(solution());
