const solution = (N, M) => {
    let answer = [];

    let comb = [];

    const combination = (L, startNum) => {
        if (L === M) {
            answer.push([...comb]);
            return;
        }

        for (let i = startNum; i <= N; i++) {
            comb[L] = i;
            combination(L + 1, i + 1);
        }
    };

    combination(0, 1);
    return answer;
};

console.log(solution(4, 2));
