const solution = (N, arr) => {
    let answer = [];

    let graph = Array.from({ length: N + 1 }, () =>
        Array.from({ length: N + 1 }, () => 0)
    );

    let check = Array.from({ length: N + 1 }, () => 0);
    check[1] = 1;
    let path = [1];

    arr.forEach((edge) => {
        graph[edge[0]][edge[1]] = 1;
    });

    const DFS = (V) => {
        if (V === 5) {
            answer.push([...path]);
            return;
        }

        for (let i = 1; i < graph[V].length; i++) {
            if (graph[V][i] && !check[i]) {
                check[i] = 1;
                path.push(i);
                DFS(i);
                check[i] = 0;
                path.pop();
            }
        }
    };

    DFS(1);
    return answer;
};

console.log(
    solution(5, [
        [1, 2],
        [1, 3],
        [1, 4],
        [2, 1],
        [2, 3],
        [2, 5],
        [3, 4],
        [4, 2],
        [4, 5],
    ])
);
