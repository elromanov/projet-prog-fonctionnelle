/**
 * * REQUIRED FUNCTIONS
*/

const myShift = list => {
    //return list.slice(1, list.length);
    return newSlice(list)(1)(list.length);
}

const newSlice = list => start => end => {
    if(start == end) return [];
    return [list[start]].concat(newSlice(list)(start+1)(end));
}

/**
* * PARTIE TURTLE
*/

// Structure Point & Turtle
var Point = (x,y) => {return {x,y}};
var Turtle = (point, angle) => {return {point, angle}};

// Création d'un Point et d'une Turtle pour tester le programme
const p_test = Point(0,0);
const turtle_test = Turtle(p_test, 0);

// forward :: Float -> Turtle -> Turtle
const forward = pixels_to_move => turtle => {
    return Turtle(Point(
        turtle.point.x + (pixels_to_move * (Math.cos((turtle.angle*Math.PI)/180))),
        turtle.point.y + (pixels_to_move * (Math.sin((turtle.angle*Math.PI)/180))
    )), turtle.angle);
}

// left :: Double -> Turtle -> Turtle
const left = angleToChange => turtle => {
    return Turtle(turtle.point, turtle.angle + angleToChange);
}

// right :: Double -> Turtle -> Turtle
const right = angleToChange => turtle => {
    return Turtle(turtle.point, turtle.angle - angleToChange);
}

// addPoint :: [Point] -> Turtle -> [Point]
const addPoint = point_list => turtle => {
    return point_list.concat([turtle.point]);
}

/**
 * * PARTIE L-SYSTEMES
*/

// vonKochRules :: Rules
const vonKochRules = {"F": "F-F++F-F", "+":"+", "-":"-"}

// next :: Rules -> Word -> Word
const next = rules => word => {
    return next_aux(rules)(word)("");
}

// next_aux :: Rules -> Word -> (t -> t -> t) -> accumulator
const next_aux = rules => word => acc => {
    if(word.length == 0) return acc;
    if(rules[word[0]]){
        return next_aux(rules)(myShift(word))(acc.concat(rules[word[0]]));
    }
    return acc;
}

// lSystem :: Axiom -> Rules -> Int -> Word
const lSystem = axiom => rules => n => {
    if(n == 0) return axiom;
    return lSystem(next(rules)(axiom))(rules)(n-1);
}

/**
 * * Types needed to draw L-SYSTEMS
 */
const Config = (t, l, a) => {return {turtle: t, stepSize: l, angle: a}};
const DrawState = (turtle, pointList) => {return {turtle: turtle, path: pointList}};

// let config = Config(turtle_test, 100, 90);
// let draw_state = DrawState(turtle_test, []);

// interpretSymbol :: Config -> DrawState -> Symbol -> DrawState
const interpretSymbol = config => drawState => symbol => {
    if(symbol == "F"){
        return DrawState(forward(config.stepSize)(drawState.turtle), drawState.path.concat([forward(config.stepSize)(drawState.turtle).point]))
    }
    if(symbol == "+"){
        return DrawState(left(config.angle)(drawState.turtle), drawState.path);
    }
    if(symbol == "-"){
        return DrawState(right(config.angle)(drawState.turtle), drawState.path);
    }
}

// interpretWord :: Config -> DrawState -> Word -> DrawState
const interpretWord = config => drawState => word => {
    if(word.length == 0) return drawState;
    return interpretWord(config)
    (interpretSymbol(config)(drawState)(word[0]))(myShift(word));
}

// lSystemPath :: Config -> LSystem -> Int -> [Point]
const lSystemPath = config => lsystem => n => {
    return interpretWord(config)(DrawState(config.turtle, []))(lsystem(n)).path;
    //return interpretWord(config)(DrawState(config[0],[]))(lsystem(n))["path"];
}

// console.log(interpretSymbol(config)(draw_state)('F'));
// console.log(interpretSymbol(config)(draw_state)('+'));
// console.log(interpretWord(config)(draw_state)('F+F'));

//console.log(lSystemPath(config)(lSystem("F")(vonKochRules))(3));

let turtle = Turtle(Point(-450,0),0);
let config = Config(turtle, 10, 60);
drawPath(lSystemPath(config)(lSystem("F")(vonKochRules))(4));