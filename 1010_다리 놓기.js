const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [T, ...input] = fs.readFileSync(filePath).toString().trim().split('\n');

const testCase = input.map((str) => str.trim().split(' ').map(Number));

const solution = () => {
  let answer = [];
  for (let i = 0; i < T; i++) {
    const [N, M] = testCase[i];

    const dy = Array.from({ length: M + 1 }, (_, n) =>
      Array.from({ length: M + 1 }, (_, r) => (r === 0 || n === r ? 1 : null))
    );

    const combination = (n, r) => {
      if (!dy[n][r])
        dy[n][r] = combination(n - 1, r) + combination(n - 1, r - 1);

      return dy[n][r];
    };

    answer.push(combination(M, N));
  }

  return answer.join('\n');
};

console.log(solution());
