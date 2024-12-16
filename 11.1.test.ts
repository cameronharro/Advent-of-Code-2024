import { assertEquals, assert, assertFalse } from "@std/assert";
import { testData, Stones, passesRuleOne, passesRuleTwo, determinesReplacements,
    fullData
 } from "./11.1.ts";

 Deno.test('testData', async (t) => {
    const stones = new Stones(testData)


    await t.step('splits input', () => {
        assertEquals(stones.intialStones,[ "125", "17" ])
    })

    await t.step('evals rule 1', () => {
        assert(passesRuleOne('000'))
        assertFalse(passesRuleOne('090'))
    })

    await t.step('evals rule 2', () => {
        assert(passesRuleTwo('2048'))
        assertFalse(passesRuleTwo('090'))
    })

    await t.step('determines replacements', () => {
        assertEquals(determinesReplacements('0'),[ "1" ])
        assertEquals(determinesReplacements('1'),[ "2024" ])
        assertEquals(determinesReplacements('10'),[ "1", "0" ])
        assertEquals(determinesReplacements('99'),[ "9", "9" ])
        assertEquals(determinesReplacements('999'),[ "2021976" ])
    })

    await t.step('identifies stones at particular iteration', () => {
        assertEquals(stones.findIter(0),[ "125", "17" ])
        assertEquals(stones.findIter(1),[ "253000", "1", "7" ])
        assertEquals(stones.findIter(2),[ "253", "0", "2024", "14168" ])
        assertEquals(stones.findIter(3),[ "512072", "1", "20", "24", "28676032" ])
        assertEquals(stones.findIter(4),[ '512', '72', '2024', '2', '0', '2', '4', '2867', '6032' ])
        assertEquals(stones.findIter(5),[ '1036288', '7', '2', '20', '24', '4048', '1', '4048', '8096', '28', '67', '60', '32' ])
    })

    await t.step('sums correctly', () => {
        assertEquals(stones.findIter(25).length, 55312)
    })
 })

 Deno.test('fullData', () => {
    const stones = new Stones(fullData)
    console.log({fullSize: stones.findIter(25).length})
    assertEquals(stones.findIter(25).length, 194782)
 })