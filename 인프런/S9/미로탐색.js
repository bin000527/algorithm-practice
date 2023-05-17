const solution = (arr) => {
    let answer = 0;

    let check = arr.map((row) => [...row]);
    check[0][0] = 1;

    const DFS = (r, c) => {
        if (r === 6 && c === 6) {
            answer++;
            return;
        }
        // 오른쪽 방향
        if (c !== 6 && !check[r][c + 1]) {
            check[r][c + 1] = 1;
            DFS(r, c + 1);
            check[r][c + 1] = 0;
        }
        // 아래 방향
        if (r !== 6 && !check[r + 1][c]) {
            check[r + 1][c] = 1;
            DFS(r + 1, c);
            check[r + 1][c] = 0;
        }
        // 왼쪽 방향
        if (c !== 0 && !check[r][c - 1]) {
            check[r][c - 1] = 1;
            DFS(r, c - 1);
            check[r][c - 1] = 0;
        }
        // 위쪽 방향
        if (r !== 0 && !check[r - 1][c]) {
            check[r - 1][c] = 1;
            DFS(r - 1, c);
            check[r - 1][c] = 0;
        }
    };

    DFS(0, 0);
    return answer;
};

console.log(
    solution([
        [0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [1, 1, 0, 1, 0, 1, 1],
        [1, 1, 0, 0, 0, 0, 1],
        [1, 1, 0, 1, 1, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
    ])
);
