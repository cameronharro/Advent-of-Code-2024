import {List, testInput, fullInput} from './01.1.ts'
import { assertEquals } from "@std/assert"

Deno.test(async function testData(t) {
  const list = new List(testInput)
  await t.step('format data', async () => {
    const {listOne, listTwo} = list;
    assertEquals(listOne.length, list.listTwo.length);
    assertEquals(listOne[0], 1);
    assertEquals(listTwo[0], 3);
    assertEquals(listOne[listOne.length - 1], 4);
    assertEquals(listTwo[listTwo.length - 1], 9);
  })
  await t.step('get differences', async() => {
    const {differences} = list;
    assertEquals(differences[0], 2);
    assertEquals(differences[differences.length - 1], 5);
  })
  await t.step('get sum', async () => {
    assertEquals(list.sum, 11)
  })
})

const list = new List(fullInput)
console.log({sum: list.sum})