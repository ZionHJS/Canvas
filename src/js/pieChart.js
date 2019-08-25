function PieChart(option){
    this._init(option);
}
PieChart.prototype = {
    _init:function(option){
        this.x = option.x || 0;
        this.y = option.y || 0;   //饼状图的原点坐标
        this.r = option.r || 0;   //饼状图的半径
        this.data = option.data || [];

        //饼状图:所有的物件的组
        this.group = new Konva.Group({
            x:this.x,
            y:this.y
        });
        //饼状图:所有 扇形的组
        this.wedgeGroup = new Konva.Group({
            x:thix.x,
            y:thix.y
        });
        //饼状图:所有文字的组
        this.textGroup = new Konva.Group({
            x:thix.x,
            y:thix.y
        });
    }
}