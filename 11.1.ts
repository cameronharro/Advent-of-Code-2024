type strArr = Array<string>;
type numArr = Array<number>;
export const testData: string = '125 17';

export const fullData: string = '890 0 1 935698 68001 3441397 7221 27'

export class Stones {
    intialStones: strArr;
    constructor(input: string) {
        this.intialStones = input.split(' ');
    }
    findIter (iterations: number): strArr {
        let currentStones = Array.from(this.intialStones);
        for (let i = 0; i < iterations; i ++) {
            let nextStones: strArr = [];
            for (let ii = 0; ii < currentStones.length; ii ++) {
                nextStones = nextStones.concat(determinesReplacements(currentStones[ii]))
            }
            currentStones = nextStones
        }
        return currentStones
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