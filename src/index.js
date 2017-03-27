//业务逻辑处理
var prevObject=null;
var currentObject=null;

//进行映射关系

var hashMapModule={
	  'first':firstModule,
	  'second':secondModule,
	  'third':thirdModule,
	  'four':fourModule
}

//建立一个  判断模块是否已经执行加载的模块映射关系表
var moduleHash = {
			
};

//业务处理

function routerController(hash){

	 if(hash.indexOf('second')!=-1){
	 	      hash='second';
	 	      secondModule.resetlist();
	 	      secondModule.addresslistinfo();
	 	      secondModule.showWeather();
	 	      secondModule.loaderBanner();
	 	      secondModule.searchshow();
	 	     
	 }
	 
	 if(hash.indexOf('third')!=-1){
	 	      hash='third';
	 	      thirdModule.reset();
	 	      thirdModule.allfoodslist();
	 	      
 
	 }
	 
	 if(hash.indexOf('four')!=-1){
	 	      hash='four';
  
	 }
 
	var obj=hashMapModule[hash];
	prevObject=currentObject;
	currentObject=obj;
	obj.enter();
	
	if(!moduleHash[hash]){
			obj.init();
			moduleHash.hash=true;			
	}

	if(prevObject){
		prevObject.leave();
	}
}

//获取hash值
function hash(){
	 
	var hashTemp=location.hash || '#first';
	hashTemp=hashTemp.slice(1);
	return hashTemp;
}

//页面初始化调用
routerController(hash());

//监听hash值变化

$(window).on('hashchange',function(){
	    
	    routerController(hash());
})









