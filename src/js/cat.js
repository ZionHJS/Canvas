function Cat(){
    console.log(this);

    this.name = '123';
    this.age = 19;
}

Cat.prototype.show = function(){
    console.log(this);
}

var c = new Cat();
c.show();