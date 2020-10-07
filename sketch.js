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
let pointerJ;
let min;
let selectedSort, selectedOrder;
let fps = 5;
let radioOrder, radioSort, startButton;

let arrayIsBuilt = false;

let statsCompares = 0, statsExchanges = 0;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    background(220);

    radioSort = createRadio('sort');
    radioSort.option("sel", 'Selection Sort');
    radioSort.option("ins", 'Insertion Sort');
    selectedSort = radioSort.value();

    radioOrder = createRadio('order');
    radioOrder.option("rnd", 'in random order');
    radioOrder.option("asc", 'in ascending order');
    radioOrder.option("des", 'in descending order');

    selectedOrder = radioOrder.value();

    startButton = createButton('get to sorting!');
    frameRate(fps);
    textSize(20);
    startButton.mousePressed(initArray);
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
    rect(20, 20, 160, 100);
    rect(30, 90, 20, 20);
    fill('lightgreen')
    rect(30, 30, 20, 20);
    fill('red')
    rect(30, 60, 20, 20);
    fill('black');
    text('sorted', 60, 46);
    if (selectedSort === "sel") {
        text('min = ' + min, 60, 76);
    } else {
        text('current = ' + min, 60, 76);
    }
    text('unseen', 60, 106);

    //stats:
    fill('white');
    rect(canvasWidth-290, 20, 270, 100);
    fill('black');
    textAlign(CENTER);
    text('Stats:', canvasWidth-150, 46);
    textAlign(LEFT);
    text('number of compares  = ' + statsCompares, canvasWidth-280, 76);
    text('number of exchanges = ' + statsExchanges, canvasWidth-280, 106);
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
}

function exchange(i, min) {
    let swappo = ary[i];
    ary[i] = ary[min];
    ary[min] = swappo;
    statsExchanges++;
}
