import { testData, Updates, checkPriorRules, fullData } from "./05.1.ts";
import { assert, assertArrayIncludes, assertEquals, assertFalse } from "jsr:@std/assert"

Deno.test(async function testInput (t) {
    const updates = new Updates(testData)
    await t.step('transforms data', () => {
        assertArrayIncludes(updates.edits[0].instructions, [ 75, 47, 61, 53, 29 ])
        assert(updates.rules.get(47)?.has(53))
    })

    await t.step('checks instructions against rules', () => {
        assert(checkPriorRules(1, [ 75, 47, 61, 53, 29 ], updates.rules))
        assertFalse(checkPriorRules(1, [ 75, 97, 47, 61, 53 ], updates.rules))
        // console.log({edits:updates.edits})
    })

    await t.step('sums middle numbers', () => {
        assertEquals(updates.count, 143)
        // console.log({count: updates.count})
    })
})

Deno.test(function fullInput() {
    const updates = new Updates(fullData);
    const {count} = updates
    // console.log({count})
    assertEquals(count, 5762)
})