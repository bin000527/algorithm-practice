const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [N, M] = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split(' ')
    .map((val) => +val);

// 같은 숫자로 구성된 수열이라도 순서가 다르면 다른 수열이다.
// ex ) "1, 2" 와 "2, 1"은 다른 수열
const solution = () => {
    let answer = [];

    // check: 각 인덱스에 해당하는 숫자가 수열에 포함되었는지 확인하는 배열
    let check = Array.from({ length: N + 1 }, () => false);

    // tmp: DFS탐색을 통해 만들어지고 있는 수열
    let tmp = Array.from({ length: M }, () => 0);

    const DFS = (L) => {
        if (L === M) {
            answer.push(tmp.join(' '));
            return;
        }

        for (let i = 1; i <= N; i++) {
            if (!check[i]) {
                check[i] = true;
                tmp[L] = i;
                DFS(L + 1);
                check[i] = false;
            }
        }
    };

    DFS(0);

    return answer.join('\n');
};

console.log(solution());
