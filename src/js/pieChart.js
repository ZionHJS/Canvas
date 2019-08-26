function PieChart(option) {
    this._init(option);
}
PieChart.prototype = {
    _init: function (option) {
        this.x = option.x || 0;   //饼状图的原点坐标
        this.y = option.y || 0;   //饼状图的原点坐标
        this.r = option.r || 0;   //饼状图的半径
        this.data = option.data || [];

        //饼状图:所有的物件的组
        this.group = new Konva.Group({
            x: this.x,
            y: this.y
        });
        //饼状图:所有 扇形的组
        this.wedgeGroup = new Konva.Group({
            x: 0,
            y: 0
        });
        //饼状图:所有文字的组
        this.textGroup = new Konva.Group({
            x: 0,
            y: 0
        });

        this.group.add(this.wedgeGroup);
        this.group.add(this.textGroup);

        var self = this;
        var tempAngle = -90; //从-90度开始绘制

        //把每条数据创建一个扇形
        this.data.forEach(function (item, index) {
            var angle = 360 * item.value;   //当前扇形的角度
            //创建一个扇形
            var wedge = new Konva.Wedge({
                x: 0,
                y: 0,
                angle: angle,
                radius: self.r,
                fill: item.color,
                rotation: tempAngle,
            });
            self.wedgeGroup.add(wedge);

            //绘制文本的角度
            var textAngle = tempAngle + 1 / 2 * angle;

            //绘制百分比的文本
            var text = new Konva.Text({
                x: (self.r + 30) * Math.cos(Math.PI / 180 * textAngle),  //1rad = 180/PI
                y: (self.r + 30) * Math.sin(Math.PI / 180 * textAngle),
                text: item.value * 100 + '%',
                fill: item.color,
            });

            //根据角度判断设置文字的位置 使左边的文字向左移动一些
            if (textAngle > 90 && textAngle < 270) {
                text.x(text.x() - text.getWidth());
            }

            self.textGroup.add(text);
            tempAngle += angle;
        });

        //绘制圆环的线
        var cir = new Konva.Circle({
            x: 0,
            y: 0,
            radius: this.r+3,
            stroke: '#ccc',
            strokeWidth: 1
        });
        this.group.add(cir);

        this._animteIndex = 0;
    },
    //pieChart的动画效果
    playAniamte: function () {
        var self = this;
        //根据索引显示动画
        //把所有的扇形角度归零
        if (this._animteIndex == 0) {
            //拿到所有的扇形
            this.wedgeGroup.getChildren().each(function (item, index) {
                item.angle(0);
            });
        }
        //展示当前索引对应的动画
        var item = this.wedgeGroup.getChildren()[this._animteIndex];
        item.to({
            angle: this.data[this._animteIndex].value * 360,
            duration:this.data[this._animteIndex].value,
            onFinish: function() {
                self._animteIndex++;
                if (self._animteIndex >= self.data.length) {
                    //递归 重点
                    self._animteIndex = 0;  //让这个索引清零
                    return;  //return会把整个循环结束
                }
                //继续执行当前方法 播放下一个动画 知道return停止
                self.playAniamte();
            }
        });
    },
    //把pieChart添加到层里面的方法
    addToGroupOrLayer: function (layer) {
        layer.add(this.group);
    }
}