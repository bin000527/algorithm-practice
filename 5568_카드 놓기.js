const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [N, K, ...cards] = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split('\n')
    .map((val) => val.trim());

const solution = () => {
    // 하나의 정수를 만들 수 있는 조합이 여러 개일 수 있기 때문에 중복을 제거하기 위해 집합 사용
    let result = new Set();

    // 각 카드가 선택되었는지를 나타내는 배열 ( 이미 선택되었으면 true )
    let check = Array.from({ length: N }, () => false);

    const DFS = (L, numStr) => {
        if (L === +K) {
            result.add(numStr);
            return;
        }
        for (let i = 0; i < N; i++) {
            if (!check[i]) {
                check[i] = true;
                DFS(L + 1, numStr + cards[i]);
                check[i] = false;
            }
        }
    };

    DFS(0, '');

    return result.size;
};

console.log(solution());
