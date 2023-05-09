const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let [len, ...input] = fs.readFileSync(filePath).toString().split('\n');

input = input.map((value) => value.trim());

let result = [];

for (let i = 0; i < len; i++) {
    let ps = [];
    let j = 0;
    while (j < input[i].length) {
        if (input[i][j] === '(') {
            ps.push('(');
        } else if (ps.length === 0) {
            result.push('NO');
            break;
        } else {
            ps.pop();
        }
        j++;
    }

    if (j === input[i].length) {
        result.push(ps.length === 0 ? 'YES' : 'NO');
    }
}

console.log(result.join('\n'));
