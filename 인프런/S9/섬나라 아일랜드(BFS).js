const solution = (map) => {
    let answer = 0;

    const N = map.length;

    let queue = [];

    const dr = [0, 1, 1, 1, 0, -1, -1, -1];
    const dc = [1, 1, 0, -1, -1, -1, 0, 1];

    for (let r = 0; r < N; r++) {
        for (let c = 0; c < N; c++) {
            if (map[r][c]) {
                answer++;
                map[r][c] = 0;
                queue.push([r, c]);
                while (queue.length) {
                    const [x, y] = queue.shift();

                    for (let i = 0; i < 8; i++) {
                        if (
                            x + dr[i] >= N ||
                            x + dr[i] < 0 ||
                            y + dc[i] >= N ||
                            y + dc[i] < 0
                        )
                            continue;
                        if (map[x + dr[i]][y + dc[i]]) {
                            map[x + dr[i]][y + dc[i]] = 0;
                            queue.push([x + dr[i], y + dc[i]]);
                        }
                    }
                }
            }
        }
    }

    return answer;
};

console.log(
    solution([
        [1, 1, 0, 0, 0, 1, 0],
        [0, 1, 1, 0, 1, 1, 0],
        [0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 0, 0],
        [1, 0, 0, 0, 1, 0, 0],
        [1, 0, 1, 0, 1, 0, 0],
    ])
);
