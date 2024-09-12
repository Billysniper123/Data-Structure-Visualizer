export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    mergeSortHelper(array, 0, array.length - 1, animations);
    return animations;
}

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    animations,
) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(mainArray, startIdx, middleIdx, animations);
    mergeSortHelper(mainArray, middleIdx + 1, endIdx, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, animations);
}

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    animations,
) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    let auxiliaryArray = [];


    for (let l = 0; l < startIdx; l++){
        auxiliaryArray.push(0)
    }
    auxiliaryArray = auxiliaryArray.concat(mainArray.slice(startIdx, endIdx + 1));
    animations.push([i, endIdx]);
    animations.push(auxiliaryArray.slice());
    while (i <= middleIdx && j <= endIdx) {
        animations.push([i, j]);
        animations.push([i, j]);
        animations.push ([k, k]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            animations.push([k, auxiliaryArray[i]]);
            animations.push([i]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            animations.push([k, auxiliaryArray[j]]);
            animations.push([j])
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push ([k, k]);
        animations.push([k, auxiliaryArray[i]]);
        animations.push([i]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push ([k, k]);
        animations.push([k, auxiliaryArray[j]]);
        animations.push([j]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}
