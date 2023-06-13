const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [N, ...input] = fs.readFileSync(filePath).toString().trim().split('\n');

const info = input.map((str) => str.trim().split(' ').map(Number));

const solution = () => {
    let max = Number.MIN_SAFE_INTEGER;

    // startDay: 상담 시작일
    // total: 현재 얻을 수 있는 수익
    const DFS = (startDay, total) => {
        // startDay가 N과 같다면 마무리 일자에 맞춰서 상담이 끝난 것이므로
        // max를 업데이트 한 후 DFS 종료
        if (startDay === +N) {
            max = Math.max(total, max);
            return;
        }

        // startDay가 N보다 크면 마무리 일자에 맞추지 못한 것이므로
        // max를 업데이트하지 않고 DFS 종료
        if (startDay > +N) return;

        // info[startDay][0]이 1이면 상담하는데에 필요한 기간이 1일이므로
        // 상담을 하지않을 이유가 없으므로 DFS(startDay + 1, total)을 실행하지 않음
        if (info[startDay][0] !== 1) DFS(startDay + 1, total); // startDay에 해당하는 상담을 진행하지 않는 경우

        // startDay에 해당하는 상담을 진행하는 경우
        DFS(startDay + info[startDay][0], total + info[startDay][1]);
    };

    // 첫째날의 상담하는데에 걸리는 기간이 1일이라면
    // 상담을 안할 이유가 없으므로 DFS(1, 0)을 실행하지 않는다.
    if (info[0][0] !== 1) DFS(1, 0); // 첫째날 상담X
    DFS(info[0][0], info[0][1]); // 첫째날 상담O

    return max;
};

console.log(solution());
