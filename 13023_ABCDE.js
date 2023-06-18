const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let [[N, M], ...input] = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split('\n')
    .map((str) => str.trim().split(' ').map(Number));

const solution = () => {
    // 친구 관계를 나타내는 인접리스트
    const list = Array.from({ length: N }, () => []);

    for (let i = 0; i < M; i++) {
        const [a, b] = input[i];

        list[a].push(b);
        list[b].push(a);
    }

    const check = Array.from({ length: N }, () => false);

    // A -> B -> C -> D -> E 관계가 존재하는지 확인
    // 서로 다른 친구 관계가 4번 존재하면 되기 때문에 L === 4이면 조건에 맞는 관계 존재 -> return true
    const DFS = (L, i) => {
        if (L === 4) return true;

        for (let j = 0; j < list[i].length; j++) {
            if (check[list[i][j]]) continue;
            check[list[i][j]] = true;
            if (DFS(L + 1, list[i][j])) return true;
            check[list[i][j]] = false;
        }
    };

    for (let i = 0; i < N; i++) {
        check[i] = true;
        if (DFS(0, i)) return 1;
        check[i] = false;
    }

    return 0;
};

console.log(solution());
