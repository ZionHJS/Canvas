function HistogramChart(option) {
    this._init(option);
}

HistogramChart.prototype = {
    _init: function (option) {
        this.x = option.x || 0;
        this.y = option.y || 0;   //柱状图的原点坐标
        this.w = option.w || 0;   //柱状图的宽度
        this.h = option.h || 0;   //柱状图的高度

        this.data = option.data || [];

        var x0 = 0;
        var y0 = 0;
        //柱状图中所有的元素的组
        this.group = new Konva.Group({
            x:this.x,
            y:this.y,
        });
        //放矩形的组到group
        this.rectGroup = new Konva.Group({
            x:0,
            y:0,
        });
        this.group.add(this.rectGroup);
        //放百分比文字的组到group
        this.textPercentGroup = new Konva.Group({
            x:0,
            y:0
        });
        this.group.add(this.textPercentGroup);

        //绘制底线
        var bsLine = new Konva.Line({
            //x:从1/8 x, 3/4
            //y:3/4 高度处
            points: [x0, y0, x0 + this.w, y0], //要求 底线按照画布的左上角顶点进行定位
            strokeWidth: 1.5,
            stroke: 'lightgreen',
        });
        this.group.add(bsLine);

        var rectWidth = this.w / this.data.length; //每个矩形占用的总宽度
        var height = this.h;

        var self = this; // 当前柱状图对象
        //初始化 矩形 
        this.data.forEach(function (item, index) {
            //生成一个矩形
            var rect = new Konva.Rect({
                x: x0 + (1 / 4 + index) * rectWidth,
                y: y0 - item.value * height,
                width: 1 / 2 * rectWidth,
                height: item.value * height,
                fill: item.color,
                opacity: .8,
                cornerRadius: 10,
            });
            self.rectGroup.add(rect);

            //把百分比的文字放到柱状图的顶部
            var txt = new Konva.Text({
                x: x0 + (1 / 4 + index) * rectWidth,
                y: y0 - item.value * height - 14,
                fontSize: 14,
                text: item.value * 100 + '%',
                fill: item.color,
                width: 1 / 2 * rectWidth,
                align: 'center',
                name: 'textPercent',
            });
            self.textPercentGroup.add(txt);

            // var group = new Konva.Group({
            //     x:x0+(1/4+index)*rectWidth,
            //     y:y0,
            // });

            //把底部的文字
            var txtBottom = new Konva.Text({
                x: x0 + (1 / 4 + index) * rectWidth,
                y: y0,
                fontSize: 18,
                text: item.name,
                fill: item.color,
                width: 1 / 2 * rectWidth,
                align: 'top',
                rotation: 30,
            });
            // group.add(textBottom);
            self.group.add(txtBottom);
        });
    },
    addToGroupOrLayer:function(layer){
        layer.add(this.group);
    },
    playAnimate:function(){
        var self = this;
        //让柱状图清零 y => y0 height:0
        this.rectGroup.getChildren().each(function(item,index){
            item.y(0);
            item.height(0);
            //做一个还原动画
            item.to({
                duration:1,
                y:-self.data[index].value*self.h,
                height:self.data[index].value*self.h,
            });
        });
        //让文字也有个动画
        this.textPercentGroup.getChildren().each(function(item,index){
            item.y(-14);
            item.to({
                duration:1,
                y:-self.data[index].value*self.h-14,
            });
        });
    }
}