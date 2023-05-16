const solution = (K, M, arr) => {
    let answer = 0;

    const combination = (L, startIdx, sum) => {
        if (K === L) {
            if (sum % M === 0) answer++;
            return;
        }
        for (let i = startIdx; i < arr.length; i++) {
            combination(L + 1, i + 1, sum + arr[i]);
        }
    };

    combination(0, 0, 0);
    return answer;
};

console.log(solution(3, 6, [2, 4, 5, 8, 12]));
