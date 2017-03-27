//复用对象
var fourModule=Object.create(firstModule);

//改变部分值
fourModule=$.extend(fourModule,{
	  name:'我是第四个网页',
	  dom:$('#four')
});