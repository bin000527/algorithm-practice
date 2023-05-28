const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [[N, M], ...input] = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split('\n')
    .map((str) => str.split(' ').map((val) => +val));

const solution = () => {
    let answer = 0;

    // graph: 섞어먹으면 안되는 조합 관계를 저장하는 2차원 배열
    let graph = Array.from({ length: N + 1 }, () => []);

    for (let i = 0; i < M; i++) {
        const [a, b] = input[i];

        if (a > b) graph[b].push(a);
        else graph[a].push(b);
    }

    // 작은 번호의 아이스크림부터 탐색하며 섞어먹으면 안되는 조합은 check에 표시하여 DFS 탐색을 하지 않도록 함.
    // check[i]가 0인 아이스크림만 탐색하여 조합을 구함
    const DFS = (S, L, check) => {
        if (L === 3) {
            answer++;
            return;
        }

        // graph를 탐색하며 섞어먹으면 안되는 조합에 해당하는 아이스크림은 check 배열을 1로 설정
        for (let i = 0; i < graph[S].length; i++) {
            check[graph[S][i]] = 1;
        }

        for (let i = S + 1; i <= N; i++) {
            // check[i]가 1이라면 섞어먹으면 안되는 조합이거나 이미 탐색함 => continue
            if (check[i]) continue;
            check[i] = 1;
            DFS(i, L + 1, [...check]);
        }
    };

    for (let i = 1; i <= N - 2; i++) {
        let check = Array.from({ length: N + 1 }, () => 0);
        check[i] = 1;
        DFS(i, 1, check);
    }

    return answer;
};

console.log(solution());
