function ProgressBar(option){
    this._init(option);
}

ProgressBar.prototype = {
    _init:function(option){
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.w = option.w || 0;
        this.h = option.h || 0;

        this.fillStyle = option.fillStyle || 'red';
        this.strokeStyle = option.strokeStyle || 'red';

        //定义的内部进度条的矩形
        var innerRect = new Konva.Rect({
            x:this.x,
            y:this.y,
            width:1/2*this.w,
            height:this.h,
            fill:this.fillStyle, //只要设置了fill属性，那么konva就会填充这个矩形
            cornerRadius:(1/2)*this.h,
        });

        //定义的外部进度条的矩形
        var outerRect = new Konva.Rect({
            x:this.x,
            y:this.y,
            width:1/2*this.w,
            height:this.h,
            cornerRadius:(1/2)*this.h,
            stroke:this.strokeStyle,
            strokeWidth:4,
        });

        //打包成组
        this.group = new Konva.Group({
            x:0,
            y:0
        });
        this.group.add(innerRect);
        this.group.add(outerRect);
    },
    changeValue:function(val){
        //传进来的进度
        if(val >1){//1 - 100
            val = val/100;
        }
    },
    addToGroupOrLayer:function(arg){
        arg.add(this.group);
    }
}