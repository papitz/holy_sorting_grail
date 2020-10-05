class Bar{
    constructor(height, width, y) {
        this.height = height;
        this.width = width;
        this.y = y;
    }

    show(color,placeInArray){
        fill(color);
        rect(placeInArray * this.width, this.y, this.width, -this.height); //start upper left corner
    }
}