/* 封装的数据对象模板 */
function MyObject ()
{
	this.data = [];
}

/* 封装的数据对象的原型方法 */
MyObject.prototype = {
	/* 模仿JQuery的text方法 */
	text : function (content) {
		/* 正则匹配形如:<div>abc</div> */
		var reg = /(?:<[^>]+?>)?(.*)(?:<\/[^>]+?>)?/;
		if ( content )
		{

		}else
		{
			// console.log ( this.data[0].innerHTML );
			var arr = reg.exec ( this.data[0].innerHTML );
			return arr[0];
		}

	},
	/* 模仿JQuery的value方法 */
	val : function ( content ) {
		if ( content )
		{
			for ( var i = 0; i < this.data.length; ++i )
			{
				this.data[i].value = content;
			}
			return this;
		}else
		{
			//console.log ( this.data );
			return this.data[0].value;
		}
	},
	/* 模仿JQuery的attr方法 */
	attr : function ( key, value ) {
		if ( value ) {
			var attr = document.createAttribute (key);
			attr.value = value;
			for ( var i = 0; i < this.data.length; ++i )
			{
				this.data[0].setAttributeNode(attr);
			}
		}else
		{
			if ( this.data.length )
				return this.data[0].getAttributeNode(key).value;
		}
	},
	/* 模仿JQuery的addClass方法 */
	addClass : function ( className ) {
		var oriClassName;
		for ( var i = 0; i < this.data.length; ++i )
		{
			oriClassName = this.data[i].getAttribute ( "class" );
			var newClassName = document.createAttribute ( "class" );
			if ( oriClassName )
			{
				newClassName.value = oriClassName + " " + className;
			}else
			{
				newClassName.value = className;
			}
			this.data[i].setAttributeNode ( newClassName );
			return this;
		}
	},
	/* 模仿JQuery的removeClass方法 */
	removeClass : function ( className ) {
		var oriClassName;
		if ( className )
		{
			for ( var i = 0; i < this.data.length; ++i )
			{
				oriClassName = this.data[i].getAttributeNode("class").value;
				var reg = new RegExp ( "\\s\*\\b" + className + "\\b\\s\*" ); /* 注意匹配边界 */
				oriClassName = oriClassName.replace (reg, "");
				// console.log ( oriClassName );
				if ( oriClassName )
				{
					var newClassName = document.createAttribute ( "class" );
					newClassName.value = oriClassName;
					this.data[i].setAttributeNode ( newClassName );
				}else
				{
					this.data[i].removeAttribute ( "class" );
				}
			}
		}else
		{
			for ( var i = 0; i < this.data.length; ++i )
			{
				this.data[i].removeAttribute ( "class" );
			}
		}
		return this;
	},
	/* 模仿JQuery的append方法 */
	append : function ( element ) {
		for ( var i = 0; i < this.data.length; ++i )
		{
			this.data[i].appendChild(element.data[0]);
		}
		return this;
	},
	/* 模仿JQuery的appendTo方法 */
	appendTo : function ( element ) {
		for ( var i = 0; i < this.data.length; ++i )
		{
			element.data[0].appendChild ( this.data[i] );
		}
	},
	/* 模仿JQuery的insertBefore方法 */
	insertBefore : function ( element ) {
		for ( var i = 0; i < this.data.length; ++i )
		{
			// console.log ( element.data[0] );
			element.data[0].parentNode.insertBefore ( this.data[i], element.data[0] );
		}
		return this;
	},
	remove : function () {
		// console.log (this.data.length);
		while ( this.data.length ) /* 注意如果用for循环时，数组长度在移除元素后的变化 */
		{
			this.data[0].parentNode.removeChild ( this.data[0] );
		}
	},
	slideUp : function ( time ) {
		var height, oriHeight;
		var element;
		var step;

		if ( time == null )
			time = 300;

		var start = new Date().getTime();
		for ( var i = 0; i < this.data.length; ++i )
		{
			element = this.data[i];
			oriHeight = height = element.offsetHeight;
			step = height / time * 30;
			// console.log ( step )
			var loop = setInterval ( function () {
				// console.log ( element.offsetHeight - step );
				// console.log ( "start :" + element.offsetHeight );
				height -= step;
				if ( height <=0 )
					height = 0;
				element.style.height = height + "px";
				// console.log ( "end :" + element.offsetHeight )
				if ( element.offsetHeight <= 0 ){
					clearInterval ( loop );
					element.style.height = oriHeight + "px";
					element.style.display = "none";
					var end = new Date().getTime();
					console.log ( end-start );
				}
			}, 30 );
		}
	},
	slideDown : function ( time ) {
		var height, oriHeight;
		var element;
		var step;

		if ( time == null )
			time = 300;
		var start = new Date().getTime();
		for ( var i = 0; i < this.data.length; ++i )
		{
			element = this.data[i]
			oriHeight = parseInt ( element.style.height );
			element.style.height = "0px";
			height = 0;
			step = oriHeight / time * 30;
			// console.log ( time );
			element.style.display = "block";
			var loop = setInterval ( function () {
				height += step;
				if ( height >= oriHeight )
					height = oriHeight;
				element.style.height = height + "px";
				if ( element.offsetHeight >= oriHeight )
				{
					clearInterval ( loop );
					var end = new Date().getTime();
					console.log ( end-start );
				}
			}, 30 )
		}
	},
	hide : function ( time ) {
		var height, oriHeight, width, oriWidth;
		var element;
		var stepW, stpeH;

		if ( time == null )
			time = 300;

		var start = new Date().getTime();
		for ( var i = 0; i < this.data.length; ++i )
		{
			element = this.data[i];
			oriHeight = height = element.offsetHeight;
			oriWidth = width = element.offsetWidth;
			stepH = height / time * 30;
			stepW = width / time * 30;
			// console.log ( step )
			var loop = setInterval ( function () {
				// console.log ( element.offsetHeight - step );
				// console.log ( "start :" + element.offsetHeight );
				height -= stepH;
				if ( height <=0 )
					height = 0;
				width -= stepW;
				if ( width <= 0 )
					width = 0;
				element.style.height = height + "px";
				element.style.width = width + "px";
				// console.log ( "end :" + element.offsetHeight )
				if ( element.offsetHeight <= 0 || element.offsetWidth <= 0 ){
					clearInterval ( loop );
					element.style.display = "none";
					element.style.height = oriHeight + "px";
					element.style.width = oriWidth + "px";
					var end = new Date().getTime();
					console.log ( end-start );
				}
			}, 30 );
		}
	},
	show : function ( time ) {
		var height, oriHeight, width, oriWidth;
		var element;
		var stepH, stepW;

		if ( time == null )
			time = 300;
		var start = new Date().getTime();
		for ( var i = 0; i < this.data.length; ++i )
		{
			element = this.data[i]
			oriHeight = parseInt ( element.style.height );
			oriWidth = parseInt ( element.style.width );
			element.style.height = "0px";
			element.style.width = "0px";
			height = 0;
			width = 0;
			stepH = oriHeight / time * 30;
			stepW = oriWidth / time * 30;
			// console.log ( time );
			element.style.display = "block";
			var loop = setInterval ( function () {
				height += stepH;
				width += stepW;
				if ( height >= oriHeight )
					height = oriHeight;
				if ( width >= oriWidth )
					width = oriWidth;
				element.style.height = height + "px";
				element.style.width = width + "px";
				if ( element.offsetHeight >= oriHeight || element.offsetWidth >= oriWidth )
				{
					clearInterval ( loop );
					var end = new Date().getTime();
					console.log ( end-start );
				}
			}, 30 )
		}
	},
	fadeOut : function ( time ) {

		var element, oriOpacity, opacity, step;

		time = time || 1000;
		var start = new Date().getTime();
		for ( var i = 0; i < this.data.length; ++i )
		{
			element = this.data[i];
			oriOpacity = opacity = getComputedStyle ( element ).opacity;
			step = oriOpacity / time * 30;
			console.log ( step );
			var loop = setInterval ( function () {
				opacity -= step;
				if ( opacity <= 0 )
					opacity = 0;
				element.style.opacity = opacity;
				if ( opacity <= 0 )
				{
					clearInterval ( loop );
					element.style.display = "none";
					element.style.opacity = oriOpacity;
					var end = new Date().getTime();
					console.log ( end - start );
				}
			}, 30 );

		}
	},
	fadeIn : function ( time ) {

		var element, oriOpacity, opacity, step;

		time = time || 1000;
		var start = new Date().getTime();
		for ( var i = 0; i < this.data.length; ++i )
		{
			element = this.data[i];
			oriOpacity = opacity = getComputedStyle ( element ).opacity;
			step = oriOpacity / time * 30;
			opacity = element.style.opacity = 0;
			element.style.display = "block";
			console.log ( step );
			var loop = setInterval ( function () {
				opacity += step;
				if ( opacity >= oriOpacity )
					opacity = oriOpacity;
				element.style.opacity = opacity;
				if ( opacity >= oriOpacity )
				{
					clearInterval ( loop );
					element.style.opacity = oriOpacity;
					var end = new Date().getTime();
					console.log ( end - start );
				}
			}, 30 );

		}
	},
	animate : function ( obj, time ) {

		if ( obj == null )
			return;
		time = time || 1000;

		var element, oriWidth, oriHeight, width, height;
		var stepW, stepH;
		width = parseInt ( obj.width );
		height = parseInt ( obj.height );

		for ( var i = 0; i < this.data.length; ++i )
		{
			element = this.data[i];
			oriWidth = element.offsetWidth;
			oriHeight = element.offsetHeight;

			stepW = ( width - oriWidth ) / time * 30;
			stepH = ( height - oriHeight ) / time * 30;
			console.log ( stepW + ":" + stepH );
			var start = new Date().getTime();
			var loop = setInterval ( function () {
				oriWidth += stepW;
				if ( ( stepW > 0 && oriWidth >= width )
				|| ( stepW < 0 && oriWidth <= width) )
					oriWidth = width;
				oriHeight += stepH;
				if ( ( stepH > 0 && oriHeight >= height )
				|| ( stepH < 0 && oriHeight <= height) )
					oriHeight = height;

				element.style.width = oriWidth + "px";
				element.style.height = oriHeight + "px";

				if ( oriWidth == width || oriHeight == height )
				{
					clearInterval ( loop );
					var end = new Date().getTime ();
					console.log ( end - start );
				}
			}, 30 )
		}

	},
	bind : function ( evnetName, func ) {
		for ( var i = 0; i < this.data.length; ++i )
		{
			var element = this.data[i];
			element.addEvenetListener ( evnetName, func, flase );
		}
	}
}


var $ = function ( selector ) {
	var myObject = new MyObject ();
	var c = selector.substring ( 0, 1 );
	// var reg = new RegExp ( "\^\<\(\[\\w\\d\^\>\]\+\)\.\*\>\(\.\*\)\<\/\\1\>\$", "m" );
	var reg = /^<([\w\d^>]+).*>(.*)<\/\1>$/;
	// console.log ( reg + ":" + selector + ":" + reg.test(selector) );
	/* 封装id选择器 */
	if ( c === '#' )
	{
		myObject.data.push ( document.getElementById ( selector.substring(1,selector.length ) ) );

	}else if ( reg.test ( selector ) ) { /* 封装创建标签功能 */
		var arr = reg.exec ( selector );
		// console.log ( arr[1] );
		var element = document.createElement ( arr[1] );
		// console.log ( element );
		element.innerHTML = arr[2];
		myObject.data.push ( element );
	}
	else /* 封装标签选择器 */
	{
		// console.log ( document.getElementsByTagName ( selector ) );
		myObject.data = document.getElementsByTagName ( selector );
	}

	return myObject;
}
