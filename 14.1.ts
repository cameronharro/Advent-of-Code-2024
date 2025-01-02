import { assertEquals } from "@std/assert";

const testData: string = (await Deno.readTextFile('./14.testData.txt'))
const fullData: string = (await Deno.readTextFile('./14.fullData.txt'))

type xyPair = {x: number, y: number};
type robot = {
    startingCoor: xyPair,
    velocity: xyPair
}

class Lobby {
    robots: robot[] = [];
    lobbySize: xyPair;
    constructor(robotData: string, lobbySize: xyPair) {
        this.lobbySize = lobbySize;
        this.#parseData(robotData);

    }
    
    #parseData (input: string) {
        const rawData = input.split(/p\=|v\=/).slice(1).map(ele => ele.split(',').map(ele => Number(ele))).reverse();
        while(rawData.length > 0) {
            const loc = rawData.pop();
            const vel = rawData.pop();
            if (loc === undefined || vel === undefined) {break}
            this.robots.push({startingCoor: {x: loc[0], y: loc[1]}, velocity: {x: vel[0], y: vel[1]}})
        }
    }

    getPosition(robotId: number, seconds: number) {
        const robot = this.robots[robotId]
        let x = (robot.startingCoor.x + robot.velocity.x * seconds) % this.lobbySize.x;
        let y = (robot.startingCoor.y + robot.velocity.y * seconds) % this.lobbySize.y;
        if(x < 0){x = x + this.lobbySize.x}
        // deno-lint-ignore no-compare-neg-zero
        if(x === -0){x = 0}
        if(y < 0){y = y + this.lobbySize.y}
        // deno-lint-ignore no-compare-neg-zero
        if(y === -0){y = 0}

        return {x, y}
    }

    getAllPositions(seconds: number) {
        return this.robots.map((_ele, index) => this.getPosition(index, seconds))
    }

    getSafetyFactor(seconds: number) {
        let q1 = 0;
        let q2 = 0;
        let q3 = 0;
        let q4 = 0;
        const locations = this.getAllPositions(seconds)
        locations.forEach(ele => {
            if (ele.x < (this.lobbySize.x - 1) / 2 && ele.y < (this.lobbySize.y - 1) / 2) {
                q1++;
            }
            if (ele.x >= (this.lobbySize.x + 1) / 2 && ele.y < (this.lobbySize.y - 1) / 2) {
                q2++;
            }
            if (ele.x < (this.lobbySize.x - 1) / 2 && ele.y >= (this.lobbySize.y + 1) / 2) {
                q3++;
            }
            if (ele.x >= (this.lobbySize.x + 1) / 2 && ele.y >= (this.lobbySize.y + 1) / 2) {
                q4++;
            }
        })
        return q1 * q2 * q3 * q4
    }
}

Deno.test('testData', async (t) => {
    const lobby = new Lobby(testData, {x: 11, y: 7});
    await t.step('parses data', () => {
        assertEquals(lobby.robots, [
            { startingCoor: { x: 0, y: 4 }, velocity: { x: 3, y: -3 } },
            { startingCoor: { x: 6, y: 3 }, velocity: { x: -1, y: -3 } },
            { startingCoor: { x: 10, y: 3 }, velocity: { x: -1, y: 2 } },
            { startingCoor: { x: 2, y: 0 }, velocity: { x: 2, y: -1 } },
            { startingCoor: { x: 0, y: 0 }, velocity: { x: 1, y: 3 } },
            { startingCoor: { x: 3, y: 0 }, velocity: { x: -2, y: -2 } },
            { startingCoor: { x: 7, y: 6 }, velocity: { x: -1, y: -3 } },
            { startingCoor: { x: 3, y: 0 }, velocity: { x: -1, y: -2 } },
            { startingCoor: { x: 9, y: 3 }, velocity: { x: 2, y: 3 } },
            { startingCoor: { x: 7, y: 3 }, velocity: { x: -1, y: 2 } },
            { startingCoor: { x: 2, y: 4 }, velocity: { x: 2, y: -3 } },
            { startingCoor: { x: 9, y: 5 }, velocity: { x: -3, y: -3 } }
        ])
    })

    await t.step('finds position', () => {
        assertEquals(lobby.getPosition(10,0),{ x: 2, y: 4 })
        assertEquals(lobby.getPosition(10,1),{ x: 4, y: 1 })
        assertEquals(lobby.getPosition(10,2),{ x: 6, y: 5 })
        assertEquals(lobby.getPosition(10,3),{ x: 8, y: 2 })
        assertEquals(lobby.getPosition(10,4),{ x: 10, y: 6 })
        assertEquals(lobby.getPosition(10,5),{ x: 1, y: 3 })
    })

    await t.step('gets all positions', () => {
        assertEquals(lobby.getAllPositions(100), [
            { x: 3, y: 5 }, { x: 5, y: 4 },
            { x: 9, y: 0 }, { x: 4, y: 5 },
            { x: 1, y: 6 }, { x: 1, y: 3 },
            { x: 6, y: 0 }, { x: 2, y: 3 },
            { x: 0, y: 2 }, { x: 6, y: 0 },
            { x: 4, y: 5 }, { x: 6, y: 6 }
          ])
    })

    await t.step('gets safety factor', () => {
        assertEquals(lobby.getSafetyFactor(100), 12)
    })
})

Deno.test('fullData', () => {
    const lobby = new Lobby(fullData, {x: 101, y: 103});
    console.log({fullSafetyFactor: lobby.getSafetyFactor(100)})
    assertEquals(lobby.getSafetyFactor(100), 218295000)
})