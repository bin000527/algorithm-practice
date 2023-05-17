const solution = (N) => {
    let answer = [];

    let queue = [1];

    while (queue.length) {
        const value = queue.shift();
        answer.push(value);

        if (2 * value > N) continue;
        queue.push(2 * value);

        if (2 * value + 1 > N) continue;
        queue.push(2 * value + 1);
    }

    return answer;
};

console.log(solution(7));
