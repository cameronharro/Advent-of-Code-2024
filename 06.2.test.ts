import { assertEquals, assert, assertFalse } from "@std/assert";
import {
    testData,
    Guard,
    pivot,
    getNextLocation,
    trackBackwards,
    locationDirection,
    fullData
 } from "./06.2.ts"

Deno.test(async function testInput (t) {
    const guard = new Guard(testData);
    const {
        grid,
        startCoordinate,
        locations,
        walkedLocationsDirections,
        possibleLoops,
        possibleIntersections,
        intersections
    } = guard;
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
        assert(walkedLocationsDirections.has(JSON.stringify({"location":{"x":4,"y":6},"direction":"up"})))
    })
    
    await t.step('counts number of distinct locations', () => {
        assertEquals(locations.size, 41)
    })

    await t.step('tracks backwards', () => {
        const desired: locationDirection = {location: {x:5, y:3}, direction: 'right'};
        const unDesired: locationDirection = {location: {x:0, y:3}, direction: 'right'};
        const backwardsTrack = trackBackwards({x: 7, y: 3}, 'right', new Set(), guard.grid);
        // console.log(backwardsTrack)
        assert(backwardsTrack.has(JSON.stringify(desired)))
        assertFalse(backwardsTrack.has(JSON.stringify(unDesired)))
    })

    await t.step('counts number of possible loops', () => {
        console.log({walkedLocationsDirections, possibleIntersections, intersections})
        // console.log(walkedLocationsDirections.union(possibleIntersections), intersections)
        assertEquals(possibleLoops, 6)
    })
})

Deno.test(function fullInput() {
    const guard = new Guard(fullData);
    const {possibleLoops} = guard
    console.log({possibleLoops})
    assert(possibleLoops > 773)
})