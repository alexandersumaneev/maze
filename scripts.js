var h, w, canvas, ctx, arr = [], n = 34, imgsize = 32, shipx = 0, shipy = 0;
var planetx = 0, planety = 0, obj = 0, rigthside, alg = 0;
var shipt, shipr, shipb, shipl, stop;

function loadPage() {
    init();
    drawMaze();
    showCanvas();
    document.getElementById('aboutwin').style.display = 'none';
}

function showCanvas() {
    document.getElementById('canvas').style.display = 'inherit';
    document.getElementById('aboutwin').style.display = 'none';
    document.getElementById('helpwin').style.display = 'none';
    document.getElementById('prefwin').style.display = 'none';
}

function aboutOpen() {
    showCanvas();
    document.getElementById('aboutwin').style.display = 'inherit';
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('helpwin').style.display = 'none';
    document.getElementById('prefwin').style.display = 'none';
}

function prefOpen() {
    showCanvas();
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('aboutwin').style.display = 'none';
    document.getElementById('helpwin').style.display = 'none';
    document.getElementById('prefwin').style.display = 'inherit';
}

function helpOpen() {
    showCanvas();
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('aboutwin').style.display = 'none';
    document.getElementById('helpwin').style.display = 'inherit';
    document.getElementById('prefwin').style.display = 'none';
}

function createCtx() {
    canvas = document.getElementById('canvas');
    h = canvas.clientHeight;
    w = canvas.clientWidth;
    ctx = canvas.getContext('2d');
    shipt = new Image();
    shipr = new Image();
    shipb = new Image();
    shipl = new Image();
    shipt.src = 'ship.png';
    shipr.src = 'shipr.png';
    shipb.src = 'shipd.png';
    shipl.src = 'shipl.png';
    canvas.addEventListener("mousedown", mouseDown, false);
}

//----------Создание лабиринта--------------------------------------------
function createGrid() {
    for (y = 0; y < n; y++) {
        arr[y] = [];
        for (x = 0; x < n; x++) {
            arr[y][x] = {};
            arr[y][x]['top'] = true;
            arr[y][x]['rigth'] = true;
            arr[y][x]['left'] = true;
            arr[y][x]['bottom'] = true;
            arr[y][x]['value'] = 0;
        }
    }
}

function createMaze() {
    for (k = 0; k < n - 1; k++) {
        arr[k][0]['rigth'] = false;
        arr[k + 1][0]['left'] = false;
        arr[n - 1][k + 1]['top'] = false;
        arr[n - 1][k]['bottom'] = false;
        arr[k + 1][n / 2]['top'] = true;
        arr[k + 1][n / 2 - 1]['bottom'] = true;
    }
    for (y = 1; y < n / 2; y++) {
        for (x = 0; x < n - 1; x++) {
            if (coinToss()) {
                arr[x][y]['top'] = false;
                arr[x][y - 1]['bottom'] = false;
            }
            else {
                arr[x][y]['rigth'] = false;
                arr[x + 1][y]['left'] = false;
            }

        }
    }
}

function init() {
    shipx = 0;
    shipy = 0;
    rigthside = 'rigth';
    planetx = getRandomInt(0, n - 1);
    planety = getRandomInt(0, n / 2 - 1);
    stop = true;
    changeOb();
    changeAlg();
    createCtx();
    createGrid();
    createMaze();
    b = document.getElementById('findway');
    b.removeAttribute('disabled');
}

//------------------------------------------------------------------------

function drawCell(x, y) {
    if (arr[x][y].top) {
        ctx.fillRect(x * imgsize, y * imgsize, imgsize, 2);//top
    }
    if (arr[x][y].rigth) {
        ctx.fillRect(x * imgsize + imgsize, y * imgsize, 2, imgsize);//right
    }

}

function drawShip(x, y) {
    switch (rigthside) {
        case 'rigth': {
            ctx.drawImage(shipt, x * imgsize, y * imgsize);
            break;
        }
        case 'bottom': {
            ctx.drawImage(shipr, x * imgsize, y * imgsize);
            break;
        }
        case 'left': {
            ctx.drawImage(shipb, x * imgsize, y * imgsize);
            break;
        }
        case 'top': {
            ctx.drawImage(shipl, x * imgsize, y * imgsize);
            break;
        }
    }
}

function drawPlanet(x, y) {
    ctx.fillStyle = "rgba(200, 0, 0, 0.7)";
    ctx.fillRect(x * imgsize + imgsize / 4, y * imgsize + imgsize / 4, imgsize / 2, imgsize / 2);
}

function drawWawe() {
    for (x = 0; x < n; x++) {
        for (y = 0; y < n / 2; y++) {
            ctx.fillStyle = "rgba(120, 220, 0, 0.5)";
            ctx.fillText('' + arr[x][y].value, x * imgsize + imgsize / 2, y * imgsize + imgsize / 2);
        }
    }
}


function leeAlg(x, y) {
    if (!arr[x][y].left) {
        if (arr[x - 1][y]['value'] == 0) {
            arr[x - 1][y]['value'] = arr[x][y]['value'] + 1;
            leeAlg(x - 1, y);
        }

    }
    if (!arr[x][y].top) {
        if (arr[x][y - 1]['value'] == 0) {
            arr[x][y - 1]['value'] = arr[x][y]['value'] + 1;
            leeAlg(x, y - 1);
        }

    }
    if (!arr[x][y].rigth) {
        if (arr[x + 1][y]['value'] == 0) {
            arr[x + 1][y]['value'] = arr[x][y]['value'] + 1;
            leeAlg(x + 1, y);
        }

    }
    if (!arr[x][y].bottom) {
        if (arr[x][y + 1]['value'] == 0) {
            arr[x][y + 1]['value'] = arr[x][y]['value'] + 1;
            leeAlg(x, y + 1);
        }

    }

}

