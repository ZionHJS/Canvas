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
var scenceBuilder = [builderHtml5Scence,builderC3Scence,builderDemoScence];
//当前场景的执行的索引
var scenceIndex = 0;

//构造h5的场景
function builderHtml5Scence(){
    return new ItcastScene({
    });
}
//构造c3的场景
function builderC3Scence(){
    return new ItcastScene({
    });
}
//构造demo的场景
function builderDemoScence(){
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
        } else {
            console.log(e.evt.touches[0].screenX + ' ' + e.evt.touches[0].screenY);
            endY = e.evt.touches[0].screenY;
        }
        console.log(e);   //evt就是e这个对象的的属性
    });
    stage.on('contentMouseup contentTouchend', function (e) {
        if (endY > startY) {
            //下滑动 执行上一个场景的play()
            scenceIndex = scenceIndex <= 0 ? 0 : scenceIndex-1;
        } else {
            //上滑动 执行下一个场景play()
            scenceIndex = scenceIndex >= scenceBuilder.length-1 ? scenceBuilder.length-1 : scenceIndex+1;
        }
        scenceBuilder[scenceIndex]().play();
    });
}

//给舞台添加滑动事件
addStageEvent();