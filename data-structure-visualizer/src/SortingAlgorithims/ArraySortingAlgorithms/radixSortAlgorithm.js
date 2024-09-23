export function getRadixSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    radixSortHelper(array, animations);
    return animations;
}

function radixSortHelper (
    array,
    animations,
) {
    const loops = findMaxDigits(array);
    for (let i = 0; i < loops; i++){
         array = countSort(array, 10 ** i, animations);
         animations.push(array.slice());
    }
}


function findMaxDigits(
    array,
) {
    let max = array[0];
    for (let i = 1; i < array.length; i++){
        if (array[i] > max){
            max = array[i];
        }
    }
    return max.toString().length;
}

function countSort(
    array,
    digit,
    animations,
) {
    let count = new Array(10).fill(0);
    animations.push([count.slice(), count.length]);
    let res = new Array(array.length).fill(0);
    animations.push([res.slice(), res.length]);
    for (let i = 0; i < array.length; i++){
        animations.push([i, i]);
        const pos = Math.floor(array[i] / digit) % 10;
        count[pos]++;
        animations.push([pos, count[pos]]);
        animations.push([i, pos]);
    }
    for (let i = 1; i < 10; i++){
        animations.push([i, i - 1]);
        count[i] += count[i - 1];
        animations.push([i, count[i]]);
        animations.push([i, i - 1]);
    }
    for (let i = array.length - 1; i >= 0; i--){
        animations.push([i, i]);
        const pos = Math.floor(array[i] / digit) % 10;
        animations.push([pos, pos]);
        res[count[pos] - 1] = array[i];
        animations.push([count[pos] - 1, array[i]]);
        count[pos]--;
        animations.push([i, count[pos]]);
        animations.push([pos, count[pos]]);
    }
    return res;
}

