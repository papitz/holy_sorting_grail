let ary = [];
let canvasHeight = 700;
let canvasWidth = 700;
let barWidth = 35;
let numberOfBars = canvasWidth / barWidth;
let standardColor = 'white';
let minColor = 'red';
let pointeriColor = 'blue';
let i = 0;
let j = 1;
let min = i;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    background(220);
    frameRate(10);
    textSize(20);
    for (let i = 0; i < numberOfBars; i++) {
        ary[i] = new Bar(Math.floor(Math.random() * 200) + 10, barWidth, canvasHeight);
        // ary[i].show(standardColor, i);
    }
}

function draw() {
    redrawAry();
    ary[min].show(minColor, min);
    fill('black')
    text('i', i * barWidth + barWidth / 2, ary[i].y - ary[i].height - 40);
    if (j >= ary.length) {
        exchange(i, min);
        fill('black');
        text('i', i * barWidth + barWidth / 2, ary[i].y - ary[i].height - 40);
        text('j', (j - 1) * barWidth + barWidth / 2, ary[j - 1].y - ary[j - 1].height - 20);
        i++;
        if (i >= ary.length) {
            // n = 0;
            // if (n < ary.length){
            //     ary[n].show('green', n);
            // } else {
            //     noLoop();
            // }
            noLoop();
        }
        min = i;
        j = i + 1;
    } else {
        text('j', j * barWidth + barWidth / 2, ary[j].y - ary[j].height - 20)
        if (ary[j].height <= ary[min].height) {
            min = j;
        }
        ary[min].show(minColor);
        j++;
    }
}

function exchange(i, min) {
    let swappo = ary[i];
    ary[i] = ary[min];
    ary[min] = swappo;
    redrawAry();
    ary[i].show(minColor, i);
}

function redrawAry() {
    clear();
    background(220);
    for (let i = 0; i < numberOfBars; i++) {
        ary[i].show(standardColor, i);
    }
}
