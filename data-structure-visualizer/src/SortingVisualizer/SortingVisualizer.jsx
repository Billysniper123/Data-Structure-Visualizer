import React from 'react';
import './SortingVisualizer.css';
import { getMergeSortAnimations } from "../SortingAlgorithims/ArraySortingAlgorithms/mergeSortAlgorithm";
import { getBubbleSortAnimations } from "../SortingAlgorithims/ArraySortingAlgorithms/bubbleSortAlgorithm";

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            helperArray: [],
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

    heapSort() {}

    bucketSort() {}

    radixSort() {}

    render() {
        const { array, helperArray } = this.state;

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
                <div className="button-container">
                    <button onClick={() => this.resetArray()}>Generate New Array</button>
                    <button onClick={() => this.mergeSort()}>Perform Merge Sort</button>
                    <button onClick={() => this.quickSort()}>Perform Quick Sort</button>
                    <button onClick={() => this.heapSort()}>Perform Heap Sort</button>
                    <button onClick={() => this.bubbleSort()}>Perform Bubble Sort</button>
                    <button onClick={() => this.bucketSort()}>Perform Bucket Sort</button>
                    <button onClick={() => this.radixSort()}>Perform Radix Sort</button>
                </div>
            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

