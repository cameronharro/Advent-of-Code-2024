import { fullData, WordSearch, testData, xmas } from "./04.2.ts";
import { assertArrayIncludes, assertEquals, assert, assertFalse} from "@std/assert";

Deno.test(async function testInput (t) {
    const search = new WordSearch(testData)
    await t.step('gets grid', () => {
        assertArrayIncludes(search.grid, [['X','M','A','S','A','M','X','A','M','M']])
    })
    
    await t.step('gets surrounding text of A\'s', () => {
        assertArrayIncludes(search.surroundingTexts, ['MMSMSXMS'])
    })

    await t.step('gets matches', () => {
        assert(xmas.test('MMSMSXMS'));
        assertFalse(xmas.test('SAXMMXMM'))
    })

    await t.step('gets sum', () => {
        assertEquals(search.count, 9)
    })
})

console.log({fullCount: new WordSearch(fullData).count})