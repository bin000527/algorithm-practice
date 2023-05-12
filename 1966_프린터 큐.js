const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [N, ...input] = fs.readFileSync(filePath).toString().split('\n');

const solution = () => {
    let answer = [];
    for (let i = 0; i < N; i++) {
        let print = 0;
        const index = +input[2 * i].trim().split(' ')[1];
        const priorities = [];
        const queue = input[2 * i + 1]
            .trim()
            .split(' ')
            .map((priority, idx) => {
                priorities.push(priority);
                return {
                    priority,
                    idx,
                };
            });

        priorities.sort((a, b) => b - a);

        while (
            !(queue[0].idx === index && priorities[0] === queue[0].priority)
        ) {
            if (queue[0].priority === priorities[0]) {
                queue.shift();
                priorities.shift();
                print++;
            } else queue.push(queue.shift());
        }
        answer.push(++print);
    }
    return answer.join('\n');
};

console.log(solution());
