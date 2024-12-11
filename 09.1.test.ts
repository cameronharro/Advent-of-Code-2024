import { assert, assertEquals } from "@std/assert";
import { testData, Disk, expandDisk, checkSum, getFinalSize, splitDisk, swapEmptyAndFull, 
    fullData
} from "./09.1.ts";

Deno.test(async function testInput(t) {
    const disk = new Disk(testData);
    const {checkSumValue, finalDisk, originalDisk} = disk;

    await t.step('expands disk from representation', () => {
        assertEquals(expandDisk('12345'), [0,".",".",1,1,1,".",".",".",".",2,2,2,2,2])
    })
    
    await t.step('gets target size', () => {
        assertEquals(getFinalSize([0, 0, ".", ".", ".", 1, 1, 1, ".", ".",".", 2, ".", ".", ".", 3, 3, 3, ".", 4,4, ".", 5, 5, 5, 5, ".", 6, 6, 6,6, ".", 7, 7, 7, ".", 8, 8, 8, 8,9, 9]), 28)
    })

    await t.step('splits disk', () => {
        const splitDisks = splitDisk(originalDisk, 28)
        assertEquals(splitDisks.targetDisk, [0,0,".",".",".",1,1,1,".",".",".",2,".",".",".",3,3,3,".",4,4,".",5,5,5,5,".",6]);
        assertEquals(splitDisks.sourceDisk, [6,6,6,7,7,7,8,8,8,8,9,9]);
    })

    await t.step('swaps over whole disk', () => {
        assertEquals(swapEmptyAndFull(originalDisk),[0,0,9,9,8,1,1,1,8,8,8,2,7,7,7,3,3,3,6,4,4,6,5,5,5,5,6,6])
        assertEquals(finalDisk,[0,0,9,9,8,1,1,1,8,8,8,2,7,7,7,3,3,3,6,4,4,6,5,5,5,5,6,6])
    })
    
    await t.step('assembles checksum', () => {
        assertEquals(checkSum([0,0,9,9,8,1,1,1,8,8,8,2,7,7,7,3,3,3,6,4,4,6,5,5,5,5,6,6]), 1928)
        assertEquals(checkSumValue, 1928)
    })
})

Deno.test(function fullInput() {
    const disk = new Disk(fullData);
    const {checkSumValue} = disk;
    console.log({
        fullCheckSum: checkSumValue,
    })
    assert(checkSumValue > 90167081070)
    assert(checkSumValue > 450835405350)
})