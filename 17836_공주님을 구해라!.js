const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [[N, M, T], ...input] = fs
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
    let answer;

    /**
     * visited: 용사가 각 칸마다 도달하는 시간
     * N*M*2인 3차원 배열이며, 그람을 획득한 여부에 따라 도달 시간을 다르게 저장한다.
     * 그람을 구한 후 왔던 길을 다시 돌아가야 하는 경우도 있기 때문에,
     * 그람을 획득한 후에는 그람을 획득하기 전에 지나간 경로를 무시하고 다시 최소 경로를 찾는다.
     * visited[n][m][0]: 획득하기 전 / visited[n][m][1]: 획득한 후
     */
    let visited = Array.from({ length: N }, () =>
        Array.from({ length: M }, () => Array.from({ length: 2 }, () => false))
    );

    const dr = [0, 1, 0, -1];
    const dc = [1, 0, -1, 0];

    const BFS = () => {
        const queue = new Queue();
        queue.push([0, 0, 0]);

        while (!queue.isEmpty()) {
            const [r, c, hasGramr] = queue.shift();

            for (let i = 0; i < 4; i++) {
                const nr = r + dr[i];
                const nc = c + dc[i];

                if (
                    nr < 0 ||
                    nr >= N ||
                    nc < 0 ||
                    nc >= M ||
                    (!hasGramr && input[nr][nc] === 1) || // 그람이 없는 상태에서 벽을 만난 경우
                    visited[nr][nc][hasGramr] !== false // 그람 획득 여부가 동일한 상태일 때 이미 지나간 경로인 경우
                )
                    continue;

                visited[nr][nc][hasGramr] = visited[r][c][hasGramr] + 1;

                if (input[nr][nc] === 2) {
                    // 그람을 획득했을 경우, visited[n][m][1]에 대해서도 BFS 탐색 진행
                    // 그람을 획득했더라도 획득하지 않고도 더 빠른 시간 내에 공주님에 도달할 수 있으므로
                    // 그람을 획득한 경우와 획득하지 못한 경우 모두 BFS 탐색을 진행한다.
                    visited[nr][nc][1] = visited[nr][nc][0];
                    queue.push([nr, nc, 1]);
                }

                // 공주님에 도달했을 경우, T이내에 도달하면 해당 시간을, T시간보다 초과했으면 Fail을 반환
                if (nr === N - 1 && nc === M - 1) {
                    if (visited[nr][nc][hasGramr] <= T) {
                        answer = visited[nr][nc][hasGramr];
                    } else {
                        answer = 'Fail';
                    }
                    return answer;
                }

                queue.push([nr, nc, hasGramr]);
            }
        }
        // 공주님에게 도달하지 못했을 경우 Fail 반환
        answer = 'Fail';
    };

    visited[0][0][0] = 0;
    BFS();

    return answer;
};

console.log(solution());
