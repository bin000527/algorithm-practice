const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [info, ...input] = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split('\n');

const solution = () => {
    const [N, M] = info
        .trim()
        .split(' ')
        .map((value) => +value);

    let check = input.map((str) =>
        str
            .trim()
            .split('')
            .map((value) => +value)
    );

    let answer = 0;
    const dy = [0, 1, 0, -1];
    const dx = [1, 0, -1, 0];

    // y: y좌표, x: x좌표, l: (y, x)위치에 도달할 수 있는 최소 이동 칸 수
    const BFS = (y, x, l) => {
        let queue = [[y, x, l]];

        while (queue.length) {
            const [y, x, l] = queue.shift();

            // 목표 위치에 도달하면 BFS 탐색 종료
            if (y === N - 1 && x === M - 1) {
                answer = l;
                return;
            }

            for (let i = 0; i < 4; i++) {
                if (
                    y + dy[i] < 0 ||
                    y + dy[i] >= N ||
                    x + dx[i] < 0 ||
                    x + dx[i] >= M
                )
                    continue;

                if (check[y + dy[i]][x + dx[i]]) {
                    check[y + dy[i]][x + dx[i]] = 0;
                    queue.push([y + dy[i], x + dx[i], l + 1]);
                }
            }
        }
    };

    // check[y][x] 가 0 이면 이동할 수 없는 칸이거나 이미 탐색을 끝낸 칸
    // => 더 이상 BFS 탐색을 할 필요가 없는 칸
    check[0][0] = 0;
    BFS(0, 0, 1);

    return answer;
};

console.log(solution());
