const solution = (N) => {
    let answer = '';

    const recursion = (num) => {
        if (num === 0) return;
        recursion(num - 1);
        answer += `${num} `;
    };

    recursion(N);

    return answer.trim();
};

console.log(solution(3));
