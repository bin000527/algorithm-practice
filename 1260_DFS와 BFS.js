const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [info, ...edges] = fs.readFileSync(filePath).toString().split('\n');
const [N, M, V] = info.trim().split(' ');

const solution = () => {
    let answer = '';

    const graph = Array.from({ length: +N + 1 }, () => []);

    for (let i = 0; i < M; i++) {
        const [a, b] = edges[i].trim().split(' ');
        graph[a].push(b);
        graph[b].push(a);
    }

    graph.forEach((arr) => arr.sort((a, b) => a - b));

    let dfs_ch = Array.from({ length: +N + 1 }, () => 0);
    let dfs_res = [];

    const DFS = (v) => {
        for (let i = 0; i < graph[v].length; i++) {
            if (!dfs_ch[graph[v][i]]) {
                dfs_ch[graph[v][i]] = 1;
                answer += ` ${graph[v][i]}`;
                DFS(graph[v][i]);
            }
        }
    };

    dfs_ch[V] = 1;
    answer += V;
    DFS(V);

    let queue = [];
    let bfs_ch = Array.from({ length: +N + 1 }, () => 0);

    queue.push(V);
    bfs_ch[V] = 1;
    answer += `\n${V}`;

    while (queue.length) {
        const v = queue.shift();

        for (let i = 0; i < graph[v].length; i++) {
            if (!bfs_ch[graph[v][i]]) {
                bfs_ch[graph[v][i]] = 1;
                answer += ` ${graph[v][i]}`;
                queue.push(graph[v][i]);
            }
        }
    }

    return answer;
};

console.log(solution());
