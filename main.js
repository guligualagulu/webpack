<script>
!function(){
let addEvent = document.addEventListener ?
	(elem,type,listener,useCapture)=>{
		elem.addEventListener(type,listener,useCapture);
	} : 
	(elem,type,listener,useCapture)=>{
		elem.attachEvent('on'+type,listener);
	};
let delEvent = document.removeEventListener ?
	(elem,type,listener,useCapture)=>{
		elem.removeEventListener(type,listener,useCapture);
	} : 
	(elem,type,listener,useCapture)=>{
		elem.detachEvent('on'+type,listener);
	};
 
let $ = selector=>{
	return [].slice.call(document.querySelectorAll(selector));
}
let addClass = (node,className)=>{
	let current = node.className||'';
	if((' '+current+' ').indexOf(' '+className+' ')===-1){
		node.className = current?(current+' '+className):className;
	}
}
let delClass = (node,className)=>{
	let current = node.className||'';
	node.className = (' '+current+' ').replace(' '+className+' ',' ').trim();
}
 
let prev = 5,
		current = 0,
		next = 1,
		imgW = 1224,
		intervalTime = 1500;
let cursors = $('li');
let imgWrap = $('.imgWrap')[0];
for(let i=0,cursor;cursor=cursors[i];i++){
	addEvent(cursor,'mouseenter',(ev)=>{
		if(intervalID)clearInterval(intervalID)
		current = i;
		if(current==0){
			prev = 5;
		}else{
			prev = i-1;
		}
		if(current==5){
			next = 0;	
		}else{
			next = i+1;
		}
		go(current+1);
	})
	addEvent(cursor,'mouseleave',()=>{
		intervalID = setInterval(autoPlay, intervalTime);
	})
}
let go = step=>{
	imgWrap.style.transform = `translateX(-${step*imgW}px) translateZ(0)`;
	cursorClass();
}
let cursorClass = ()=>{
	for(let cursor of cursors){
		delClass(cursor,'z-active')
	}
	addClass(cursors[current],'z-active');
}
let changeIndex = ()=>{
	if(current==0){
		prev = 5;
		next = current+1;
	}else if(current==5){
		prev = current-1;
		next = 0;
	}else{
		prev = current-1;
		next = current+1;
	}
}
addClass(cursors[0],'z-active');
let autoPlay = ()=>{
	if(current==5) {
		current=0;
		new Promise(resolve=>{
		  imgWrap.style.transition = `all 0s`;
			go(0)
		  resolve();
		}).then(()=>{
			setTimeout(()=>{
				imgWrap.style.transition = `all .6s ease-in`;
				go(current+1);
				changeIndex();
			}, 200);
		})
	}else{
		current++;
		go(current+1);
		changeIndex();
	}
}
let intervalID = setInterval(autoPlay, intervalTime);
let carousel = $('.carousel')[0]
let wardWrap = $('.wardWrap')[0]
let oWard = $('.wardWrap>img')
addEvent(carousel,'mouseenter',()=>{
	addClass(wardWrap,'z-show');
})
addEvent(carousel,'mouseleave',()=>{
	delClass(wardWrap,'z-show');	
})
 
addEvent(oWard[0],'click',()=>{
	clearInterval(intervalID);
	go(prev+1);
	current = prev;
	changeIndex();
	intervalID = setInterval(autoPlay, intervalTime);
})
addEvent(oWard[1],'click',()=>{
	clearInterval(intervalID);
	console.log('next:',next);
	go(next+1);
	current = next;
	changeIndex();
	intervalID = setInterval(autoPlay, intervalTime);
})
}();
</script>// JavaScript Document