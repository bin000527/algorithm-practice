const isPrime = (num) => {
    if (num === 1) return false;
    if (num === 2) return true;
    for (let i = 2; i < Math.floor(Math.sqrt(num)); i++) {
        if (num % i === 0) return false;
    }
    return true;
};
const solution = (arr) => {
    let answer = [];

    for (let i = 0; i < arr.length; i++) {
        const value = Number(String(arr[i]).split('').reverse().join(''));
        if (isPrime(value)) answer.push(value);
    }

    return answer;
};

console.log(solution([32, 55, 62, 20, 250, 370, 200, 30, 100]));
