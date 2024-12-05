import { testData, Updates, checkPriorRules, fullData, reorderInstructions } from "./05.2.ts";
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
    })
    
    await t.step('reorders instructions', () => {
        assertEquals(reorderInstructions([75,97,47,61,53],updates.rules),[97,75,47,61,53])
        assertEquals(reorderInstructions([61,13,29],updates.rules),[61,29,13])
        // console.log({edits:updates.edits})
    })

    await t.step('sums middle numbers', () => {
        assertEquals(updates.count, 123)
        // console.log({count: updates.count})
    })
})

Deno.test(function fullInput() {
    const updates = new Updates(fullData);
    const {count} = updates
    // console.log({count})
    assertEquals(count, 4130)
})