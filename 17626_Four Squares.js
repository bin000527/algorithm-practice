const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const N = Number(fs.readFileSync(filePath).toString().trim());

const solution = () => {
    let answer = Number.MAX_SAFE_INTEGER;

    // n: 제곱 수의 합으로 표현해야 하는 정수
    // count: 현재 제곱 수의 수
    const DFS = (n, count) => {
        // 제곱 수의 수는 4이하여야 하므로 count >= 4이면 return
        if (count >= 4) return;

        // n이 어떤 정수의 제곱이라면,
        if (Number.isInteger(Math.sqrt(n))) {
            //n을 1개의 정수의 제곱으로 나타낼 수 있으므로 count를 1증가시킨다.
            answer = Math.min(count + 1, answer);
            // 이 경우 이미 n을 나타낼 수 있는 제곱 수의 최소 개수를 구했으므로,
            // true를 반환하여 더 이상 n에 대하여 DFS 탐색을 하지 않도록 함.
            return true;
        }

        // n의 제곱 근 중 가장 큰 정수부터 시작하여 DFS 탐색
        let i = Math.floor(Math.sqrt(n));

        // 4개 이하의 제곱수의 합이므로 ( n / 4 )의 제곱근 이상의 수에 대해서 DFS 탐색
        // n을 이루는 하나의 제곱 수가 Math.floor(Math.sqrt(n / 4)) 보다 작을 경우, n을 이루기 위해서 4개 보다 더 많은 수의 제곱 수가 필요함
        while (i > Math.floor(Math.sqrt(n / 4))) {
            if (DFS(n - i ** 2, count + 1)) break;
            i--;
        }
    };

    DFS(N, 0);

    return answer;
};

console.log(solution());
