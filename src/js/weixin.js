//创建舞台
var stage = new Konva.Stage({
    container: '.container',
    width: window.innerWidth,  //全屏
    height: window.innerHeight
});

// 总的思路:
// 上滑:让索引+1 执行scenceBuilder数组中的下一个场景的play()
// 下滑:让索引-1 执行scenceBuilder数组中的下一个场景的play()

//场景的构造器
var scenceBuilder = [builderHtml5Scence, builderC3Scence, builderDemoScence];
//当前场景的执行的索引
var scenceIndex = 0;

scenceBuilder[0]().play();

//构造h5的场景
function builderHtml5Scence() {
    var bgLayer = new Konva.Layer();
    var animateLayer = new Konva.Layer();
    var lightLayer = new Konva.Layer();

    // var imgBg = new Konva.Image({
    //     image: 
    // });
    var rect = new Konva.Rect({
        x: -100,
        y: -100,
        fill: 'green',
        width: 100,
        height: 100,
    });

    var data = [
        { name: 'frontEnd', value: ".9", color: 'green' },
        { name: 'PHP', value: ".3", color: 'blue' },
        { name: 'Java', value: ".7", color: 'red' },
        { name: 'UI', value: ".9", color: 'orange' },
        { name: 'IOS', value: ".4", color: 'purple' },
        { name: 'Android', value: ".8", color: 'pink' },
    ];
    var h = new HistogramChart({
        x: 1 / 8 * stage.width(),
        y: 3 / 4 * stage.height(),
        w: 3 / 4 * stage.width(),
        h: 1 / 2 * stage.height(),
        data: data,
    });

    return new ItcastScene({
        name: '场景1',
        layer: [bgLayer, animateLayer, lightLayer],  //最后的层放到最上面
        stage: stage,
        init: function () {
            //初始化场景中的所有形状
            animateLayer.add(rect);
            h.addToGroupOrLayer(animateLayer);

            this.layer.forEach(function (layer) {
                layer.draw();
            });
        },
        pre: function () {
            rect.to({
                x: 100,
                y: 100,
                duration: 1,
                scaleX: 2,
                scaleY: 2,
                opacity: 0.4,
            });
            h.playAnimate();
        },
        post: function (dopre) {
            var self = this;
            rect.to({
                x: -100,
                y: -100,
                duration: 1,
                scaleX: 2,
                scaleY: 2,
                opacity: 0.4,
                onFinish:function(){
                    self.layer.forEach(function(item){
                        item.destroy();//把所有层销毁
                    });
                    dopre();
                }
            });
        }
    });
}
//构造c3的场景
function builderC3Scence() {
    return new ItcastScene({
    });
}
//构造demo的场景
function builderDemoScence() {
    return new ItcastScene({
    });
}

function addStageEvent() {
    var startY = 0;
    var endY = 0;

    stage.on('contentMousedown contentTouchstart', function (e) {
        if (e.type == 'contentMousedown') {
            console.log(e.evt.screenX + ' ' + e.evt.screenY);   //evt就是e这个对象的的属性
            startY = e.evt.screenY;
        } else {
            console.log(e.evt.touches[0].screenX + ' ' + e.evt.touches[0].screenY);
            startY = e.evt.touches[0].screenY;
        }
        console.log(e);   //evt就是e这个对象的的属性
    });
    stage.on('contentMousemove contentTouchmove', function (e) {
        if (e.type == 'contentMousedown') {
            console.log(e.evt.screenX + ' ' + e.evt.screenY);   //evt就是e这个对象的的属性
            endY = e.evt.screenY;
        } else if (e.type == 'contentTouchmove') {
            console.log(e.evt.touches[0].screenX + ' ' + e.evt.touches[0].screenY);
            endY = e.evt.touches[0].screenY;
        }
        console.log(e);   //evt就是e这个对象的的属性
    });
    stage.on('contentMouseup contentTouchend', function (e) {
        if (endY > startY) {
            //下滑动 执行上一个场景的play()
            scenceIndex = scenceIndex <= 0 ? 0 : scenceIndex - 1;
        } else {
            //上滑动 执行下一个场景play()
            scenceIndex = scenceIndex >= scenceBuilder.length - 1 ? scenceBuilder.length - 1 : scenceIndex + 1;
        }
        scenceBuilder[scenceIndex]().play();
    });
}

//给舞台添加滑动事件
addStageEvent();