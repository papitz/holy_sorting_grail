let ary = [];
let canvasHeight;
let canvasWidth;
let barWidth = 35;
let minimumBarHeight = 10;
let numberOfBars = 15;

let standardColor = 'white';
let minColor = 'red';
let sortedColor = 'lightgreen';
let pointerI = 0;
let pointerJ;
let min;
let selectedSort, selectedOrder;
let fps = 4;
let radioOrder, radioSort, startButton, restartButton;

let arrayIsBuilt = false;

let statsCompares = 0, statsExchanges = 0;

function setup() {
    canvasWidth = windowWidth;
    canvasHeight = windowHeight - 100;
    barWidth = (canvasWidth) / (numberOfBars + 1);

    createCanvas(canvasWidth, canvasHeight);
    background(220);

    //Headline:
    textAlign(CENTER);
    textSize(25);
    text('Elementary Sorts', canvasWidth / 2, 25);
    textSize(15)

    //Radios Select Sorting Method
    radioSort = createRadio('sort');
    radioSort.option("sel", 'Selection Sort');
    selectedSort = radioSort.selected("sel");
    radioSort.option("ins", 'Insertion Sort');
    selectedSort = radioSort.value();

    //Radios Select initial order of Input
    radioOrder = createRadio('order');
    radioOrder.option("rnd", 'in random order');
    radioOrder.option("asc", 'in ascending order');
    radioOrder.option("des", 'in descending order');

    selectedOrder = radioOrder.value();

    //sort/restart button
    startButton = createButton('get to sorting!');
    restartButton = createButton('Restart')
    frameRate(fps);
    textSize(15);
    startButton.mousePressed(initArray);
    restartButton.mousePressed(reloadPage);
}

function reloadPage() {
    location.reload();
}

function initArray() {
    selectedSort = radioSort.value();
    selectedOrder = radioOrder.value();
    if (selectedSort === "" || selectedOrder === "") return;
    if (selectedOrder === "rnd") {
        for (let i = 0; i < numberOfBars; i++) {
            ary[i] = new Bar(Math.floor(Math.random() * canvasHeight / 2) + minimumBarHeight, barWidth, canvasHeight - 30);
        }
    } else if (selectedOrder === "asc") {
        for (let i = 0; i < numberOfBars; i++) {
            ary[i] = new Bar(i * canvasHeight / (2 * numberOfBars) + minimumBarHeight, barWidth, canvasHeight - 30)
        }
    } else {
        for (let i = 0; i < numberOfBars; i++) {
            ary[i] = new Bar((numberOfBars - i) * canvasHeight / (2 * numberOfBars) + minimumBarHeight, barWidth, canvasHeight - 30)
        }
    }
    if (selectedSort === "sel") {
        pointerJ = 1;
        min = pointerI;
    } else {
        pointerJ = 0;
        min = pointerI;
    }

    radioOrder.disable();
    radioSort.disable();
    startButton.attribute('disabled', '');
    loop();
}

function draw() {
    if (selectedOrder === "" || selectedSort === "") {
        noLoop();
        return;
    }
    background(220)
    if (radioSort.value() === "sel") {
        redrawAry();
        drawLegend();
        selectionSort();
    } else {
        redrawAry();
        drawLegend();
        insertionSort();
    }
}

function selectionSort() {
    if (pointerI >= ary.length - 1) {
        noLoop();
        return;
    } else {
        if (ary[pointerJ].height <= ary[min].height) {
            min = pointerJ;
        }
        statsCompares++;
        pointerJ++;
    }
    if (pointerJ >= ary.length) {
        exchange(pointerI, min);
        pointerI++;
        min = pointerI;
        pointerJ = pointerI + 1;
    }
}

function insertionSort() {
    if (pointerI >= ary.length) {
        noLoop();
        return;
    } else {
        if (pointerJ > 0 && ary[pointerJ].height <= ary[pointerJ - 1].height) {
            exchange(pointerJ, pointerJ - 1);
            pointerJ--;
        } else {
            pointerI++;
            pointerJ = pointerI;
        }
        statsCompares++;
        min = pointerJ;
    }
}

function drawLegend() {
    //Legend:
    fill('white');
    rect(20, 10, 160, 160);
    rect(30, 80, 20, 20);
    fill('lightgreen')
    rect(30, 20, 20, 20);
    fill('red')
    rect(30, 50, 20, 20);
    fill('black');
    text('sorted', 60, 34);
    if (selectedSort === "sel") {
        text('min = ' + min, 60, 64);
    } else {
        text('current = ' + min, 60, 64);
    }
    text('unseen', 60, 94);
    line(20, 107, 180, 107);
    textAlign(LEFT);
    text(statsCompares + ' compares', 32, 128);
    text(statsExchanges + ' exchanges', 32, 154);


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
    textAlign(CENTER);
    for (let i = 0; i < numberOfBars; i++) {
        text(i, i * barWidth + barWidth / 2, canvasHeight - 5);
    }
    textAlign(LEFT);
    textSize(25);
    if (pointerI < ary.length) {
        text('i', pointerI * barWidth + barWidth / 2, ary[pointerI].y - ary[pointerI].height - 40);
    } else {
        text('i', pointerI * barWidth + barWidth / 2, ary[pointerI - 1].y - ary[pointerI - 1].height - 40);
    }
    if (pointerJ < ary.length) {
        text('j', pointerJ * barWidth + barWidth / 2, ary[pointerJ].y - ary[pointerJ].height - 20);
    } else {
        text('j', pointerJ * barWidth + barWidth / 2, ary[pointerJ - 1].y - ary[pointerJ - 1].height - 20);
        ary[pointerJ - 1].draw(sortedColor, pointerJ - 1);
    }
    textSize(15);
}

function exchange(i, min) {
    let swappo = ary[i];
    ary[i] = ary[min];
    ary[min] = swappo;
    statsExchanges++;
}

class Bar {
    constructor(height, width, y) {
        this.height = height;
        this.width = width;
        this.y = y;
    }

    draw(color, placeInArray) {
        fill(color);
        rect(placeInArray * this.width, this.y, this.width, -this.height); //start upper left corner
    }
}