const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [info, ...input] = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split('\n');

const [N, M] = info.trim().split(' ').map(Number);
const S = input.map((str) => str.trim().split(''));

const solution = () => {
    let answer = [];
    let hd = 0; // HammingDistance 합

    // 0부터 M번째 뉴클레오티드까지 N개의 DNA를 모두 탐색하며 Hamming Distance의 합이 가장 작은 DNA를 구함
    // ex: 0번째 인덱스의 뉴클레오티드를 탐색하는 경우, 주어진 N개의 모든 DNA의 0번째 뉴클레오티드를 탐색하여 가장 많은 수를 가진 뉴클레오티드를 구한다.
    for (let i = 0; i < M; i++) {
        // 뉴클레오티드의 수를 계산할 때 인덱스가 아닌 문자열(뉴클레오티드)을 키로 접근하기 위해 객체 사용
        const count = {
            A: 0,
            C: 0,
            G: 0,
            T: 0,
        };

        // max: 현재까지 가장 많은 수를 가진 뉴클레오티드
        let max = '';

        for (let j = 0; j < N; j++) {
            count[S[j][i]]++;

            if (max === S[j][i]) continue;

            if (
                max === '' || // max가 없거나 ( j가 0이거나 )
                count[max] < count[S[j][i]] || // max의 count가 현재 탐색중인 뉴클레오티드의 count보다 작거나
                (count[max] === count[S[j][i]] && S[j][i] < max) // max의 count와 현재 탐색중인 뉴클레오티드의 count가 같으며, 사전순으로 현재 탐색중인 뉴클레오티드가 더 앞설 때
            ) {
                max = S[j][i];
            }
        }

        answer.push(max);
        hd += N - count[max];
    }

    return answer.join('') + '\n' + hd;
};

console.log(solution());
