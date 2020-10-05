let ary = [];
let canvasHeight = 500;
let canvasWidth = 700;
let barWidth = 35;
let minimumBarHeight = 10;
let numberOfBars = (canvasWidth - barWidth) / barWidth;

let standardColor = 'white';
let minColor = 'red';
let sortedColor = 'lightgreen';
let pointerI = 0;
let pointerJ = 1;
let min = pointerI;
let fps = 5;
let radio, button;

let arrayIsBuilt = false;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    background(220);
    radio = createRadio();
    radio.option(1, 'random');
    radio.option(2, 'in ascending order');
    radio.option(3, 'in descending order');
    button = createButton('get to sorting!');
    frameRate(fps);
    textSize(20);
    button.mousePressed(initArray);
}

function initArray() {
    let value = radio.value();
    if (value === "1") {
        for (let i = 0; i < numberOfBars; i++) {
            ary[i] = new Bar(Math.floor(Math.random() * canvasHeight / 2) + minimumBarHeight, barWidth, canvasHeight - 30);
        }
    } else if (value === "2") {
        for (let i = 0; i < numberOfBars; i++) {
            ary[i] = new Bar(i * canvasHeight / (2 * numberOfBars) + minimumBarHeight, barWidth, canvasHeight - 30)
        }
    } else {
        for (let i = 0; i < numberOfBars; i++) {
            ary[i] = new Bar((numberOfBars - i) * canvasHeight / (2 * numberOfBars) + minimumBarHeight, barWidth, canvasHeight - 30)
        }
    }

    radio.disable();
    loop();
}

function draw() {
    if (radio.value() === "") {
        noLoop();
        return;
    }
    background(220)
    redrawAry();
    drawLegend();
    if (pointerI >= ary.length - 1) {
        noLoop();
        return;
    } else {
        if (ary[pointerJ].height <= ary[min].height) {
            min = pointerJ;
        }
        pointerJ++;
    }
    if (pointerJ >= ary.length) {
        exchange(pointerI, min);
        pointerI++;
        min = pointerI;
        pointerJ = pointerI + 1;
    }
}

function drawLegend() {
    fill('white');
    rect(20, 20, 160, 100);
    rect(30, 90, 20, 20);
    fill('lightgreen')
    rect(30, 30, 20, 20);
    fill('red')
    rect(30, 60, 20, 20);
    fill('black');
    text('sorted', 60, 46);
    text('min = ' + min, 60, 76);
    text('unseen', 60, 106);
}

function redrawAry() {
    clear();
    background(220);
    for (let i = 0; i < numberOfBars; i++) {
        if (i === min && i < numberOfBars - 1) {
            ary[i].draw(minColor, i);
        } else if (i < pointerI) {
            ary[i].draw(sortedColor, i);
        } else {
            ary[i].draw(standardColor, i);
        }
    }
    fill('black')
    for (let i = 0; i < numberOfBars; i++) {
        text(i, i * barWidth + barWidth / 4, canvasHeight - 5);
    }
    text('i', pointerI * barWidth + barWidth / 2, ary[pointerI].y - ary[pointerI].height - 40);
    if (pointerJ < ary.length) {
        text('j', pointerJ * barWidth + barWidth / 2, ary[pointerJ].y - ary[pointerJ].height - 20);
    } else {
        text('j', pointerJ * barWidth + barWidth / 2, ary[pointerI].y - ary[pointerI].height - 20);
        ary[pointerI].draw(sortedColor, pointerI);
    }

}

function exchange(i, min) {
    let swappo = ary[i];
    ary[i] = ary[min];
    ary[min] = swappo;
}
