const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [N, ...input] = fs.readFileSync(filePath).toString().trim().split('\n');

const W = input.map((str) => str.trim().split(' ').map(Number));
const solution = () => {
    let answer = Number.MAX_SAFE_INTEGER;

    // 외판원의 도시 방문 여부
    let check = [];

    // startNum: 최초 방문 도시
    // n: 현재 방문 중인 도시
    // count: 방문 도시 수
    // cost: 현재까지의 방문 비용
    const DFS = (startNum, n, count, cost) => {
        if (count === +N) {
            // 마지막으로 첫 도시로 돌아오는 비용 계산
            if (W[n][startNum] !== 0)
                answer = Math.min(cost + W[n][startNum], answer);
            return;
        }

        for (let i = 0; i < N; i++) {
            if (check[i] || W[n][i] === 0) continue;

            check[i] = true;
            DFS(startNum, i, count + 1, cost + W[n][i]);
            check[i] = false;
        }
    };

    for (let i = 0; i < N; i++) {
        check = Array.from({ length: N }, () => false);
        check[i] = true;
        DFS(i, i, 1, 0);
    }

    return answer;
};

console.log(solution());
