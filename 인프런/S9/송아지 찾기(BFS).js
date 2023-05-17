// const solution = (S, E) => {
//     let answer = 0;

//     let queue = [[S, 1]];

//     while (queue.length) {
//         const [pos, jump] = queue.shift();

//         if (pos + 1 === E || pos - 1 === E || pos + 5 === E) {
//             answer = jump;
//             break;
//         }

//         queue.push([pos + 1, jump + 1]);
//         queue.push([pos - 1, jump + 1]);
//         queue.push([pos + 5, jump + 1]);
//     }

//     return answer;
// };

const solution = (S, E) => {
    let answer = 0;

    let jump = Array();
    jump[S] = 0;
    let queue = [S];

    while (queue.length) {
        const pos = queue.shift();

        if (pos === E) {
            answer = jump[pos];
            break;
        }

        const nextPos = [pos + 1, pos - 1, pos + 5];

        for (let i = 0; i < nextPos.length; i++) {
            if (!jump[nextPos[i]]) {
                jump[nextPos[i]] = jump[pos] + 1;
                queue.push(nextPos[i]);
            }
        }
    }
    return answer;
};

console.log(solution(5, 14));
console.log(solution(8, 3));
