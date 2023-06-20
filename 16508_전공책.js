const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let [T, N, ...input] = fs.readFileSync(filePath).toString().trim().split('\n');

T = T.trim().split('');
N = +N;

// 전공책의 가격은 Number형으로 바꾸며, 가격 오름차순으로 배열 정렬
const booksInfo = input
    .map((str) =>
        str
            .trim()
            .split(' ')
            .map((val, i) => (i === 0 ? Number(val) : val))
    )
    .sort((a, b) => a[0] - b[0]);

const solution = () => {
    let min = Number.MAX_SAFE_INTEGER;
    let canComplete = false; // 전공책으로 단어 T를 완성할 수 있는지

    /**
     *
     * @param {number} L: 현재 탐색 중인 전공책 인덱스
     * @param {number} total: 선택된 전공책의 누적 가격
     * @param {array} checked: 단어 T의 각 알파벳을 구했는지에 대한 여부
     */
    const DFS = (L, total, checked) => {
        if (L === N) {
            // 마지막 전공 책까지 탐색을 완료하였더라도 알파벳을 모두 찾은 경우에만 min, canComplete 업데이트
            if (checked.every((val) => val === true)) {
                min = Math.min(total, min);
                canComplete = true;
            }

            return;
        }

        // L번째 인덱스 전공책을 포함하지 않는 경우에 대한 DFS 탐색
        DFS(L + 1, total, [...checked]);

        // 아래 코드는 L번째 인덱스 전공책을 포함할 수 있는지 확인하기 위함

        // titleAlphabet: 해당 전공책 제목의 알파벳 개수정보를 담은 객체
        // ex: 'NETWORK' => {N: 1, E: 1, T: 1, W: 1, O: 1, R: 1, K: 1}
        const titleAlphabet = booksInfo[L][1]
            .split('')
            .reduce(
                (acc, str) => ({ ...acc, [str]: acc[str] ? acc[str] + 1 : 1 }),
                {}
            );

        let hasAlphabet = false; // 단어 T를 완성하기 위한 알파벳을 포함하고 있는지
        let isDone = true; // T에 대한 모든 알파벳이 찾아졌는지

        for (let i = 0; i < T.length; i++) {
            if (checked[i]) continue;
            isDone = false; // checked 배열 확인 후 아직 찾아야할 단어가 남았으면 isDone => false

            if (!titleAlphabet[T[i]]) continue; // 현재 전공책에 알파벳이 없으면 continue
            hasAlphabet = true;
            checked[i] = true;
            titleAlphabet[T[i]]--;
        }

        if (isDone) {
            min = Math.min(total, min);
            canComplete = true;
            return;
        }

        // 현재 전공책에 알파벳이 있는 경우에만 해당 전공책을 포함하고 DFS 계속 탐색
        if (hasAlphabet) DFS(L + 1, total + booksInfo[L][0], [...checked]);
    };

    DFS(
        0,
        0,
        Array.from({ length: T.length }, () => false)
    );

    return canComplete ? min : -1;
};

console.log(solution());
