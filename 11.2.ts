type strArr = Array<string>;
type numArr = Array<number>;
type stoneMap = Map<string, number>
export const testData: string = '125 17';

export const fullData: string = '890 0 1 935698 68001 3441397 7221 27'

export class Stones {
    intialStones: strArr;
    evalMap: Map<string, strArr> = new Map()
    constructor(input: string) {
        this.intialStones = input.split(' ');
    }
    
    findIter (iterations: number): stoneMap {
        let currentStones: stoneMap = new Map()
        this.intialStones.forEach(ele => {
            const mapNumber = currentStones.get(ele);
            mapNumber ? currentStones.set(ele, mapNumber + 1) : currentStones.set(ele, 1)
        })
        for (let i = 0; i < iterations; i ++) {
            const nextStones: stoneMap = new Map()
            currentStones.forEach((count, stone) => {
                const mappedResult = this.evalMap.get(stone)
                if(mappedResult) {
                    mappedResult.forEach(ele => {
                        const mapNumber = nextStones.get(ele);
                        mapNumber 
                        ? nextStones.set(ele, mapNumber + count)
                        : nextStones.set(ele, count)        
                    })
                } else {
                    const evalResult = determinesReplacements(stone);
                    this.evalMap.set(stone, evalResult)
                    evalResult.forEach(ele => {
                        const mapNumber = nextStones.get(ele);
                        mapNumber 
                        ? nextStones.set(ele, mapNumber + count)
                        : nextStones.set(ele, count)        
                    })
                }
            })
            currentStones = nextStones
        }
        return currentStones
    }

    findSum (iterations: number): number {
        const map = this.findIter(iterations);
        let sum: number = 0
        map.forEach(val => sum += val)
        return sum
    }
}

export function passesRuleOne (string: string): boolean {
    return Number(string) === 0 ? true : false
}

export function passesRuleTwo (string: string): boolean {
    return string.length % 2 === 0 ? true : false
}

export function determinesReplacements (string: string): strArr {
    const replacements: strArr = []
    if (passesRuleOne(string)) {
        replacements.push('1')
    } else if (passesRuleTwo(string)) {
        replacements.push(string.substring(0, string.length / 2));
        replacements.push(String(Number(string.substring(string.length / 2))))
    } else {
        replacements.push(String(Number(string) * 2024))
    }
    return replacements
}