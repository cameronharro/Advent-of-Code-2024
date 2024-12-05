import { fullData, Program, testInput, } from './03.2.ts'
import { 
    assertEquals,
    // assertGreater,
    // assertLess
} from "@std/assert"

Deno.test(async function testData (t) {
    const program = new Program(testInput)
    await t.step('extracts instructions', () => {
        const {instructions} = program;
        console.log(instructions)
        assertEquals(instructions.length, 6);
        assertEquals(instructions[0], 'mul(2,4)');
        assertEquals(instructions[1], 'don\'t()');
    })
    await t.step('evaluates instructions', () => {
        const {numbers} = program;
        assertEquals(numbers.length, 2);
        assertEquals(numbers[0], 8);
        assertEquals(numbers[numbers.length - 1], 40);
    })
    await t.step('calculates sum', () => {
        const {sum} = program;
        assertEquals(sum, 48)
    })
})

console.log({fullSum: new Program(fullData).sum})