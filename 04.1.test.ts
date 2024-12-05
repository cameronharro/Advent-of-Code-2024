import { testData, WordSearch, fullData } from "./04.1.ts";
import { assertEquals } from "jsr:@std/assert"

const search = new WordSearch(testData)

Deno.test(async function transformsData(t) {
    const {grids} = search;
    const {leftRight, rightLeft, topBottom, bottomTop, upRight, downRight, downLeft, upLeft} = grids;

    await t.step('left-right', () => {
        assertEquals(leftRight[0][0],"M")
        assertEquals(leftRight[0][9],"M")
        assertEquals(leftRight[9][0],"M")
        assertEquals(leftRight[9][9],"X")
    })

    await t.step('right-left', () => {
        assertEquals(rightLeft[0][0],"M")
        assertEquals(rightLeft[0][9],"M")
        assertEquals(rightLeft[9][0],"X")
        assertEquals(rightLeft[9][9],"M")
    })

    await t.step('top-bottom', () => {
        assertEquals(topBottom[0][0],"M")
        assertEquals(topBottom[0][9],"M")
        assertEquals(topBottom[9][0],"M")
        assertEquals(topBottom[9][9],"X")
    })

    await t.step('bottom-top', () => {
        assertEquals(bottomTop[0][0],"M")
        assertEquals(bottomTop[0][9],"M")
        assertEquals(bottomTop[9][0],"X")
        assertEquals(bottomTop[9][9],"M")
    })
    
    await t.step('up-right', () => {
        assertEquals(upRight[0][0],"M")
        assertEquals(upRight[9][0],"M")
        assertEquals(upRight[9][9],"M")
        assertEquals(upRight[18][0],"X")
    })
    
    await t.step('down-right', () => {
        assertEquals(downRight[0][0],"M")
        assertEquals(downRight[9][0],"M")
        assertEquals(downRight[9][9],"X")
        assertEquals(downRight[18][0],"M")
    })
    
    await t.step('down-left', () => {
        assertEquals(downLeft[0][0],"M")
        assertEquals(downLeft[9][0],"M")
        assertEquals(downLeft[9][9],"M")
        assertEquals(downLeft[18][0],"X")
    })
    
    await t.step('up-left', () => {
        assertEquals(upLeft[0][0],"M")
        assertEquals(upLeft[9][0],"X")
        assertEquals(upLeft[9][9],"M")
        assertEquals(upLeft[18][0],"M")
    })  
})

Deno.test(async function findsXMAS(t) {
    // const search = new WordSearch(minData)
    await t.step('assembles string', () => {
        // console.log(search.fullString)
        assertEquals(search.count, 18)
    })
})

console.log(new WordSearch(fullData).count)