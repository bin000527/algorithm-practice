const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [A, T, word] = fs.readFileSync(filePath).toString().trim().split('\n');

const solution = () => {
    let total = 0; // 지금까지 '뻔' 혹은 '데기'를 외친 횟수
    let person = 0; // 사람 번호
    let n = 1; // 게임 진행 회차 (n 이 1이면 현재 ‘뻔 – 데기 – 뻔 – 데기 – 뻔 – 뻔 – 데기 – 데기’ 를 외치는 중임)

    while (true) {
        // n 회차 문장에서 '뻔' or '데기'는 n + 3회 외쳐진다.
        // n + 3 + total < T이면 n 회차 문장에서 T번째 단어를 외치는 사람이 나타나지 않는다.
        // n + 3 + total > T 이면 n 회차 문장에서 T번째 단어를 외치는 사람이 나타난다.
        if (n + 3 + total < T) {
            // n 회차에서 외쳐지는 단어는 모두 2 * ( n + 3 )개 이다.
            person = (person + 2 * (n + 3)) % A;
            total += n + 3;
            n++;
        } else {
            let idx = 0;
            while (total !== +T) {
                //단어가 '뻔'일 경우
                if (word === '0') {
                    // n = 1이라고 가정했을 때 ( 1회차 문장 : ‘뻔 – 데기 – 뻔 – 데기 – 뻔 – 뻔 – 데기 – 데기’ )
                    // (idx % 2 === 0 && idx < 4) : 앞의 4번째 단어 까지(‘뻔 – 데기 – 뻔 – 데기’) 중에서 짝수 번째로 외치는 경우
                    // (idx >= 4 && idx < 5 + n) : 4번 이후의 단어(‘뻔 – 뻔 – 데기 – 데기’) 중에서 6번 단어(‘뻔 – 뻔’) 까지 외치는 경우
                    if ((idx % 2 === 0 && idx < 4) || (idx >= 4 && idx < 5 + n))
                        total++;
                }
                // 단어가 '데기'일 경우
                else {
                    // (idx % 2 !== 0 && idx < 4) : 앞의 4번째 단어 까지(‘뻔 – 데기 – 뻔 – 데기’) 중에서 홀수 번째로 외치는 경우
                    // (5 + n <= idx) : 6번 이후의 단어를 외치는 경우 (‘데기 – 데기’)
                    if ((idx % 2 !== 0 && idx < 4) || 5 + n <= idx) total++;
                }
                if (total === +T) break;

                idx++;
                person = (person + 1) % A;
            }
            break;
        }
    }
    return person;
};

console.log(solution());
