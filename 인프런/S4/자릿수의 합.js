const solution = (input) => {
    let max;
    let answer;

    for (let i = 0; i < input.length; i++) {
        let number = input[i];
        let sum = 0;
        while (number) {
            sum += number % 10;
            number = (number - (number % 10)) / 10;
        }

        if (max < sum || (max === sum && answer < input[i]) || i === 0) {
            max = sum;
            answer = input[i];
        }
    }

    return answer;
};

console.log(solution([128, 260, 603, 40, 521, 137, 123]));
