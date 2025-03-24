import { assertEquals } from "@std/assert";

type mixedArray = Array<string|number>
type file = {digit: number, id: number};
type files = Array<file>
type numArr = Array<number>
type disk = Array<file|number>

export const testData = '2333133121414131402';

export const fullData: string = await Deno.readTextFile('./09.fullData.txt');

export class Disk {
    originalMap: string;
    files: files;
    spaces: numArr;
    fullDisk: disk;
    compressedDisk: disk;
    sum: number;
    constructor(input: string) {
        this.originalMap = input;
        const sortedDisk = sortDisk(this.originalMap)
        this.files = sortedDisk.files
        this.spaces = sortedDisk.spaces
        this.fullDisk = sortedDisk.fullDisk
        this.compressedDisk = compressDisk(this.fullDisk)
        this.sum = this.checkSum()
    }

    checkSum (): number {
        const disk = this.compressedDisk
        let sum: number = 0;
        let fullIndex = 0
        for (let i = 0; i < disk.length; i ++) {
            const memory = disk[i]
            if (typeof memory === 'number') {
                fullIndex += memory
                continue
            }
            fullIndex += memory.digit;
            const file = Object.create(memory)
            while(file.digit > 0) {
                sum += (fullIndex - file.digit) * file.id;
                file.digit --;
            }
        }
        return sum
    }

}

export function sortDisk (string: string) {
    const files = [];
    const spaces = [];
    const fullDisk = []
    let isFile: boolean = true;
    for (let i = 0; i < string.length; i ++) {
        const digit = Number(string[i]);
        isFile
        ? files.push({digit, id: i/2}) && fullDisk.push({digit, id: i/2})
        : spaces.push(digit) && fullDisk.push(digit)
        isFile = !isFile
    }
    return {files, spaces, fullDisk}
}

// For every file (last to first), I need to identify the earliest space which it will fit into and push it into the final disk.
// Every time no space fits the file, 

export function compressDisk (fullDisk: disk) {
    const compressedDisk: disk = Array.from(fullDisk).reverse();
    for (const memory of compressedDisk) {
        if(typeof memory === 'number') {continue}
        const index = compressedDisk.findIndex(val => typeof val !== 'number' ? val.digit === memory.digit && val.id === memory.id : false)
        const firstSpaceIndex = compressedDisk.findLastIndex((val,i) => typeof val === 'number' ? val >= memory.digit && index < i : false);
        if (firstSpaceIndex === -1) {continue}
        const space = compressedDisk[firstSpaceIndex];
        const memoryToSwap = [Number(space) - memory.digit, memory];
        compressedDisk.splice(firstSpaceIndex,1,...memoryToSwap)
        compressedDisk.splice(index, 1, memory.digit);
        
        for (let i = 0; i < compressedDisk.length; i ++) {
            const present = compressedDisk[i];
            if (present === 0){
                compressedDisk.splice(i,1);
                i--;
            }
            const next = compressedDisk[i + 1];
            if(typeof present === 'number' && typeof next === 'number'){
                compressedDisk.splice(i, 2, present + next);
                i--;
            }
        }
        // console.log({memory, space, memoryToSwap, compressedDisk})
        continue
    }
    return compressedDisk.reverse()
}

Deno.test(async function testInput(t) {
    const disk = new Disk(testData);
    const {files, spaces, fullDisk} = disk;

    await t.step('expands disk from representation', () => {
        assertEquals(sortDisk('12345'), {
            files: [
                {digit: 1, id: 0},
                {digit: 3, id: 1},
                {digit: 5, id: 2},
            ],
            spaces: [2, 4],
            fullDisk: [
                {digit: 1, id: 0}, 2,
                {digit: 3, id: 1}, 4,
                {digit: 5, id: 2},
            ]
        })
        assertEquals(files, [
            {digit: 2, id: 0},
            {digit: 3, id: 1},
            {digit: 1, id: 2},
            {digit: 3, id: 3},
            {digit: 2, id: 4},
            {digit: 4, id: 5},
            {digit: 4, id: 6},
            {digit: 3, id: 7},
            {digit: 4, id: 8},
            {digit: 2, id: 9},
        ])
        assertEquals(spaces, [3,3,3,1,1,1,1,1,0,])
        assertEquals(fullDisk, [
            { digit: 2, id: 0 }, 3,
            { digit: 3, id: 1 }, 3,
            { digit: 1, id: 2 }, 3,
            { digit: 3, id: 3 }, 1,
            { digit: 2, id: 4 }, 1,
            { digit: 4, id: 5 }, 1,
            { digit: 4, id: 6 }, 1,
            { digit: 3, id: 7 }, 1,
            { digit: 4, id: 8 }, 0,
            { digit: 2, id: 9 }
        ])
    })

    await t.step('swaps whole files', () => {
       assertEquals(compressDisk(fullDisk),[
            { digit: 2, id: 0 }, { digit: 2, id: 9 },
            { digit: 1, id: 2 }, { digit: 3, id: 1 },
            { digit: 3, id: 7 }, 1,
            { digit: 2, id: 4 }, 1,
            { digit: 3, id: 3 }, 4,
            { digit: 4, id: 5 }, 1,
            { digit: 4, id: 6 }, 5,
            { digit: 4, id: 8 }, 2
        ])
    })

    await t.step('checks Sum', () => {
        assertEquals(disk.sum, 2858)
    })
})

Deno.test('full Data', () => {
    const disk = new Disk(fullData);
    console.log({fullSum: disk.sum})
})