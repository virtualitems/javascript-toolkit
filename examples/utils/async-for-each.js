import asyncForEach from './async-for-each.mjs';


async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


(async () => {
    const values = new Set(new Array(50).fill(0).map((_, i) => i));

    const promises1 = asyncForEach(values, async (item) => {
        await wait(1000 - item * 20);
        console.log(item);
    });

    const promises2 = asyncForEach(values, async (item) => {
        await wait(1000 - item * 20);
        console.log(item);
    });

    await Promise.all(promises1);
    await Promise.all(promises2);

    console.log('done');
})();
