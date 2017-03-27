//绉诲�绔�疆�����欢锛����������
(function(){

    /*
     * Swipe 2.0
     *
     * Brad Birdsall
     * Copyright 2013, MIT License
     *
     */

    function Swipe(container, options) {

        "use strict";

        // utilities
        var noop = function() {}; // 莽庐��ヂ��莽拧���� 忙���ぢ脚�ヅ�该ㄆ��
        var offloadFn = function(fn) { setTimeout(fn || noop, 0) }; // 氓�赂猫陆陆氓�鸥猫�陆莽拧����搂猫隆�

        // 忙拢��ε嘎ッβ德����モ�篓莽拧��ヅ�该ㄆ��
        var browser = {
            addEventListener: !!window.addEventListener,
            touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
            transitions: (function(temp) {
                var props = ['transformProperty', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform'];
                for ( var i in props ) if (temp.style[ props[i] ] !== undefined) return true;
                return false;
            })(document.createElement('swipe'))
        };

        // 氓娄��ε九�β猜∶ε��忙 鹿氓�ζ���茅���氓�÷�
        if (!container) return;
        var element = container.children[0];
        var slides, slidePos, width;
        options = options || {};
        var index = parseInt(options.startSlide, 10) || 0;
        var speed = options.speed || 300;
        var offset = 0;//氓��莽搂禄茅�÷��寂�р�戮氓���β��
        var zIndex = 1;
        options.continuous = options.continuous ? options.continuous : true;

        function setup() {
            // 莽录��ヂ���♀�氓鹿禄莽�炉莽�扳�
            slides = element.children;

            //氓��好ヂ宦好ぢ糕�盲赂陋忙�⒙懊�烩�忙�楼氓颅�氓���β��ぢ嘎�ヂ孤幻���р��∶�♀�氓陆��モ��盲陆�莽陆庐
            slidePos = new Array(slides.length);

            // 莽隆庐氓庐拧忙炉�盲赂陋氓鹿禄莽�炉莽�扳�莽拧��ヂ�矫ヂ郝�
            width = container.getBoundingClientRect().width || container.offsetWidth;

            offset = width * offset;

            element.style.width = (slides.length * width) + 'px';

            // 忙 �氓�ζ���
            var pos = slides.length;
            while(pos--) {

                var slide = slides[pos];

                slide.style.width = width + 'px';
                slide.setAttribute('data-index', pos);

                if (browser.transitions) {
                    slide.style.left = (pos * -width) + 'px';
                    move(pos, index > pos ? -width : (index < pos ? width : 0), 0);
                }

            }

            if (!browser.transitions) element.style.left = (index * -width) + 'px';

            container.style.visibility = 'visible';

            setTimeout(function(){
                events.end();
            },1000)

        }

        function prev() {

            if (index) slide(index-1);
            else if (options.continuous) slide(slides.length-1);

        }

        function next() {

            if (index < slides.length - 1) slide(index+1);
            else if (options.continuous) slide(0);

        }

        function slide(to, slideSpeed) {

            // 氓娄��ε九�ヂ仿裁�宦�β烩�盲赂�猫娄�忙卤��
            if (index == to) return;

            if (browser.transitions) {

                //console.log(to);
                var diff = Math.abs(index-to) - 1;
                var direction = Math.abs(index-to) / (index-to); // 1:right -1:left

                while (diff--) move((to > index ? to : index) - diff - 1, width * direction, 0);

                //console.log('slide',to);
                move(index, width * direction, slideSpeed || speed);
                move(to, 0, slideSpeed || speed);

            } else {

                animate(index * -width, to * -width, slideSpeed || speed);

            }

            index = to;

            offloadFn(options.callback && options.callback(index, slides[index]));

        }

        function move(index, dist, speed, zIndex) {

            translate(index, dist, speed, zIndex);
            slidePos[index] = dist;

        }

        function translate(index, dist, speed,zIndex) {


            var slide = slides[index];
            var style = slide && slide.style;

            if (!style) return;

            style.webkitTransitionDuration =
                style.MozTransitionDuration =
                    style.msTransitionDuration =
                        style.OTransitionDuration =
                            style.transitionDuration = speed + 'ms';
            style.zIndex= zIndex || 0;

            style.webkitTransform = 'translate(' + dist + 'px,0)' + 'translateZ(0)';
            style.msTransform =
                style.MozTransform =
                    style.OTransform = 'translateX(' + dist + 'px)';

        }

        function animate(from, to, speed) {

            // 氓娄��ε九�ぢ嘎�λ��ヅ��р�禄茂录�氓�陋忙�炉茅�÷���掳氓庐拧盲陆�
            if (!speed) {

                element.style.left = to + 'px';
                return;

            }

            var start = +new Date;

            var timer = setInterval(function() {

                var timeElap = +new Date - start;

                if (timeElap > speed) {

                    element.style.left = to + 'px';

                    if (delay) begin();

                    options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);

                    clearInterval(timer);
                    return;

                }

                element.style.left = (( (to - from) * (Math.floor((timeElap / speed) * 100) / 100) ) + from) + 'px';

            }, 4);

        }

        // 氓庐�懊�ｂ�莽篓�姑ヂ郝�ㄢ�陋氓�篓氓鹿禄莽�炉莽�扳�
        var delay = options.auto || 0;
        var interval;

        function begin() {
            interval = setTimeout(next, delay);
        }

        function stop() {
            delay = 0;
            clearTimeout(interval);
        }


        // 猫庐戮莽陆庐氓��氓搂�姑ヂ��┾��
        var start = {};
        var delta = {};
        var isScrolling;

        // 猫庐戮莽陆庐盲潞�姑ぢ宦睹β��猫沤路
        var events = {

            handleEvent: function(event) {

                switch (event.type) {
                    case 'touchstart': this.start(event); break;
                    case 'touchmove': this.move(event); break;
                    case 'touchend': offloadFn(this.end(event)); break;
                    case 'webkitTransitionEnd':
                    case 'msTransitionEnd':
                    case 'oTransitionEnd':
                    case 'otransitionend':
                    case 'transitionend': offloadFn(this.transitionEnd(event)); break;
                    case 'resize': offloadFn(setup.call()); break;
                }

                if (options.stopPropagation) event.stopPropagation();

            },
            start: function(event) {

                var touches = event.touches[0];

                // 忙碌�姑┾��莽拧���德访ヂр�氓���
                start = {

                    // 氓戮��ニ�懊ニ��ヂр�莽拧����γ��赂氓��忙 ��
                    x: touches.pageX,
                    y: touches.pageY,

                    // 氓颅�氓�����露茅��疵�÷�ヂ�∶ε铰ッ��γ��露茅���
                    time: +new Date

                };

                // 莽���ぢ号矫β碘�猫炉�⒚�♀�莽卢卢盲赂����幻ヅ��ぢ衡�盲禄露
                isScrolling = undefined;

                // 氓陇�盲陆�盲赂�懊�р�忙麓虏氓���ε��氓�沤猫庐隆莽庐��モ�录
                delta = {};

                // 猫庐戮莽陆庐touchmove氓���ouchend莽�衡�氓�卢
                element.addEventListener('touchmove', this, false);
                element.addEventListener('touchend', this, false);

            },
            move: function(event) {

                // 莽隆庐盲驴�盲赂��ぢ嘎���γ��赂盲赂�忙��氓�路
                if ( event.touches.length > 1 || event.scale && event.scale !== 1) return

                if (options.disableScroll) event.preventDefault();

                var touches = event.touches[0];

                // 猫庐隆莽庐����鹿氓��氓�沤莽拧��x 氓���y
                delta = {
                    x: touches.pageX - start.x,
                    y: touches.pageY - start.y
                }

                // 莽隆庐氓庐拧忙碌�姑���猫驴�猫隆�芒���芒���盲赂��ぢ嘎�β慌∶ヅ����露茅��疵β碘�猫炉��
                if ( typeof isScrolling == 'undefined') {
                    isScrolling = !!( isScrolling || Math.abs(delta.x) < Math.abs(delta.y) );
                }

                // 氓娄��ε九�р�篓忙�路忙虏隆忙��懊���氓�郝久ヅ锯�莽�郝疵β慌∶ヅ��
                if (!isScrolling) {

                    // 茅�虏忙颅垄忙�卢忙�潞忙禄拧氓�篓
                    event.preventDefault();

                    // 氓��忙颅垄氓鹿禄莽�炉莽�扳�忙�戮莽陇潞
                    stop();

                    // 氓娄��ε九����ぢ糕�盲赂陋忙���ε��氓�沤盲赂��ぢ嘎�β烩�氓�篓茅�禄氓��好ヂ⑴久ヅ�
                    delta.x =
                        delta.x /
                        ( (!index && delta.x > 0               // if first slide and sliding left
                            || index == slides.length - 1        // or if last slide and sliding right
                            && delta.x < 0                       // and if sliding at all
                            ) ?
                            ( Math.abs(delta.x) / width + 1 )      // determine resistance level
                            : 1 );                                 // no resistance if false

                    // 猫陆卢氓���1:1
                    translate(index-1, delta.x + slidePos[index-1], 0);
                    translate(index, delta.x + slidePos[index], 0);
                    translate(index+1, delta.x + slidePos[index+1], 0);

                }

            },
            end: function(event) {

                // 猫庐隆莽庐��ε���宦���露茅���
                var duration = +new Date - start.time;

                // 莽隆庐氓庐拧忙禄��ヅ��ヂ奥����猫搂娄氓���ぢ糕�盲赂��ぢ嘎�盲赂�盲赂��┞÷得β烩�氓�篓
                var isValidSlide =
                    Number(duration) < 250               // if slide duration is less than 250ms
                    && Math.abs(delta.x) > 20            // and if slide amt is greater than 20px
                    || Math.abs(delta.x) > width/2;      // or if slide amt is greater than half the width

                // 氓娄��ε九�ヂ奥����莽隆庐氓庐拧忙禄���库�氓沤禄莽拧��ヂ尖�氓搂�姑モ��莽禄��β��
                var isPastBounds =
                    !index && delta.x > 0                            // 氓娄��ε九����ぢ糕�盲赂陋氓鹿禄莽�炉莽�扳�氓���ヂ孤幻���р���MT氓陇搂盲潞沤0
                    || index == slides.length - 1 && delta.x < 0;    // 忙���ㄢ��γヂ��忙啪�忙���ヂ�矫ぢ糕�氓录 氓鹿禄莽�炉莽�扳�,氓鹿禄莽�炉莽�扳�amt氓掳�盲潞沤0

                // 莽隆庐氓庐拧忙禄��ヅ����鹿氓���true:right, false:left)
                var direction = delta.x < 0;

                // 氓娄��ε九�ぢ嘎�ヅ锯�莽�郝疵β慌∶ヅ��
                if (!isScrolling) {

                    if (isValidSlide && !isPastBounds) {

                        //console.log('index',index,slidePos,slidePos[index+1]-width,slides.length);
                        if (direction) {

                            move(index-1, -width, 0);
                            move(index, slidePos[index]-width + offset, speed, zIndex++);
                            //move(index+1, slidePos[index+1]-width, speed);
                            move(index+1, 0, speed);
                            if(index + 2 != slides.length){
                                move(index+2, width - offset, speed);
                            }
                            index += 1;

                        } else {

                            move(index+1, width, 0);
                            move(index, slidePos[index]+width - offset, speed,zIndex++);
                            //move(index-1, slidePos[index-1]+width, speed);
                            move(index-1, 0, speed);
                            move(index-2, - width + offset, speed,zIndex++);
                            index += -1;

                        }

                        options.callback && options.callback(index, slides[index]);

                    } else {

                        if(index == 0 ){
                            move(index+1, width - offset, speed);
                        }else if(index + 1 == slides.length){
                            move(index-1, -width + offset, speed,1);
                        }else{
                            move(index+1, width - offset, speed);
                            move(index-1, -width + offset, speed,1);
                        }

                        //move(index-1, -width, speed);
                        move(index, 0, speed);
                        //move(index+1, width, speed);

                    }

                }

                // 氓���β端�ouchmove氓���ouchend盲潞�姑ぢ宦睹р���ヂ��モ�篓,莽�郝疵ニ��ouchstart氓���β�∶�捌�р�篓
                element.removeEventListener('touchmove', events, false)
                element.removeEventListener('touchend', events, false)

            },
            transitionEnd: function(event) {

                if (parseInt(event.target.getAttribute('data-index'), 10) == index) {

                    if (delay) begin();

                    options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);

                }

            }

        }

        // 猫搂娄氓�����久�铰�
        setup();

        // 氓娄��ε九�┾���р�篓氓��⒚ヂ尖�氓搂�姑ㄢ�陋氓�篓氓鹿禄莽�炉莽�扳�
        if (delay) begin();


        // 忙路禄氓� 盲潞�姑ぢ宦睹р���ヂ��モ�篓
        if (browser.addEventListener) {

            // 猫庐戮莽陆庐touchstart盲潞�姑ぢ宦睹モ��莽麓 
            if (browser.touch) element.addEventListener('touchstart', events, false);

            if (browser.transitions) {
                element.addEventListener('webkitTransitionEnd', events, false);
                element.addEventListener('msTransitionEnd', events, false);
                element.addEventListener('oTransitionEnd', events, false);
                element.addEventListener('otransitionend', events, false);
                element.addEventListener('transitionend', events, false);
            }

            //猫庐戮莽陆庐氓�篓莽陋��ヂ�Ｃ�捌���麓氓陇搂氓掳�盲潞�姑ぢ宦�
            window.addEventListener('resize', events, false);

        } else {

            window.onresize = function () { setup() }; // to play nice with old IE

        }

        // 氓�β�ヂ尖�Swipe API
        return {
            setup: function() {

                setup();

            },
            slide: function(to, speed) {

                slide(to, speed);

            },
            prev: function() {

                // cancel slideshow
                stop();

                prev();

            },
            next: function() {

                stop();

                next();

            },
            getPos: function() {

                // return current index position
                return index;

            },
            kill: function() {

                // 氓���β端�ヂ孤幻���р���
                stop();

                // reset element
                element.style.width = 'auto';
                element.style.left = 0;

                // reset slides
                var pos = slides.length;
                while(pos--) {

                    var slide = slides[pos];
                    slide.style.width = '100%';
                    slide.style.left = 0;

                    if (browser.transitions) translate(pos, 0, 0);

                }

                // 氓� 茅�⒙っぢ衡�盲禄露盲戮娄氓�卢氓�⒙�
                if (browser.addEventListener) {

                    // remove current event listeners
                    element.removeEventListener('touchstart', events, false);
                    element.removeEventListener('webkitTransitionEnd', events, false);
                    element.removeEventListener('msTransitionEnd', events, false);
                    element.removeEventListener('oTransitionEnd', events, false);
                    element.removeEventListener('otransitionend', events, false);
                    element.removeEventListener('transitionend', events, false);
                    window.removeEventListener('resize', events, false);

                }
                else {
                    window.onresize = null;

                }

            }
        }

    }
    window.Swipe = Swipe
})();


