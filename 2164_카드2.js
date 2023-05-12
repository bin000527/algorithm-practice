const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const N = +fs.readFileSync(filePath).toString().trim();

class Queue {
    constructor() {
        this.data = Array.from({ length: N }, (_, i) => i + 1);
        this.head = 0;
        this.tail = this.data.length;
        this.size = this.data.length;
    }

    push(value) {
        this.size++;
        this.data[this.tail++] = value;
    }

    shift() {
        this.size--;
        return this.data[this.head++];
    }
}
const solution = () => {
    const queue = new Queue();

    while (queue.size > 1) {
        queue.shift();
        queue.push(queue.shift());
    }

    return queue.data[queue.head];
};

console.log(solution());
