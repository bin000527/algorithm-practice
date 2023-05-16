const solution = (N, total) => {
    let answer;

    let permutation = [];
    let p_check = Array.from({ length: N + 1 }, () => 0);

    let comb_memo = Array.from({ length: N }, () =>
        Array.from({ length: N }, () => 0)
    );

    const combination = (n, r) => {
        if (n === r || r === 0) return 1;
        if (!comb_memo[n][r]) {
            comb_memo[n][r] = combination(n - 1, r - 1) + combination(n - 1, r);
        }
        return comb_memo[n][r];
    };

    const DFS = (L, sum) => {
        if (L === N && sum === total) {
            answer = [...permutation];
            return;
        }
        if (L === N || sum > total || answer) return;
        for (let i = 1; i <= N; i++) {
            if (p_check[i] === 0) {
                p_check[i] = 1;
                permutation[L] = i;
                DFS(L + 1, sum + i * combination(N - 1, L));
                p_check[i] = 0;
            }
        }
    };

    DFS(0, 0);

    return answer;
};

console.log(solution(4, 16));
