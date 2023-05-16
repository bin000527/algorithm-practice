const solution = (N) => {
    const factorial = (num) => {
        if (num === 1) return 1;
        return num * factorial(num - 1);
    };

    return factorial(N);
};

console.log(solution(5));
