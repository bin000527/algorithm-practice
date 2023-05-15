const solution = (M, arr) => {
    let answer = 0;
    const DFS = (idx, score, min) => {
        if (min > M) return;
        if (idx === arr.length) {
            if (answer < score) answer = score;
            return;
        }

        DFS(idx + 1, score, min);
        DFS(idx + 1, score + arr[idx][0], min + arr[idx][1]);
    };

    DFS(0, 0, 0);
    return answer;
};

console.log(
    solution(20, [
        [10, 5],
        [25, 12],
        [15, 8],
        [6, 3],
        [7, 4],
    ])
);