/*



var Event = {
  swipe : function(){
      Config.swipe && Config.swipe.kill && Config.swipe.kill();
      //寰��瀵瑰�灏����
      var bullets = document.getElementById('position').getElementsByTagName('li');
      Config.swipe = Swipe(document.getElementById('mySwipe'), {
          auto: 0,
          continuous: true,
          disableScroll:false,
          callback: function(pos) {
            console.log('婊��缁��涔�����琛��璋����);
              var i = bullets.length;
              while (i--) {
                  bullets[i].className = ' ';
              }
              bullets[pos].className = 'cur';
          }
      });

      setTimeout(function(){
        //�у�灏���癸�杞���句��圭�灏���癸������
          var $position = document.querySelector('#position'),
              $swipeWrap = document.querySelector('.swipe-wrap'),
              screenHeight = window.innerHeight;
          $swipeWrap.style.height= '100%';
          $("#position").removeClass('hidden');
      },300)

  }
}
Event.swipe();  
<div class="swipe" id="mySwipe">
	<div class="swipe-wrap">
	    <div class="item" style="height:200px;background: blue">
	        绗��涓����
	    </div>
	    <div class="item" style="height:200px;background: red">
	        绗��涓����
	    </div>
	    <div class="item"  style="background: black;height: 200px">
	        <!-- 婊�����涓�釜��� -->
	        
	    </div>
	</div>
	<ul id="position" class="hidden">
	    <li class="cur"></li>
	    <li style="margin-left:-5px"></li>
	    <li style="margin-left:-5px"></li>
	</ul>
</div>


.swipe{
    overflow: hidden;
    visibility: hidden;
    position:relative;
}
.swipe-wrap{
    overflow-x:hidden;
    position:relative;
}
.swipe-wrap > div {
    float: left;width: 100%;
    position:relative;
}
#position{
   position: absolute;
   bottom: 0rem;
   left: 0;
   .rem(margin-top, 20rem);
   .rem(margin-bottom, 10rem);
   margin: 0;
   opacity: 0.4;
   width: 100%;
   filter: alpha(opacity=50);
   text-align: center;
}
灏���瑰�灞�
#position li{
      width: 30px;
      height: 30px;
      margin: 0 8px;
      display: inline-block;
      -webkit-border-radius: 30px;
      border-radius: 5px;
      background-color: #CAC2C2;
}
#position li.cur{
    background-color: black;
}



<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>

ul.insertBefore(newdom, <li>2</li>)
*/