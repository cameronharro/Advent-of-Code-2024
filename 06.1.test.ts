import { assertEquals, assert } from "@std/assert";
import { testData, Guard, pivot, getNextLocation, fullData } from "./06.1.ts"

Deno.test(async function testInput (t) {
    const guard = new Guard(testData);
    const {grid, startCoordinate, locations, locationsDirections} = guard;
    await t.step('transforms Data', () => {
        assertEquals(grid.length, 10);
        assertEquals(grid[0].length, 10);
    })
    
    await t.step('identifies starting location', () => {
        assertEquals({x: 4, y: 6}, startCoordinate)
    })
    
    await t.step('identifies next location and character', () => {
        assertEquals(getNextLocation({x: 4, y: 6}, 'up'), {x: 4, y: 5});
        assertEquals(getNextLocation({x: 4, y: 6}, 'right'), {x: 5, y: 6});
    })

    await t.step('rotates right at obstacle', () => {
        assertEquals(pivot(1), 'right');
        assertEquals(pivot(3), 'left');
        assertEquals(pivot(6), 'down');
        assertEquals(pivot(12), 'up');
    })

    await t.step('pushes location and direction to Set', () => {
        // console.log({locations, locationsDirections})
        assert(locations.has(JSON.stringify({"x":3,"y":4})))
        assert(locationsDirections.has(JSON.stringify({"location":{"x":4,"y":6},"direction":"up"})))
    })
    
    await t.step('counts number of distinct locations', () => {
        assertEquals(locations.size, 41)
    })
})

Deno.test(function fullInput() {
    const guard = new Guard(fullData);
    const {locations} = guard
    // console.log(locations.size)
    assertEquals(locations.size, 5145)
})