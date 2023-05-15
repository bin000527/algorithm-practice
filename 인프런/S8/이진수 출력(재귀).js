const solution = (N) => {
    let answer = '';

    const recursion = (num) => {
        if (num === 0) return;
        recursion(Math.floor(num / 2));
        answer += num % 2;
    };

    recursion(N);

    return answer;
};

console.log(solution(11));
