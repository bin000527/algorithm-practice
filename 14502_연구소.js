const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [[N, M], ...input] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.trim().split(' ').map(Number));

class Queue {
  constructor() {
    this.data = [];
    this.head = 0;
    this.tail = 0;
  }

  push(value) {
    this.data[this.tail++] = value;
  }

  shift() {
    return this.data[this.head++];
  }

  isEmpty() {
    return this.head === this.tail;
  }
}

// 브루트포스 + BFS
const solution = () => {
  let answer = 0;

  const virus = []; // 바이러스 위치 배열

  let initialSafeZone = 0; // 안전 영역 수

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (input[i][j] === 2) virus.push([i, j]);
      if (input[i][j] === 0) initialSafeZone++;
    }
  }

  const dy = [0, 1, 0, -1];
  const dx = [1, 0, -1, 0];

  // BFS 탐색으로 안전 영역 수 계산 ( 새로운 벽 3개를 세우고 난 후 )
  const BFS_safezone = () => {
    let curSafeZone = initialSafeZone - 3;

    // 바이러스 퍼진 영역: true
    const check = Array.from({ length: N }, () =>
      Array.from({ length: M }, () => false)
    );

    const queue = new Queue();

    virus.forEach(([y, x]) => {
      check[y][x] = true;
      queue.push([y, x]);
    });

    while (!queue.isEmpty()) {
      const [y, x] = queue.shift();

      for (let i = 0; i < 4; i++) {
        const ny = y + dy[i];
        const nx = x + dx[i];

        if (
          ny < 0 ||
          ny >= N ||
          nx < 0 ||
          nx >= M ||
          check[ny][nx] ||
          input[ny][nx] === 1
        )
          continue;

        check[ny][nx] = true;
        curSafeZone--;
        queue.push([ny, nx]);
      }
    }

    return curSafeZone;
  };

  // DFS 탐색으로 3개의 벽을 세울 수 있는 모든 경우의 수 탐색
  const DFS_wall = (L, y, x) => {
    if (L === 3) {
      answer = Math.max(answer, BFS_safezone());
      return;
    }

    let ny = y;
    let nx = x;

    while (true) {
      ny = nx === M - 1 ? ny + 1 : ny;
      nx = nx === M - 1 ? 0 : nx + 1;

      if (ny >= N) break;
      if (input[ny][nx] !== 0) continue;

      input[ny][nx] = 1;
      DFS_wall(L + 1, ny, nx);
      input[ny][nx] = 0;
    }
  };

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (input[i][j] === 0) {
        input[i][j] = 1;
        DFS_wall(1, i, j);
        input[i][j] = 0;
      }
    }
  }

  return answer;
};

console.log(solution());
