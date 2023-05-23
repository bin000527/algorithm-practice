const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [[N, M], K] = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split('\n')
    .map((input) =>
        input
            .trim()
            .split(' ')
            .map((value) => +value)
    );

const solution = () => {
    const numLength = String(N).split('').length;

    K.sort((a, b) => b - a);

    let res = Array.from({ length: numLength }, () => 0);
    let flag = 0;
    const DFS = (L) => {
        if (L === numLength) {
            if (Number(res.join('')) <= N) flag = 1;
            return;
        }
        for (let i = 0; i < M; i++) {
            res[L] = K[i];
            DFS(L + 1);
            if (flag) return;
        }
    };

    if (String(N).split('')[0] < K.at(-1)) DFS(1);
    else DFS(0);

    return Number(res.join(''));
};

console.log(solution());