function drawMaze() {
    ctx.fillStyle = "rgba(120, 120, 255, 0.7)";
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillRect(0, 0, 2, h);
    for (y = 0; y < n; y++) {
        for (x = 0; x < n; x++) {
            drawCell(x, y);
        }
    }
    drawShip(shipx, shipy);
    drawPlanet(planetx, planety);
}

function coinToss() {
    return (Math.floor(Math.random() * 2) === 0);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


function callLee() {
    leeAlg(planetx, planety);
    arr[planetx][planety]['value'] = 0;
    stop = false;
    drawLee();
    drawMaze();
    if (!(shipx == planetx && shipy == planety)) {
        b = document.getElementById('findway');
        b.setAttribute('disabled', true);
    }
}

function mouseDown(event) {
    mouseY = Math.round((event.pageY - document.getElementById('topmenu').clientHeight) / imgsize) - 1;
    mouseX = Math.round(event.pageX / imgsize) - 1;
    if (obj == 'planet') {
        planetx = mouseX;
        planety = mouseY;
        for (x = 0; x < n; x++)
            for (y = 0; y < n / 2; y++)
                arr[x][y].value = 0;
        leeAlg(planetx, planety);
        arr[planetx][planety]['value'] = 0;
        drawMaze();
    }
    if (obj == 'ship') {
        shipx = mouseX;
        shipy = mouseY;
    }
    drawMaze();
}


function drawLee() {
    var x0, y0;
    x0 = shipx;
    y0 = shipy;
    if (!arr[shipx][shipy]['left']) {
        if (arr[shipx - 1][shipy].value < arr[x0][y0].value) {
            x0 = shipx - 1;
            rigthside = 'top';
        }
    }
    if (!arr[shipx][shipy]['top']) {
        if (arr[shipx][shipy - 1].value < arr[x0][y0].value) {
            y0 = shipy - 1;
            rigthside = 'rigth';
        }
    }
    if (!arr[shipx][shipy]['bottom']) {
        if (arr[shipx][shipy + 1].value < arr[x0][y0].value) {
            y0 = shipy + 1;
            rigthside = 'left';
        }

    }
    if (!arr[shipx][shipy]['rigth']) {
        if (arr[shipx + 1][shipy].value < arr[x0][y0].value) {
            x0 = shipx + 1;
            rigthside = 'bottom';
        }
    }
    shipx = x0;
    shipy = y0;
    drawMaze();
    if (!(shipx == planetx && shipy == planety) && !stop) {
        drawWawe();
        playSound();
        setTimeout('drawLee();', 200);
    }
    else {
        b = document.getElementById('findway');
        b.removeAttribute('disabled');
        stop = false;
    }
}

function changeOb() {
    var inp = document.getElementsByName('obtype');
    for (var i = 0; i < inp.length; i++) {
        if (inp[i].type == "radio" && inp[i].checked) {
            obj = inp[i].value;
        }
    }
}

function playSound() {
    var sound = document.getElementById("audio");
    sound.play();
}

function drawHand() {
    if (!(shipx == planetx && shipy == planety) && !stop) {
        //смотрит вверх
        if (rigthside == 'rigth') {
            //если можно завернуть вправо
            if (!arr[shipx][shipy].rigth) {
                rigthside = 'bottom';
                shipx++
            } else {
                if (!arr[shipx][shipy].top) {
                    shipy--
                } else {
                    rigthside = 'left'
                }
            }
        }


        //смотрит влево
        if (rigthside == 'top') {
//если можно завернуть вверх
            if (!arr[shipx][shipy].top) {
                rigthside = 'rigth';
                shipy--;
            } else {
                if (!arr[shipx][shipy].left) {
                    shipx--
                } else {
                    rigthside = 'bottom'
                }
            }
        }


        //смотрит вниз
        if (rigthside == 'left') {
//если можно завернуть влево
            if (!arr[shipx][shipy].left) {
                rigthside = 'top';
                shipx--;
            } else {
                if (!arr[shipx][shipy].bottom) {
                    shipy++
                } else {
                    rigthside = 'rigth'
                }
            }
        }


        //смотрит вправо
        if (rigthside == 'bottom') {
//если можно завернуть вниз
            if (!arr[shipx][shipy].bottom) {
                rigthside = 'left';
                shipy++;
            } else {
                if (!arr[shipx][shipy].rigth) {
                    shipx++
                } else {
                    rigthside = 'top'
                }
            }
        }
        drawMaze();
        playSound();
        setTimeout('drawHand();', 200);
    }
    else {
        b = document.getElementById('findway');
        b.removeAttribute('disabled');
        stop = false;

    }

}

function callHand() {
    stop = false;
    drawMaze();
    drawHand();
    if (!(shipx == planetx && shipy == planety)) {
        b = document.getElementById('findway');
        b.setAttribute('disabled', true);
    }
}

function changeAlg() {
    var inp = document.getElementsByName('algtype');
    for (var i = 0; i < inp.length; i++) {
        if (inp[i].type == "radio" && inp[i].checked) {
            alg = inp[i].value;
        }
    }
    stop=true;
}

function callAlg() {
    if (alg == 'wave') {
        callLee();
    } else {
        callHand();
    }
}