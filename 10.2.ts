type strArr = Array<string>;
type coordinate = {x: number, y: number, height: number};
type locations = Array<coordinate>

export const testData = [
    '89010123',
    '78121874',
    '87430965',
    '96549874',
    '45678903',
    '32019012',
    '01329801',
    '10456732',
]

export const fullData = [
    '4308765476541010123498898543423458767898432123454387210',
    '5219002389532309835567387612210569678763010036767896523',
    '6578111001654318756765487606787634569854321879879265674',
    '7869223210789223643890394565890123452987412969778104985',
    '8954354378901134532431213064321210981236503458763203876',
    '7321269457432001121345302154760107870145783234654312101',
    '3030378766589112030236034565871012565057890145576447878',
    '2109432852348743940107125678965143456760761076485436969',
    '3278501901257657854398324989854234327871252980390125458',
    '4567687823768567761295413070123349818982343101287834301',
    '0123596314899658980786502110543056700178987232396965210',
    '7874105405658743801657876325632198765230876540105456789',
    '6965012308756752102340965434789430124321965431234305678',
    '3453210219567801234561234478996521035898012320123212501',
    '4354234789458943107876874567667830546734343211210789410',
    '3269105656327652106988965413454945675125254302323654321',
    '0178654569810785435843214302123986789076167019454789012',
    '4323763678987696524356903212012675896985098108545643422',
    '5016892109012587813247872456903504765430789217655652101',
    '6727654068103423902136501347865413890121894327896766501',
    '5898343877678014321045696219870322934578765436521897432',
    '0981232966549165012136787900761231025689456943430198125',
    '1270301051032078983023129871234012310780367852391789034',
    '2567410145121189674510036700965567498891234761087076540',
    '3458547236010234567612445212873498567890345678156105421',
    '2189678987321109878102344343962145656765432109343218432',
    '5078981087455610969201257652450034565654501656734569849',
    '6789672398534701454382568701321127674985432349823678958',
    '5010965467629812345699879811232078981276543036910589867',
    '4127854102018790456781236760103465210300187127832430150',
    '3236543201126781065400145407632564367210296676541321041',
    '8745696012337652878312439818541673458341345587560345632',
    '9656787763018943969223456729230982109452213495671256765',
    '2345669854325676852108987634101065432969302104380189854',
    '1105678760134980345670104545432178341878454213298989923',
    '0234389321101671238983203692345899250545563210101876310',
    '2109489430238980108974312781056787167436778921032365400',
    '3478076589845671067065693676176596078929879780123456321',
    '4567189871234567652108787676785454321010785691434234542',
    '8983287860043458943239654587792309451021094396560147623',
    '7654896952154367438740543297871218762136789287678988012',
    '1012345443763219829651270106980367643445672110589689123',
    '5101056339821006710154389015454454324934101023478765434',
    '4298763232100145603455676723303465815873205192107685445',
    '5675610103243234912369879854212556906763216783298596326',
    '4384324234352107809878766765189657875454345690123487015',
    '3295435435461234762703454101078703965234432101094509876',
    '2126306326970345671012963210987612050125105678987610745',
    '4017217017889789982167878456876543140156234783234321030',
    '3018918523778650173450189387945678231287105990125238921',
    '2127809456234043268943201296532169874397654891076149865',
    '3456912387105123457652100145632054365698923781089056774',
    '9320149896696143210781763236541065251207210650198456783',
    '8013234756787056945690854167632107100316540143232343892',
    '7654105665432167832101941018943298765423434234321014901',
]

export class TrailMap {
    topo: strArr;
    scores: number = 0;
    ratings: number = 0;
    trailheads: locations = [];
    fullTrails: Set<string> = new Set();
    startsEnds: Set<string> = new Set();
    constructor(input: strArr) {
        this.topo = input;
        this.#identifyTrailheads()
        for (let i = 0; i < this.trailheads.length; i ++) {
            const possiblePaths = this.walkPath(this.trailheads[i]);
            possiblePaths.forEach(path => {
                this.fullTrails.add(JSON.stringify(path))
                this.startsEnds.add(JSON.stringify([path[0], path[path.length - 1]]))
            })
        }
        this.scores = this.startsEnds.size;
        this.ratings = this.fullTrails.size;
    }
    
    #identifyTrailheads () {
        // Define Regex to search for Trailheads
        const regex = new RegExp (/0/, 'g');
        for (let i = 0; i < this.topo.length; i ++) {
            // Loop through each line of the map, pushing locations that match the Regex
            while(true) {
                if (!regex.test(this.topo[i])) {
                    break
                }
                this.trailheads.push({
                    x: regex.lastIndex - 1,
                    y: i,
                    height: 0
                })
            }
        }
    }

    findNextSteps (
        currCoord: coordinate,
    ): locations {
        const {x, y, height} = currCoord;
        if (height === 9) {return []}

        const above: coordinate | null =
        y > 0 
        ? {
            x: x,
            y: y - 1,
            height: Number(this.topo[y - 1][x])
        }
        : null;

        const below: coordinate | null =
        y < this.topo.length - 1
        ? {
            x: x,
            y: y + 1,
            height: Number(this.topo[y + 1][x])
        }
        : null;

        const right: coordinate | null = 
        x < this.topo[y].length - 1
        ? {
            x: x + 1,
            y: y,
            height: Number(this.topo[y][x + 1])
        }
        : null;
        
        const left: coordinate | null =
        x > 0
        ? {
            x: x - 1,
            y: y,
            height: Number(this.topo[y][x - 1])
        }
        : null;

        const nextSteps: locations = []
        if (above !== null) {nextSteps.push(above)}
        if (right !== null) {nextSteps.push(right)}
        if (below !== null) {nextSteps.push(below)}
        if (left !== null) {nextSteps.push(left)}

        return nextSteps.filter((val) => {
            return val.height === height + 1
        })
    }

    walkPath (currCoord: coordinate): Array<locations> {
        if (currCoord.height === 9) {
            return [[currCoord]]
        }
        const nextSteps: locations = this.findNextSteps(currCoord);
        if (nextSteps.length === 0) {
            return [[currCoord]]
        }
        const returnPaths: Array<locations> = []
        for (let i = 0; i < nextSteps.length; i ++) {
            const possiblePaths = this.walkPath(nextSteps[i]);
            possiblePaths.forEach(val => {
                const pathWithCurrent = [currCoord].concat(val);
                returnPaths.push(pathWithCurrent)
            })
        }
        return returnPaths.filter(ele => ele[ele.length - 1].height === 9)
    }
}