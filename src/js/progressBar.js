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
            width:0,
            height:this.h,
            fill:this.fillStyle, //只要设置了fill属性，那么konva就会填充这个矩形
            cornerRadius:(1/2)*this.h,
            id:'innerRect',  //创建一个id 然后通过id选择器实现外部调用 相当于给dom元素添加了id属性
            name:'innerRect',  //创建一个类  也可以通过.findOne('innerRect')来选择到这个元素
        });

        //定义的外部进度条的矩形
        var outerRect = new Konva.Rect({ 
            x:this.x,
            y:this.y,
            width:this.w,
            height:this.h,
            cornerRadius:(1/2)*this.h,
            stroke:this.strokeStyle,
            strokeWidth:4,
        });

        //html:
        //打包成组
        this.group = new Konva.Group({
            x:0,
            y:0
        });
        this.group.add(innerRect);
        this.group.add(outerRect);
    },
    changeValue:function(val){
        //传进来的进度 到底到了%几
        if(val >1){//1 - 100 vs 0-1  => 0.5
            val = val/100;
        }
        //做动画 val = .3 .7 .9
        var width = this.w * val;  //最终inner进度条的宽度
        var innerRect = this.group.findOne('#innerRect');  //通过findOne来实现id选择器

        //to动画系统:让我们的物件 变换到某个状态
        //让物件从当前状态到下面设置的状态
        innerRect.to({
            width:width,
            duration:0.3,
            easing:Konva.Easings.EaseIn,
        });
    },
    addToGroupOrLayer:function(layer){
        layer.add(this.group);
    }
}