import {Plant, testInput, fullInput} from './02.2.ts'
import { assertEquals, assertGreater, assertLess } from "@std/assert"

Deno.test(async function testData(t) {
    const plant = new Plant(testInput);
    await t.step('formats data', () => {
        assertEquals(plant.reports[0].data[0], 7);
        assertEquals(plant.reports[0].data[4], 1);
        assertEquals(plant.reports[5].data[0], 1);
        assertEquals(plant.reports[5].data[4], 9);
    })
    await t.step('performs key operations', () => {
        assertEquals(plant.reports[0].first, 7)
        assertEquals(plant.reports[0].last, 1)
        assertEquals(plant.reports[0].direction, "descending")
    })
    await t.step('tests reports', () => {
        assertEquals(plant.reports[0].isSafe, true)
        assertEquals(plant.reports[1].isSafe, false)
        assertEquals(plant.reports[3].isSafe, true)
    })
    await t.step('counts safe', () => {
        assertEquals(plant.countSafe, 4)
    })
})

Deno.test(async function fullData (t) {
    const plant = new Plant(fullInput);
    await t.step('sum in right range', () => {
        assertGreater(Number(plant.countSafe), 490);
        assertLess(Number(plant.countSafe), 497);
    })
})