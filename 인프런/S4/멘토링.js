const solution = (N, arr) => {
    let answer = 0;
    let res = Array.from({ length: N + 1 }, () =>
        Array.from({ length: N + 1 }, () => 0)
    );

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < N; j++) {
            for (let k = j + 1; k < N; k++) {
                if (i === 0) {
                    answer++;
                    res[arr[i][j]][arr[i][k]] = 1;
                } else if (res[arr[i][k]][arr[i][j]] === 1) {
                    answer--;
                    res[arr[i][k]][arr[i][j]] = 0;
                }
            }
        }
    }

    return answer;
};

console.log(
    solution(4, [
        [3, 4, 1, 2],
        [4, 3, 2, 1],
        [3, 1, 4, 2],
    ])
);
