//复用对象
var thirdModule=Object.create(firstModule);

//改变部分值
thirdModule=$.extend(thirdModule,{
	  name:'我是第三个网页',
	  dom:$('#third'),
	  foodList:{},
	  init: function(){
		this.bindEvent();
		cartList.init();
	},
	  allfoodslist:function(){
	  			var me=this;
	  	     //es6取数据
	  	     var [hash,lat,lng,id]=location.hash.split('-');
	  	      
	  	    $.ajax({
	  	    	type:"get",
	  	    	url:"/shopping/v2/menu",
	  	    	async:true,
	  	    	data:{
	  	    		restaurant_id:id
	  	    	},
	  	    	success:function(data){
	  	    		
	  	    		console.log("我是食品数据",data);
	  	    		//我们来拼接左边的数据
	  	    		var str='';
	  	    		for (var i=0;i<data.length;i++) {
	  	    				 if(i==0){
	  	    				 	  str+='<li ><span class="active">'+data[i].name+'</span></li>';
	  	    				 }else{
	  	    				 	str+='<li><span>'+data[i].name+'</span></li>';
	  	    				 }
	  	    						
	  	    		}
	  	    		$('.left-ul-second').html(str);
	  	    		
	  	    		
	  	    		  
	  	    		//拼接右边的数据
	  	    		var str2='';
	  	    		for (var i=0;i<data.length;i++) {
	  	    				str2+=`<div class="foods-pane">
									<div class="foods-title" data-title="${data[i].name}">
										<div class="food-title-left">
											<strong>${data[i].name}</strong>
										</div>
										<div class="food-title-right">
											<h6>${data[i].description}</h6>
										</div>
									</div>`
	  	    				for (var j=0;j<data[i].foods.length;j++) {
	  	    					      var food=new singleCart(data[i].foods[j]);
	  	    					      food=me.freshAll(food);
	  	    					      
	  	    					      str2+=food.render();
	  	    					    
	  	    					      me.foodList[food.id]=food;
	  	    				}
	  	    			str2+='</div>';
	  	    			
	  	    		}
	  	    		$('.foods-list').html(str2);
	  	    		
	  	    		 好好 
	  	    		
	  	    		//点击显示和消失
	  	   
				  	  $('.cart-jia').on('click',function(){
				  	  
				  	  //进行加加
				  	 var curId= $(this).closest('.food-info').data('id');
				  	 var foodItem=me.foodList[curId];
				  	 var num=foodItem.plus();

				  	 //执行购物车列表的更新
							cartList.update(foodItem);
							
							
							
							
				  	  $(foodItem.selector).find('.cart-num').html(num);
				  	  
				  	  //价格加加
				  	  var sum = cartList.getPrice();
			 				$('.Allsum').html("￥"+sum);
				  	  
				  	  })
				  	  
				  	  $('.cart-jian').on('click',function(){
				  	  	
				  	   //进行jianjian
				  	 var curId=$(this).closest('.food-info').data('id');
				  	 var foodItem=me.foodList[curId];
				  	 var num=foodItem.minus();		  	  							
				  	 $(foodItem.selector).find('.cart-num').html(num);
				  	 if(num==0){
				  	 	  $(foodItem.selector).closest('.shop-pane').remove();
				  	 	  delete cartList.list[curId];
				  	 	  cartList.render1Cart();
				  	 }
				  	 
				  	 	 //价格减减
				  	  var sum = cartList.getPrice();
			 				$('.Allsum').html("￥"+sum);
				  	  })
				  	  
				  	  
				  	  
				  	  
				  	  $('#bootm-third').on('click',function(){
				  	  	  console.log("我进来了");
				  	  	 	$('.shade').toggle();
			  	  	    $('.food-menu').toggle();
			  	  	    
				  	  })
				  	  
	  	    		
	  	    		//做一个滚动条事件

	  	    		//清除实例
	  	    		if(typeof leftScroll !== 'undefined' || typeof rightScroll !== 'undefined') {
									leftScroll.destroy(); //销毁实例
									rightScroll.destroy(); //销毁实例
							}

	  	    		//在此时，dom结构都显示在页面中了，那就可以进行IScroll.js的初始化
									window.leftScroll = new IScroll(".left-pane-second", {
										probeType: 2,
										bounce: false, //代表滚动是否可以拉伸
										preventDefault: false,//让里面dom可以进行事件的绑定
										vScrollbar:false
									});
									
									window.rightScroll = new IScroll(".right-pane-second",{
										 scrollbars:true,
										 bounce:false,
										 preventDefault:false,
										 probeType: 2
										 
									});
									
						 //做一个滑动切换场景
						 var arr=[];
						 
						 $('.foods-pane').each(function(index,element){
						 	     arr.push(element.offsetTop);
						 })

						 window.rightScroll.on('scroll',function(){
						  	   
						  	   for (var i=0;i<arr.length;i++) {
						  	   		var t=Math.abs(rightScroll.y);
						  	   		var max=Math.abs(rightScroll.maxScrollY);
						  	   	
						  	   		    if(t!=max){
						  	   		    		if(t>=arr[i]){
						  	  					   console.log(t,arr[i]);
						  	  					   $('.left-pane-second li').find('span').removeClass('active');
						  	  					   $('.left-pane-second li').eq(i).find('span').addClass('active');
						  	   		    		}
						  	  					}else{
						  	  						  $('.left-pane-second li').find('span').removeClass('active');
						  	  						  $('.left-pane-second li').eq(arr.length-1).find('span').addClass('active');
						  	  					}
						  	   }
						  })
						 
						 
//						   滚动条监听
							leftScroll.on('scrollStart',function(){
						 					 console.log("我开始了");
						 					window.leftScroll.options.vScrollbar=true;
						 })
						 leftScroll.on('scroll',function(){
						 					 console.log("yunxingzhog");
						 					window.leftScroll.options.vScrollbar=true;
						 })
						  
						 leftScroll.on('scrollEnd',function(){
						 					 console.log("我停止了");
						 					window.leftScroll.options.vScrollbar=false;
						 })
	  	    		  
	  	    		  
	  	    	}
	  	    });  
	  },
	  bindEvent:function(){
	  	
	  		//点击切换，tab菜单
	  	   $('.left-pane-second ul').on('click','li',function(){
	  	   	    $('.left-pane-second li').find('span').removeClass('active');
	  	   			$(this).find('span').addClass('active');
	  	   			var txt=$(this).find('span').html();
	  	   			
	  	   			var select='[data-title="'+txt+'"]';
	  	   			console.log(select)
	  	   			rightScroll.scrollToElement($(select)[0]);
	  	   })
	  	   
	  	   
	  	 
	  	   
	  	    
	  },
	  freshAll:function(module){
	  			//我们来取数据
					var Alllist=JSON.parse(localStorage.getItem('cartfood' + location.hash.split('-')[3])) || {};
					//渲染列表
					/*if(Alllist){
						  for (var index in Alllist) {
						  	  var foodItem=this.foodList[Alllist[index].id];
						  	  //执行购物车列表的更新
								cartList.update(foodItem);
						  }*/
					if(Alllist[module.id]){
						  module.num=Alllist[module.id].num; 
						  //执行购物车列表的更新
							cartList.update(module);
							
							
					}
					return module;	
	  },
	  reset:function(){
	  	    $('.foods-list').html('');
	  	    this.foodList={};
	  	    cartList.list ={};
	  	    
	  }
	  
});