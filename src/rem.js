//拿到对应设备的宽度值
//1.window.innerWidth

//2.document.documentElement.clientWidth

//通过其进行计算对应的比例，得到动态的根元素的字体大小

function init(){
	console.log('我执行了init方法');
	var width = document.documentElement.clientWidth; //获取设备的宽度

	//动态的为根元素设置字体的大小
	document.documentElement.style.fontSize = 32 * (width/320) + 'px';	 	
}
init();

//orientationchange 监听手机旋转的事件的时机
window.addEventListener('orientationchange', init)
/*
window.addEventListener('DOMContentLoaded', function(){
		console.log('测试dom加载完成后所需要执行的事件');
})

window.addEventListener('resize', function(){
		console.log('窗口进行变化');
})
*/
window.addEventListener('resize', init)