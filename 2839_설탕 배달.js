const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const N = Number(fs.readFileSync(filePath).toString().trim());

const solution = () => {
  const dy = Array.from({ length: N + 1 }, () => -1);

  const weight = [3, 5];

  for (let i = 0; i < weight.length; i++) {
    for (let j = weight[i]; j <= N; j++) {
      if (j === weight[i]) dy[j] = 1;
      else if (dy[j - weight[i]] === -1) continue;
      else dy[j] = dy[j - weight[i]] + 1;
    }
  }

  return dy[N];
};

console.log(solution());
