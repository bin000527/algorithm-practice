const solution = (N) => {
    let pre_answer = [];
    let in_answer = [];
    let post_answer = [];

    const preorder = (num) => {
        if (num > 7) return;
        pre_answer.push(num);
        preorder(2 * num);
        preorder(2 * num + 1);
    };

    preorder(N);

    const inorder = (num) => {
        if (num > 7) return;
        inorder(2 * num);
        in_answer.push(num);
        inorder(2 * num + 1);
    };

    inorder(N);

    const postorder = (num) => {
        if (num > 7) return;
        postorder(2 * num);
        postorder(2 * num + 1);
        post_answer.push(num);
    };

    postorder(N);

    return [pre_answer, in_answer, post_answer];
};

console.log(solution(1));
