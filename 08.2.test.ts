import { assert, assertEquals, assertFalse } from "@std/assert";
import { SignalMap, testData, getSlope, getAntinodes,
    fullData
} from "./08.2.ts"

Deno.test(async function testInput (t) {
    const signalMap = new SignalMap(testData)
    const {antennaeMap, count} = signalMap
    await t.step('maps unique antenna types', () => {
        // console.log(antennaeMap)
        assert(antennaeMap.has('A'));
        assert(antennaeMap.has('0'));
        assertFalse(antennaeMap.has('.'));
    })

    await t.step('identifies all antennae', () => {
        assertEquals(antennaeMap.get('A')?.length, 3)
        assertEquals(antennaeMap.get('0')?.length, 4)
    })
    
    await t.step('gets rise and run between two points', () => {
        assertEquals(getSlope({x: 8, y: 1}, { x: 5, y: 2 }), {run: -3, rise: 1});
        assertEquals(getSlope({ x: 9, y: 9 }, { x: 6, y: 5 }), {run: -3, rise: -4});
    })

    await t.step('gets all antinodes from rise and run', () => {
        const antinodes = getAntinodes(
            {x: 5, y: 2},
            {run: 2, rise: 1},
            signalMap.grid
        );
        assertEquals(antinodes, [{x: 5, y: 2}, {x: 7, y: 3},{x: 1, y: 0}, {x: 3, y: 1},{x: 9, y: 4}, {x: 11, y: 5}].sort((a, b) =>  a.x - b.x));

    })

    await t.step('evaluates and counts all combinations of the same antenna', () => {
        assertEquals(count, 34)
    })
})

Deno.test(function fullInput () {
    const signalMap = new SignalMap(fullData)
    // console.log({count: signalMap.count})
    assertEquals(signalMap.count, 1229)
})