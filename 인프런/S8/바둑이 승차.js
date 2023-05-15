const solution = (C, w_arr) => {
    let answer = 0;

    const DFS = (idx, weight) => {
        if (weight > C) return;
        if (idx === w_arr.length) {
            if (answer < weight) answer = weight;
            return;
        }

        DFS(idx + 1, weight);
        DFS(idx + 1, weight + w_arr[idx]);
    };

    DFS(0, 0);

    return answer;
};

console.log(solution(259, [81, 58, 42, 33, 61]));
