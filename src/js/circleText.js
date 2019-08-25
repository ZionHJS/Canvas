function CircleText(option){
    this._init(option);
}
CircleText.prototype = {
    _init:function(option){
        this.x = option.x ||0;
        this.y = option.y ||0;
        this.innerRadius = option.innerRadius ||0;
        this.outerRadius = option.outerRadius ||0;
        this.text = option.text ||'canvas';
        this.innerStyle = option.innerStyle ||'red';
        this.outerStyle = option.outerStyle ||'blue';

        this.group = new Konva.Group({
            x:this.x,
            y:this.y,
        });
        //初始化一个内部圆
        var innerCircle = new Konva.Circle({
            x:0,
            y:0,
            radius:this.innerRadius,
            fill:this.innerStyle,
            opacity:.8,
        });
        this.group.add(innerCircle);
        //初始化一个圆环
        var outerRing = new Konva.Ring({
            x:0,
            y:0,
            innerRadius:this.innerRadius,
            outerRadius:this.outerRadius,
            fill:this.outerStyle,
            opacity:0.2,
        });
        this.group.add(outerRing);

        //初始化一个虚线轨道圆
        var circlePath = new Konva.Circle({
            x:cenX,
            y:cenY,
            radius:this.outerRadius + (180 / 2),
            dash:[10,4],
            strokeStyle:'blue',
            stokeWidth:4,
        });
        this.group.add(circlePath);
        
        //初始化一个文字
        var txt = new Konva.Text({
            x:0-this.outerRadius,
            y:-7,
            width:this.outerRadius*2,
            fill:"#fff",
            fontSize:17,
            fontStyle:'bold',
            text:this.text,
            align:'center',
        });
        this.group.add(txt);
    },

    addToGroupOrLayer:function(arg){
        arg.add(this.group);
    }
}