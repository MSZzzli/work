// OOP     面向对象编程
// OOA     面向对象分析
// OOD     面向对象设计

// 创建一个对象（对象字面量）
var obj = {
    name: '常伟',
    age: 33,
    isMale: true,
    sayHello: function(){
        alert('我的名字是' + this.name)
    }
}

// 为对象添加属性
// obj.name = '常伟'
// obj.age = 33
// obj.isMale = true

// 为对象添加方法
// obj.sayHello = function(){
//     alert('我的名字是' + this.name)
// }

obj.sayHello()

// obj.course = 'H5'
// obj.learn = function(){
//     alert('我正在学习' + this.course)
// }

// obj.learn()

// 在JS中不需要事先创建类（Class）
// 因为JS中可以随时向对象中添加所需要的属性和方法
// 这种特性称为动态编程

// 在C++/C#/Java等语言中，对象只能通过类（Class)
// 实例化出来（通常用new关键字），对象的属性和方法
// 是在类中定义的，程序运行的过程中通常不能向对象中
// 添加新的属性和方法（即类是对象的模板，类在运行时
// 是不可变的）

