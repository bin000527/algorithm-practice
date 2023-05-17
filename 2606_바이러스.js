const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [N, M, ...input] = fs.readFileSync(filePath).toString().split('\n');

const solution = () => {
    let answer = 0;

    const graph = Array.from({ length: +N + 1 }, () => []);

    let check = Array.from({ length: +N + 1 }, () => 0);
    check[1] = 1;

    let queue = [1];

    for (let i = 0; i < M; i++) {
        const [a, b] = input[i].trim().split(' ');
        graph[a].push(b);
        graph[b].push(a);
    }

    while (queue.length) {
        const v = queue.shift();
        for (let i = 0; i < graph[v].length; i++) {
            if (!check[graph[v][i]]) {
                answer++;
                check[graph[v][i]] = 1;
                queue.push(graph[v][i]);
            }
        }
    }

    return answer;
};

console.log(solution());
