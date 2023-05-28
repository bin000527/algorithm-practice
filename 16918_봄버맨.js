const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [info, ...input] = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split('\n');

const [R, C, N] = info.trim().split(' ').map(Number);
const board = input.map((str) => str.trim().split(''));

const bomb = (board) => {
    let result = Array.from({ length: R }, () =>
        Array.from({ length: C }, () => 'O')
    );
    let dr = [0, 1, 0, -1];
    let dc = [1, 0, -1, 0];

    for (let r = 0; r < R; r++) {
        for (let c = 0; c < C; c++) {
            if (board[r][c] === 'O') {
                result[r][c] = '.';
                for (let i = 0; i < 4; i++) {
                    const nr = r + dr[i];
                    const nc = c + dc[i];

                    if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;

                    result[nr][nc] = '.';
                }
            }
        }
    }

    return result;
};

// 폭탄이 터지는 상황은 규칙적이다.
const solution = () => {
    let answer;

    // 짝수 초의 경우, 모든 칸에 폭탄이 채워짐
    if (N % 2 === 0)
        answer = Array.from({ length: R }, () =>
            Array.from({ length: C }, () => 'O')
        );
    // 1초일 때에는 입력값 그대로 폭탄이 채워짐
    else if (N === 1) answer = board;
    // 홀수 초의 경우
    else {
        answer = bomb(board); // 초기 입력(board)에 채워진 폭탄이 터지거나

        if (N % 4 === 1) answer = bomb(answer); // 혹은 그 이후 남아있는 폭탄이 터짐
    }

    return answer.map((arr) => arr.join('')).join('\n');
};

console.log(solution());
