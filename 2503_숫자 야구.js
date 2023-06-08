const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [N, ...input] = fs.readFileSync(filePath).toString().trim().split('\n');

const result = input.map((str) => str.trim().split(' ').map(Number));

/**
 * 가능한 모든 세 자리 수를 만들면서 입력 값과 확인해
 * 정답이 될 수 있는 경우 answer을 1 증가시킨다.
 */
const solution = () => {
    let answer = 0;

    // check: 각 숫자가 세 자리수에 포함되었는지 확인
    const check = Array.from({ length: 10 }, () => false);
    let num = [0, 0, 0]; // num: 만들어진 세 자리 수

    // 민혁이가 질문한 세 자리 수(Q)와 만들어진 세 자리 수(num)를 비교하여
    // N개의 질문에 대해서 모두 영수의 대답과 일치하는 결과가 나오면
    // num은 영수가 생각하고 있을 가능성이 있는 수 ( => true를 반환하여 DFS함수에서 answer을 1 증가시킨다. )
    const isCorrected = (numArr) => {
        let isCorrected = true;
        for (let i = 0; i < N; i++) {
            const [Q, S, B] = result[i];

            const question = String(Q).split('').map(Number);
            let strike = 0;
            let ball = 0;
            for (let i = 0; i < 3; i++) {
                if (question[i] === numArr[i]) strike++;
                else if (numArr.includes(question[i])) ball++;
            }

            if (S !== strike || B !== ball) {
                isCorrected = false;
                break;
            }
        }

        return isCorrected;
    };

    // 모든 세 자리 수를 만들어보며 isCorrected 함수를 이용해 입력 값과 비교하며 확인
    const DFS = (L) => {
        if (L === 3) {
            if (isCorrected(num)) answer++;
            return;
        }
        for (let i = 1; i <= 9; i++) {
            if (!check[i]) {
                check[i] = true;
                num[L] = i;
                DFS(L + 1);
                check[i] = false;
            }
        }
    };

    DFS(0);
    return answer;
};

console.log(solution());
