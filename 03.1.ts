export const testInput: string = 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))'

export const fullData: string = await Deno.readTextFile('./03.fullData.txt')

export class Program {
    instructions: Array<string>
    numbers: Array<number> = []
    sum: number;
    constructor(input: string) {
        this.instructions = input.match(instruction) || [''];
        this.instructions.forEach(ele => this.numbers.push(eval(ele)));
        this.sum = this.numbers.reduce((acc, curr) => acc + curr, 0)
    }
}

function mul(a: number | string, b: number | string): number {
    return Number(a) * Number(b)
}

const instruction = new RegExp(/mul\(\d{1,3},\d{1,3}\)/g)