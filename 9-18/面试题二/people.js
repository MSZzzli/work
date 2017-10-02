/*
 * 面试题二
 * 
 * 实现一个 People 类
 * 
 * 假设 p 是 People 类的一个对象
 * 
 * 当执行 p.on('resolve',function1);
 *       p.on('resolve',function2);
 *       p.on('click',function3);
 * 也就说，通过 on 方法可以给对象绑定方法
 * 
 * 当执行 p.emit('resolve') 时，可以触发对应状态下回调函数(可能不止一个)
 * 
 * 当执行 p.off('resolve',function) 时，可以解除 resolve 状态下的 function 事件
 * （如果用户没有传递 function，那么我们直接全部解除 resolve 状态下的事件）
 */



