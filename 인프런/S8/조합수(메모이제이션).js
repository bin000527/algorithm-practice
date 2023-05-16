const solution = (N, R) => {
    let memo = Array.from({ length: N + 1 }, () =>
        Array.from({ length: R + 1 }, () => null)
    );

    const combination = (n, r) => {
        if (r === 0 || n === r) return 1;

        if (!memo[n][r])
            memo[n][r] = combination(n - 1, r - 1) + combination(n - 1, r);

        return memo[n][r];
    };

    return combination(N, R);
};

console.log(solution(5, 3)); // 10
// console.log(solution(33, 19)); // 818809200
