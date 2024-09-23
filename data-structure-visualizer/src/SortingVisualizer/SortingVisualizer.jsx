import React from 'react';
import './SortingVisualizer.css';
import { getMergeSortAnimations } from "../SortingAlgorithims/ArraySortingAlgorithms/mergeSortAlgorithm";
import { getBubbleSortAnimations } from "../SortingAlgorithims/ArraySortingAlgorithms/bubbleSortAlgorithm";
import {getRadixSortAnimations} from "../SortingAlgorithims/ArraySortingAlgorithms/radixSortAlgorithm";

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            helperArray: [],
            trtArray: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 16; i++) {
            array.push(randomIntFromInterval(5, 700));
        }

        this.setState({
            array: array,
            helperArray: [...array],
            trtArray: [...array],
        });

        setTimeout(() => {
            const helperBars = document.getElementsByClassName('helper-bar');
            for (let i = 0; i < array.length; i++) {
                const bar = helperBars[i];
                if (bar) {
                    bar.style.visibility = 'hidden';
                }
            }
        }, 0);
        setTimeout(() => {
            const trtBars = document.getElementsByClassName('tertiary-bar');
            for (let i = 0; i < array.length; i++) {
                const bar = trtBars[i];
                if (bar) {
                    bar.style.visibility = 'hidden';
                }
            }
        }, 0);
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array.slice());
        let i = 0;
        while (i < animations.length) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const helperBars = document.getElementsByClassName('helper-bar');
            const [firstBarIdx, lastBarIdx] = animations[i++];
            const length = lastBarIdx - firstBarIdx + 1;
            const auxiliaryArray = animations[i++];
            setTimeout(() => {
                for (let j = 0; j < helperBars.length; j++) {
                    const bar = helperBars[j];
                    if (j >= firstBarIdx && j <= lastBarIdx) {
                        bar.textContent = auxiliaryArray[j];
                        bar.style.visibility = 'visible';
                    } else {
                        bar.style.visibility = 'hidden';
                    }
                }
            }, i * 200);

            for (let j = 0; j < length * 5; j++) {
                if (j % 5 < 3) {
                    const [barOneIdx, barTwoIdx] = animations[i++];
                    const barOneStyle = j % 5 < 2 ? helperBars[barOneIdx].style : arrayBars[barOneIdx].style;
                    const barTwoStyle = j % 5 < 2 ? helperBars[barTwoIdx].style : arrayBars[barOneIdx].style;
                    const color = j % 5 === 1 ? 'white' : 'red';
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    }, i * 200);
                } else if (j % 5 === 3) {
                    const [barOneIdx, newText] = animations[i++];
                    const barOne = arrayBars[barOneIdx];
                    setTimeout(() => {
                        barOne.textContent = newText;
                        barOne.style.backgroundColor = 'white';
                    }, i * 200);
                } else {
                    const barOneIdx = animations[i++];
                    const barOneStyle = helperBars[barOneIdx].style;
                    setTimeout(() => {
                        barOneStyle.visibility = 'hidden';
                    }, i * 200);
                }
            }
        }
    }

    bubbleSort() {
        const animations = getBubbleSortAnimations(this.state.array.slice());
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = i % 4 < 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 4 === 0 ? 'red' : 'white';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * 200);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newText] = animations[i];
                    const barOne = arrayBars[barOneIdx];
                    barOne.textContent = newText;
                }, i * 200);
            }
        }
    }

    quickSort() {}

    radixSort() {
        const animations = getRadixSortAnimations(this.state.array.slice());
        const arrayBars = document.getElementsByClassName('array-bar');
        const helperBars = document.getElementsByClassName('helper-bar');
        const trtBars = document.getElementsByClassName('tertiary-bar');
        let i = 0;
        let aniCount = 0;
        console.log(this.state.array.slice());
        console.log(animations);
        while (aniCount < animations.length){
            const [count, countLength] = animations[aniCount++];
            setTimeout(() => {
                for (let j = 0; j < countLength; j++){
                    const bar = helperBars[j];
                    bar.textContent = count[j];
                    bar.style.visibility = 'visible';
                }
            }, ++i * 200)

            let [res, resLength] = animations[aniCount++];
            setTimeout(() => {
                for (let j = 0; j < resLength; j++){
                    const bar = trtBars[j];
                    bar.textContent = res[j];
                    bar.style.visibility = 'visible';
                }
            }, ++i * 200)

            for (let j = 0; j < resLength * 3; j++){
                if (j % 3 === 1 ){
                    const [barOneIdx, newText] = animations[aniCount++];
                    const bar = helperBars[barOneIdx];
                    setTimeout(() => {
                        bar.style.backgroundColor = 'red'
                        bar.textContent = newText;
                    }, ++i * 200)
                } else {
                    const [barOneIdx, barTwoIdx] = animations[aniCount++];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = j % 3 === 0 ? arrayBars[barTwoIdx].style: helperBars[barTwoIdx].style;
                    const color = j % 3 === 0 ? 'red': 'white';
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    }, ++i * 200)
                }
            }

            for (let j = 3; j < countLength * 3; j++){
                if (j % 3 === 1 ){
                    const [barOneIdx, newText] = animations[aniCount++];
                    const bar = helperBars[barOneIdx];
                    setTimeout(() => {
                        bar.textContent = newText;
                    }, ++i * 200)
                } else {
                    const [barOneIdx, barTwoIdx] = animations[aniCount++];
                    const barOneStyle = helperBars[barOneIdx].style;
                    const barTwoStyle = helperBars[barTwoIdx].style
                    const color = j % 3 === 0 ? 'red': 'white';
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    }, ++i * 200)
                }
            }

            for (let j = 0; j < resLength * 5; j++){
                if (j % 5 === 2 || j % 5 === 4){
                    const [barOneIdx, newText] = animations[aniCount++];
                    const bar = j % 5 === 2 ? trtBars[barOneIdx]: helperBars[barOneIdx];
                    const color = j % 5 === 2 ? 'red': 'white';
                    setTimeout(() => {
                        bar.style.backgroundColor = color;
                        bar.textContent = newText;
                    }, ++i * 200)
                } else {
                    const [barOneIdx, barTwoIdx] = animations[aniCount++];
                    let barOneStyle;
                    let barTwoStyle;
                    if (j % 5 === 3){
                         barOneStyle = arrayBars[barOneIdx].style;
                         barTwoStyle = trtBars[barTwoIdx].style;
                    } else {
                         barOneStyle = j % 5 === 0 ? arrayBars[barOneIdx].style: helperBars[barOneIdx].style;
                         barTwoStyle = j % 5 === 0   ? arrayBars[barTwoIdx].style: helperBars[barTwoIdx].style;
                    }
                    const color = j % 5 < 3 ? 'red' : 'white';
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    }, ++i * 200)
                }
            }
            i++;
            for (let j = 0; j < resLength; j++){
                const bar = trtBars[j];
                const bar2 = helperBars[j];
                setTimeout(() => {
                    bar.style.backgroundColor = 'red';
                    bar2.style.visibility = 'hidden';
                }, (i * 200) + j)
            }
            i++;
            const final = animations[aniCount++];
            console.log(final);
            for (let j = 0; j < resLength; j++){
                const bar = arrayBars[j];
                const currentIndex = j;
                console.log(final[currentIndex]);
                setTimeout(() =>{
                    bar.textContent = final[currentIndex];
                    bar.style.backgroundColor = 'red';
                }, (i * 200) + j);
            }
            i++
            for (let j = 0; j < resLength; j++){
                const barOne = arrayBars[j];
                const barTwo = trtBars[j];
                setTimeout(() => {
                    barOne.style.backgroundColor = 'white';
                    barTwo.style.backgroundColor = 'white';
                    barTwo.style.visibility = 'hidden';
                }, (i * 200) + j)
            }
        }
    }

    render() {
        const { array, helperArray, trtArray } = this.state;

        return (
            <div className="array-container">
                <div className="array-wrapper">
                    {array.map((value, idx) => (
                        <div className="array-bar" key={idx}>
                            {value}
                        </div>
                    ))}
                </div>
                <div className="helper-wrapper">
                    {helperArray.map((value, idx) => (
                        <div className="array-bar helper-bar" key={idx}>
                            {value}
                        </div>
                    ))}
                </div>
                <div className="tertiary-wrapper">
                    {trtArray.map((value, idx) => (
                        <div className="array-bar tertiary-bar" key={idx}>
                            {value}
                        </div>
                    ))}
                </div>
                <div className="button-container">
                    <button onClick={() => this.resetArray()}>Generate New Array</button>
                    <button onClick={() => this.mergeSort()}>Perform Merge Sort</button>
                    <button onClick={() => this.quickSort()}>Perform Quick Sort</button>
                    <button onClick={() => this.bubbleSort()}>Perform Bubble Sort</button>
                    <button onClick={() => this.radixSort()}>Perform Radix Sort</button>
                </div>
            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

