const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [N, ...input] = fs.readFileSync(filePath).toString().trim().split('\n');

const weight = [];
const durability = [];
input.forEach((str) => {
    const [d, w] = str.trim().split(' ');
    durability.push(+d);
    weight.push(+w);
});

const solution = () => {
    let max = 0;

    // L: 현재 손에 들고 있는 계란 인덱스
    // broken: 깨진 계란 수
    const DFS = (L, broken) => {
        // 손에 들어야 하는 계란이 깨진 경우 ( 내구성이 0 이하인 경우 )
        if (durability[L] <= 0) {
            DFS(L + 1, broken); // 다음 계란으로 순서를 넘긴다.
            return;
        }
        // 마지막 계란까지 과정을 마쳤거나, 모든 계란이 깨진 경우
        if (L === +N || broken === +N) {
            max = Math.max(broken, max);
            return;
        }

        // 모든 계란의 내구성을 확인하며 DFS 탐색
        for (let i = 0; i < N; i++) {
            if (L === i) continue; // 깨려는 계란이 손에 쥐고 있는 계란과 인덱스가 같으면 안되므로 continue
            if (durability[i] > 0) {
                durability[i] -= weight[L];
                durability[L] -= weight[i];
                let newBroken = broken;
                if (durability[i] <= 0) newBroken++;
                if (durability[L] <= 0) newBroken++;
                DFS(L + 1, newBroken);
                durability[i] += weight[L];
                durability[L] += weight[i];
            } else {
                DFS(L + 1, broken);
            }
        }
    };

    DFS(0, 0);
    return max;
};

console.log(solution());
