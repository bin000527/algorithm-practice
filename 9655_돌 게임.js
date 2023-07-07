const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const N = Number(fs.readFileSync(filePath).toString().trim());

const solution = () => {
  const rest = N % 3;
  const num = Math.floor(N / 3);

  return rest % 2 === 0
    ? num % 2 === 0
      ? 'CY'
      : 'SK'
    : num % 2 === 0
    ? 'SK'
    : 'CY';
};

console.log(solution());
