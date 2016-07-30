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
