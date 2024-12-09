type strArr = Array<string>;
type coordinate = {x: number, y: number}
type slope = {rise: number, run: number}
type antennae = Array<coordinate>

export const testData: strArr = [
    '............',
    '........0...',
    '.....0......',
    '.......0....',
    '....0.......',
    '......A.....',
    '............',
    '............',
    '........A...',
    '.........A..',
    '............',
    '............',
]

export const fullData: strArr = [
    '.C...............w.......................M.E......',
    '...............G........V.............Q....M......',
    'u........k...........V.y..3........Q..........4.a.',
    '..........c.9........k..................i..7..a...',
    '..............y.......................o....a......',
    '.......C...........6.......y.............E........',
    '.............................5....x............i..',
    '...............c.....wy..V.......5..............E.',
    '........k.......c....G..I............o.........m..',
    '............C....s......G......o..........5.......',
    '......................Q...............5....e...4i.',
    '.....I.....................................m.....j',
    '....9K.T.....I...c......w...................X.....',
    '................I.........w....f............3..e.N',
    'C............9..........6..............7...3......',
    '...Z........K.......T.................6...........',
    '......Z..................6...............HN.E.m...',
    '...K...........................1....N...e.o..X....',
    '............hz......................7........j....',
    '.........9......U.R......n.....4.Q..L...X.........',
    '..................A...........S.......0...........',
    '...............l.........p...........2.3M.......x.',
    '.h........................U.................g.....',
    '...Hld...........A..W.......................1x....',
    '.....Z.....n.......lp...e............Xj...L.......',
    '........hU................7...j...S...............',
    '......n............U..........D....S..q...........',
    '....H.....d.r..T..............0..........L.S......',
    '......H......A..T...lp.........LK....1.....2.f.x..',
    '....Z............................g....4...........',
    '..d..r............V...............f..g....2.......',
    '.rn.........D............Pp........q....g.........',
    '..................................................',
    '...................D...0.........Y..t...P.q.......',
    '.......R.s.......................q.P..1...........',
    '...........h..........................2.........f.',
    '........................W.........................',
    '...8...........O................k.................',
    '....rY...........D................P...............',
    '....................O...u.........................',
    '..s..................F............................',
    '...................R......F.......................',
    '......8...........z0....F................J.W......',
    '...................F..z................u..........',
    '..............R.........O.............v.Jt........',
    's.............8.........m........J.t............v.',
    '......Y.....M........................u..tv........',
    '.................................................v',
    '..................................................',
    '.................z.W..................J...........',
]

export class SignalMap {
    grid: strArr;
    antennaeMap: Map<string, Array<coordinate>> = new Map();
    antinodes: Set<string> = new Set();
    count: number
    constructor(input: strArr) {
        this.grid = input;
        this.#getAntennae();
        this.antennaeMap.forEach((val) => this.#evaluateAntinodes(val))
        this.count = this.antinodes.size
    }

    #getAntennae () {
        for (let i = 0; i < this.grid.length; i ++) {
            this.grid[i].split('').forEach((ele, ii) => {
                if (ele === '.') {return}
                const presentCoordinate: coordinate = {x: ii, y: i};
                this.antennaeMap.has(ele)
                ? this.antennaeMap.get(ele)?.push(presentCoordinate)
                : this.antennaeMap.set(ele, [presentCoordinate])
            })
        }
    }



    #evaluateAntinodes(antennae: antennae) {
        antennae.forEach((ele, i) => {
            const remainingAntennae = antennae.slice(i + 1, antennae.length);
            if (remainingAntennae.length === 0) { return }
            for (const antenna of remainingAntennae) {
                const slope = getSlope(ele, antenna);
                const antinodes = getAntinodes(ele, slope, this.grid)
                antinodes.forEach(ele => this.antinodes.add(JSON.stringify(ele)))
            }
        })
    }
}

export function getSlope(point1: coordinate, point2: coordinate): slope {
    const run: number = point2.x - point1.x;
    const rise: number = point2.y - point1.y;
    return {rise, run}
}

export function getAntinodes(
    point1: coordinate,
    slope: slope,
    grid: strArr
): Array<coordinate> {
    const antinodes: Array<coordinate> = [];
    let i = 1
    while (true) {
        const antinode = {x: point1.x - (i * slope.run), y: point1.y - (i * slope.rise)};
        if (!checkIsInsideMap(antinode, grid)) {
            i = 0;
            break
        }
        antinodes.push(antinode);
        i ++;
    }
    while (true) {
        const antinode = {x: point1.x + (i * slope.run), y: point1.y + (i * slope.rise)};
        if (!checkIsInsideMap(antinode, grid)) {
            break
        }
        antinodes.push(antinode);
        i ++;
    }
    return antinodes.sort((a, b) =>  a.x - b.x)
}

function checkIsInsideMap(coordinate: coordinate, grid: strArr): boolean {
    const {x, y} = coordinate
    if(x < 0 || y < 0) {return false}
    if(y >= grid.length) {return false}
    if(x >= grid[y].length) {return false}
    return true
}