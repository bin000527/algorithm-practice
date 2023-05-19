const solution = (budget, arr) => {
    arr.sort((a, b) => a[0] + a[1] - b[0] - b[1]);

    let answer = 0;

    for (let i = 0; i < arr.length; i++) {
        let sum = 0.5 * arr[i][0] + arr[i][1];
        let count = 1;

        for (let j = 0; j < arr.length; j++) {
            if (i !== j) {
                sum += arr[j][0] + arr[j][1];
                count++;
            }

            if (sum > budget) {
                answer = Math.max(answer, --count);
                break;
            }
        }
    }

    return answer;
};

console.log(
    solution(28, [
        [6, 6],
        [2, 2],
        [4, 3],
        [4, 5],
        [10, 3],
    ])
);
