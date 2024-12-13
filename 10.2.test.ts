import { assertEquals } from "@std/assert";
import { TrailMap, fullData, testData } from "./10.2.ts"

Deno.test('testData',async (t) => {
    const trailMap = new TrailMap(testData);

    await t.step('identifies trailheads', () => {
        assertEquals(trailMap.trailheads, [
            { x: 2, y: 0, height: 0 },
            { x: 4, y: 0, height: 0 },
            { x: 4, y: 2, height: 0 },
            { x: 6, y: 4, height: 0 },
            { x: 2, y: 5, height: 0 },
            { x: 5, y: 5, height: 0 },
            { x: 0, y: 6, height: 0 },
            { x: 6, y: 6, height: 0 },
            { x: 1, y: 7, height: 0 }
        ])
    })

    await t.step('identifies valid next directions', () => {
        // console.log(trailMap.findNextSteps({x: 3, y: 2, height: 3}))
        assertEquals(trailMap.findNextSteps({x: 3, y: 2, height: 3}), [
            { x: 3, y: 3, height: 4 },
            { x: 2, y: 2, height: 4 }
        ])
    })

    await t.step('walks one full branching path', () => {
        const walkedPath = trailMap.walkPath({x: 6, y: 4, height: 0});
        assertEquals(walkedPath[0][9], { x: 5, y: 2, height: 9 })
        assertEquals(walkedPath[3][9], { x: 4, y: 3, height: 9 })
    })
    
    await t.step('walks all paths and logs all paths and unique starts/ends', () => {
        const {fullTrails, startsEnds} = trailMap;
        assertEquals(fullTrails.size, 81)
        assertEquals(startsEnds.size, 36)
    })
    
    await t.step('sums all path scores ', () => {
        assertEquals(trailMap.scores, 36)
    })
})

Deno.test('fullData', () => {
    const trailMap = new TrailMap(fullData);
    const {scores, ratings} = trailMap
    console.log({scores, ratings})
    assertEquals(scores, 698)
    assertEquals(ratings, 1436)
})