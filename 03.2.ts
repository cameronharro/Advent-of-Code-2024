import { assertEquals } from "@std/assert/equals";

export const testInput: string = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`

export const fullData: string = await Deno.readTextFile('./03.fullData.txt')

export class Program {
    instructions: Array<string>
    numbers: Array<number> = []
    sum: number;
    constructor(input: string) {
        this.instructions = input.match(instruction) || [''];
        let enabled: boolean = true;
        this.instructions.forEach(ele => {
            if(enabled) {
                ele.match(evaluation)
                ? this.numbers.push(eval(ele))
                : ele.match(stop)
                    ? enabled = false
                    :null
            } else {
                ele.match(start) ? enabled = true : null
            }
        });
        this.sum = this.numbers.reduce((acc, curr) => acc + curr, 0)
    }
}

function mul(a: number | string, b: number | string): number {
    return Number(a) * Number(b)
}

const evaluation = new RegExp(/mul\(\d{1,3},\d{1,3}\)/)
const start = /do\(\)/
const stop = /don't\(\)/
const instruction = new RegExp(`${evaluation.source}|${start.source}|${stop.source}`,'g')

if(import.meta.main) {
    assertEquals(mul(2,4),8)
}