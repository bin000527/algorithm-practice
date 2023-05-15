const solution = (N, M) => {
    let answer = [];
    const DFS = (res) => {
        if (res.length === M) {
            answer.push(res);
            return;
        }
        for (let i = 1; i <= N; i++) {
            DFS([...res, i]);
        }
    };

    DFS([]);
    return answer;
};

console.log(solution(3, 2));
