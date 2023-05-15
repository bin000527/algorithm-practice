const solution = (arr, M) => {
    let answer = [];

    let check = Array.from({ length: arr.length }, () => 0);

    const DFS = (L, res) => {
        if (L === M) {
            answer.push(res);
            return;
        }

        for (let i = 0; i < arr.length; i++) {
            if (!check[i]) {
                check[i] = 1;
                DFS(L + 1, [...res, arr[i]]);
                check[i] = 0;
            }
        }
    };

    DFS(0, []);
    return answer;
};

console.log(solution([3, 6, 9], 2));
