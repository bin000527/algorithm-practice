const solution = (set) => {
    let answer = 'NO';

    // 첫 번째 부분집합에 포함되는지 여부를 나타내는 배열
    let check = Array.from({ length: set.length }, () => 0);

    const DFS = (idx) => {
        if (answer === 'YES') return;

        if (idx === set.length + 1) {
            let sum1 = 0;
            let sum2 = 0;
            for (let i = 0; i < set.length; i++) {
                if (check[i] === 1) sum1 += set[i];
                else sum2 += set[i];
            }
            answer = sum1 === sum2 ? 'YES' : 'NO';

            return;
        }

        check[idx] = 1;
        DFS(idx + 1);
        check[idx] = 0;
        DFS(idx + 1);
    };

    DFS(0);
    return answer;
};

console.log(solution([1, 3, 5, 6, 7, 10]));
