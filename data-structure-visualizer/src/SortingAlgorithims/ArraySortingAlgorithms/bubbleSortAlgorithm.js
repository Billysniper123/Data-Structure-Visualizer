export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return animations;
    bubbleSortHelper(array, animations);
    return animations;
}

function bubbleSortHelper(array, animations) {
    const length = array.length;
    let swapped;

    for (let i = 0; i < length; i++) {
        swapped = false;
        for (let j = 0; j < length - i - 1; j++) {
            animations.push([j, j + 1]);
            animations.push([j, j + 1]);

            if (array[j] > array[j + 1]) {
                animations.push([j, array[j + 1].toString()]);
                animations.push([j + 1, array[j].toString()]);
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                swapped = true;
            } else {
                animations.push([j, array[j].toString()]);
                animations.push([j + 1, array[j + 1].toString()]);
            }
        }
        if (!swapped) break;
    }
}
