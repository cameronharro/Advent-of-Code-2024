type mixedArray = Array<string|number>

export const testData = '2333133121414131402';

export const fullData: string = await Deno.readTextFile('./09.fullData.txt');

export class Disk {
    originalMap: string;
    originalDisk: mixedArray;
    finalDisk: mixedArray = [];
    checkSumValue: number = 0
    constructor(input: string) {
        this.originalMap = input;
        this.originalDisk = expandDisk(this.originalMap)
        this.finalDisk = swapEmptyAndFull(this.originalDisk)
        this.checkSumValue = checkSum(this.finalDisk)
    }
}

export function expandDisk (string: string) {
    const arr = [];
    let isMemory: boolean = true;
    for (let i = 0; i < string.length; i ++) {
        const digit = isMemory ? Math.floor(i/2) : '.'
        for (let number = Number(string[i]); number > 0; number--) {
            arr.push(digit)
        }
        isMemory = !isMemory
    }
    return arr
}

export function getFinalSize(arr: mixedArray): number {
    const programMemory = arr.filter(ele => ele !== '.');
    return programMemory.length
}

export function splitDisk(arr: mixedArray, finalSize: number) {
    const targetDisk = arr.slice(0, finalSize);
    const sourceDisk = arr.slice(finalSize).filter(ele => ele !== '.');
    return {targetDisk, sourceDisk}
}

export function swapEmptyAndFull (arr: mixedArray) {
    const finalSize = getFinalSize(arr);
    const {targetDisk, sourceDisk} = splitDisk(arr, finalSize)
    let searchFrom = 0;
    while (searchFrom >= 0 && sourceDisk.length > 0) {
        const firstEmpty = targetDisk.indexOf('.', searchFrom);
        if (firstEmpty === -1) {break}
        const nextElement = sourceDisk.pop()
        if (nextElement !== undefined) {targetDisk[firstEmpty] = nextElement}
        searchFrom = firstEmpty;
    }
    return targetDisk
}

export function checkSum (arr: mixedArray) {
    let sum: number = 0;
    for (let i = 0; i < arr.length; i ++) {
        const char = arr[i]
        if (typeof char === 'number') {sum += char * i}
    }
    return sum
}