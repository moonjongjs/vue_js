//export_name2.js
var x=0;
var y=0;

function fun1(a,b){
    console.log('fun1() 실행!2');
    console.log(a * b);
    x=a; 
    y=b;        
}

function fun2(pa1, callBack){
    callBack(pa1,500);    
}

fun2(100, fun1);

export { x, y};   



