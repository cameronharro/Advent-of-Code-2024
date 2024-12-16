import { assertEquals, assert, assertFalse } from "@std/assert";
import { testData, Stones, passesRuleOne, passesRuleTwo, determinesReplacements,
    fullData
 } from "./11.2.ts";

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
        const six = stones.findIter(6)
        assertEquals(six.get('48'), 2);
        assertEquals(six.get('2097446912'), 1);
        assertEquals(six.get('2'), 4);
    })

    await t.step('sums correctly', () => {
        assertEquals(stones.findSum(25), 55312)
    })
 })

 Deno.test('fullData', () => {
    const stones = new Stones(fullData)
    assertEquals(stones.findSum(25), 194782);
    assertEquals(stones.findSum(75), 233007586663131);
 })