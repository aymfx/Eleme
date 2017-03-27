//单个购物车
function singleCart(obj) {
	this.image_path=obj.image_path;
	this.name = obj.name;
	this.price = obj.specfoods[0].price;
	this.description=obj.description;
	this.month_sales=obj.month_sales;
	this.satisfy_rate=obj.satisfy_rate;
	this.num = obj.num || 0;
	this.id = obj.item_id;
	this.selector = '[data-id="' + this.id + '"]';
}

singleCart.prototype.render = function() {
	var str = '';
	var imgPath = (this.image_path).split('');
	imgPath.splice(1, 0, '/');
	imgPath.splice(4, 0, '/');
	imgPath = imgPath.join('');
	var geshi = ".jpeg"
	if(imgPath.indexOf('jpeg') == -1) {
		geshi = ".png"
	}
	str= `<div class="food-info" data-id="${this.id}">
		<div class="foodImg">
			<img src='//fuss10.elemecdn.com/${imgPath}${geshi}' />
		</div>
		<div class="food-mes">
			<h2>${this.name}</h2>
			<h4>${this.description}</h4>
			<p>
				<span>月售${this.month_sales}份</span>
				<span>好评率${this.satisfy_rate}%</span>
			</p>
			<div class="money-info">
				<span class="price-second">${this.price}</span>
				<div class="cart">
					<b class="cart-jian">-</b>
					<em class="cart-num">${this.num}</em>
					<b class="cart-jia">+</b>
				</div>
			</div>
		</div>
	</div>`
	return str;
}


//做一次加加

singleCart.prototype.plus = function(){
	this.num++;	 
	if(this.num > 0) {			  	  	 	$(this.selector).find('.cart-jian').css('visibility','visible');
			  	  	    	$(this.selector).find('.cart-num').css('visibility','visible');  
	}	
	return this.num;
}

//做一次减减

singleCart.prototype.minus = function(){
	this.num--;
	if(this.num === 0) {
		$(this.selector).find('.cart-jian').css('visibility','hidden');
		$(this.selector).find('.cart-num').css('visibility','hidden');
	}
	return this.num;	 	
}

singleCart.prototype.renderCart = function(){
	var str = "";
	//渲染购物车列表中的单个购物车模块 	
	var singlePrice=this.price*this.num;
	str += 	`<div class="shop-pane" data-id="${this.id}">
							<p>${this.name}</p>
						<div class="right-cart-list">
							<span class="price-cart">￥${singlePrice}</span>
							<i class="cart-decrease">-</i>
							<span class="num-cart">${this.num}</span>
							<i class="cart-plus">+</i>
						</div>
						</div>`;	
	return str;
}