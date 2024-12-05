import {List, testInput, fullInput} from './01.2.ts'
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
  await t.step('get similarity', async() => {
    const {similarityMap} = list;
    assertEquals(similarityMap.get(3), 3);
    assertEquals(similarityMap.get(2), 0);
    assertEquals(similarityMap.get(4), 1);
  })
  await t.step('get sum', async () => {
    assertEquals(list.sum, 31)
  })
})

const list = new List(fullInput)
console.log({sum: list.sum})