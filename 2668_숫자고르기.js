const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let [N, ...input] = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split('\n')
    .map(Number);

/**
 * 입력에 대한 인접리스트를 이용하여 DFS 탐색을 하였다.
 * 1 | 3
 * 2 | 1
 * 3 | 1
 * 4 | 5
 * 5 | 5
 * 6 | 4
 * 7 | 6
 *
 * 위와 같은 인접리스트를 예로 들었을 때,
 * '1 -> 3', '3 -> 1' 와 같이 시작 정수 ( 1 )로 DFS 탐색을 하여 다시 시작 정수 ( 1 )로 돌아온다면,
 * 이는 뽑힌 정수와 그에 해당하는 둘째 줄에 대한 정수들이 이루는 집합이 일치한다.
 *
 * 이와 같은 원리를 이용하여 DFS 탐색으로 문제를 해결하였다.
 */
const solution = () => {
    let set = new Set();

    // 정수들의 표에 대한 인접 리스트
    // (인덱스를 1부터 N까지 사용하기 위해 새로운 배열을 생성함)
    const table = Array.from({ length: N + 1 }, (_, i) =>
        i === 0 ? false : input[i - 1]
    );

    // 해당 정수가 뽑혔는지에 대한 체크 배열
    const check = Array.from({ length: N + 1 }, () => false);

    // startN: DFS 탐색 시작 정수
    // n: 현재 선택된(탐색 중인) 정수
    const DFS = (n, startN) => {
        // n의 인접 정수와 탐색 시작 정수가 같다면, 집합에 n 추가
        // true를 리턴하여 시작 정수와 일치했음을 알림.
        if (table[n] === startN) {
            set.add(n);
            return true;
        }

        // check배열 확인을 통해 이미 집합에 포함된 정수인지 확인
        if (!check[table[n]]) {
            check[table[n]] = true;
            // DFS가 true를 반환했다면 n을 집합에 추가하고 마찬가지로 true를 리턴함.
            if (DFS(table[n], startN)) {
                set.add(n);
                return true;
            } else check[table[n]] = false; // true를 반환하지 못했다면 올바른 집합을 이루지 못하므로 check배열을 false로 변경
        }
    };

    // for문으로 N개의 정수를 돌면서, 아직 집합에 추가되지 못한(check배열이 false인) 경우에만 DFS 탐색 진행
    for (let i = 1; i <= N; i++) {
        if (!check[i]) {
            check[i] = true;
            if (!DFS(i, i)) check[i] = false;
        }
    }

    const answer = Array.from(set).sort((a, b) => a - b);
    return `${answer.length}\n${answer.join('\n')}`;
};

console.log(solution());
