const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [input1, input2, input3] = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split('\n');

const N = Number(input1.trim());
const nums = input2.trim().split(' ').map(Number);
const operators = input3.trim().split(' ').map(Number);

const solution = () => {
    let max = Number.MIN_SAFE_INTEGER;
    let min = Number.MAX_SAFE_INTEGER;

    const DFS = (L, value) => {
        if (L === N) {
            max = Math.max(max, value);
            min = Math.min(min, value);
        }

        // operators: 각 연산자의 수가 저장된 배열
        for (let i = 0; i < 4; i++) {
            // operators 배열에 아직 연산자의 수가 남아있으면 진행
            if (operators[i]) {
                operators[i]--;

                let newValue = value;
                if (i === 0) newValue += nums[L];
                else if (i === 1) newValue -= nums[L];
                else if (i === 2) newValue *= nums[L];
                else {
                    if (newValue < 0)
                        newValue = -Math.floor(Math.abs(newValue) / nums[L]);
                    else newValue = Math.floor(newValue / nums[L]);
                }

                DFS(L + 1, newValue);
                operators[i]++;
            }
        }
    };

    DFS(1, nums[0]);

    return `${max}\n${min}`;
};

console.log(solution());
