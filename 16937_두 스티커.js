const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let [paper, N, ...input] = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split('\n');

const [H, W] = paper.trim().split(' ').map(Number);
N = +N;
const stickers = Array.from({ length: N }, (_, i) =>
    input[i].trim().split(' ').map(Number)
);

const solution = () => {
    let max = 0;

    // stick: 첫 번째 스티커의 인덱스와 크기를 받았을 때, 두 번째 스티커들을 탐색하며 최대 넓이를 구하는 함수
    const stick = (i, ri, ci) => {
        const nh = H - ri; // 첫 번째 스티커를 붙였을 때, 남는 부분의 높이
        const nw = W - ci; // 첫 번째 스티커를 붙였을 때, 남는 부분의 가로 넓이

        // 두 번째 스티커 탐색
        for (let j = i + 1; j < N; j++) {
            const [rj, cj] = stickers[j];

            // 남는 부분에 두 번째 스티커를 붙일 수 있는지 확인하고, 조건을 만족하면 max 업데이트
            if (
                (nh >= rj && W >= cj) ||
                (H >= rj && nw >= cj) ||
                (nh >= cj && W >= rj) ||
                (H >= cj && nw >= rj)
            ) {
                max = Math.max(max, ri * ci + rj * cj);
            }
        }
    };

    for (let i = 0; i < N - 1; i++) {
        const [r, c] = stickers[i];

        if (H >= r && W >= c) stick(i, r, c);
        if (r === c) continue;
        // 스티커의 가로와 세로 길이가 다르면 가로 세로 회전시켜서 한 번 더 탐색한다.
        if (H >= c && W >= r) stick(i, c, r);
    }

    return max;
};

console.log(solution());
