import { assert, assertEquals, assertFalse } from "@std/assert";
import { SignalMap, testData, getSlope, getAntinodes, fullData } from "./08.1.ts"

Deno.test(async function testInput (t) {
    const signalMap = new SignalMap(testData)
    const {antennaeMap, antinodes} = signalMap
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

    await t.step('gets prior and following antinodes from rise and run', () => {
        const antinodes = getAntinodes(
            {x: 8, y: 1},
            {x: 5, y: 2},
            {run: -3, rise: 1}
        );
        assertEquals(antinodes, [{x: 11, y: 0}, {x: 2, y: 3}]);

    })

    await t.step('evaluates and counts all combinations of the same antenna', () => {
        assertEquals(antinodes.size, 14)
    })
})

Deno.test(async function fullInput (t) {
    const signalMap = new SignalMap(fullData)
    assertEquals(signalMap.count, 371)
})
