function Range(min, max) {
    if (min > max) {
        this.min = max;
        this.max = min;
    } else {
        this.min = min;
        this.max = max;
    }
    this.span = this.max - this.min;

    this.contains = function(value){
        return value >= this.min && value <= this.max;
    }

}
