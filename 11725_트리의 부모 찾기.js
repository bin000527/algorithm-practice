const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [N, ...edges] = fs.readFileSync(filePath).toString().trim().split('\n');

const solution = (N, edges) => {
    // parents: 각 노드의 부모 노드를 저장하는 배열
    let parents = Array.from({ length: N + 1 }, () => 0);

    // graph: 트리의 정보가 담긴 2차원 배열 ( 인접 리스트 )
    let graph = Array.from({ length: N + 1 }, () => []);

    // 주어진 간선 정보를 graph 에 저장
    for (let i = 0; i < edges.length; i++) {
        const [a, b] = edges[i].trim().split(' ');

        graph[+a].push(+b);
        graph[+b].push(+a);
    }

    // 노드 v와 연결된 노드 중 parents에 부모 노드 정보가 없는 노드들의 부모노드는 v가 된다.
    // 자신을 부모노드로 하는 노드에 한해 DFS 탐색 실행 (parents에 다른 부모노드 정보가 있는 노드는 이미 DFS 탐색을 진행하였음을 의미)
    const DFS = (v) => {
        for (let i = 0; i < graph[v].length; i++) {
            if (!parents[graph[v][i]]) {
                parents[graph[v][i]] = v;
                DFS(graph[v][i]);
            }
        }
    };

    parents[1] = -1;
    DFS(1);

    let answer = parents.slice(2);

    return answer.join('\n');
};

console.log(solution(+N, edges));
