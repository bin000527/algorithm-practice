const solution = (N) => {
    let answer = [];

    const DFS = (num, set = []) => {
        if (num === N + 1) {
            if (set.length !== 0) answer.push([...set]);
            return;
        }
        DFS(num + 1, [...set, num]);
        DFS(num + 1, [...set]);
    };
    DFS(1);
    return answer;
};

console.log(solution(3));
