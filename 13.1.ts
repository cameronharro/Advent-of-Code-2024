import { assertEquals } from "@std/assert/equals";
import { assertGreater } from "@std/assert";

const testData: string[] = (await Deno.readTextFile('./13.testData.txt')).split(/Button|Prize:/).slice(1);
const fullData: string[] = (await Deno.readTextFile('./13.fullData.txt')).split(/Button|Prize:/).slice(1);

class Game {
    games: Record<string, any>[] = [];
    sum: number;
    constructor(input: string[]) {
        this.#processData(input)
        this.sum = this.getSum()
    }

    #processData (input: string[]) {
        while(input.length > 0) {
            const target = input.pop()?.match(/\d+/g)?.map(ele => Number(ele));
            const b = input.pop()?.match(/\d+/g)?.map(ele => Number(ele));
            const a = input.pop()?.match(/\d+/g)?.map(ele => Number(ele));
            if(target === undefined || a === undefined || b === undefined) {break}
            const solution = this.solveGame({a, b, target})
            solution.x % 1 === 0 && solution.y % 1 === 0
            ? this.games.push({a, b, target, solution})
            : this.games.push({a, b, target})
        }
        this.games.reverse()
    }

    solveGame (game: Record<string, number[]>) {
        const a = game.a[0];
        const b = game.b[0];
        const c = game.target[0];
        const d = game.a[1];
        const e = game.b[1];
        const f = game.target[1];
        const y = (c * d - f * a) / (d * b - a * e);
        const x = (c - f - (b - e) * y) / (a - d);
        return {x, y}
    }

    getSum () {
        let sum = 0;
        this.games.forEach(ele => {
            if (ele.solution === undefined) {return}
            sum += ele.solution.x * 3 + ele.solution.y
        })
        return sum
    }
}

Deno.test('testData', async (t) => {
    const game = new Game (testData);
    const {games, sum} = game;
    await t.step('parses game data', () => {
        assertEquals(game.games, [
            {
              a: [ 94, 34 ],
              b: [ 22, 67 ],
              target: [ 8400, 5400 ],
              solution: { x: 80, y: 40 }
            },
            { a: [ 26, 66 ], b: [ 67, 21 ], target: [ 12748, 12176 ] },
            {
              a: [ 17, 86 ],
              b: [ 84, 37 ],
              target: [ 7870, 6450 ],
              solution: { x: 38, y: 86 }
            },
            { a: [ 69, 23 ], b: [ 27, 71 ], target: [ 18641, 10279 ] }
        ])
    })
    await t.step('solves games', () => {
        assertEquals(game.solveGame(games[0]), {x: 80, y: 40})
        assertEquals(game.solveGame(games[2]), {x: 38, y: 86})
    })
    await t.step('gets sum', () => {
        assertEquals(sum, 480)
    })
})

Deno.test('fullData', () => {
    const game = new Game(fullData);
    // console.log(game.games)
    assertGreater(game.sum, 34602)
})