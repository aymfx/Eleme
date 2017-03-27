//创建一个对象
var firstModule={
	 name:'这是第一张网页',
	 dom:$('#first'),
	 init:function(){
	 	   this.bindEvent();
	 	   this.addresslistinfo();
	 },
	 render:function(data){
	 	   console.log(data);
	 	   var domlist=$('.addressList');
	 	   var str='';
	 	   for(var i=0;i<data.length;i++) {
	 	   		str+='<div class="address"><p style="font-weight:400;"><a href="#second-'+data[i].latitude+"-"+data[i].longitude+'">'+data[i].name+'</a></p><p>'+data[i].short_address+'</p></div>'
	 	   }
	 	   domlist.html(str);
	 },
	 bindEvent:function(){
	 	 
	 },
	 addresslistinfo:function(){
		var me=this;
	 	 $('#search').on('input',function(){
	 	        	var keyword1=$(this).val().trim();
	 	        	
	 	  	    if(keyword1){
	 	  	    	$.ajax({
	 	  	    	type:"get",
	 	  	    	url:"/bgs/poi/search_poi_nearby",
	 	  	    	async:true,
	 	  	    	data:{
	 	  	    		keyword:keyword1,
	 	  	    		offset:0,
	 	  	    		limit:20
	 	  	    	},
	 	  	    	success:function(data){
	 	  	    	     me.render(data);
	 	  	    }
	 	  	    });
	 	  	    }else{
	 	  	    	$('.addressList').html('^_^,输入地址哈！');
	 	  	    }
	 	  })
	 },
	 
	 enter:function(){
	 	 this.dom.show();
	 },
	 leave:function(){
	 	this.dom.hide();
	 }
}
