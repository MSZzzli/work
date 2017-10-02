
// 在浏览器中，每一个页面的 script 标签不管有多少个，最终都会拼接成一个。
// 所以，在浏览器中都可以通过 script 标签很方便的引入外部所需要的 js 文件。
// 但是，在 nodejs 中，没有 script 标签，也就 不能直接引入外部 js 文件，却
// 可以通过 exports 和 require 来导出和导入模块。

function say(){
	console.log("这里是 index.js 文件里面的 say 方法");
}

// 导入方法：
// var obj = module.require("./set.js");
// var obj = require("./set.js");
var obj = require("./set");
console.log(obj);
var Set = obj.set;
var sayFun = obj.say;

// 使用
var setObj = new Set("a","b","a");
console.log(setObj);
console.log(setObj.unite(new Set("b","c","d")));
sayFun();



