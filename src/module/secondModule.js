//复用对象
var secondModule=Object.create(firstModule);

//改变部分值
secondModule=$.extend(secondModule,{
	  name:'我是第二个网页',
	  dom:$('#second'),
	  offset:0,
	  init:function(){
	  	 
	  	  this.shoplistinfo();
	  		
	  },
	  resetlist:function(){
	  	$('.addressList-second').html('');
			$('.addressList-second').removeClass('over');
	  },
	 render:function(data){
	 	   console.log(data);
	 	   var domlist=$('.addressList-second');
	 	   var str='';
	 	   for(var i=0;i<data.length;i++) {
	 	   		str+='<div class="address"><p style="font-weight:400;"><a href="#third-'+data[i].latitude+"-"+data[i].longitude+"-"+data[i].id+'">'+data[i].name+'</a></p><p>'+data[i].address+'</p></div>'
	 	   }
	 	   domlist.append(str);
	 },
	 bindEvent:function(){
	 				var me=this;
	 				 //轮播图动画
	 				var swiper=document.getElementById('mySwipe');;
	 				Swipe(swiper,{
          auto: false,
          continuous: true,
          disableScroll:false,
          callback: function(pos) {
          	//按钮轮播
            $('#position li').eq(pos).addClass('cur').siblings().removeClass('cur');
          }
      	});
      		
      		//加载更多数据
      		
      		$(window).on('scroll',function(){
      				if(window.innerHeight+window.scrollY===me.dom.height()){
      					console.log('到底啦');
      					      me.offset+=20;
      					      me.shoplistinfo();
      					      
      				}
      		})
      		

	 },
	 loaderBanner:function(){
	 			var me=this;
	 	       $.ajax({
	 	       		type:"get",
	 	       		url:"/v2/index_entry",
	 	       		async:true,
	 	  	    	data:{
	 	  	    	 	geohash:'wtw3n9r8suzj',
								group_type:1,
								flags:['F']
	 	  	    	},
	 	  	    	success:function(data){
	 	  	    	   var divide=Math.ceil(data.length/8);
	 	  	    	   
	 	  	    	   //拼接banner的
	 	  	    	   var str='';
	 	  	    	   for (var i=0;i<divide;i++) {
	 	  	    	   			var arr=[];
	 	  	    	   			str+='<div class="item" style="height:200px;background:#fff">'
	 	  	    	   			arr.push(data.slice((i*8),(i+1)*8));
	 	  	    	   			console.log(arr);
	 	  	    	   			for (var j=0;j<arr[0].length;j++) {
	 	  	    	   				str+='<a href="javascript:"><div class="container"><img src="//fuss10.elemecdn.com'+arr[0][j].image_url+'"></div><span class="title">'+arr[0][j].title+'</span></a>'
	 	  	    	   			}
	 	  	    	   			str+='</div>';
	 	  	    	   }
	 	  	    	   
	 	  	    	   $('.swipe-wrap').html(str);
								//拼接按钮
								 var btnstr='<li class="cur"></li>';
	 	  	    	   for (var i=1;i<divide;i++) {
	 	  	    	  			btnstr+='<li style="margin-left:0px"></li>';
	 	  	    	   }
	 	  	    	   $('#position').html(btnstr);
	 	  	    	   
	 	  	    	   me.bindEvent();
	 	  	    	   
	 	  	    	   
	 	  	    }
	 	       		
	 	       })
	 },
	 shoplistinfo:function(){
	 		var me=this;
	 				 var lat=location.hash.split('-')[1];
	 				 var lon=location.hash.split('-')[2];
	 				 console.log(lat+":"+lon);
	 				 $.ajax({
	 	  	    	type:"get",
	 	  	    	url:"/shopping/restaurants",
	 	  	    	async:true,
	 	  	    	data:{
	 	  	    		latitude:lat,
								longitude:lon,
								offset:me.offset,
								limit:20,
								extras:['activities'],
								terminal:'h5'
	 	  	    	},
	 	  	    	success:function(data){
	 	  	    		   if(data.length<20){
	 	  	    		   		
	 	  	    		   	  $('.addressList-second').addClass('over');
	 	  	    		   }
	 	  	    	     me.render(data);
	 	  	    }
	 	  	    });
	 },
	 showWeather:function(){
	 	   		var me=this;
	 	    	var lat=location.hash.split('-')[1];
	 				var lon=location.hash.split('-')[2];
			 	   $.ajax({
			 	   	type:"get",
			 	   	url:"/bgs/weather/current",
			 	   	data:{
			 	   		latitude:lat,
							longitude:lon
			 	   	},
			 	   	async:true,
			 	   	success:function(data){
			 	   		console.log("天气",data);
			 	   		var imgPath=(data.image_hash).split('');
			 	   		imgPath.splice(1,0,'/');
			 	   		imgPath.splice(4,0,'/');
			 	   		imgPath=imgPath.join('');
			 	   		console.log(imgPath);
			 	   		var str='<img src="//fuss10.elemecdn.com/'+imgPath+'.png"/><span>'+data.temperature+'</span><span>'+data.description+'</span>';	
			 	   	$('.weater').html(str);
			 	   	}
			 	   });
	 	   
	 },
	 searchshow:function(){
	 				var lat=location.hash.split('-')[1];
	 				var lon=location.hash.split('-')[2];
	 				$('#search-second').on('keydown',function(event){
	 					   if(event.keyCode==13){
	 					   	    if($('#search-second').val().trim()!=''){
	 					   	  			  location.href="#four-"+lat+'-'+lon+'-'+$('#search-second').val().trim();
	 					   	    }
	 					   }
	 				})
	 }
	 
	 
});
