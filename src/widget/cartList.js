//商品集合

var cartList = {
	dom:$(".cart-list"),
	list:{
		//维护购物车的商品
	},
	init:function(){
		this.bindEvent();
		
		
	},
	render1Cart:function(){
		var str='';
		for(var key in this.list) {
			//初始化我们的购物车列表对象
			var module = this.list[key];
			str+=module.renderCart()
			
		}
		this.dom.html(str);
	},
	update: function(module){
			//重新渲染
			cartList.list[module.id] = module;
			this.render1Cart();
			
			 //我们来存数据
			 localStorage.setItem('cartfood' + location.hash.split('-')[3], JSON.stringify(cartList.list))
		
		
	},
	bindEvent:function(){
			//进行购物车的加减运算
		var me=this;	
			//加加运算
		this.dom.on('click','.cart-plus',function(){
			var curId=$(this).closest('.shop-pane').data('id');
			//引用地址问题
		    var num=me.list[curId].plus();
		    //列表更新
		     $(me.list[curId].selector).find('.cart-num').html(num);
			  
			//购物车更新
			 $(me.list[curId].selector).find('.num-cart').html(num);
			 //单价
			 var sprice=me.singlePrice(me.list[curId]);
			  $(me.list[curId].selector).find('.price-cart').html("￥"+sprice);
			 //总价
			 var sum = me.getPrice();
			 $('.Allsum').html("￥"+sum);
			 
			 //我们来存数据
			 localStorage.setItem('cartfood' + location.hash.split('-')[3], JSON.stringify(cartList.list))
			 
			 
		})
		
			//减减操作
			
		this.dom.on('click','.cart-decrease',function(){
			var curId=$(this).closest('.shop-pane').data('id');
			//引用地址问题
		    var num=me.list[curId].minus();
		    //列表更新
		     $(me.list[curId].selector).find('.cart-num').html(num);
			  
			//购物车更新
			 $(me.list[curId].selector).find('.num-cart').html(num);
			 
			 if(num==0){
			 	  $(this).closest('.shop-pane').remove();
			 	  
			 	  delete me.list[curId];
			 }else{
			 	//单价
			 var sprice=me.singlePrice(me.list[curId]);
			 $(me.list[curId].selector).find('.price-cart').html("￥"+sprice);
			 }
			
			 //总价
			var sum = me.getPrice();
			 $('.Allsum').html("￥"+sum);
			 
			 //我们来存数据
			 localStorage.setItem('cartfood' + location.hash.split('-')[3], JSON.stringify(cartList.list))
			 
			 
		})
		
		//清空所有列表
		$('.clearAll').on('click',function(){
			
			//清空
			 me.dom.html('');
			 
			 //将所有的值清为0
			 for(var index in me.list){
                  var food=me.list[index];
                  //让它为1，再减一就可以隐藏东西了
                  food.num=1;
                  food.minus();
				  
			 }
			 //置空
			 me.list={};
			 
			 //我们来清空数据
			 localStorage.removeItem('cartfood' + location.hash.split('-')[3]);
			 
		});
		
	},
	getPrice:function(){
		  var me=this;
		  var sum=0;
		  for (var index in me.list) {
		  	   sum+=me.list[index].num*me.list[index].price;
		  }
		  
		  return sum;
		  
	},
	singlePrice:function(module){
		  
		  	var sum='';
		  	sum=module.num*module.price;
		  	return sum; 
	}

}