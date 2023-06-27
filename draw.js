// Les fonctions ci-dessous causent des effets de bords qu'on ne peut pas éviter.

const getCenter = () => {
    const canvas = document.querySelector('#canvas');
    return { x: canvas.width / 2, y : canvas.height / 2};
}

// drawLine :: context -> Point -> Point -> None
const drawLine = ctx => debut => fin => {
    ctx.beginPath();
    // On effectue une translation pour que ça reste dans le canvas
    ctx.moveTo(debut.x + getCenter().x, debut.y + getCenter().y);
    ctx.lineTo(fin.x + getCenter().x, fin.y + getCenter().y);
    ctx.stroke();
}

// drawLines :: context -> [Point] -> *
const drawLines = ctx => points => {
    if ( points.length > 1) {
        drawLine(ctx)(points[0])(points[1]);
        drawLines(ctx)(shift(points));
    }
}
 
// drawPath :: [Point] -> None
const drawPath = points => {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;

    drawLines(ctx)(points);
}