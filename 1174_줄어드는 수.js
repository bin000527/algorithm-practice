const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const N = Number(fs.readFileSync(filePath).toString().trim());

const solution = () => {
    let num = []; // 줄어드는 수의 각 자리수에 대한 숫자를 배열에 저장
    let order = 0; // 현재 num에 저장된 숫자가 몇 번째 줄어드는 수인지
    let tail = 0; // 마지막 자리 수 ( 0 ~ 9 => tail: 0 / 10 ~ 98 => tail: 1 / ...)

    // L: 현재 탐색 중인 자리 수
    // highest: 옆 자리의 수
    // 줄어드는 수이므로 왼쪽 자리의 수보다 항상 작아야 한다. 따라서 L의 자리 숫자는 highest 미만의 수여야 한다.
    const DFS = (L, highest = 10) => {
        // 현재 마지막 자리 수를 탐색 중이라면
        if (L === tail) {
            // highest 미만 까지 증가시키며 order를 증가시킴
            for (let i = 0; i < highest; i++) {
                num[tail] = i;
                order++;
                // N번째 줄어드는 수를 찾았다면 break
                if (order === N) break;
            }
            return;
        }

        // 마지막이 아닌 자리 수를 탐색 중이라면
        for (let i = 1; i < highest; i++) {
            // 1 부터 증가시키며 다음 자리 수에 대한 탐색을 이어나간다.
            num[L] = i;
            DFS(L + 1, i);
            if (order === N) break;
        }
    };

    // 아직 N번째 줄어드는 수를 찾지 못했고,
    // 가장 큰 줄어드는 수인 9876543210보다 작은 경우 자리수(tail)를 증가시키며 계속 탐색
    while (order < N && Number(num.join('')) < 9876543210) {
        DFS(0);
        tail++;
    }

    // order가 N보다 작으면 9876543210보다 작은 줄어드는 수 중에 N번째 수가 없음을 의미
    // => -1 반환
    // 그 외의 경우에는 num을 반환
    return order < N ? -1 : num.join('');
};

console.log(solution());
