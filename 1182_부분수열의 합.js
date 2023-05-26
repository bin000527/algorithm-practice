const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [[N, S], input] = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split('\n')
    .map((str) => str.trim().split(' ').map(Number));

const solution = () => {
    let count = 0;

    // N개의 정수 각각에 부분수열에 포함되는 경우와 포함되지 않는 경우에 대해 DFS 탐색
    // index: 주어진 N개의 수 중 현재 탐색 중인 숫자의 인덱스
    // ( index가 N이면 마지막 숫자까지 탐색 완료한 것이므로 return )
    // sum: 현재 까지 부분수열의 합
    // size: 현재 까지 구해진 부분수열의 요소 수
    const DFS = (index, sum, size) => {
        if (index === N) {
            if (sum === S && size !== 0) count++;
            return;
        }

        DFS(index + 1, sum, size);
        DFS(index + 1, sum + input[index], size + 1);
    };

    DFS(0, 0, 0);

    return count;
};

console.log(solution());
