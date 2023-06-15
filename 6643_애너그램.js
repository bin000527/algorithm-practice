const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let [N, ...input] = fs.readFileSync(filePath).toString().trim().split('\n');

N = +N;

const solution = () => {
    let answer = '';

    const anagram = (idx) => {
        // inputStr: inputString을 배열로 만든 후 정렬
        const inputStr = input[idx].trim().split('').sort();
        const strLength = inputStr.length;

        // words: inputString으로 만들 수 있는 애너그램 단어들을 저장하는 배열
        const words = [];
        const check = Array.from({ length: strLength }, () => false);

        const DFS = (L, str) => {
            // 단어가 완성되면 words에 추가
            if (L === strLength) {
                words.push(str);
                return;
            }

            for (let i = 0; i < strLength; i++) {
                // words에 저장된 마지막 단어의 L번째까지의 단어와 현재 만들어진 단어가 같으면 continue
                // => L번째 단어에 대해서 이미 같은 알파벳으로 DFS 탐색을 했다는 의미이기 때문
                if (
                    words.length !== 0 &&
                    words.at(-1).slice(0, L + 1) === str + inputStr[i]
                )
                    continue;

                // 아직 i번재 인덱스의 알파벳이 애너그램 단어에 포함되지 않았을 경우 DFS 탐색 진행
                if (!check[i]) {
                    check[i] = true;
                    DFS(L + 1, str + inputStr[i]);
                    check[i] = false;
                }
            }
        };

        DFS(0, '');

        return words;
    };

    for (let i = 0; i < N; i++) {
        if (i !== 0) answer += '\n';
        answer += anagram(i).join('\n');
    }

    return answer;
};

console.log(solution());
