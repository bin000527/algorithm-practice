const solution = (arr, change) => {
    let answer = Number.MAX_SAFE_INTEGER;

    const DFS = (L, total) => {
        if (total > change || L > answer) return;
        if (total === change) answer = L;
        for (let i = 0; i < arr.length; i++) {
            DFS(L + 1, total + arr[i]);
        }
    };

    DFS(0, 0);
    return answer;
};

console.log(solution([1, 2, 5], 15));
