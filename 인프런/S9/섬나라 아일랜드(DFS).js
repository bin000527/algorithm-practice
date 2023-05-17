// const solution = (map) => {
//     let answer = 0;
//     const N = map.length;
//     let check = Array.from({ length: map.length }, () =>
//         Array.from({ length: map.length }, () => 0)
//     );

//     const DFS = (r, c) => {
//         const dr = [0, 1, 1, 1, 0, -1, -1, -1];
//         const dc = [1, 1, 0, -1, -1, -1, 0, 1];

//         for (let i = 0; i < 8; i++) {
//             if (
//                 r + dr[i] >= N ||
//                 r + dr[i] < 0 ||
//                 c + dc[i] >= N ||
//                 c + dc[i] < 0
//             )
//                 continue;
//             if (map[r + dr[i]][c + dc[i]] && !check[r + dr[i]][c + dc[i]]) {
//                 check[r + dr[i]][c + dc[i]] = 1;
//                 DFS(r + dr[i], c + dc[i]);
//             }
//         }
//     };

//     for (let r = 0; r < N; r++) {
//         for (let c = 0; c < N; c++) {
//             if (!check[r][c] && map[r][c]) {
//                 answer++;
//                 check[r][c] = 1;
//                 DFS(r, c);
//             }
//         }
//     }

//     return answer;
// };

const solution = (map) => {
    let answer = 0;

    const N = map.length;

    const dr = [0, 1, 1, 1, 0, -1, -1, -1];
    const dc = [1, 1, 0, -1, -1, -1, 0, 1];

    const DFS = (r, c) => {
        for (let i = 0; i < 8; i++) {
            if (
                r + dr[i] >= N ||
                r + dr[i] < 0 ||
                c + dc[i] >= N ||
                c + dc[i] < 0
            )
                continue;
            if (map[r + dr[i]][c + dc[i]]) {
                map[r + dr[i]][c + dc[i]] = 0;
                DFS(r + dr[i], c + dc[i]);
            }
        }
    };

    for (let r = 0; r < N; r++) {
        for (let c = 0; c < N; c++) {
            if (map[r][c]) {
                answer++;
                map[r][c] = 0;
                DFS(r, c);
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
