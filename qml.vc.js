'use strict'
var log = function() { }
/** @const @type {!CoreObject} */
var qml = (function() {/** @const */
var exports = {};
/** @const */
var _globals = exports
if (!_globals.core) /** @const */ _globals.core = {}
if (!_globals.vc) /** @const */ _globals.vc = {}
if (!_globals.vc.qml) /** @const */ _globals.vc.qml = {}
if (!_globals.html5) /** @const */ _globals.html5 = {}
if (!_globals.controls) /** @const */ _globals.controls = {}
if (!_globals.controls.web) /** @const */ _globals.controls.web = {}
if (!_globals.controls.mixins) /** @const */ _globals.controls.mixins = {}
if (!_globals.controls.pure) /** @const */ _globals.controls.pure = {}
_globals.core.core = (function() {/** @const */
var exports = _globals;
//=====[import core.core]=====================

//WARNING: no log() function usage before init.js

exports.core.os = navigator.platform
exports.core.device = 0
exports.core.vendor = ""

exports.trace = { key: false, focus: false }

exports.core.keyCodes = {
	13: 'Select',
	27: 'Back',
	37: 'Left',
	32: 'Space',
	33: 'PageUp',
	34: 'PageDown',
	38: 'Up',
	39: 'Right',
	40: 'Down',
	48: '0',
	49: '1',
	50: '2',
	51: '3',
	52: '4',
	53: '5',
	54: '6',
	55: '7',
	56: '8',
	57: '9',
	112: 'Red',
	113: 'Green',
	114: 'Yellow',
	115: 'Blue'
}

var copyArguments = function(args, src, prefix) {
	var copy = Array.prototype.slice.call(args, src)
	if (prefix !== undefined)
		copy.unshift(prefix)
	return copy
}

exports.core.copyArguments = copyArguments



if (log === null)
	log = console.log.bind(console)

/** @const */
/** @param {string} text @param {...} args */
_globals.qsTr = function(text, args) { return _globals._context.qsTr.apply(qml._context, arguments) }


var _checkDevice = function(target, info) {
	if (navigator.userAgent.indexOf(target) < 0)
		return

	log("[QML] " + target)
	exports.core.vendor = info.vendor
	exports.core.device = info.device
	exports.core.os = info.os
	log("loaded")
}

if (!exports.core.vendor) {
	_checkDevice('Blackberry', { 'vendor': 'blackberry', 'device': 2, 'os': 'blackberry' })
	_checkDevice('Android', { 'vendor': 'google', 'device': 2, 'os': 'android' })
	_checkDevice('iPhone', { 'vendor': 'apple', 'device': 2, 'os': 'iOS' })
	_checkDevice('iPad', { 'vendor': 'apple', 'device': 2, 'os': 'iOS' })
	_checkDevice('iPod', { 'vendor': 'apple', 'device': 2, 'os': 'iOS' })
}

var colorTable = {
	'maroon':	'800000',
	'red':		'ff0000',
	'orange':	'ffA500',
	'yellow':	'ffff00',
	'olive':	'808000',
	'purple':	'800080',
	'fuchsia':	'ff00ff',
	'white':	'ffffff',
	'lime':		'00ff00',
	'green':	'008000',
	'navy':		'000080',
	'blue':		'0000ff',
	'aqua':		'00ffff',
	'teal':		'008080',
	'black':	'000000',
	'silver':	'c0c0c0',
	'gray':		'080808',
	'transparent': '0000'
}

var safeCallImpl = function(callback, args, onError) {
	try { return callback.apply(null, args) } catch(ex) { onError(ex) }
}

exports.core.safeCall = function(args, onError) {
	return function(callback) { return safeCallImpl(callback, args, onError) }
}

/**
 * @constructor
 */
exports.core.CoreObject = function() { }
exports.core.CoreObject.prototype.constructor = exports.core.CoreObject
exports.core.CoreObject.prototype.__create = function() { }
exports.core.CoreObject.prototype.__setup = function() { }


/** @constructor */
exports.core.Color = function(value) {
	if (Array.isArray(value)) {
		this.r = value[0]
		this.g = value[1]
		this.b = value[2]
		this.a = value[3] !== undefined? value[3]: 255
		return
	}
	if (typeof value !== 'string')
	{
		this.r = this.b = this.a = 255
		this.g = 0
		log("invalid color specification: " + value)
		return
	}
	var triplet
	if (value.substring(0, 4) == "rgba") {
		var b = value.indexOf('('), e = value.lastIndexOf(')')
		value = value.substring(b + 1, e).split(',')
		this.r = parseInt(value[0], 10)
		this.g = parseInt(value[1], 10)
		this.b = parseInt(value[2], 10)
		this.a = Math.floor(parseFloat(value[3]) * 255)
		return
	}
	else {
		var h = value.charAt(0);
		if (h != '#')
			triplet = colorTable[value];
		else
			triplet = value.substring(1)
	}

	if (!triplet) {
		this.r = 255
		this.g = 0
		this.b = 255
		log("invalid color specification: " + value)
		return
	}

	var len = triplet.length;
	if (len == 3 || len == 4) {
		var r = parseInt(triplet.charAt(0), 16)
		var g = parseInt(triplet.charAt(1), 16)
		var b = parseInt(triplet.charAt(2), 16)
		var a = (len == 4)? parseInt(triplet.charAt(3), 16): 15
		this.r = (r << 4) | r;
		this.g = (g << 4) | g;
		this.b = (b << 4) | b;
		this.a = (a << 4) | a;
	} else if (len == 6 || len == 8) {
		this.r = parseInt(triplet.substring(0, 2), 16)
		this.g = parseInt(triplet.substring(2, 4), 16)
		this.b = parseInt(triplet.substring(4, 6), 16)
		this.a = (len == 8)? parseInt(triplet.substring(6, 8), 16): 255
	} else
		throw new Error("invalid color specification: " + value)
}
exports.core.Color.prototype.constructor = exports.core.Color
/** @const */
var Color = exports.core.Color

exports.core.Color.prototype.rgba = function() {
	return "rgba(" + this.r + "," + this.g + "," + this.b + "," + (this.a / 255) + ")";
}

exports.core.normalizeColor = function(spec) {
	return (new Color(spec)).rgba()
}

exports.core.mixColor = function(specA, specB, r) {
	var a = new Color(specA)
	var b = new Color(specB)
	var mix = function(a, b, r) { return Math.floor((b - a) * r + a) }
	return [mix(a.r, b.r, r), mix(a.g, b.g, r), mix(a.b, b.b, r), mix(a.a, b.a, r)]
}

/** @constructor */
exports.core.DelayedAction = function(context, action) {
	this.context = context
	this.action = function() {
		this._scheduled = false
		action()
	}.bind(this)
}

exports.core.DelayedAction.prototype.schedule = function() {
	if (!this._scheduled) {
		this._scheduled = true
		this.context.scheduleAction(this.action)
	}
}

exports.addProperty = function(proto, type, name, defaultValue) {
	var convert
	switch(type) {
		case 'enum':
		case 'int':		convert = function(value) { return parseInt(value, 0) }; break
		case 'bool':	convert = function(value) { return value? true: false }; break
		case 'real':	convert = function(value) { return parseFloat(value) }; break
		case 'string':	convert = function(value) { return String(value) }; break
		default:		convert = function(value) { return value }; break
	}

	if (defaultValue !== undefined) {
		defaultValue = convert(defaultValue)
	} else {
		switch(type) {
			case 'enum': //fixme: add default value here
			case 'int':		defaultValue = 0; break
			case 'bool':	defaultValue = false; break
			case 'real':	defaultValue = 0.0; break
			case 'string':	defaultValue = ""; break
			case 'array':	defaultValue = []; break
			case 'Color':	defaultValue = '#0000'; break
			default:
				defaultValue = (type[0].toUpperCase() == type[0])? null: undefined
		}
	}

	var storageName = '__property_' + name
	var forwardName = '__forward_' + name

	Object.defineProperty(proto, name, {
		get: function() {
			var p = this[storageName]
			return p !== undefined?
				p.interpolatedValue !== undefined? p.interpolatedValue: p.value:
				defaultValue
		},

		set: function(newValue) {
			newValue = convert(newValue)
			var p = this[storageName]
			if (p === undefined) { //no storage
				if (newValue === defaultValue) //value == defaultValue, no storage allocation
					return

				p = this[storageName] = { value : defaultValue }
			}
			var animation = this.getAnimation(name)
			if (animation && p.value !== newValue) {
				if (p.frameRequest)
					_globals.html5.html.cancelAnimationFrame(p.frameRequest)

				var now = new Date()
				p.started = now.getTime() + now.getMilliseconds() / 1000.0

				var src = p.interpolatedValue !== undefined? p.interpolatedValue: p.value
				var dst = newValue

				var self = this

				var complete = function() {
					_globals.html5.html.cancelAnimationFrame(p.frameRequest)
					p.frameRequest = undefined
					animation.complete = function() { }
					animation.running = false
					p.interpolatedValue = undefined
					p.started = undefined
					self._update(name, dst, src)
				}

				var duration = animation.duration

				var nextFrame = function() {
					var date = new Date()
					var now = date.getTime() + date.getMilliseconds() / 1000.0
					var t = 1.0 * (now - p.started) / duration
					if (t >= 1) {
						complete()
					} else {
						p.interpolatedValue = convert(animation.interpolate(dst, src, t))
						self._update(name, p.interpolatedValue, src)
						p.frameRequest = _globals.html5.html.requestAnimationFrame(nextFrame)
					}
				}

				p.frameRequest = _globals.html5.html.requestAnimationFrame(nextFrame)

				animation.running = true
				animation.complete = complete
			}
			var oldValue = p.value
			if (oldValue !== newValue) {
				var forwardTarget = this[forwardName]
				if (forwardTarget !== undefined) {
					if (oldValue !== null && (oldValue instanceof Object)) {
						//forward property update for mixins
						var forwardedOldValue = oldValue[forwardTarget]
						if (newValue !== forwardedOldValue) {
							oldValue[forwardTarget] = newValue
							this._update(name, newValue, forwardedOldValue)
						}
						return
					} else if (newValue instanceof Object) {
						//first assignment of mixin
						this.connectOnChanged(newValue, forwardTarget, function(v, ov) { this._update(name, v, ov) }.bind(this))
					}
				}
				p.value = newValue
				if ((!animation || !animation.running) && newValue == defaultValue)
					delete this[storageName]
				if (!animation)
					this._update(name, newValue, oldValue)
			}
		},
		enumerable: true
	})
}

exports.addAliasProperty = function(self, name, getObject, srcProperty) {
	var target = getObject()
	self.connectOnChanged(target, srcProperty, function(value) { self._update(name, value) })

	Object.defineProperty(self, name, {
		get: function() { return target[srcProperty] },
		set: function(value) { target[srcProperty] = value },
		enumerable: true
	})
}

exports.core.createSignal = function(name) {
	return function() { this.emit.apply(this, copyArguments(arguments, 0, name)) }
}
exports.core.createSignalForwarder = function(object, name) {
	return (function() { object.emit.apply(object, copyArguments(arguments, 0, name)) })
}

/** @constructor */
exports.core.EventBinder = function(target) {
	this.target = target
	this.callbacks = {}
	this.enabled = false
}

exports.core.EventBinder.prototype.on = function(event, callback) {
	if (event in this.callbacks)
		throw new Error('double adding of event (' + event + ')')
	this.callbacks[event] = callback
	if (this.enabled)
		this.target.on(event, callback)
}

exports.core.EventBinder.prototype.constructor = exports.core.EventBinder

exports.core.EventBinder.prototype.enable = function(value) {
	if (value != this.enabled) {
		var target = this.target
		this.enabled = value
		if (value) {
			for(var event in this.callbacks)
				target.on(event, this.callbacks[event])
		} else {
			for(var event in this.callbacks)
				target.removeListener(event, this.callbacks[event])
		}
	}
}

return exports;
} )()
//========================================

/** @const @type {!CoreObject} */
var core = _globals.core.core
//=====[component core.EventEmitter]=====================

/**
 * @constructor
 * @extends {_globals.core.CoreObject}
 */
	_globals.core.EventEmitter = function(parent, _delegate) {
	_globals.core.CoreObject.apply(this, arguments);
	//custom constructor:
	{
		this._eventHandlers = {}
		this._onFirstListener = {}
		this._onLastListener = {}
		this._onConnections = []
	}

}
	_globals.core.EventEmitter.prototype = Object.create(_globals.core.CoreObject.prototype)
	_globals.core.EventEmitter.prototype.constructor = _globals.core.EventEmitter
	_globals.core.EventEmitter.prototype.componentName = 'core.EventEmitter'
	_globals.core.EventEmitter.prototype.on = function(name,callback) {
		if (name in this._eventHandlers)
			this._eventHandlers[name].push(callback)
		else {
			if (name in this._onFirstListener) {
				//log('first listener to', name)
				this._onFirstListener[name](name)
			} else if ('' in this._onFirstListener) {
				//log('first listener to', name)
				this._onFirstListener[''](name)
			}
			if (this._eventHandlers[name])
				throw new Error('listener callback added event handler')
			this._eventHandlers[name] = [callback]
		}
	}
	_globals.core.EventEmitter.prototype.removeAllListeners = function(name) {
		delete this._eventHandlers[name]
		if (name in this._onLastListener)
			this._onLastListener[name](name)
		else if ('' in this._onLastListener) {
			//log('first listener to', name)
			this._onLastListener[''](name)
		}
	}
	_globals.core.EventEmitter.prototype.connectOn = function(target,name,callback) {
		target.on(name, callback)
		this._onConnections.push([target, name, callback])
	}
	_globals.core.EventEmitter.prototype.onListener = function(name,first,last) {
		this._onFirstListener[name] = first
		this._onLastListener[name] = last
	}
	_globals.core.EventEmitter.prototype.discard = function() {
		for(var name in this._eventHandlers)
			this.removeAllListeners(name)
		this._onFirstListener = {}
		this._onLastListener = {}
		this._onConnections.forEach(function(connection) {
			connection[0].removeListener(connection[1], connection[2])
		})
		this._onConnections = []
	}
	_globals.core.EventEmitter.prototype.emit = function(name) {
		var invoker = _globals.core.safeCall(
			_globals.core.copyArguments(arguments, 1),
			function(ex) { log("event/signal " + name + " handler failed:", ex, ex.stack) }
		)

		if (name in this._eventHandlers) {
			var handlers = this._eventHandlers[name]
			handlers.forEach(invoker)
		}
	}
	_globals.core.EventEmitter.prototype.removeListener = function(name,callback) {
		if (!(name in this._eventHandlers) || callback === undefined || callback === null) {
			log('invalid removeListener(' + name + ', ' + callback + ') invocation', new Error().stack)
			return
		}

		var handlers = this._eventHandlers[name]
		var idx = handlers.indexOf(callback)
		if (idx >= 0)
			handlers.splice(idx, 1)
		else
			log('failed to remove listener for', name, 'from', this)

		if (!handlers.length)
			this.removeAllListeners(name)
	}//=====[component core.Object]=====================

/**
 * @constructor
 * @extends {_globals.core.EventEmitter}
 */
	_globals.core.Object = function(parent, _delegate) {
	_globals.core.EventEmitter.apply(this, arguments);
	//custom constructor:
	{
		_globals.core.EventEmitter.apply(this)

		this.parent = parent
		this.children = []

		this._context = parent? parent._context: null
		this._local = {}
		if (_delegate === true)
			this._local._delegate = this
		this._changedHandlers = {}
		this._changedConnections = []
		this._pressedHandlers = {}
		this._animations = {}
		this._updaters = {}
	}

}
	_globals.core.Object.prototype = Object.create(_globals.core.EventEmitter.prototype)
	_globals.core.Object.prototype.constructor = _globals.core.Object
	_globals.core.Object.prototype.componentName = 'core.Object'
	_globals.core.Object.prototype.addChild = function(child) {
		this.children.push(child);
	}
	_globals.core.Object.prototype.getAnimation = function(name,animation) {
		var a = this._animations[name]
		return (a && a.enabled())? a: null;
	}
	_globals.core.Object.prototype._update = function(name,value) {
		if (name in this._changedHandlers) {
			var handlers = this._changedHandlers[name]
			var invoker = _globals.core.safeCall([value], function(ex) { log("on " + name + " changed callback failed: ", ex, ex.stack) })
			handlers.forEach(invoker)
		}
	}
	_globals.core.Object.prototype._setId = function(name) {
		var p = this;
		while(p) {
			p._local[name] = this;
			p = p.parent;
		}
	}
	_globals.core.Object.prototype._tryFocus = function() { return false }
	_globals.core.Object.prototype._removeUpdater = function(name,newUpdaters) {
		var updaters = this._updaters
		var oldUpdaters = updaters[name]
		if (oldUpdaters !== undefined) {
			oldUpdaters.forEach(function(data) {
				var object = data[0]
				var name = data[1]
				var callback = data[2]
				object.removeOnChanged(name, callback)
			})
		}

		if (newUpdaters)
			updaters[name] = newUpdaters
		else
			delete updaters[name]
	}
	_globals.core.Object.prototype.onPressed = function(name,callback) {
		var wrapper
		if (name != 'Key')
			wrapper = function(key, event) { event.accepted = true; callback(key, event); return event.accepted }
		else
			wrapper = callback;

		if (name in this._pressedHandlers)
			this._pressedHandlers[name].push(wrapper);
		else
			this._pressedHandlers[name] = [wrapper];
	}
	_globals.core.Object.prototype.connectOnChanged = function(target,name,callback) {
		target.onChanged(name, callback)
		this._changedConnections.push([target, name, callback])
	}
	_globals.core.Object.prototype._get = function(name) {
		if (name in this)
			return this[name]

		var object = this
		while(object) {
			if (name in object._local)
				return object._local[name]
			object = object.parent
		}

		throw new Error("invalid property requested: '" + name)
	}
	_globals.core.Object.prototype.onChanged = function(name,callback) {
		if (name in this._changedHandlers)
			this._changedHandlers[name].push(callback);
		else
			this._changedHandlers[name] = [callback];
	}
	_globals.core.Object.prototype.setAnimation = function(name,animation) {
		this._animations[name] = animation;
	}
	_globals.core.Object.prototype.discard = function() {
		this._changedConnections.forEach(function(connection) {
			connection[0].removeOnChanged(connection[1], connection[2])
		})
		this._changedConnections = []

		this.children.forEach(function(child) { child.discard() })
		this.children = []

		this.parent = null
		this._context = null
		this._local = {}
		this._changedHandlers = {}
		this._pressedHandlers = {}
		this._animations = {}
		//for(var name in this._updaters) //fixme: it was added once, then removed, is it needed at all? it double-deletes callbacks
		//	this._removeUpdater(name)
		this._updaters = {}

		_globals.core.EventEmitter.prototype.discard.apply(this)
	}
	_globals.core.Object.prototype.removeOnChanged = function(name,callback) {
		if (name in this._changedHandlers) {
			var handlers = this._changedHandlers[name];
			var idx = handlers.indexOf(callback)
			if (idx >= 0)
				handlers.splice(idx, 1)
			else
				log('failed to remove changed listener for', name, 'from', this)
		}
	}//=====[component core.System]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.core.System = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);
	//custom constructor:
	{
		var browser = ""
		if (navigator.userAgent.indexOf('Chromium') >= 0)
			browser = "Chromium"
		else if (navigator.userAgent.indexOf('Chrome') >= 0)
			browser = "Chrome"
		else if (navigator.userAgent.indexOf('Opera') >= 0)
			browser = "Opera"
		else if (navigator.userAgent.indexOf('Firefox') >= 0)
			browser = "Firefox"
		else if (navigator.userAgent.indexOf('Safari') >= 0)
			browser = "Safari"
		else if (navigator.userAgent.indexOf('MSIE') >= 0)
			browser = "IE"
		else if (navigator.userAgent.indexOf('YaBrowser') >= 0)
			browser = "Yandex"

		this.browser = browser
		this.userAgent = navigator.userAgent
		this.webkit = navigator.userAgent.toLowerCase().indexOf('webkit') >= 0
		this.device = _globals.core.device
		this.vendor = _globals.core.vendor
		this.os = _globals.core.os
		this.language = navigator.language
		this._context.language = this.language.replace('-', '_')
		this.support3dTransforms = window.Modernizr && window.Modernizr.csstransforms3d
		this.supportTransforms = window.Modernizr && window.Modernizr.csstransforms
		this.supportTransitions = window.Modernizr && window.Modernizr.csstransitions

		var self = this
		window.onfocus = function() { self.pageActive = true }
		window.onblur = function() { self.pageActive = false }

		this.screenWidth = window.screen.width
		this.screenHeight = window.screen.height
	}

}
	_globals.core.System.prototype = Object.create(_globals.core.Object.prototype)
	_globals.core.System.prototype.constructor = _globals.core.System
	_globals.core.System.prototype.componentName = 'core.System'
	_globals.core.System.prototype._updateLayoutType = function() {
		if (!this.contextWidth || !this.contextHeight)
			return
		var min = this.contextWidth;// < this.contextHeight ? this.contextWidth : this.contextHeight

		if (min <= 320)
			this.layoutType = this.MobileS
		else if (min <= 375)
			this.layoutType = this.MobileM
		else if (min <= 425)
			this.layoutType = this.MobileL
		else if (min <= 768)
			this.layoutType = this.Tablet
		else if (this.contextWidth <= 1024)
			this.layoutType = this.Laptop
		else if (this.contextWidth <= 1440)
			this.layoutType = this.LaptopL
		else
			this.layoutType = this.Laptop4K
	}
	core.addProperty(_globals.core.System.prototype, 'string', 'userAgent')
	core.addProperty(_globals.core.System.prototype, 'string', 'language')
	core.addProperty(_globals.core.System.prototype, 'string', 'browser')
	core.addProperty(_globals.core.System.prototype, 'string', 'vendor')
	core.addProperty(_globals.core.System.prototype, 'string', 'os')
	core.addProperty(_globals.core.System.prototype, 'bool', 'webkit')
	core.addProperty(_globals.core.System.prototype, 'bool', 'support3dTransforms')
	core.addProperty(_globals.core.System.prototype, 'bool', 'supportTransforms')
	core.addProperty(_globals.core.System.prototype, 'bool', 'supportTransitions')
	core.addProperty(_globals.core.System.prototype, 'bool', 'portrait')
	core.addProperty(_globals.core.System.prototype, 'bool', 'landscape')
	core.addProperty(_globals.core.System.prototype, 'bool', 'pageActive', (true))
	core.addProperty(_globals.core.System.prototype, 'int', 'screenWidth')
	core.addProperty(_globals.core.System.prototype, 'int', 'screenHeight')
/** @const @type {number} */
	_globals.core.System.prototype.Desktop = 0
/** @const @type {number} */
	_globals.core.System.Desktop = 0
/** @const @type {number} */
	_globals.core.System.prototype.Tv = 1
/** @const @type {number} */
	_globals.core.System.Tv = 1
/** @const @type {number} */
	_globals.core.System.prototype.Mobile = 2
/** @const @type {number} */
	_globals.core.System.Mobile = 2
	core.addProperty(_globals.core.System.prototype, 'enum', 'device')
/** @const @type {number} */
	_globals.core.System.prototype.MobileS = 0
/** @const @type {number} */
	_globals.core.System.MobileS = 0
/** @const @type {number} */
	_globals.core.System.prototype.MobileM = 1
/** @const @type {number} */
	_globals.core.System.MobileM = 1
/** @const @type {number} */
	_globals.core.System.prototype.MobileL = 2
/** @const @type {number} */
	_globals.core.System.MobileL = 2
/** @const @type {number} */
	_globals.core.System.prototype.Tablet = 3
/** @const @type {number} */
	_globals.core.System.Tablet = 3
/** @const @type {number} */
	_globals.core.System.prototype.Laptop = 4
/** @const @type {number} */
	_globals.core.System.Laptop = 4
/** @const @type {number} */
	_globals.core.System.prototype.LaptopL = 5
/** @const @type {number} */
	_globals.core.System.LaptopL = 5
/** @const @type {number} */
	_globals.core.System.prototype.Laptop4K = 6
/** @const @type {number} */
	_globals.core.System.Laptop4K = 6
	core.addProperty(_globals.core.System.prototype, 'enum', 'layoutType')

	_globals.core.System.prototype.__create = function(__closure) {
		_globals.core.Object.prototype.__create.call(this, __closure.__base = { })

	}
	_globals.core.System.prototype.__setup = function(__closure) {
	_globals.core.Object.prototype.__setup.call(this, __closure.__base); delete __closure.__base
//assigning portrait to (this._get('parent')._get('width') < this._get('parent')._get('height'))
			var update$this$portrait = (function() { this.portrait = ((this._get('parent')._get('width') < this._get('parent')._get('height'))); }).bind(this)
			var dep$this$portrait$0 = this._get('parent')
			this.connectOnChanged(dep$this$portrait$0, 'width', update$this$portrait)
			var dep$this$portrait$1 = this._get('parent')
			this.connectOnChanged(dep$this$portrait$1, 'height', update$this$portrait)
			this._removeUpdater('portrait', [[dep$this$portrait$0, 'width', update$this$portrait],[dep$this$portrait$1, 'height', update$this$portrait]])
			update$this$portrait();
//assigning landscape to (! this._get('portrait'))
			var update$this$landscape = (function() { this.landscape = ((! this._get('portrait'))); }).bind(this)
			var dep$this$landscape$0 = this
			this.connectOnChanged(dep$this$landscape$0, 'portrait', update$this$landscape)
			this._removeUpdater('landscape', [[dep$this$landscape$0, 'portrait', update$this$landscape]])
			update$this$landscape();
			this.onChanged('contextHeight', (function(value) { this._updateLayoutType() } ).bind(this))
			this.onChanged('contextWidth', (function(value) { this._updateLayoutType() } ).bind(this))
}
//=====[component core.Item]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.core.Item = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);
	//custom constructor:
	{
		this._topPadding = 0
		if (this.parent) {
			if (this.element)
				throw new Error('double ctor call')

			this.createElement(this.getTag())
			var updateVisibility = function(value) {
				this._recursiveVisible = value
				this._updateVisibility()
			}.bind(this)
			updateVisibility(this.parent.recursiveVisible)
			this.connectOnChanged(this.parent, 'recursiveVisible', updateVisibility)
		} //no parent == top level element, skip
	}

}
	_globals.core.Item.prototype = Object.create(_globals.core.Object.prototype)
	_globals.core.Item.prototype.constructor = _globals.core.Item
	_globals.core.Item.prototype.componentName = 'core.Item'
	_globals.core.Item.prototype.boxChanged = _globals.core.createSignal('boxChanged')
	_globals.core.Item.prototype.addChild = function(child) {
		_globals.core.Object.prototype.addChild.apply(this, arguments)
		if (child._tryFocus())
			child._propagateFocusToParents()
	}
	_globals.core.Item.prototype._update = function(name,value) {
		switch(name) {
			case 'width':
				this.style('width', value)
				this.boxChanged()
				break;

			case 'height':
				this.style('height', value - this._topPadding);
				this.boxChanged()
				break;

			case 'x':
			case 'viewX':
				var x = this.x + this.viewX
				this.style('left', x);
				this.boxChanged()
				break;

			case 'y':
			case 'viewY':
				var y = this.y + this.viewY
				this.style('top', y);
				this.boxChanged()
				break;

			case 'opacity': if (this.element) this.style('opacity', value); break;
			case 'visible': if (this.element) this.style('visibility', value? 'inherit': 'hidden'); break;
			case 'z':		this.style('z-index', value); break;
			case 'radius':	this.style('border-radius', value); break;
			case 'clip':	this.style('overflow', value? 'hidden': 'visible'); break;
		}
		_globals.core.Object.prototype._update.apply(this, arguments);
	}
	_globals.core.Item.prototype._mapCSSAttribute = function(name) {
		return { width: 'width', height: 'height', x: 'left', y: 'top', viewX: 'left', viewY: 'top', opacity: 'opacity', radius: 'border-radius', rotate: 'transform', boxshadow: 'box-shadow', transform: 'transform', visible: 'visibility', background: 'background', color: 'color', font: 'font' }[name]
	}
	_globals.core.Item.prototype.setAnimation = function(name,animation) {
		if (!this._updateAnimation(name, animation))
			_globals.core.Object.prototype.setAnimation.apply(this, arguments);
	}
	_globals.core.Item.prototype._updateStyle = function() {
		var element = this.element
		if (element)
			element.updateStyle()
	}
	_globals.core.Item.prototype._updateVisibility = function() {
		var visible = ('visible' in this)? this.visible: true
		this.recursiveVisible = this._recursiveVisible && this.visible
		if (!visible && this.parent)
			this.parent._tryFocus() //try repair local focus on visibility changed
	}
	_globals.core.Item.prototype.style = function(name,style) {
		var element = this.element
		if (element)
			return element.style(name, style)
		else
			log('WARNING: style skipped:', name, style)
	}
	_globals.core.Item.prototype.toScreen = function() {
		var item = this
		var x = 0, y = 0
		var w = this.width, h = this.height
		while(item) {
			x += item.x
			y += item.y
			if ('view' in item) {
				x += item.viewX + item.view.content.x
				y += item.viewY + item.view.content.y
			}
			item = item.parent
		}
		return [x, y, x + w, y + h, x + w / 2, y + h / 2];
	}
	_globals.core.Item.prototype.forceActiveFocus = function() {
		var item = this;
		while(item.parent) {
			item.parent._focusChild(item);
			item = item.parent;
		}
	}
	_globals.core.Item.prototype._updateAnimation = function(name,animation) {
		if (!window.Modernizr.csstransitions || (animation && !animation.cssTransition))
			return false

		var css = this._mapCSSAttribute(name)

		if (css !== undefined) {
			if (!animation)
				throw new Error('resetting transition was not implemented')

			animation._target = name
			return this.setTransition(css, animation)
		} else {
			return false
		}
	}
	_globals.core.Item.prototype.hasActiveFocus = function() {
		var item = this
		while(item.parent) {
			if (item.parent.focusedChild != item)
				return false

			item = item.parent
		}
		return true
	}
	_globals.core.Item.prototype.setTransition = function(name,animation) {
		if (!window.Modernizr.csstransitions)
			return false

		var html5 = _globals.html5.html
		var transition = {
			property: html5.getPrefixedName('transition-property'),
			delay: html5.getPrefixedName('transition-delay'),
			duration: html5.getPrefixedName('transition-duration'),
			timing: html5.getPrefixedName('transition-timing-function')
		}

		name = html5.getPrefixedName(name) || name //replace transform: <prefix>rotate hack

		var property = this.style(transition.property) || []
		var duration = this.style(transition.duration) || []
		var timing = this.style(transition.timing) || []
		var delay = this.style(transition.delay) || []

		var idx = property.indexOf(name)
		if (idx === -1) { //if property not set
			property.push(name)
			duration.push(animation.duration + 'ms')
			timing.push(animation.easing)
			delay.push(animation.delay + 'ms')
		} else { //property already set, adjust the params
			duration[idx] = animation.duration + 'ms'
			timing[idx] = animation.easing
			delay[idx] = animation.delay + 'ms'
		}

		var style = {}
		style[transition.property] = property
		style[transition.duration] = duration
		style[transition.timing] = timing
		style[transition.delay] = delay

		//FIXME: smarttv 2003 animation won't work without this shit =(
		if (this._context.system.os === 'smartTV' || this._context.system.os === 'netcast') {
			style["transition-property"] = property
			style["transition-duration"] = duration
			style["transition-delay"] = delay
			style["transition-timing-function"] = timing
		}
		this.style(style)
		return true
	}
	_globals.core.Item.prototype.focusChild = function(child) {
		this._propagateFocusToParents()
		this._focusChild(child)
	}
	_globals.core.Item.prototype._processKey = function(event) {
		this._tryFocus() //soft-restore focus for invisible components
		if (this.focusedChild && this.focusedChild.visible) {
			if (this.focusedChild._processKey(event))
				return true
		}

		var key = _globals.core.keyCodes[event.which || event.keyCode];
		if (key) {
			if (key in this._pressedHandlers) {
				var handlers = this._pressedHandlers[key]
				var invoker = _globals.core.safeCall([key, event], function(ex) { log("on " + key + " handler failed:", ex, ex.stack) })
				for(var i = handlers.length - 1; i >= 0; --i) {
					var callback = handlers[i]
					if (invoker(callback)) {
						if (_globals.core.trace.key)
							log("key", key, "handled by", this, new Error().stack)
						return true;
					}
				}
			}

			if ('Key' in this._pressedHandlers) {
				var handlers = this._pressedHandlers['Key']
				var invoker = _globals.core.safeCall([key, event], function (ex) { log("onKeyPressed handler failed:", ex, ex.stack) })
				for(var i = handlers.length - 1; i >= 0; --i) {
					var callback = handlers[i]
					if (invoker(callback)) {
						if (_globals.core.trace.key)
							log("key", key, "handled by", this, new Error().stack)
						return true
					}
				}
			}
		}
		else {
			log("unknown key", event.which);
		}
		return false;
	}
	_globals.core.Item.prototype.createElement = function(tag) {
		this.element = this._context.createElement(tag)
		this._context.registerStyle(this, tag)
		this.parent.element.append(this.element)
	}
	_globals.core.Item.prototype.getTag = function() { return 'div' }
	_globals.core.Item.prototype.setFocus = function() { this.forceActiveFocus(); }
	_globals.core.Item.prototype._tryFocus = function() {
		if (!this.visible)
			return false

		if (this.focusedChild && this.focusedChild._tryFocus())
			return true

		var children = this.children
		for(var i = 0; i < children.length; ++i) {
			var child = children[i]
			if (child._tryFocus()) {
				this._focusChild(child)
				return true
			}
		}
		return this.focus
	}
	_globals.core.Item.prototype._focusChild = function(child) {
		if (child.parent !== this)
			throw new Error('invalid object passed as child')
		if (this.focusedChild === child)
			return
		if (this.focusedChild)
			this.focusedChild._focusTree(false)
		this.focusedChild = child
		if (this.focusedChild)
			this.focusedChild._focusTree(this.hasActiveFocus())
	}
	_globals.core.Item.prototype._focusTree = function(active) {
		this.activeFocus = active;
		if (this.focusedChild)
			this.focusedChild._focusTree(active);
	}
	_globals.core.Item.prototype.registerStyle = function(style,tag) {
		style.addRule(tag, 'position: absolute; visibility: inherit; border-style: solid; border-width: 0px; white-space: nowrap; border-radius: 0px; opacity: 1.0; transform: none; left: 0px; top: 0px; width: 0px; height: 0px;')
	}
	_globals.core.Item.prototype._propagateFocusToParents = function() {
		var item = this;
		while(item.parent && (!item.parent.focusedChild || !item.parent.focusedChild.visible)) {
			item.parent._focusChild(item)
			item = item.parent
		}
	}
	_globals.core.Item.prototype.discard = function() {
		_globals.core.Object.prototype.discard.apply(this)
		this.focusedChild = null
		if (this.element)
			this.element.discard()
	}
	core.addProperty(_globals.core.Item.prototype, 'int', 'x')
	core.addProperty(_globals.core.Item.prototype, 'int', 'y')
	core.addProperty(_globals.core.Item.prototype, 'int', 'z')
	core.addProperty(_globals.core.Item.prototype, 'int', 'width')
	core.addProperty(_globals.core.Item.prototype, 'int', 'height')
	core.addProperty(_globals.core.Item.prototype, 'bool', 'clip')
	core.addProperty(_globals.core.Item.prototype, 'real', 'radius')
	core.addProperty(_globals.core.Item.prototype, 'bool', 'focus')
	core.addProperty(_globals.core.Item.prototype, 'bool', 'focused')
	core.addProperty(_globals.core.Item.prototype, 'bool', 'activeFocus')
	core.addProperty(_globals.core.Item.prototype, 'Item', 'focusedChild')
	core.addProperty(_globals.core.Item.prototype, 'bool', 'visible', (true))
	core.addProperty(_globals.core.Item.prototype, 'bool', 'recursiveVisible', (true))
	core.addProperty(_globals.core.Item.prototype, 'real', 'opacity', (1))
	core.addProperty(_globals.core.Item.prototype, 'Anchors', 'anchors')
	core.addProperty(_globals.core.Item.prototype, 'Effects', 'effects')
	core.addProperty(_globals.core.Item.prototype, 'Transform', 'transform')
	core.addProperty(_globals.core.Item.prototype, 'AnchorLine', 'left')
	core.addProperty(_globals.core.Item.prototype, 'AnchorLine', 'top')
	core.addProperty(_globals.core.Item.prototype, 'AnchorLine', 'right')
	core.addProperty(_globals.core.Item.prototype, 'AnchorLine', 'bottom')
	core.addProperty(_globals.core.Item.prototype, 'AnchorLine', 'horizontalCenter')
	core.addProperty(_globals.core.Item.prototype, 'AnchorLine', 'verticalCenter')
	core.addProperty(_globals.core.Item.prototype, 'int', 'viewX')
	core.addProperty(_globals.core.Item.prototype, 'int', 'viewY')

	_globals.core.Item.prototype.__create = function(__closure) {
		_globals.core.Object.prototype.__create.call(this, __closure.__base = { })
//creating component core.<anonymous>
		var this$right = new _globals.core.AnchorLine(this)
		__closure.this$right = this$right

//creating component AnchorLine
		this$right.__create(__closure.__closure_this$right = { })

		this.right = this$right
//creating component core.<anonymous>
		var this$anchors = new _globals.core.Anchors(this)
		__closure.this$anchors = this$anchors

//creating component Anchors
		this$anchors.__create(__closure.__closure_this$anchors = { })

		this.anchors = this$anchors
//creating component core.<anonymous>
		var this$bottom = new _globals.core.AnchorLine(this)
		__closure.this$bottom = this$bottom

//creating component AnchorLine
		this$bottom.__create(__closure.__closure_this$bottom = { })

		this.bottom = this$bottom
//creating component core.<anonymous>
		var this$top = new _globals.core.AnchorLine(this)
		__closure.this$top = this$top

//creating component AnchorLine
		this$top.__create(__closure.__closure_this$top = { })

		this.top = this$top
//creating component core.<anonymous>
		var this$verticalCenter = new _globals.core.AnchorLine(this)
		__closure.this$verticalCenter = this$verticalCenter

//creating component AnchorLine
		this$verticalCenter.__create(__closure.__closure_this$verticalCenter = { })

		this.verticalCenter = this$verticalCenter
//creating component core.<anonymous>
		var this$transform = new _globals.core.Transform(this)
		__closure.this$transform = this$transform

//creating component Transform
		this$transform.__create(__closure.__closure_this$transform = { })

		this.transform = this$transform
//creating component core.<anonymous>
		var this$horizontalCenter = new _globals.core.AnchorLine(this)
		__closure.this$horizontalCenter = this$horizontalCenter

//creating component AnchorLine
		this$horizontalCenter.__create(__closure.__closure_this$horizontalCenter = { })

		this.horizontalCenter = this$horizontalCenter
//creating component core.<anonymous>
		var this$effects = new _globals.core.Effects(this)
		__closure.this$effects = this$effects

//creating component Effects
		this$effects.__create(__closure.__closure_this$effects = { })

		this.effects = this$effects
//creating component core.<anonymous>
		var this$left = new _globals.core.AnchorLine(this)
		__closure.this$left = this$left

//creating component AnchorLine
		this$left.__create(__closure.__closure_this$left = { })

		this.left = this$left
	}
	_globals.core.Item.prototype.__setup = function(__closure) {
	_globals.core.Object.prototype.__setup.call(this, __closure.__base); delete __closure.__base
//setting up component AnchorLine
			var this$right = __closure.this$right
			this$right.__setup(__closure.__closure_this$right)
			delete __closure.__closure_this$right

//assigning boxIndex to (2)
			this$right._removeUpdater('boxIndex'); this$right.boxIndex = ((2));


//setting up component Anchors
			var this$anchors = __closure.this$anchors
			this$anchors.__setup(__closure.__closure_this$anchors)
			delete __closure.__closure_this$anchors



//setting up component AnchorLine
			var this$bottom = __closure.this$bottom
			this$bottom.__setup(__closure.__closure_this$bottom)
			delete __closure.__closure_this$bottom

//assigning boxIndex to (3)
			this$bottom._removeUpdater('boxIndex'); this$bottom.boxIndex = ((3));


//setting up component AnchorLine
			var this$top = __closure.this$top
			this$top.__setup(__closure.__closure_this$top)
			delete __closure.__closure_this$top

//assigning boxIndex to (1)
			this$top._removeUpdater('boxIndex'); this$top.boxIndex = ((1));


//setting up component AnchorLine
			var this$verticalCenter = __closure.this$verticalCenter
			this$verticalCenter.__setup(__closure.__closure_this$verticalCenter)
			delete __closure.__closure_this$verticalCenter

//assigning boxIndex to (5)
			this$verticalCenter._removeUpdater('boxIndex'); this$verticalCenter.boxIndex = ((5));


//setting up component Transform
			var this$transform = __closure.this$transform
			this$transform.__setup(__closure.__closure_this$transform)
			delete __closure.__closure_this$transform



//setting up component AnchorLine
			var this$horizontalCenter = __closure.this$horizontalCenter
			this$horizontalCenter.__setup(__closure.__closure_this$horizontalCenter)
			delete __closure.__closure_this$horizontalCenter

//assigning boxIndex to (4)
			this$horizontalCenter._removeUpdater('boxIndex'); this$horizontalCenter.boxIndex = ((4));

//assigning focused to (this._get('focusedChild') === this)
			var update$this$focused = (function() { this.focused = ((this._get('focusedChild') === this)); }).bind(this)
			var dep$this$focused$0 = this
			this.connectOnChanged(dep$this$focused$0, 'focusedChild', update$this$focused)
			this._removeUpdater('focused', [[dep$this$focused$0, 'focusedChild', update$this$focused]])
			update$this$focused();

//setting up component Effects
			var this$effects = __closure.this$effects
			this$effects.__setup(__closure.__closure_this$effects)
			delete __closure.__closure_this$effects



//setting up component AnchorLine
			var this$left = __closure.this$left
			this$left.__setup(__closure.__closure_this$left)
			delete __closure.__closure_this$left

//assigning boxIndex to (0)
			this$left._removeUpdater('boxIndex'); this$left.boxIndex = ((0));

			this.onChanged('visible', (function(value) { this._updateVisibility() } ).bind(this))
}
//=====[component core.Text]=====================

/**
 * @constructor
 * @extends {_globals.core.Item}
 */
	_globals.core.Text = function(parent, _delegate) {
	_globals.core.Item.apply(this, arguments);
	//custom constructor:
	{
		this.element.addClass(this._context.getClass('text'))
		this._setText(this.text)
		var self = this
		this._delayedUpdateSize = new _globals.core.DelayedAction(this._context, function() {
			self._updateSizeImpl()
		})
	}

}
	_globals.core.Text.prototype = Object.create(_globals.core.Item.prototype)
	_globals.core.Text.prototype.constructor = _globals.core.Text
	_globals.core.Text.prototype.componentName = 'core.Text'
	_globals.core.Text.prototype.on = function(name,callback) {
		if (!this._updateSizeNeeded) {
			if (name == 'boxChanged')
				this._enableSizeUpdate()
		}
		_globals.core.Object.prototype.on.apply(this, arguments)
	}
	_globals.core.Text.prototype._updateSizeImpl = function() {
		if (this.text.length === 0) {
			this.paintedWidth = 0
			this.paintedHeight = 0
			return
		}

		var wrap = this.wrapMode != _globals.core.Text.prototype.NoWrap
		if (!wrap)
			this.style({ width: 'auto', height: 'auto', 'padding-top': 0 }) //no need to reset it to width, it's already there
		else
			this.style({ 'height': 'auto', 'padding-top': 0})

		this._reflectSize()

		var style
		if (!wrap)
			style = { width: this.width, height: this.height }
		else
			style = {'height': this.height }

		switch(this.verticalAlignment) {
			case this.AlignTop:		this._topPadding = 0; break
			case this.AlignBottom:	this._topPadding = this.height - this.paintedHeight; break
			case this.AlignVCenter:	this._topPadding = (this.height - this.paintedHeight) / 2; break
		}
		style['padding-top'] = this._topPadding
		style['height'] = this.height - this._topPadding
		this.style(style)
	}
	_globals.core.Text.prototype._update = function(name,value) {
		switch(name) {
			case 'text': this._setText(value); this._updateSize(); break;
			case 'color': this.style('color', _globals.core.normalizeColor(value)); break;
			case 'width': this._updateSize(); break;
			case 'verticalAlignment': this.verticalAlignment = value; this._enableSizeUpdate(); break
			case 'horizontalAlignment':
				switch(value) {
				case this.AlignLeft:	this.style('text-align', 'left'); break
				case this.AlignRight:	this.style('text-align', 'right'); break
				case this.AlignHCenter:	this.style('text-align', 'center'); break
				case this.AlignJustify:	this.style('text-align', 'justify'); break
				}
				break
			case 'wrapMode':
				switch(value) {
				case this.NoWrap:
					this.style({'white-space': 'nowrap', 'word-break': '' })
					break
				case this.Wrap:
				case this.WordWrap:
					this.style({'white-space': 'normal', 'word-break': '' })
					break
				case this.WrapAnywhere:
					this.style({ 'white-space': 'normal', 'word-break': 'break-all' })
					break
				}
				this._updateSize();
				break
		}
		_globals.core.Item.prototype._update.apply(this, arguments);
	}
	_globals.core.Text.prototype._setText = function(html) {
		this.element.setHtml(html)
	}
	_globals.core.Text.prototype._enableSizeUpdate = function() {
		this._updateSizeNeeded = true
		this._updateSize()
	}
	_globals.core.Text.prototype.onChanged = function(name,callback) {
		if (!this._updateSizeNeeded) {
			switch(name) {
				case "right":
				case "width":
				case "bottom":
				case "height":
				case "verticalCenter":
				case "horizontalCenter":
					this._enableSizeUpdate()
			}
		}
		_globals.core.Object.prototype.onChanged.apply(this, arguments);
	}
	_globals.core.Text.prototype._reflectSize = function() {
		this.paintedWidth = this.element.fullWidth()
		this.paintedHeight = this.element.fullHeight()
	}
	_globals.core.Text.prototype._updateStyle = function() {
		if (this.shadow && !this.shadow._empty())
			this.style('text-shadow', this.shadow._getFilterStyle())
		else
			this.style('text-shadow', '')
		_globals.core.Item.prototype._updateStyle.apply(this, arguments)
	}
	_globals.core.Text.prototype._updateSize = function() {
		if (this._updateSizeNeeded)
			this._delayedUpdateSize.schedule()
	}
	core.addProperty(_globals.core.Text.prototype, 'string', 'text')
	core.addProperty(_globals.core.Text.prototype, 'color', 'color')
	core.addProperty(_globals.core.Text.prototype, 'Shadow', 'shadow')
	core.addProperty(_globals.core.Text.prototype, 'Font', 'font')
	core.addProperty(_globals.core.Text.prototype, 'int', 'paintedWidth')
	core.addProperty(_globals.core.Text.prototype, 'int', 'paintedHeight')
/** @const @type {number} */
	_globals.core.Text.prototype.AlignTop = 0
/** @const @type {number} */
	_globals.core.Text.AlignTop = 0
/** @const @type {number} */
	_globals.core.Text.prototype.AlignBottom = 1
/** @const @type {number} */
	_globals.core.Text.AlignBottom = 1
/** @const @type {number} */
	_globals.core.Text.prototype.AlignVCenter = 2
/** @const @type {number} */
	_globals.core.Text.AlignVCenter = 2
	core.addProperty(_globals.core.Text.prototype, 'enum', 'verticalAlignment')
/** @const @type {number} */
	_globals.core.Text.prototype.AlignLeft = 0
/** @const @type {number} */
	_globals.core.Text.AlignLeft = 0
/** @const @type {number} */
	_globals.core.Text.prototype.AlignRight = 1
/** @const @type {number} */
	_globals.core.Text.AlignRight = 1
/** @const @type {number} */
	_globals.core.Text.prototype.AlignHCenter = 2
/** @const @type {number} */
	_globals.core.Text.AlignHCenter = 2
/** @const @type {number} */
	_globals.core.Text.prototype.AlignJustify = 3
/** @const @type {number} */
	_globals.core.Text.AlignJustify = 3
	core.addProperty(_globals.core.Text.prototype, 'enum', 'horizontalAlignment')
/** @const @type {number} */
	_globals.core.Text.prototype.NoWrap = 0
/** @const @type {number} */
	_globals.core.Text.NoWrap = 0
/** @const @type {number} */
	_globals.core.Text.prototype.WordWrap = 1
/** @const @type {number} */
	_globals.core.Text.WordWrap = 1
/** @const @type {number} */
	_globals.core.Text.prototype.WrapAnywhere = 2
/** @const @type {number} */
	_globals.core.Text.WrapAnywhere = 2
/** @const @type {number} */
	_globals.core.Text.prototype.Wrap = 3
/** @const @type {number} */
	_globals.core.Text.Wrap = 3
	core.addProperty(_globals.core.Text.prototype, 'enum', 'wrapMode')

	_globals.core.Text.prototype.__create = function(__closure) {
		_globals.core.Item.prototype.__create.call(this, __closure.__base = { })
//creating component core.<anonymous>
		var this$shadow = new _globals.core.Shadow(this)
		__closure.this$shadow = this$shadow

//creating component Shadow
		this$shadow.__create(__closure.__closure_this$shadow = { })

		this.shadow = this$shadow
//creating component core.<anonymous>
		var this$font = new _globals.core.Font(this)
		__closure.this$font = this$font

//creating component Font
		this$font.__create(__closure.__closure_this$font = { })

		this.font = this$font
	}
	_globals.core.Text.prototype.__setup = function(__closure) {
	_globals.core.Item.prototype.__setup.call(this, __closure.__base); delete __closure.__base
//assigning width to (this._get('paintedWidth'))
			var update$this$width = (function() { this.width = ((this._get('paintedWidth'))); }).bind(this)
			var dep$this$width$0 = this
			this.connectOnChanged(dep$this$width$0, 'paintedWidth', update$this$width)
			this._removeUpdater('width', [[dep$this$width$0, 'paintedWidth', update$this$width]])
			update$this$width();

//setting up component Shadow
			var this$shadow = __closure.this$shadow
			this$shadow.__setup(__closure.__closure_this$shadow)
			delete __closure.__closure_this$shadow



//setting up component Font
			var this$font = __closure.this$font
			this$font.__setup(__closure.__closure_this$font)
			delete __closure.__closure_this$font


//assigning height to (this._get('paintedHeight'))
			var update$this$height = (function() { this.height = ((this._get('paintedHeight'))); }).bind(this)
			var dep$this$height$0 = this
			this.connectOnChanged(dep$this$height$0, 'paintedHeight', update$this$height)
			this._removeUpdater('height', [[dep$this$height$0, 'paintedHeight', update$this$height]])
			update$this$height();
}
//=====[component controls.web.H2]=====================

/**
 * @constructor
 * @extends {_globals.core.Text}
 */
	_globals.controls.web.H2 = function(parent, _delegate) {
	_globals.core.Text.apply(this, arguments);

}
	_globals.controls.web.H2.prototype = Object.create(_globals.core.Text.prototype)
	_globals.controls.web.H2.prototype.constructor = _globals.controls.web.H2
	_globals.controls.web.H2.prototype.componentName = 'controls.web.H2'
	_globals.controls.web.H2.prototype.getTag = function() { return 'h2' }
	_globals.controls.web.H2.prototype.registerStyle = function(style,tag) { style.addRule(tag, 'position: absolute; visibility: inherit; margin: 0px'); }

	_globals.controls.web.H2.prototype.__create = function(__closure) {
		_globals.core.Text.prototype.__create.call(this, __closure.__base = { })

	}
	_globals.controls.web.H2.prototype.__setup = function(__closure) {
	_globals.core.Text.prototype.__setup.call(this, __closure.__base); delete __closure.__base
//assigning font.family to ("Roboto Slab")
			this._removeUpdater('font.family'); this._get('font').family = (("Roboto Slab"));
//assigning wrapMode to (_globals.core.Text.prototype.WordWrap)
			this._removeUpdater('wrapMode'); this.wrapMode = ((_globals.core.Text.prototype.WordWrap));
}
//=====[component core.Shadow]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.core.Shadow = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);

}
	_globals.core.Shadow.prototype = Object.create(_globals.core.Object.prototype)
	_globals.core.Shadow.prototype.constructor = _globals.core.Shadow
	_globals.core.Shadow.prototype.componentName = 'core.Shadow'
	_globals.core.Shadow.prototype._getFilterStyle = function() {
		var style = this.x + "px " + this.y + "px " + this.blur + "px "
		if (this.spread > 0)
			style += this.spread + "px "
		style += _globals.core.normalizeColor(this.color)
		return style
	}
	_globals.core.Shadow.prototype._update = function(name,value) {
		this.parent._updateStyle()
		_globals.core.Object.prototype._update.apply(this, arguments);
	}
	_globals.core.Shadow.prototype._empty = function() {
		return !this.x && !this.y && !this.blur && !this.spread;
	}
	core.addProperty(_globals.core.Shadow.prototype, 'real', 'x')
	core.addProperty(_globals.core.Shadow.prototype, 'real', 'y')
	core.addProperty(_globals.core.Shadow.prototype, 'Color', 'color', ("black"))
	core.addProperty(_globals.core.Shadow.prototype, 'real', 'blur')
	core.addProperty(_globals.core.Shadow.prototype, 'real', 'spread')//=====[component core.BaseLayout]=====================

/**
 * @constructor
 * @extends {_globals.core.Item}
 */
	_globals.core.BaseLayout = function(parent, _delegate) {
	_globals.core.Item.apply(this, arguments);
	//custom constructor:
	{
		this.count = 0
		this._delayedLayout = new _globals.core.DelayedAction(this._context, function() {
			this._updateItems()
			this._layout()
		}.bind(this))
	}

}
	_globals.core.BaseLayout.prototype = Object.create(_globals.core.Item.prototype)
	_globals.core.BaseLayout.prototype.constructor = _globals.core.BaseLayout
	_globals.core.BaseLayout.prototype.componentName = 'core.BaseLayout'
	_globals.core.BaseLayout.prototype._update = function(name,value) {
		switch(name) {
			case 'spacing': this._delayedLayout.schedule(); break;
		}
		qml.core.Item.prototype._update.apply(this, arguments);
	}
	_globals.core.BaseLayout.prototype._updateItems = function() {}
	core.addProperty(_globals.core.BaseLayout.prototype, 'int', 'count')
	core.addProperty(_globals.core.BaseLayout.prototype, 'int', 'spacing')
	core.addProperty(_globals.core.BaseLayout.prototype, 'int', 'currentIndex')
	core.addProperty(_globals.core.BaseLayout.prototype, 'int', 'contentWidth')
	core.addProperty(_globals.core.BaseLayout.prototype, 'int', 'contentHeight')
	core.addProperty(_globals.core.BaseLayout.prototype, 'bool', 'keyNavigationWraps')
	core.addProperty(_globals.core.BaseLayout.prototype, 'bool', 'handleNavigationKeys')//=====[component core.BaseView]=====================

/**
 * @constructor
 * @extends {_globals.core.BaseLayout}
 */
	_globals.core.BaseView = function(parent, _delegate) {
	_globals.core.BaseLayout.apply(this, arguments);
	//custom constructor:
	{
		this._items = []
		this._modelUpdate = new _globals.core.model.ModelUpdate()
	}

}
	_globals.core.BaseView.prototype = Object.create(_globals.core.BaseLayout.prototype)
	_globals.core.BaseView.prototype.constructor = _globals.core.BaseView
	_globals.core.BaseView.prototype.componentName = 'core.BaseView'
	_globals.core.BaseView.prototype._update = function(name,value) {
		switch(name) {
		case 'delegate':
			if (value)
				value.visible = false
			break
		}
		_globals.core.Item.prototype._update.apply(this, arguments);
	}
	_globals.core.BaseView.prototype._onRowsInserted = function(begin,end) {
		if (this.trace)
			log("rows inserted", begin, end)

		this._modelUpdate.insert(this.model, begin, end)
		this._delayedLayout.schedule()
	}
	_globals.core.BaseView.prototype._onReset = function() {
		var model = this.model
		if (this.trace)
			log("reset", this._items.length, model.count)

		this._modelUpdate.reset(model)
		this._delayedLayout.schedule()
	}
	_globals.core.BaseView.prototype._updateDelegate = function(idx) {
		var item = this._items[idx]
		if (item) {
			var row = this.model.get(idx)
			row.index = idx
			item._local.model = row
			_globals.core.Object.prototype._update.call(item, '_row')
		}
	}
	_globals.core.BaseView.prototype.itemAt = function(x,y) {
		var idx = this.indexAt(x, y)
		return idx >= 0? this._items[idx]: null
	}
	_globals.core.BaseView.prototype._discardItems = function(begin,end) {
		var deleted = this._items.splice(begin, end - begin)
		var view = this
		deleted.forEach(function(item) { view._discardItem(item)})
	}
	_globals.core.BaseView.prototype._discardItem = function(item) {
		if (item === null)
			return
		if (this.focusedChild === item)
			this.focusedChild = null;
		item.discard()
	}
	_globals.core.BaseView.prototype._attach = function() {
		if (this._attached || !this.model || !this.delegate)
			return

		this.model.on('reset', this._onReset.bind(this))
		this.model.on('rowsInserted', this._onRowsInserted.bind(this))
		this.model.on('rowsChanged', this._onRowsChanged.bind(this))
		this.model.on('rowsRemoved', this._onRowsRemoved.bind(this))
		this._attached = true
		this._onReset()
	}
	_globals.core.BaseView.prototype._updateItems = function() {
		this._modelUpdate.apply(this)
		qml.core.BaseLayout.prototype._updateItems.apply(this)
	}
	_globals.core.BaseView.prototype._updateDelegateIndex = function(idx) {
		var item = this._items[idx]
		if (item) {
			item._local.model.index = idx
			_globals.core.Object.prototype._update.call(item, '_rowIndex')
		}
	}
	_globals.core.BaseView.prototype._insertItems = function(begin,end) {
		var n = end - begin + 2
		var args = Array(n)
		args[0] = begin
		args[1] = 0
		for(var i = 2; i < n; ++i)
			args[i] = null
		Array.prototype.splice.apply(this._items, args)
	}
	_globals.core.BaseView.prototype._createDelegate = function(idx) {
		var items = this._items
		if (items[idx] !== null)
			return

		var row = this.model.get(idx)
		row['index'] = idx
		this._local['model'] = row

		var item = this.delegate()
		items[idx] = item
		item.view = this
		item.element.remove()
		this.content.element.append(item.element)

		item._local['model'] = row
		delete this._local['model']
		return item
	}
	_globals.core.BaseView.prototype.focusCurrent = function() {
		var n = this.count
		if (n == 0)
			return

		var idx = this.currentIndex
		if (idx < 0 || idx >= n) {
			if (this.keyNavigationWraps)
				this.currentIndex = (idx + n) % n
			else
				this.currentIndex = idx < 0? 0: n - 1
			return
		}
		var item = this._items[idx]

		if (item)
			this.focusChild(item)
		if (this.contentFollowsCurrentItem)
			this.positionViewAtIndex(idx)
	}
	_globals.core.BaseView.prototype._onRowsChanged = function(begin,end) {
		if (this.trace)
			log("rows changed", begin, end)

		this._modelUpdate.update(this.model, begin, end)
		this._delayedLayout.schedule()
	}
	_globals.core.BaseView.prototype._onRowsRemoved = function(begin,end) {
		if (this.trace)
			log("rows removed", begin, end)

		this._modelUpdate.remove(this.model, begin, end)
		this._delayedLayout.schedule()
	}
	core.addProperty(_globals.core.BaseView.prototype, 'Object', 'model')
	core.addProperty(_globals.core.BaseView.prototype, 'Item', 'delegate')
	core.addProperty(_globals.core.BaseView.prototype, 'int', 'contentX')
	core.addProperty(_globals.core.BaseView.prototype, 'int', 'contentY')
	core.addProperty(_globals.core.BaseView.prototype, 'int', 'scrollingStep', (0))
	core.addProperty(_globals.core.BaseView.prototype, 'int', 'animationDuration', (0))
	core.addProperty(_globals.core.BaseView.prototype, 'bool', 'contentFollowsCurrentItem', (true))
	core.addProperty(_globals.core.BaseView.prototype, 'bool', 'pageScrolling', (false))
	core.addProperty(_globals.core.BaseView.prototype, 'bool', 'rendered', (false))
	core.addProperty(_globals.core.BaseView.prototype, 'bool', 'trace')
	core.addProperty(_globals.core.BaseView.prototype, 'BaseViewContent', 'content')
/** @const @type {number} */
	_globals.core.BaseView.prototype.Beginning = 0
/** @const @type {number} */
	_globals.core.BaseView.Beginning = 0
/** @const @type {number} */
	_globals.core.BaseView.prototype.Center = 1
/** @const @type {number} */
	_globals.core.BaseView.Center = 1
/** @const @type {number} */
	_globals.core.BaseView.prototype.End = 2
/** @const @type {number} */
	_globals.core.BaseView.End = 2
/** @const @type {number} */
	_globals.core.BaseView.prototype.Visible = 3
/** @const @type {number} */
	_globals.core.BaseView.Visible = 3
/** @const @type {number} */
	_globals.core.BaseView.prototype.Contain = 4
/** @const @type {number} */
	_globals.core.BaseView.Contain = 4
/** @const @type {number} */
	_globals.core.BaseView.prototype.Page = 5
/** @const @type {number} */
	_globals.core.BaseView.Page = 5
	core.addProperty(_globals.core.BaseView.prototype, 'enum', 'positionMode')

	_globals.core.BaseView.prototype.__create = function(__closure) {
		_globals.core.BaseLayout.prototype.__create.call(this, __closure.__base = { })
//creating component core.<anonymous>
		var this$content = new _globals.core.BaseViewContent(this)
		__closure.this$content = this$content

//creating component BaseViewContent
		this$content.__create(__closure.__closure_this$content = { })

		this.content = this$content
	}
	_globals.core.BaseView.prototype.__setup = function(__closure) {
	_globals.core.BaseLayout.prototype.__setup.call(this, __closure.__base); delete __closure.__base
//assigning keyNavigationWraps to (true)
			this._removeUpdater('keyNavigationWraps'); this.keyNavigationWraps = ((true));
//assigning contentWidth to (1)
			this._removeUpdater('contentWidth'); this.contentWidth = ((1));
//assigning contentHeight to (1)
			this._removeUpdater('contentHeight'); this.contentHeight = ((1));
//assigning handleNavigationKeys to (true)
			this._removeUpdater('handleNavigationKeys'); this.handleNavigationKeys = ((true));

//setting up component BaseViewContent
			var this$content = __closure.this$content
			this$content.__setup(__closure.__closure_this$content)
			delete __closure.__closure_this$content

	var behavior_this_content_on_y = new _globals.core.Animation(this$content)
	var behavior_this_content_on_y__closure = { behavior_this_content_on_y: behavior_this_content_on_y }

//creating component Animation
	behavior_this_content_on_y.__create(behavior_this_content_on_y__closure.__closure_behavior_this_content_on_y = { })


//setting up component Animation
	var behavior_this_content_on_y = behavior_this_content_on_y__closure.behavior_this_content_on_y
	behavior_this_content_on_y.__setup(behavior_this_content_on_y__closure.__closure_behavior_this_content_on_y)
	delete behavior_this_content_on_y__closure.__closure_behavior_this_content_on_y

//assigning duration to (this._get('parent')._get('parent')._get('animationDuration'))
	var update$behavior_this_content_on_y$duration = (function() { behavior_this_content_on_y.duration = ((this._get('parent')._get('parent')._get('animationDuration'))); }).bind(behavior_this_content_on_y)
	var dep$behavior_this_content_on_y$duration$0 = behavior_this_content_on_y._get('parent')._get('parent')
	behavior_this_content_on_y.connectOnChanged(dep$behavior_this_content_on_y$duration$0, 'animationDuration', update$behavior_this_content_on_y$duration)
	behavior_this_content_on_y._removeUpdater('duration', [[dep$behavior_this_content_on_y$duration$0, 'animationDuration', update$behavior_this_content_on_y$duration]])
	update$behavior_this_content_on_y$duration();

	this$content.setAnimation('y', behavior_this_content_on_y);

	var behavior_this_content_on_x = new _globals.core.Animation(this$content)
	var behavior_this_content_on_x__closure = { behavior_this_content_on_x: behavior_this_content_on_x }

//creating component Animation
	behavior_this_content_on_x.__create(behavior_this_content_on_x__closure.__closure_behavior_this_content_on_x = { })


//setting up component Animation
	var behavior_this_content_on_x = behavior_this_content_on_x__closure.behavior_this_content_on_x
	behavior_this_content_on_x.__setup(behavior_this_content_on_x__closure.__closure_behavior_this_content_on_x)
	delete behavior_this_content_on_x__closure.__closure_behavior_this_content_on_x

//assigning duration to (this._get('parent')._get('parent')._get('animationDuration'))
	var update$behavior_this_content_on_x$duration = (function() { behavior_this_content_on_x.duration = ((this._get('parent')._get('parent')._get('animationDuration'))); }).bind(behavior_this_content_on_x)
	var dep$behavior_this_content_on_x$duration$0 = behavior_this_content_on_x._get('parent')._get('parent')
	behavior_this_content_on_x.connectOnChanged(dep$behavior_this_content_on_x$duration$0, 'animationDuration', update$behavior_this_content_on_x$duration)
	behavior_this_content_on_x._removeUpdater('duration', [[dep$behavior_this_content_on_x$duration$0, 'animationDuration', update$behavior_this_content_on_x$duration]])
	update$behavior_this_content_on_x$duration();

	this$content.setAnimation('x', behavior_this_content_on_x);

	var behavior_this_content_on_transform = new _globals.core.Animation(this$content)
	var behavior_this_content_on_transform__closure = { behavior_this_content_on_transform: behavior_this_content_on_transform }

//creating component Animation
	behavior_this_content_on_transform.__create(behavior_this_content_on_transform__closure.__closure_behavior_this_content_on_transform = { })


//setting up component Animation
	var behavior_this_content_on_transform = behavior_this_content_on_transform__closure.behavior_this_content_on_transform
	behavior_this_content_on_transform.__setup(behavior_this_content_on_transform__closure.__closure_behavior_this_content_on_transform)
	delete behavior_this_content_on_transform__closure.__closure_behavior_this_content_on_transform

//assigning duration to (this._get('parent')._get('parent')._get('animationDuration'))
	var update$behavior_this_content_on_transform$duration = (function() { behavior_this_content_on_transform.duration = ((this._get('parent')._get('parent')._get('animationDuration'))); }).bind(behavior_this_content_on_transform)
	var dep$behavior_this_content_on_transform$duration$0 = behavior_this_content_on_transform._get('parent')._get('parent')
	behavior_this_content_on_transform.connectOnChanged(dep$behavior_this_content_on_transform$duration$0, 'animationDuration', update$behavior_this_content_on_transform$duration)
	behavior_this_content_on_transform._removeUpdater('duration', [[dep$behavior_this_content_on_transform$duration$0, 'animationDuration', update$behavior_this_content_on_transform$duration]])
	update$behavior_this_content_on_transform$duration();

	this$content.setAnimation('transform', behavior_this_content_on_transform);

			this._context._onCompleted((function() {
		this._attach();
		var delayedLayout = this._delayedLayout

		var self = this
		this.element.on('scroll', function(event) {
			self.contentX = self.element.dom.scrollLeft
			self.contentY = self.element.dom.scrollTop
		}.bind(this))

		delayedLayout.schedule()
	} ).bind(this))
			this.onChanged('height', (function(value) { this._delayedLayout.schedule() } ).bind(this))
			this.onChanged('width', (function(value) { this._delayedLayout.schedule() } ).bind(this))
			this.onChanged('recursiveVisible', (function(value) { if (value) this._delayedLayout.schedule(); } ).bind(this))
			this.onChanged('contentY', (function(value) { this.content.y = -value; } ).bind(this))
			this.onChanged('contentX', (function(value) { this.content.x = -value; } ).bind(this))
			this.onChanged('focusedChild', (function(value) {
		var idx = this._items.indexOf(this.focusedChild)
		if (idx >= 0)
			this.currentIndex = idx
	} ).bind(this))
			this.onChanged('currentIndex', (function(value) {
		this.focusCurrent()
	} ).bind(this))
}
//=====[component core.Repeater]=====================

/**
 * @constructor
 * @extends {_globals.core.BaseView}
 */
	_globals.core.Repeater = function(parent, _delegate) {
	_globals.core.BaseView.apply(this, arguments);

}
	_globals.core.Repeater.prototype = Object.create(_globals.core.BaseView.prototype)
	_globals.core.Repeater.prototype.constructor = _globals.core.Repeater
	_globals.core.Repeater.prototype.componentName = 'core.Repeater'
	_globals.core.Repeater.prototype._layout = function() {
		if (!this.recursiveVisible)
			return

		var model = this.model;
		if (!model)
			return

		var created = false;
		var n = this.count = model.count
		var items = this._items
		for(var i = 0; i < n; ++i) {
			var item = items[i]
			if (!item) {
				item = this._createDelegate(i)
				created = true
			}
		}
		this.rendered = true
		if (created)
			this._context._complete()
	}//=====[component core.Animation]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.core.Animation = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);
	//custom constructor:
	{ this._disabled = 0 }

}
	_globals.core.Animation.prototype = Object.create(_globals.core.Object.prototype)
	_globals.core.Animation.prototype.constructor = _globals.core.Animation
	_globals.core.Animation.prototype.componentName = 'core.Animation'
	_globals.core.Animation.prototype.enable = function() { --this._disabled }
	_globals.core.Animation.prototype.complete = function() { }
	_globals.core.Animation.prototype.enabled = function() { return this._disabled == 0 }
	_globals.core.Animation.prototype.interpolate = function(dst,src,t) {
		return t * (dst - src) + src;
	}
	_globals.core.Animation.prototype.disable = function() { ++this._disabled }
	_globals.core.Animation.prototype._update = function(name,value) {
		var parent = this.parent
		if (this._target && parent && parent._updateAnimation && parent._updateAnimation(this._target, this.enabled() ? this: null))
			return

		_globals.core.Object.prototype._update.apply(this, arguments);
	}
	core.addProperty(_globals.core.Animation.prototype, 'int', 'delay', (0))
	core.addProperty(_globals.core.Animation.prototype, 'int', 'duration', (200))
	core.addProperty(_globals.core.Animation.prototype, 'bool', 'cssTransition', (true))
	core.addProperty(_globals.core.Animation.prototype, 'bool', 'running', (false))
	core.addProperty(_globals.core.Animation.prototype, 'string', 'easing', ("ease"))//=====[component vc.ChalkText]=====================

/**
 * @constructor
 * @extends {_globals.controls.web.H2}
 */
	_globals.vc.ChalkText = function(parent, _delegate) {
	_globals.controls.web.H2.apply(this, arguments);

}
	_globals.vc.ChalkText.prototype = Object.create(_globals.controls.web.H2.prototype)
	_globals.vc.ChalkText.prototype.constructor = _globals.vc.ChalkText
	_globals.vc.ChalkText.prototype.componentName = 'vc.ChalkText'
	core.addProperty(_globals.vc.ChalkText.prototype, 'int', 'colorNum')

	_globals.vc.ChalkText.prototype.__create = function(__closure) {
		_globals.controls.web.H2.prototype.__create.call(this, __closure.__base = { })
var this$child0 = new _globals.controls.mixins.HoverMixin(this)
		__closure.this$child0 = this$child0

//creating component HoverMixin
		this$child0.__create(__closure.__closure_this$child0 = { })

		var this$child1 = new _globals.controls.mixins.WheelMixin(this)
		__closure.this$child1 = this$child1

//creating component WheelMixin
		this$child1.__create(__closure.__closure_this$child1 = { })
	}
	_globals.vc.ChalkText.prototype.__setup = function(__closure) {
	_globals.controls.web.H2.prototype.__setup.call(this, __closure.__base); delete __closure.__base
//assigning color to ("#B2EBF2")
			this._removeUpdater('color'); this.color = (("#B2EBF2"));
//assigning text to (" <span style='color: #EEEEEE'> Income: </span>" + _globals.controls.pure.format.currency((77895415.2223),(2)) + "$")
			this._removeUpdater('text'); this.text = ((" <span style='color: #EEEEEE'> Income: </span>" + _globals.controls.pure.format.currency((77895415.2223),(2)) + "$"));
//assigning font.weight to (300)
			this._removeUpdater('font.weight'); this._get('font').weight = ((300));
			this.on('wheel', (function(e) {
		if (e.deltaY > 0)
			this.colorNum = (this.colorNum + 1) % 18
		else
			this.colorNum = (this.colorNum + 17) % 18
	} ).bind(this))
			this.on('clicked', (function() {
		this.colorNum = (this.colorNum + 1) % 18
	} ).bind(this))
			this.onChanged('colorNum', (function(value) {
		var c = ["#B2EBF2", "#B2DFDB", "#B3E5FC", "#BBDEFB", "#FFCDD2", "#FCE4EC", "#E0F7FA", "#C8E6C9", "#E8F5E9", "#DCEDC8", "#F0F4C3", "#FFF9C4", "#FFF8E1", "#FFE0B2", "#FFF3E0", "#FBE9E7", "#FFCCBC", "#A5D6A7"];
		this.color = c[this.colorNum]
	} ).bind(this))


//setting up component HoverMixin
			var this$child0 = __closure.this$child0
			this$child0.__setup(__closure.__closure_this$child0)
			delete __closure.__closure_this$child0

//assigning cursor to ("pointer")
			this$child0._removeUpdater('cursor'); this$child0.cursor = (("pointer"));

			this.addChild(this$child0)

//setting up component WheelMixin
			var this$child1 = __closure.this$child1
			this$child1.__setup(__closure.__closure_this$child1)
			delete __closure.__closure_this$child1


			this.addChild(this$child1)
}
//=====[component controls.pure.MaterialIcon]=====================

/**
 * @constructor
 * @extends {_globals.core.Text}
 */
	_globals.controls.pure.MaterialIcon = function(parent, _delegate) {
	_globals.core.Text.apply(this, arguments);
	//custom constructor:
	{
		_globals.html5.html.loadExternalStylesheet("https://fonts.googleapis.com/icon?family=Material+Icons")
	}

}
	_globals.controls.pure.MaterialIcon.prototype = Object.create(_globals.core.Text.prototype)
	_globals.controls.pure.MaterialIcon.prototype.constructor = _globals.controls.pure.MaterialIcon
	_globals.controls.pure.MaterialIcon.prototype.componentName = 'controls.pure.MaterialIcon'

	_globals.controls.pure.MaterialIcon.prototype.__create = function(__closure) {
		_globals.core.Text.prototype.__create.call(this, __closure.__base = { })
core.addAliasProperty(this, 'size', (function() { return this._get('font'); }).bind(this), 'pixelSize')
		core.addAliasProperty(this, 'icon', (function() { return this; }).bind(this), 'text')
	}
	_globals.controls.pure.MaterialIcon.prototype.__setup = function(__closure) {
	_globals.core.Text.prototype.__setup.call(this, __closure.__base); delete __closure.__base
//assigning font.family to ("Material Icons")
			this._removeUpdater('font.family'); this._get('font').family = (("Material Icons"));
}
//=====[component core.Image]=====================

/**
 * @constructor
 * @extends {_globals.core.Item}
 */
	_globals.core.Image = function(parent, _delegate) {
	_globals.core.Item.apply(this, arguments);
	//custom constructor:
	{
		var self = this
		this._delayedLoad = new _globals.core.DelayedAction(this._context, function() {
			self._load()
		})

		this._init()
	}

}
	_globals.core.Image.prototype = Object.create(_globals.core.Item.prototype)
	_globals.core.Image.prototype.constructor = _globals.core.Image
	_globals.core.Image.prototype.componentName = 'core.Image'
	_globals.core.Image.prototype.load = function() {
		var src = this.source
		this.status = (src.length === 0)? _globals.core.Image.prototype.Null: _globals.core.Image.prototype.Loading
		this._delayedLoad.schedule()
	}
	_globals.core.Image.prototype._onError = function() {
		this.status = this.Error;
	}
	_globals.core.Image.prototype._update = function(name,value) {
		switch(name) {
			case 'width':
			case 'height':
//			case 'rotate':
			case 'fillMode': this.load(); break;
			case 'source':
				this.status = value ? this.Loading : this.Null;
				if (value)
					this.load();
				break;
		}
		_globals.core.Item.prototype._update.apply(this, arguments);
	}
	_globals.core.Image.prototype._init = function() {
		var tmp = new Image()
		this._image = tmp
		this._image.onerror = this._onError.bind(this)

		var image = this
		this._image.onload = function() {
			image.paintedWidth = tmp.naturalWidth
			image.paintedHeight = tmp.naturalHeight

			var style = {'background-image': 'url(' + image.source + ')'}
			switch(image.fillMode) {
				case image.Stretch:
					style['background-repeat'] = 'no-repeat'
					style['background-size'] = '100% 100%'
					break;
				case image.TileVertically:
					style['background-repeat'] = 'repeat-y'
					style['background-size'] = '100%'
					break;
				case image.TileHorizontally:
					style['background-repeat'] = 'repeat-x'
					style['background-size'] = tmp.naturalWidth + 'px 100%'
					break;
				case image.PreserveAspectFit:
					style['background-repeat'] = 'no-repeat'
					style['background-position'] = 'center'
					var w = image.width
					var h = image.height
					var wPart = w / tmp.naturalWidth
					var hPart = h / tmp.naturalHeight
					var wRatio = 100
					var hRatio = 100

					if (wPart === 0) {
						wPart = hPart
						w = hPart * tmp.naturalWidth
					}

					if (hPart === 0) {
						hPart = wPart
						h = wPart * tmp.naturalHeight
					}

					if (wPart > hPart)
						wRatio = Math.floor(100 / wPart * hPart)
					else
						hRatio = Math.floor(100 / hPart * wPart)
					style['background-size'] = wRatio + '% ' + hRatio + '%'
					image.paintedWidth = w * wRatio / 100
					image.paintedHeight = h * hRatio / 100
					break;
				case image.PreserveAspectCrop:
					style['background-repeat'] = 'no-repeat'
					style['background-position'] = 'center'
					var pRatio = tmp.naturalWidth / tmp.naturalHeight
					var iRatio = image.width / image.height
					if (pRatio < iRatio) {
						var hRatio = Math.floor(iRatio / pRatio * 100)
						style['background-size'] = 100 + '% ' + hRatio + '%'
					}
					else {
						var wRatio = Math.floor(pRatio / iRatio * 100)
						style['background-size'] = wRatio + '% ' + 100 + '%'
					}
					break;
				case image.Tile:
					style['background-repeat'] = 'repeat-y repeat-x'
					break;
			}
			image.style(style)

			if (!image.width)
				image.width = image.paintedWidth
			if (!image.height)
				image.height = image.paintedHeight
			image.status = _globals.core.Image.prototype.Ready
		}
		this.load()
	}
	_globals.core.Image.prototype._load = function() {
		this._image.src = this.source
	}
	core.addProperty(_globals.core.Image.prototype, 'string', 'source')
	core.addProperty(_globals.core.Image.prototype, 'int', 'paintedWidth')
	core.addProperty(_globals.core.Image.prototype, 'int', 'paintedHeight')
/** @const @type {number} */
	_globals.core.Image.prototype.Null = 0
/** @const @type {number} */
	_globals.core.Image.Null = 0
/** @const @type {number} */
	_globals.core.Image.prototype.Ready = 1
/** @const @type {number} */
	_globals.core.Image.Ready = 1
/** @const @type {number} */
	_globals.core.Image.prototype.Loading = 2
/** @const @type {number} */
	_globals.core.Image.Loading = 2
/** @const @type {number} */
	_globals.core.Image.prototype.Error = 3
/** @const @type {number} */
	_globals.core.Image.Error = 3
	core.addProperty(_globals.core.Image.prototype, 'enum', 'status')
/** @const @type {number} */
	_globals.core.Image.prototype.Stretch = 0
/** @const @type {number} */
	_globals.core.Image.Stretch = 0
/** @const @type {number} */
	_globals.core.Image.prototype.PreserveAspectFit = 1
/** @const @type {number} */
	_globals.core.Image.PreserveAspectFit = 1
/** @const @type {number} */
	_globals.core.Image.prototype.PreserveAspectCrop = 2
/** @const @type {number} */
	_globals.core.Image.PreserveAspectCrop = 2
/** @const @type {number} */
	_globals.core.Image.prototype.Tile = 3
/** @const @type {number} */
	_globals.core.Image.Tile = 3
/** @const @type {number} */
	_globals.core.Image.prototype.TileVertically = 4
/** @const @type {number} */
	_globals.core.Image.TileVertically = 4
/** @const @type {number} */
	_globals.core.Image.prototype.TileHorizontally = 5
/** @const @type {number} */
	_globals.core.Image.TileHorizontally = 5
	core.addProperty(_globals.core.Image.prototype, 'enum', 'fillMode')//=====[component controls.mixins.ImageMixin]=====================

/**
 * @constructor
 * @extends {_globals.core.Image}
 */
	_globals.controls.mixins.ImageMixin = function(parent, _delegate) {
	_globals.core.Image.apply(this, arguments);

}
	_globals.controls.mixins.ImageMixin.prototype = Object.create(_globals.core.Image.prototype)
	_globals.controls.mixins.ImageMixin.prototype.constructor = _globals.controls.mixins.ImageMixin
	_globals.controls.mixins.ImageMixin.prototype.componentName = 'controls.mixins.ImageMixin'
	_globals.controls.mixins.ImageMixin.prototype.createElement = function(tag) {
		this.element = this.parent.element;
	}
	_globals.controls.mixins.ImageMixin.prototype._init = function() {
		var tmp = new Image()
		this._image = tmp
		this._image.onerror = this._onError.bind(this)

		var image = this
		this._image.onload = function() {
			var natW = tmp.naturalWidth, natH = tmp.naturalHeight
			var w = image.width, h = image.height
			image.paintedWidth = w
			image.paintedHeight = h

			var style = {'background-image': 'url(' + image.source + ')'}
			switch(image.fillMode) {
				case image.Stretch:
					style['background-repeat'] = 'no-repeat'
					style['background-size'] = '100% 100%'
					break;
				case image.TileVertically:
					style['background-repeat'] = 'repeat-y'
					style['background-size'] = '100%'
					break;
				case image.TileHorizontally:
					style['background-repeat'] = 'repeat-x'
					style['background-size'] = natW + 'px 100%'
					break;
				case image.Tile:
					style['background-repeat'] = 'repeat-y repeat-x'
					break;
				case image.PreserveAspectCrop:
					style['background-repeat'] = 'no-repeat'
					style['background-position'] = 'center'
					style['background-size'] = 'cover'
					break;
				case image.PreserveAspectFit:
					style['background-repeat'] = 'no-repeat'
					style['background-position'] = 'center'
					style['background-size'] = 'contain'
					var srcRatio = natW / natH, targetRatio = w / h
					if (srcRatio > targetRatio) { // img width aligned with target width
						image.paintedWidth = w;
						image.paintedHeight = w / srcRatio;
					} else {
						image.paintedHeight = h;
						image.paintedWidth = h * srcRatio;
					}
					break;
			}
			image.style(style)

			image.status = _globals.core.Image.prototype.Ready
		}
		this.load()
	}

	_globals.controls.mixins.ImageMixin.prototype.__create = function(__closure) {
		_globals.core.Image.prototype.__create.call(this, __closure.__base = { })

	}
	_globals.controls.mixins.ImageMixin.prototype.__setup = function(__closure) {
	_globals.core.Image.prototype.__setup.call(this, __closure.__base); delete __closure.__base
//assigning width to (this._get('paintedWidth'))
			var update$this$width = (function() { this.width = ((this._get('paintedWidth'))); }).bind(this)
			var dep$this$width$0 = this
			this.connectOnChanged(dep$this$width$0, 'paintedWidth', update$this$width)
			this._removeUpdater('width', [[dep$this$width$0, 'paintedWidth', update$this$width]])
			update$this$width();
//assigning height to (this._get('paintedHeight'))
			var update$this$height = (function() { this.height = ((this._get('paintedHeight'))); }).bind(this)
			var dep$this$height$0 = this
			this.connectOnChanged(dep$this$height$0, 'paintedHeight', update$this$height)
			this._removeUpdater('height', [[dep$this$height$0, 'paintedHeight', update$this$height]])
			update$this$height();
//assigning anchors.fill to (this._get('parent'))
			var update$this$anchors_fill = (function() { this._get('anchors').fill = ((this._get('parent'))); }).bind(this)
			var dep$this$anchors_fill$0 = this
			this.connectOnChanged(dep$this$anchors_fill$0, 'parent', update$this$anchors_fill)
			this._removeUpdater('anchors.fill', [[dep$this$anchors_fill$0, 'parent', update$this$anchors_fill]])
			update$this$anchors_fill();
}
//=====[component core.Font]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.core.Font = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);

}
	_globals.core.Font.prototype = Object.create(_globals.core.Object.prototype)
	_globals.core.Font.prototype.constructor = _globals.core.Font
	_globals.core.Font.prototype.componentName = 'core.Font'
	_globals.core.Font.prototype._update = function(name,value) {
		switch(name) {
			case 'family':		this.parent.style('font-family', value); this.parent._updateSize(); break
			case 'pointSize':	this.parent.style('font-size', value + "pt"); this.parent._updateSize(); break
			case 'pixelSize':	this.parent.style('font-size', value + "px"); this.parent._updateSize(); break
			case 'italic': 		this.parent.style('font-style', value? 'italic': 'normal'); this.parent._updateSize(); break
			case 'bold': 		this.parent.style('font-weight', value? 'bold': 'normal'); this.parent._updateSize(); break
			case 'underline':	this.parent.style('text-decoration', value? 'underline': ''); this.parent._updateSize(); break
			case 'lineHeight':	this.parent.style('line-height', value + "px"); this.parent._updateSize(); break;
			case 'weight':	this.parent.style('font-weight', value); this.parent._updateSize(); break;
		}
		_globals.core.Object.prototype._update.apply(this, arguments);
	}
	core.addProperty(_globals.core.Font.prototype, 'string', 'family')
	core.addProperty(_globals.core.Font.prototype, 'bool', 'italic')
	core.addProperty(_globals.core.Font.prototype, 'bool', 'bold')
	core.addProperty(_globals.core.Font.prototype, 'bool', 'underline')
	core.addProperty(_globals.core.Font.prototype, 'int', 'pixelSize')
	core.addProperty(_globals.core.Font.prototype, 'int', 'pointSize')
	core.addProperty(_globals.core.Font.prototype, 'int', 'lineHeight')
	core.addProperty(_globals.core.Font.prototype, 'int', 'weight')//=====[component core.BorderSide]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.core.BorderSide = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);

}
	_globals.core.BorderSide.prototype = Object.create(_globals.core.Object.prototype)
	_globals.core.BorderSide.prototype.constructor = _globals.core.BorderSide
	_globals.core.BorderSide.prototype.componentName = 'core.BorderSide'
	_globals.core.BorderSide.prototype._update = function(name,value) {
		switch(name) {
			case 'width': this._updateStyle(); break
			case 'color': this._updateStyle(); break
		}
		_globals.core.Object.prototype._update.apply(this, arguments);
	}
	_globals.core.BorderSide.prototype._updateStyle = function() {
		if (this.parent && this.parent.parent) {
			var pp = this.parent.parent
			if (pp) {
				var cssname = 'border-' + this.name
				if (this.width) {
					pp.style(cssname, this.width + "px solid " + _globals.core.normalizeColor(this.color))
				} else
					pp.style(cssname, '')
			}
		}
	}
	core.addProperty(_globals.core.BorderSide.prototype, 'string', 'name')
	core.addProperty(_globals.core.BorderSide.prototype, 'int', 'width')
	core.addProperty(_globals.core.BorderSide.prototype, 'color', 'color')//=====[component core.Border]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.core.Border = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);

}
	_globals.core.Border.prototype = Object.create(_globals.core.Object.prototype)
	_globals.core.Border.prototype.constructor = _globals.core.Border
	_globals.core.Border.prototype.componentName = 'core.Border'
	_globals.core.Border.prototype._update = function(name,value) {
		switch(name) {
			case 'width': this.parent.style({'border-width': value, 'margin-left': -value, 'margin-top': -value}); break;
			case 'color': this.parent.style('border-color', _globals.core.normalizeColor(value)); break;
			case 'style': this.parent.style('border-style', value); break
		}
		_globals.core.Object.prototype._update.apply(this, arguments)
	}
	core.addProperty(_globals.core.Border.prototype, 'int', 'width')
	core.addProperty(_globals.core.Border.prototype, 'color', 'color')
	core.addProperty(_globals.core.Border.prototype, 'string', 'style')
	core.addProperty(_globals.core.Border.prototype, 'BorderSide', 'left')
	core.addProperty(_globals.core.Border.prototype, 'BorderSide', 'right')
	core.addProperty(_globals.core.Border.prototype, 'BorderSide', 'top')
	core.addProperty(_globals.core.Border.prototype, 'BorderSide', 'bottom')

	_globals.core.Border.prototype.__create = function(__closure) {
		_globals.core.Object.prototype.__create.call(this, __closure.__base = { })
//creating component core.<anonymous>
		var this$top = new _globals.core.BorderSide(this)
		__closure.this$top = this$top

//creating component BorderSide
		this$top.__create(__closure.__closure_this$top = { })

		this.top = this$top
//creating component core.<anonymous>
		var this$right = new _globals.core.BorderSide(this)
		__closure.this$right = this$right

//creating component BorderSide
		this$right.__create(__closure.__closure_this$right = { })

		this.right = this$right
//creating component core.<anonymous>
		var this$bottom = new _globals.core.BorderSide(this)
		__closure.this$bottom = this$bottom

//creating component BorderSide
		this$bottom.__create(__closure.__closure_this$bottom = { })

		this.bottom = this$bottom
//creating component core.<anonymous>
		var this$left = new _globals.core.BorderSide(this)
		__closure.this$left = this$left

//creating component BorderSide
		this$left.__create(__closure.__closure_this$left = { })

		this.left = this$left
	}
	_globals.core.Border.prototype.__setup = function(__closure) {
	_globals.core.Object.prototype.__setup.call(this, __closure.__base); delete __closure.__base
//setting up component BorderSide
			var this$top = __closure.this$top
			this$top.__setup(__closure.__closure_this$top)
			delete __closure.__closure_this$top

//assigning name to ("top")
			this$top._removeUpdater('name'); this$top.name = (("top"));


//setting up component BorderSide
			var this$right = __closure.this$right
			this$right.__setup(__closure.__closure_this$right)
			delete __closure.__closure_this$right

//assigning name to ("right")
			this$right._removeUpdater('name'); this$right.name = (("right"));


//setting up component BorderSide
			var this$bottom = __closure.this$bottom
			this$bottom.__setup(__closure.__closure_this$bottom)
			delete __closure.__closure_this$bottom

//assigning name to ("bottom")
			this$bottom._removeUpdater('name'); this$bottom.name = (("bottom"));


//setting up component BorderSide
			var this$left = __closure.this$left
			this$left.__setup(__closure.__closure_this$left)
			delete __closure.__closure_this$left

//assigning name to ("left")
			this$left._removeUpdater('name'); this$left.name = (("left"));
}
//=====[component controls.mixins.HoverMixin]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.controls.mixins.HoverMixin = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);
	//custom constructor:
	{
		this.element = this.parent.element;
		this.parent.style('cursor', this.cursor) 
		this._bindClick(this.clickable)
		this._bindHover(this.enabled)
		this._bindActiveHover(this.activeHoverEnabled)
	}

}
	_globals.controls.mixins.HoverMixin.prototype = Object.create(_globals.core.Object.prototype)
	_globals.controls.mixins.HoverMixin.prototype.constructor = _globals.controls.mixins.HoverMixin
	_globals.controls.mixins.HoverMixin.prototype.componentName = 'controls.mixins.HoverMixin'
	_globals.controls.mixins.HoverMixin.prototype._bindClick = function(value) {
		if (value && !this._hmClickBinder) {
			this._hmClickBinder = new _globals.core.EventBinder(this.element)
			this._hmClickBinder.on('click', _globals.core.createSignalForwarder(this.parent, 'clicked').bind(this))
		}
		if (this._hmClickBinder)
			this._hmClickBinder.enable(value)
	}
	_globals.controls.mixins.HoverMixin.prototype._bindHover = function(value) {
		if (value && !this._hmHoverBinder) {
			this._hmHoverBinder = new _globals.core.EventBinder(this.parent.element)
			this._hmHoverBinder.on('mouseenter', function() { this.value = true }.bind(this))
			this._hmHoverBinder.on('mouseleave', function() { this.value = false }.bind(this))
		}
		if (this._hmHoverBinder)
			this._hmHoverBinder.enable(value)
	}
	_globals.controls.mixins.HoverMixin.prototype._bindActiveHover = function(value) {
		if (value && !this._hmActiveHoverBinder) {
			this._hmActiveHoverBinder = new _globals.core.EventBinder(this.parent.element)
			this._hmActiveHoverBinder.on('mouseover', function() { this.activeHover = true }.bind(this))
			this._hmActiveHoverBinder.on('mouseout', function() { this.activeHover = false }.bind(this))
		}
		if (this._hmActiveHoverBinder)
		{
			this._hmActiveHoverBinder.enable(value)
		}
	}
	core.addProperty(_globals.controls.mixins.HoverMixin.prototype, 'bool', 'enabled', (true))
	core.addProperty(_globals.controls.mixins.HoverMixin.prototype, 'bool', 'clickable', (true))
	core.addProperty(_globals.controls.mixins.HoverMixin.prototype, 'bool', 'activeHoverEnabled', (false))
	core.addProperty(_globals.controls.mixins.HoverMixin.prototype, 'bool', 'value')
	core.addProperty(_globals.controls.mixins.HoverMixin.prototype, 'bool', 'activeHover', (false))
	core.addProperty(_globals.controls.mixins.HoverMixin.prototype, 'string', 'cursor')

	_globals.controls.mixins.HoverMixin.prototype.__create = function(__closure) {
		_globals.core.Object.prototype.__create.call(this, __closure.__base = { })

	}
	_globals.controls.mixins.HoverMixin.prototype.__setup = function(__closure) {
	_globals.core.Object.prototype.__setup.call(this, __closure.__base); delete __closure.__base
this.onChanged('cursor', (function(value) {
		this.parent.style('cursor', value)
	} ).bind(this))
			this.onChanged('clickable', (function(value) { this._bindClick(value) } ).bind(this))
			this.onChanged('enabled', (function(value) { this._bindHover(value) } ).bind(this))
			this.onChanged('activeHoverEnabled', (function(value) { this._bindActiveHover(value) } ).bind(this))
}
//=====[component controls.mixins.WheelMixin]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.controls.mixins.WheelMixin = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);
	//custom constructor:
	{
		this.element = this.parent.element;
		this._bindWheel(this.enabled)
	}

}
	_globals.controls.mixins.WheelMixin.prototype = Object.create(_globals.core.Object.prototype)
	_globals.controls.mixins.WheelMixin.prototype.constructor = _globals.controls.mixins.WheelMixin
	_globals.controls.mixins.WheelMixin.prototype.componentName = 'controls.mixins.WheelMixin'
	_globals.controls.mixins.WheelMixin.prototype.wheel = _globals.core.createSignal('wheel')
	_globals.controls.mixins.WheelMixin.prototype._bindWheel = function(value) {
		if (value && !this._wheelBinder) {
			this._wheelBinder = new _globals.core.EventBinder(this.parent.element)
			this._wheelBinder.on('wheel', _globals.core.createSignalForwarder(this.parent, 'wheel').bind(this))
		}
		if (this._wheelBinder)
			this._wheelBinder.enable(value)
	}
	core.addProperty(_globals.controls.mixins.WheelMixin.prototype, 'bool', 'enabled', (true))

	_globals.controls.mixins.WheelMixin.prototype.__create = function(__closure) {
		_globals.core.Object.prototype.__create.call(this, __closure.__base = { })

	}
	_globals.controls.mixins.WheelMixin.prototype.__setup = function(__closure) {
	_globals.core.Object.prototype.__setup.call(this, __closure.__base); delete __closure.__base
this.onChanged('enabled', (function(value) { this._bindWheel(value) } ).bind(this))
}
//=====[component vc.UiVc]=====================

/**
 * @constructor
 * @extends {_globals.core.Item}
 */
	_globals.vc.UiVc = function(parent, _delegate) {
	_globals.core.Item.apply(this, arguments);

}
	_globals.vc.UiVc.prototype = Object.create(_globals.core.Item.prototype)
	_globals.vc.UiVc.prototype.constructor = _globals.vc.UiVc
	_globals.vc.UiVc.prototype.componentName = 'vc.UiVc'

	_globals.vc.UiVc.prototype.__create = function(__closure) {
		_globals.core.Item.prototype.__create.call(this, __closure.__base = { })
var this$child0 = new _globals.core.Rectangle(this)
		__closure.this$child0 = this$child0

//creating component Rectangle
		this$child0.__create(__closure.__closure_this$child0 = { })

		var this$child1 = new _globals.core.Rectangle(this)
		__closure.this$child1 = this$child1

//creating component Rectangle
		this$child1.__create(__closure.__closure_this$child1 = { })

		var this$child2 = new _globals.core.Rectangle(this)
		__closure.this$child2 = this$child2

//creating component Rectangle
		this$child2.__create(__closure.__closure_this$child2 = { })

		var this$child3 = new _globals.core.Repeater(this)
		__closure.this$child3 = this$child3

//creating component Repeater
		this$child3.__create(__closure.__closure_this$child3 = { })
//creating component vc.<anonymous>
		var this_child3$model = new _globals.core.ListModel(this$child3)
		__closure.this_child3$model = this_child3$model

//creating component ListModel
		this_child3$model.__create(__closure.__closure_this_child3$model = { })

		this$child3.model = this_child3$model
		this$child3.delegate = (function() {
		var delegate = new _globals.vc.Cover(this$child3, true)
		var __closure = { delegate: delegate }

//creating component Cover
			delegate.__create(__closure.__closure_delegate = { })


//setting up component Cover
			var delegate = __closure.delegate
			delegate.__setup(__closure.__closure_delegate)
			delete __closure.__closure_delegate

			delegate.on('clicked', (function() { this.open = true; this._get('ltr').show(this);} ).bind(delegate))


		return delegate
}).bind(this$child3)
		this$child3._setId('letterView')
		var this$child4 = new _globals.core.Rectangle(this)
		__closure.this$child4 = this$child4

//creating component Rectangle
		this$child4.__create(__closure.__closure_this$child4 = { })
	core.addProperty(this$child4, 'Mixin', 'hover')
		var this_child4$child0 = new _globals.controls.mixins.ImageMixin(this$child4)
		__closure.this_child4$child0 = this_child4$child0

//creating component ImageMixin
		this_child4$child0.__create(__closure.__closure_this_child4$child0 = { })

		var this_child4$child1 = new _globals.controls.pure.MaterialIcon(this$child4)
		__closure.this_child4$child1 = this_child4$child1

//creating component MaterialIcon
		this_child4$child1.__create(__closure.__closure_this_child4$child1 = { })
	core.addProperty(this_child4$child1, 'Mixin', 'hover')
//creating component vc.<anonymous>
		var this_child4_child1$hover = new _globals.controls.mixins.HoverMixin(this_child4$child1)
		__closure.this_child4_child1$hover = this_child4_child1$hover

//creating component HoverMixin
		this_child4_child1$hover.__create(__closure.__closure_this_child4_child1$hover = { })

		this_child4$child1.hover = this_child4_child1$hover
//creating component vc.<anonymous>
		var this_child4$hover = new _globals.controls.mixins.HoverMixin(this$child4)
		__closure.this_child4$hover = this_child4$hover

//creating component HoverMixin
		this_child4$hover.__create(__closure.__closure_this_child4$hover = { })

		this$child4.hover = this_child4$hover
		var this$child5 = new _globals.core.Image(this)
		__closure.this$child5 = this$child5

//creating component Image
		this$child5.__create(__closure.__closure_this$child5 = { })

		var this$child6 = new _globals.core.Rectangle(this)
		__closure.this$child6 = this$child6

//creating component Rectangle
		this$child6.__create(__closure.__closure_this$child6 = { })
		var this_child6$child0 = new _globals.controls.mixins.ImageMixin(this$child6)
		__closure.this_child6$child0 = this_child6$child0

//creating component ImageMixin
		this_child6$child0.__create(__closure.__closure_this_child6$child0 = { })

		var this_child6$child1 = new _globals.vc.ChalkText(this$child6)
		__closure.this_child6$child1 = this_child6$child1

//creating component ChalkText
		this_child6$child1.__create(__closure.__closure_this_child6$child1 = { })

		var this_child6$child2 = new _globals.vc.ChalkText(this$child6)
		__closure.this_child6$child2 = this_child6$child2

//creating component ChalkText
		this_child6$child2.__create(__closure.__closure_this_child6$child2 = { })

		var this_child6$child3 = new _globals.vc.ChalkText(this$child6)
		__closure.this_child6$child3 = this_child6$child3

//creating component ChalkText
		this_child6$child3.__create(__closure.__closure_this_child6$child3 = { })

		var this_child6$child4 = new _globals.vc.ChalkText(this$child6)
		__closure.this_child6$child4 = this_child6$child4

//creating component ChalkText
		this_child6$child4.__create(__closure.__closure_this_child6$child4 = { })

		var this_child6$child5 = new _globals.vc.ChalkText(this$child6)
		__closure.this_child6$child5 = this_child6$child5

//creating component ChalkText
		this_child6$child5.__create(__closure.__closure_this_child6$child5 = { })

		var this_child6$child6 = new _globals.vc.ChalkText(this$child6)
		__closure.this_child6$child6 = this_child6$child6

//creating component ChalkText
		this_child6$child6.__create(__closure.__closure_this_child6$child6 = { })

		var this_child6$child7 = new _globals.vc.ChalkText(this$child6)
		__closure.this_child6$child7 = this_child6$child7

//creating component ChalkText
		this_child6$child7.__create(__closure.__closure_this_child6$child7 = { })

		var this$child7 = new _globals.core.Image(this)
		__closure.this$child7 = this$child7

//creating component Image
		this$child7.__create(__closure.__closure_this$child7 = { })
		var this_child7$child0 = new _globals.controls.mixins.DragMixin(this$child7)
		__closure.this_child7$child0 = this_child7$child0

//creating component DragMixin
		this_child7$child0.__create(__closure.__closure_this_child7$child0 = { })

		var this$child8 = new _globals.core.Image(this)
		__closure.this$child8 = this$child8

//creating component Image
		this$child8.__create(__closure.__closure_this$child8 = { })
		var this_child8$child0 = new _globals.controls.mixins.DragMixin(this$child8)
		__closure.this_child8$child0 = this_child8$child0

//creating component DragMixin
		this_child8$child0.__create(__closure.__closure_this_child8$child0 = { })

		var this_child8$child1 = new _globals.controls.mixins.HoverMixin(this$child8)
		__closure.this_child8$child1 = this_child8$child1

//creating component HoverMixin
		this_child8$child1.__create(__closure.__closure_this_child8$child1 = { })

		var this$child9 = new _globals.core.Rectangle(this)
		__closure.this$child9 = this$child9

//creating component Rectangle
		this$child9.__create(__closure.__closure_this$child9 = { })
		this$child9._setId('dimmer')
		var this$child10 = new _globals.vc.Letter(this)
		__closure.this$child10 = this$child10

//creating component Letter
		this$child10.__create(__closure.__closure_this$child10 = { })
		this$child10._setId('ltr')
	}
	_globals.vc.UiVc.prototype.__setup = function(__closure) {
	_globals.core.Item.prototype.__setup.call(this, __closure.__base); delete __closure.__base
//assigning clip to (true)
			this._removeUpdater('clip'); this.clip = ((true));
//assigning anchors.fill to (this._get('context'))
			var update$this$anchors_fill = (function() { this._get('anchors').fill = ((this._get('context'))); }).bind(this)
			var dep$this$anchors_fill$0 = this
			this.connectOnChanged(dep$this$anchors_fill$0, 'context', update$this$anchors_fill)
			this._removeUpdater('anchors.fill', [[dep$this$anchors_fill$0, 'context', update$this$anchors_fill]])
			update$this$anchors_fill();


//setting up component Rectangle
			var this$child0 = __closure.this$child0
			this$child0.__setup(__closure.__closure_this$child0)
			delete __closure.__closure_this$child0

//assigning y to ((this._get('parent')._get('height') * ((70) / 100)))
			var update$this_child0$y = (function() { this$child0.y = (((this._get('parent')._get('height') * ((70) / 100)))); }).bind(this$child0)
			var dep$this_child0$y$0 = this$child0._get('parent')
			this$child0.connectOnChanged(dep$this_child0$y$0, 'height', update$this_child0$y)
			this$child0._removeUpdater('y', [[dep$this_child0$y$0, 'height', update$this_child0$y]])
			update$this_child0$y();
//assigning width to ((this._get('parent')._get('width') * ((100) / 100)))
			var update$this_child0$width = (function() { this$child0.width = (((this._get('parent')._get('width') * ((100) / 100)))); }).bind(this$child0)
			var dep$this_child0$width$0 = this$child0._get('parent')
			this$child0.connectOnChanged(dep$this_child0$width$0, 'width', update$this_child0$width)
			this$child0._removeUpdater('width', [[dep$this_child0$width$0, 'width', update$this_child0$width]])
			update$this_child0$width();
//assigning color to ("#424242")
			this$child0._removeUpdater('color'); this$child0.color = (("#424242"));
//assigning height to ((this._get('parent')._get('height') * ((30) / 100)))
			var update$this_child0$height = (function() { this$child0.height = (((this._get('parent')._get('height') * ((30) / 100)))); }).bind(this$child0)
			var dep$this_child0$height$0 = this$child0._get('parent')
			this$child0.connectOnChanged(dep$this_child0$height$0, 'height', update$this_child0$height)
			this$child0._removeUpdater('height', [[dep$this_child0$height$0, 'height', update$this_child0$height]])
			update$this_child0$height();

			this.addChild(this$child0)

//setting up component Rectangle
			var this$child1 = __closure.this$child1
			this$child1.__setup(__closure.__closure_this$child1)
			delete __closure.__closure_this$child1

//assigning color to ("#81C784")
			this$child1._removeUpdater('color'); this$child1.color = (("#81C784"));
//assigning width to ((this._get('parent')._get('width') * ((100) / 100)))
			var update$this_child1$width = (function() { this$child1.width = (((this._get('parent')._get('width') * ((100) / 100)))); }).bind(this$child1)
			var dep$this_child1$width$0 = this$child1._get('parent')
			this$child1.connectOnChanged(dep$this_child1$width$0, 'width', update$this_child1$width)
			this$child1._removeUpdater('width', [[dep$this_child1$width$0, 'width', update$this_child1$width]])
			update$this_child1$width();
//assigning height to ((this._get('parent')._get('height') * ((70) / 100)))
			var update$this_child1$height = (function() { this$child1.height = (((this._get('parent')._get('height') * ((70) / 100)))); }).bind(this$child1)
			var dep$this_child1$height$0 = this$child1._get('parent')
			this$child1.connectOnChanged(dep$this_child1$height$0, 'height', update$this_child1$height)
			this$child1._removeUpdater('height', [[dep$this_child1$height$0, 'height', update$this_child1$height]])
			update$this_child1$height();

			this.addChild(this$child1)

//setting up component Rectangle
			var this$child2 = __closure.this$child2
			this$child2.__setup(__closure.__closure_this$child2)
			delete __closure.__closure_this$child2

//assigning color to ("#FFECB3")
			this$child2._removeUpdater('color'); this$child2.color = (("#FFECB3"));
//assigning transform.perspective to (1000)
			this$child2._removeUpdater('transform.perspective'); this$child2._get('transform').perspective = ((1000));
//assigning transform.rotateX to (20)
			this$child2._removeUpdater('transform.rotateX'); this$child2._get('transform').rotateX = ((20));
//assigning height to ((this._get('parent')._get('height') * ((55) / 100)))
			var update$this_child2$height = (function() { this$child2.height = (((this._get('parent')._get('height') * ((55) / 100)))); }).bind(this$child2)
			var dep$this_child2$height$0 = this$child2._get('parent')
			this$child2.connectOnChanged(dep$this_child2$height$0, 'height', update$this_child2$height)
			this$child2._removeUpdater('height', [[dep$this_child2$height$0, 'height', update$this_child2$height]])
			update$this_child2$height();
//assigning width to ((this._get('parent')._get('width') * ((80) / 100)))
			var update$this_child2$width = (function() { this$child2.width = (((this._get('parent')._get('width') * ((80) / 100)))); }).bind(this$child2)
			var dep$this_child2$width$0 = this$child2._get('parent')
			this$child2.connectOnChanged(dep$this_child2$width$0, 'width', update$this_child2$width)
			this$child2._removeUpdater('width', [[dep$this_child2$width$0, 'width', update$this_child2$width]])
			update$this_child2$width();
//assigning y to ((this._get('parent')._get('height') * ((45) / 100)))
			var update$this_child2$y = (function() { this$child2.y = (((this._get('parent')._get('height') * ((45) / 100)))); }).bind(this$child2)
			var dep$this_child2$y$0 = this$child2._get('parent')
			this$child2.connectOnChanged(dep$this_child2$y$0, 'height', update$this_child2$y)
			this$child2._removeUpdater('y', [[dep$this_child2$y$0, 'height', update$this_child2$y]])
			update$this_child2$y();
//assigning x to ((this._get('parent')._get('width') * ((10) / 100)))
			var update$this_child2$x = (function() { this$child2.x = (((this._get('parent')._get('width') * ((10) / 100)))); }).bind(this$child2)
			var dep$this_child2$x$0 = this$child2._get('parent')
			this$child2.connectOnChanged(dep$this_child2$x$0, 'width', update$this_child2$x)
			this$child2._removeUpdater('x', [[dep$this_child2$x$0, 'width', update$this_child2$x]])
			update$this_child2$x();

			this.addChild(this$child2)

//setting up component Repeater
			var this$child3 = __closure.this$child3
			this$child3.__setup(__closure.__closure_this$child3)
			delete __closure.__closure_this$child3

//assigning width to ((this._get('parent')._get('width') * ((100) / 100)))
			var update$this_child3$width = (function() { this$child3.width = (((this._get('parent')._get('width') * ((100) / 100)))); }).bind(this$child3)
			var dep$this_child3$width$0 = this$child3._get('parent')
			this$child3.connectOnChanged(dep$this_child3$width$0, 'width', update$this_child3$width)
			this$child3._removeUpdater('width', [[dep$this_child3$width$0, 'width', update$this_child3$width]])
			update$this_child3$width();

//setting up component ListModel
			var this_child3$model = __closure.this_child3$model
			this_child3$model.__setup(__closure.__closure_this_child3$model)
			delete __closure.__closure_this_child3$model

			this_child3$model.update = (function() {
				for ( var i = 0; i < 7; ++i) {
					this.append({
						x: i * 100,
						y: i * 0
					});
				}
			} ).bind(this_child3$model)
			this_child3$model._context._onCompleted((function() {
				this.update();
			} ).bind(this_child3$model))

//assigning height to ((this._get('parent')._get('height') * ((100) / 100)))
			var update$this_child3$height = (function() { this$child3.height = (((this._get('parent')._get('height') * ((100) / 100)))); }).bind(this$child3)
			var dep$this_child3$height$0 = this$child3._get('parent')
			this$child3.connectOnChanged(dep$this_child3$height$0, 'height', update$this_child3$height)
			this$child3._removeUpdater('height', [[dep$this_child3$height$0, 'height', update$this_child3$height]])
			update$this_child3$height();

			this.addChild(this$child3)

//setting up component Rectangle
			var this$child4 = __closure.this$child4
			this$child4.__setup(__closure.__closure_this$child4)
			delete __closure.__closure_this$child4

//assigning border.color to ("#FAFAFA")
			this$child4._removeUpdater('border.color'); this$child4._get('border').color = (("#FAFAFA"));

//setting up component HoverMixin
			var this_child4$hover = __closure.this_child4$hover
			this_child4$hover.__setup(__closure.__closure_this_child4$hover)
			delete __closure.__closure_this_child4$hover


//assigning height to ((this._get('parent')._get('height') * ((45) / 100)))
			var update$this_child4$height = (function() { this$child4.height = (((this._get('parent')._get('height') * ((45) / 100)))); }).bind(this$child4)
			var dep$this_child4$height$0 = this$child4._get('parent')
			this$child4.connectOnChanged(dep$this_child4$height$0, 'height', update$this_child4$height)
			this$child4._removeUpdater('height', [[dep$this_child4$height$0, 'height', update$this_child4$height]])
			update$this_child4$height();
//assigning width to ((this._get('parent')._get('width') * ((45) / 100)))
			var update$this_child4$width = (function() { this$child4.width = (((this._get('parent')._get('width') * ((45) / 100)))); }).bind(this$child4)
			var dep$this_child4$width$0 = this$child4._get('parent')
			this$child4.connectOnChanged(dep$this_child4$width$0, 'width', update$this_child4$width)
			this$child4._removeUpdater('width', [[dep$this_child4$width$0, 'width', update$this_child4$width]])
			update$this_child4$width();
//assigning radius to (5)
			this$child4._removeUpdater('radius'); this$child4.radius = ((5));
//assigning border.width to (8)
			this$child4._removeUpdater('border.width'); this$child4._get('border').width = ((8));
//assigning x to ((this._get('parent')._get('width') * ((55) / 100)))
			var update$this_child4$x = (function() { this$child4.x = (((this._get('parent')._get('width') * ((55) / 100)))); }).bind(this$child4)
			var dep$this_child4$x$0 = this$child4._get('parent')
			this$child4.connectOnChanged(dep$this_child4$x$0, 'width', update$this_child4$x)
			this$child4._removeUpdater('x', [[dep$this_child4$x$0, 'width', update$this_child4$x]])
			update$this_child4$x();


//setting up component ImageMixin
			var this_child4$child0 = __closure.this_child4$child0
			this_child4$child0.__setup(__closure.__closure_this_child4$child0)
			delete __closure.__closure_this_child4$child0

//assigning source to ("res/sf.jpg")
			this_child4$child0._removeUpdater('source'); this_child4$child0.source = (("res/sf.jpg"));
//assigning fillMode to (_globals.core.Image.prototype.PreserveAspectCrop)
			this_child4$child0._removeUpdater('fillMode'); this_child4$child0.fillMode = ((_globals.core.Image.prototype.PreserveAspectCrop));

			this$child4.addChild(this_child4$child0)

//setting up component MaterialIcon
			var this_child4$child1 = __closure.this_child4$child1
			this_child4$child1.__setup(__closure.__closure_this_child4$child1)
			delete __closure.__closure_this_child4$child1

//assigning opacity to (this._get('visible') ? 1 : 0)
			var update$this_child4_child1$opacity = (function() { this_child4$child1.opacity = ((this._get('visible') ? 1 : 0)); }).bind(this_child4$child1)
			var dep$this_child4_child1$opacity$0 = this_child4$child1
			this_child4$child1.connectOnChanged(dep$this_child4_child1$opacity$0, 'visible', update$this_child4_child1$opacity)
			this_child4$child1._removeUpdater('opacity', [[dep$this_child4_child1$opacity$0, 'visible', update$this_child4_child1$opacity]])
			update$this_child4_child1$opacity();

//setting up component HoverMixin
			var this_child4_child1$hover = __closure.this_child4_child1$hover
			this_child4_child1$hover.__setup(__closure.__closure_this_child4_child1$hover)
			delete __closure.__closure_this_child4_child1$hover

//assigning cursor to ("pointer")
			this_child4_child1$hover._removeUpdater('cursor'); this_child4_child1$hover.cursor = (("pointer"));

//assigning color to (this._get('hover')._get('value') ? "#FFCDD2" : "white")
			var update$this_child4_child1$color = (function() { this_child4$child1.color = ((this._get('hover')._get('value') ? "#FFCDD2" : "white")); }).bind(this_child4$child1)
			var dep$this_child4_child1$color$0 = this_child4$child1._get('hover')
			this_child4$child1.connectOnChanged(dep$this_child4_child1$color$0, 'value', update$this_child4_child1$color)
			this_child4$child1._removeUpdater('color', [[dep$this_child4_child1$color$0, 'value', update$this_child4_child1$color]])
			update$this_child4_child1$color();
//assigning visible to (this._get('parent')._get('hover')._get('value'))
			var update$this_child4_child1$visible = (function() { this_child4$child1.visible = ((this._get('parent')._get('hover')._get('value'))); }).bind(this_child4$child1)
			var dep$this_child4_child1$visible$0 = this_child4$child1._get('parent')._get('hover')
			this_child4$child1.connectOnChanged(dep$this_child4_child1$visible$0, 'value', update$this_child4_child1$visible)
			this_child4$child1._removeUpdater('visible', [[dep$this_child4_child1$visible$0, 'value', update$this_child4_child1$visible]])
			update$this_child4_child1$visible();
//assigning y to (10)
			this_child4$child1._removeUpdater('y'); this_child4$child1.y = ((10));
//assigning x to ((this._get('parent')._get('width') * ((100) / 100)) - this._get('width') - 10)
			var update$this_child4_child1$x = (function() { this_child4$child1.x = (((this._get('parent')._get('width') * ((100) / 100)) - this._get('width') - 10)); }).bind(this_child4$child1)
			var dep$this_child4_child1$x$0 = this_child4$child1._get('parent')
			this_child4$child1.connectOnChanged(dep$this_child4_child1$x$0, 'width', update$this_child4_child1$x)
			var dep$this_child4_child1$x$1 = this_child4$child1
			this_child4$child1.connectOnChanged(dep$this_child4_child1$x$1, 'width', update$this_child4_child1$x)
			this_child4$child1._removeUpdater('x', [[dep$this_child4_child1$x$0, 'width', update$this_child4_child1$x],[dep$this_child4_child1$x$1, 'width', update$this_child4_child1$x]])
			update$this_child4_child1$x();
//assigning icon to (this._get('context')._get('fullscreen') ? "fullscreen_exit" : "fullscreen")
			var update$this_child4_child1$icon = (function() { this_child4$child1.icon = ((this._get('context')._get('fullscreen') ? "fullscreen_exit" : "fullscreen")); }).bind(this_child4$child1)
			var dep$this_child4_child1$icon$0 = this_child4$child1._get('context')
			this_child4$child1.connectOnChanged(dep$this_child4_child1$icon$0, 'fullscreen', update$this_child4_child1$icon)
			this_child4$child1._removeUpdater('icon', [[dep$this_child4_child1$icon$0, 'fullscreen', update$this_child4_child1$icon]])
			update$this_child4_child1$icon();
//assigning size to (80)
			this_child4$child1._removeUpdater('size'); this_child4$child1.size = ((80));
			this_child4$child1.on('clicked', (function() { this._get('context').fullscreen = !this._get('context').fullscreen } ).bind(this_child4$child1))
	var behavior_this_child4_child1_on_opacity = new _globals.core.Animation(this_child4$child1)
	var behavior_this_child4_child1_on_opacity__closure = { behavior_this_child4_child1_on_opacity: behavior_this_child4_child1_on_opacity }

//creating component Animation
	behavior_this_child4_child1_on_opacity.__create(behavior_this_child4_child1_on_opacity__closure.__closure_behavior_this_child4_child1_on_opacity = { })


//setting up component Animation
	var behavior_this_child4_child1_on_opacity = behavior_this_child4_child1_on_opacity__closure.behavior_this_child4_child1_on_opacity
	behavior_this_child4_child1_on_opacity.__setup(behavior_this_child4_child1_on_opacity__closure.__closure_behavior_this_child4_child1_on_opacity)
	delete behavior_this_child4_child1_on_opacity__closure.__closure_behavior_this_child4_child1_on_opacity

//assigning duration to (400)
	behavior_this_child4_child1_on_opacity._removeUpdater('duration'); behavior_this_child4_child1_on_opacity.duration = ((400));

	this_child4$child1.setAnimation('opacity', behavior_this_child4_child1_on_opacity);

	var behavior_this_child4_child1_on_color = new _globals.core.Animation(this_child4$child1)
	var behavior_this_child4_child1_on_color__closure = { behavior_this_child4_child1_on_color: behavior_this_child4_child1_on_color }

//creating component Animation
	behavior_this_child4_child1_on_color.__create(behavior_this_child4_child1_on_color__closure.__closure_behavior_this_child4_child1_on_color = { })


//setting up component Animation
	var behavior_this_child4_child1_on_color = behavior_this_child4_child1_on_color__closure.behavior_this_child4_child1_on_color
	behavior_this_child4_child1_on_color.__setup(behavior_this_child4_child1_on_color__closure.__closure_behavior_this_child4_child1_on_color)
	delete behavior_this_child4_child1_on_color__closure.__closure_behavior_this_child4_child1_on_color

//assigning duration to (400)
	behavior_this_child4_child1_on_color._removeUpdater('duration'); behavior_this_child4_child1_on_color.duration = ((400));

	this_child4$child1.setAnimation('color', behavior_this_child4_child1_on_color);

	var behavior_this_child4_child1_on_visible = new _globals.core.Animation(this_child4$child1)
	var behavior_this_child4_child1_on_visible__closure = { behavior_this_child4_child1_on_visible: behavior_this_child4_child1_on_visible }

//creating component Animation
	behavior_this_child4_child1_on_visible.__create(behavior_this_child4_child1_on_visible__closure.__closure_behavior_this_child4_child1_on_visible = { })


//setting up component Animation
	var behavior_this_child4_child1_on_visible = behavior_this_child4_child1_on_visible__closure.behavior_this_child4_child1_on_visible
	behavior_this_child4_child1_on_visible.__setup(behavior_this_child4_child1_on_visible__closure.__closure_behavior_this_child4_child1_on_visible)
	delete behavior_this_child4_child1_on_visible__closure.__closure_behavior_this_child4_child1_on_visible

//assigning duration to (400)
	behavior_this_child4_child1_on_visible._removeUpdater('duration'); behavior_this_child4_child1_on_visible.duration = ((400));

	this_child4$child1.setAnimation('visible', behavior_this_child4_child1_on_visible);

	var behavior_this_child4_child1_on_y = new _globals.core.Animation(this_child4$child1)
	var behavior_this_child4_child1_on_y__closure = { behavior_this_child4_child1_on_y: behavior_this_child4_child1_on_y }

//creating component Animation
	behavior_this_child4_child1_on_y.__create(behavior_this_child4_child1_on_y__closure.__closure_behavior_this_child4_child1_on_y = { })


//setting up component Animation
	var behavior_this_child4_child1_on_y = behavior_this_child4_child1_on_y__closure.behavior_this_child4_child1_on_y
	behavior_this_child4_child1_on_y.__setup(behavior_this_child4_child1_on_y__closure.__closure_behavior_this_child4_child1_on_y)
	delete behavior_this_child4_child1_on_y__closure.__closure_behavior_this_child4_child1_on_y

//assigning duration to (400)
	behavior_this_child4_child1_on_y._removeUpdater('duration'); behavior_this_child4_child1_on_y.duration = ((400));

	this_child4$child1.setAnimation('y', behavior_this_child4_child1_on_y);

	var behavior_this_child4_child1_on_x = new _globals.core.Animation(this_child4$child1)
	var behavior_this_child4_child1_on_x__closure = { behavior_this_child4_child1_on_x: behavior_this_child4_child1_on_x }

//creating component Animation
	behavior_this_child4_child1_on_x.__create(behavior_this_child4_child1_on_x__closure.__closure_behavior_this_child4_child1_on_x = { })


//setting up component Animation
	var behavior_this_child4_child1_on_x = behavior_this_child4_child1_on_x__closure.behavior_this_child4_child1_on_x
	behavior_this_child4_child1_on_x.__setup(behavior_this_child4_child1_on_x__closure.__closure_behavior_this_child4_child1_on_x)
	delete behavior_this_child4_child1_on_x__closure.__closure_behavior_this_child4_child1_on_x

//assigning duration to (400)
	behavior_this_child4_child1_on_x._removeUpdater('duration'); behavior_this_child4_child1_on_x.duration = ((400));

	this_child4$child1.setAnimation('x', behavior_this_child4_child1_on_x);

	var behavior_this_child4_child1_on_font = new _globals.core.Animation(this_child4$child1)
	var behavior_this_child4_child1_on_font__closure = { behavior_this_child4_child1_on_font: behavior_this_child4_child1_on_font }

//creating component Animation
	behavior_this_child4_child1_on_font.__create(behavior_this_child4_child1_on_font__closure.__closure_behavior_this_child4_child1_on_font = { })


//setting up component Animation
	var behavior_this_child4_child1_on_font = behavior_this_child4_child1_on_font__closure.behavior_this_child4_child1_on_font
	behavior_this_child4_child1_on_font.__setup(behavior_this_child4_child1_on_font__closure.__closure_behavior_this_child4_child1_on_font)
	delete behavior_this_child4_child1_on_font__closure.__closure_behavior_this_child4_child1_on_font

//assigning duration to (400)
	behavior_this_child4_child1_on_font._removeUpdater('duration'); behavior_this_child4_child1_on_font.duration = ((400));

	this_child4$child1.setAnimation('font', behavior_this_child4_child1_on_font);

			this$child4.addChild(this_child4$child1)
			this.addChild(this$child4)

//setting up component Image
			var this$child5 = __closure.this$child5
			this$child5.__setup(__closure.__closure_this$child5)
			delete __closure.__closure_this$child5

//assigning y to ((this._get('parent')._get('height') * ((35) / 100)))
			var update$this_child5$y = (function() { this$child5.y = (((this._get('parent')._get('height') * ((35) / 100)))); }).bind(this$child5)
			var dep$this_child5$y$0 = this$child5._get('parent')
			this$child5.connectOnChanged(dep$this_child5$y$0, 'height', update$this_child5$y)
			this$child5._removeUpdater('y', [[dep$this_child5$y$0, 'height', update$this_child5$y]])
			update$this_child5$y();
//assigning source to ("res/seat.svg")
			this$child5._removeUpdater('source'); this$child5.source = (("res/seat.svg"));
//assigning x to ((this._get('parent')._get('width') * ((80) / 100)))
			var update$this_child5$x = (function() { this$child5.x = (((this._get('parent')._get('width') * ((80) / 100)))); }).bind(this$child5)
			var dep$this_child5$x$0 = this$child5._get('parent')
			this$child5.connectOnChanged(dep$this_child5$x$0, 'width', update$this_child5$x)
			this$child5._removeUpdater('x', [[dep$this_child5$x$0, 'width', update$this_child5$x]])
			update$this_child5$x();
//assigning width to (this._get('height'))
			var update$this_child5$width = (function() { this$child5.width = ((this._get('height'))); }).bind(this$child5)
			var dep$this_child5$width$0 = this$child5
			this$child5.connectOnChanged(dep$this_child5$width$0, 'height', update$this_child5$width)
			this$child5._removeUpdater('width', [[dep$this_child5$width$0, 'height', update$this_child5$width]])
			update$this_child5$width();
//assigning height to ((this._get('parent')._get('height') * ((40) / 100)))
			var update$this_child5$height = (function() { this$child5.height = (((this._get('parent')._get('height') * ((40) / 100)))); }).bind(this$child5)
			var dep$this_child5$height$0 = this$child5._get('parent')
			this$child5.connectOnChanged(dep$this_child5$height$0, 'height', update$this_child5$height)
			this$child5._removeUpdater('height', [[dep$this_child5$height$0, 'height', update$this_child5$height]])
			update$this_child5$height();

			this.addChild(this$child5)

//setting up component Rectangle
			var this$child6 = __closure.this$child6
			this$child6.__setup(__closure.__closure_this$child6)
			delete __closure.__closure_this$child6

//assigning border.color to ("#8D6E63")
			this$child6._removeUpdater('border.color'); this$child6._get('border').color = (("#8D6E63"));
//assigning width to ((this._get('parent')._get('width') * ((40) / 100)))
			var update$this_child6$width = (function() { this$child6.width = (((this._get('parent')._get('width') * ((40) / 100)))); }).bind(this$child6)
			var dep$this_child6$width$0 = this$child6._get('parent')
			this$child6.connectOnChanged(dep$this_child6$width$0, 'width', update$this_child6$width)
			this$child6._removeUpdater('width', [[dep$this_child6$width$0, 'width', update$this_child6$width]])
			update$this_child6$width();
//assigning height to ((this._get('parent')._get('height') * ((40) / 100)))
			var update$this_child6$height = (function() { this$child6.height = (((this._get('parent')._get('height') * ((40) / 100)))); }).bind(this$child6)
			var dep$this_child6$height$0 = this$child6._get('parent')
			this$child6.connectOnChanged(dep$this_child6$height$0, 'height', update$this_child6$height)
			this$child6._removeUpdater('height', [[dep$this_child6$height$0, 'height', update$this_child6$height]])
			update$this_child6$height();
//assigning border.width to (12)
			this$child6._removeUpdater('border.width'); this$child6._get('border').width = ((12));
//assigning radius to (2)
			this$child6._removeUpdater('radius'); this$child6.radius = ((2));
//assigning y to ((this._get('parent')._get('height') * ((5) / 100)))
			var update$this_child6$y = (function() { this$child6.y = (((this._get('parent')._get('height') * ((5) / 100)))); }).bind(this$child6)
			var dep$this_child6$y$0 = this$child6._get('parent')
			this$child6.connectOnChanged(dep$this_child6$y$0, 'height', update$this_child6$y)
			this$child6._removeUpdater('y', [[dep$this_child6$y$0, 'height', update$this_child6$y]])
			update$this_child6$y();
//assigning x to ((this._get('parent')._get('width') * ((5) / 100)))
			var update$this_child6$x = (function() { this$child6.x = (((this._get('parent')._get('width') * ((5) / 100)))); }).bind(this$child6)
			var dep$this_child6$x$0 = this$child6._get('parent')
			this$child6.connectOnChanged(dep$this_child6$x$0, 'width', update$this_child6$x)
			this$child6._removeUpdater('x', [[dep$this_child6$x$0, 'width', update$this_child6$x]])
			update$this_child6$x();


//setting up component ImageMixin
			var this_child6$child0 = __closure.this_child6$child0
			this_child6$child0.__setup(__closure.__closure_this_child6$child0)
			delete __closure.__closure_this_child6$child0

//assigning source to ("res/chalkboard.jpg")
			this_child6$child0._removeUpdater('source'); this_child6$child0.source = (("res/chalkboard.jpg"));

			this$child6.addChild(this_child6$child0)

//setting up component ChalkText
			var this_child6$child1 = __closure.this_child6$child1
			this_child6$child1.__setup(__closure.__closure_this_child6$child1)
			delete __closure.__closure_this_child6$child1

//assigning y to (5)
			this_child6$child1._removeUpdater('y'); this_child6$child1.y = ((5));
//assigning x to (5)
			this_child6$child1._removeUpdater('x'); this_child6$child1.x = ((5));
//assigning font.family to ("Shadows Into Light")
			this_child6$child1._removeUpdater('font.family'); this_child6$child1._get('font').family = (("Shadows Into Light"));

			this$child6.addChild(this_child6$child1)

//setting up component ChalkText
			var this_child6$child2 = __closure.this_child6$child2
			this_child6$child2.__setup(__closure.__closure_this_child6$child2)
			delete __closure.__closure_this_child6$child2

//assigning y to (45)
			this_child6$child2._removeUpdater('y'); this_child6$child2.y = ((45));
//assigning x to (5)
			this_child6$child2._removeUpdater('x'); this_child6$child2.x = ((5));
//assigning font.family to ("Reenie Beanie")
			this_child6$child2._removeUpdater('font.family'); this_child6$child2._get('font').family = (("Reenie Beanie"));

			this$child6.addChild(this_child6$child2)

//setting up component ChalkText
			var this_child6$child3 = __closure.this_child6$child3
			this_child6$child3.__setup(__closure.__closure_this_child6$child3)
			delete __closure.__closure_this_child6$child3

//assigning y to (85)
			this_child6$child3._removeUpdater('y'); this_child6$child3.y = ((85));
//assigning x to (5)
			this_child6$child3._removeUpdater('x'); this_child6$child3.x = ((5));
//assigning font.family to ("Cabin Sketch")
			this_child6$child3._removeUpdater('font.family'); this_child6$child3._get('font').family = (("Cabin Sketch"));

			this$child6.addChild(this_child6$child3)

//setting up component ChalkText
			var this_child6$child4 = __closure.this_child6$child4
			this_child6$child4.__setup(__closure.__closure_this_child6$child4)
			delete __closure.__closure_this_child6$child4

//assigning y to (125)
			this_child6$child4._removeUpdater('y'); this_child6$child4.y = ((125));
//assigning x to (5)
			this_child6$child4._removeUpdater('x'); this_child6$child4.x = ((5));
//assigning font.family to ("Chelsea Market")
			this_child6$child4._removeUpdater('font.family'); this_child6$child4._get('font').family = (("Chelsea Market"));

			this$child6.addChild(this_child6$child4)

//setting up component ChalkText
			var this_child6$child5 = __closure.this_child6$child5
			this_child6$child5.__setup(__closure.__closure_this_child6$child5)
			delete __closure.__closure_this_child6$child5

//assigning y to (165)
			this_child6$child5._removeUpdater('y'); this_child6$child5.y = ((165));
//assigning x to (5)
			this_child6$child5._removeUpdater('x'); this_child6$child5.x = ((5));
//assigning font.family to ("Coming Soon")
			this_child6$child5._removeUpdater('font.family'); this_child6$child5._get('font').family = (("Coming Soon"));

			this$child6.addChild(this_child6$child5)

//setting up component ChalkText
			var this_child6$child6 = __closure.this_child6$child6
			this_child6$child6.__setup(__closure.__closure_this_child6$child6)
			delete __closure.__closure_this_child6$child6

//assigning y to (205)
			this_child6$child6._removeUpdater('y'); this_child6$child6.y = ((205));
//assigning x to (5)
			this_child6$child6._removeUpdater('x'); this_child6$child6.x = ((5));
//assigning font.family to ("Gloria Hallelujah")
			this_child6$child6._removeUpdater('font.family'); this_child6$child6._get('font').family = (("Gloria Hallelujah"));

			this$child6.addChild(this_child6$child6)

//setting up component ChalkText
			var this_child6$child7 = __closure.this_child6$child7
			this_child6$child7.__setup(__closure.__closure_this_child6$child7)
			delete __closure.__closure_this_child6$child7

//assigning y to (245)
			this_child6$child7._removeUpdater('y'); this_child6$child7.y = ((245));
//assigning x to (5)
			this_child6$child7._removeUpdater('x'); this_child6$child7.x = ((5));
//assigning font.family to ("Kalam")
			this_child6$child7._removeUpdater('font.family'); this_child6$child7._get('font').family = (("Kalam"));

			this$child6.addChild(this_child6$child7)
			this.addChild(this$child6)

//setting up component Image
			var this$child7 = __closure.this$child7
			this$child7.__setup(__closure.__closure_this$child7)
			delete __closure.__closure_this$child7

//assigning width to (this._get('height') / 2)
			var update$this_child7$width = (function() { this$child7.width = ((this._get('height') / 2)); }).bind(this$child7)
			var dep$this_child7$width$0 = this$child7
			this$child7.connectOnChanged(dep$this_child7$width$0, 'height', update$this_child7$width)
			this$child7._removeUpdater('width', [[dep$this_child7$width$0, 'height', update$this_child7$width]])
			update$this_child7$width();
//assigning height to ((this._get('parent')._get('height') * ((20) / 100)))
			var update$this_child7$height = (function() { this$child7.height = (((this._get('parent')._get('height') * ((20) / 100)))); }).bind(this$child7)
			var dep$this_child7$height$0 = this$child7._get('parent')
			this$child7.connectOnChanged(dep$this_child7$height$0, 'height', update$this_child7$height)
			this$child7._removeUpdater('height', [[dep$this_child7$height$0, 'height', update$this_child7$height]])
			update$this_child7$height();
//assigning source to ("res/plant.png")
			this$child7._removeUpdater('source'); this$child7.source = (("res/plant.png"));
//assigning fillMode to (_globals.core.Image.prototype.PreserveAspectFit)
			this$child7._removeUpdater('fillMode'); this$child7.fillMode = ((_globals.core.Image.prototype.PreserveAspectFit));
//assigning y to ((this._get('parent')._get('height') * ((50) / 100)) - this._get('height'))
			var update$this_child7$y = (function() { this$child7.y = (((this._get('parent')._get('height') * ((50) / 100)) - this._get('height'))); }).bind(this$child7)
			var dep$this_child7$y$0 = this$child7._get('parent')
			this$child7.connectOnChanged(dep$this_child7$y$0, 'height', update$this_child7$y)
			var dep$this_child7$y$1 = this$child7
			this$child7.connectOnChanged(dep$this_child7$y$1, 'height', update$this_child7$y)
			this$child7._removeUpdater('y', [[dep$this_child7$y$0, 'height', update$this_child7$y],[dep$this_child7$y$1, 'height', update$this_child7$y]])
			update$this_child7$y();
//assigning x to ((this._get('parent')._get('width') * ((50) / 100)))
			var update$this_child7$x = (function() { this$child7.x = (((this._get('parent')._get('width') * ((50) / 100)))); }).bind(this$child7)
			var dep$this_child7$x$0 = this$child7._get('parent')
			this$child7.connectOnChanged(dep$this_child7$x$0, 'width', update$this_child7$x)
			this$child7._removeUpdater('x', [[dep$this_child7$x$0, 'width', update$this_child7$x]])
			update$this_child7$x();


//setting up component DragMixin
			var this_child7$child0 = __closure.this_child7$child0
			this_child7$child0.__setup(__closure.__closure_this_child7$child0)
			delete __closure.__closure_this_child7$child0

//assigning direction to (_globals.controls.mixins.DragMixin.prototype.Horizontal)
			this_child7$child0._removeUpdater('direction'); this_child7$child0.direction = ((_globals.controls.mixins.DragMixin.prototype.Horizontal));

			this$child7.addChild(this_child7$child0)
			this.addChild(this$child7)

//setting up component Image
			var this$child8 = __closure.this$child8
			this$child8.__setup(__closure.__closure_this$child8)
			delete __closure.__closure_this$child8

//assigning width to (this._get('height'))
			var update$this_child8$width = (function() { this$child8.width = ((this._get('height'))); }).bind(this$child8)
			var dep$this_child8$width$0 = this$child8
			this$child8.connectOnChanged(dep$this_child8$width$0, 'height', update$this_child8$width)
			this$child8._removeUpdater('width', [[dep$this_child8$width$0, 'height', update$this_child8$width]])
			update$this_child8$width();
//assigning height to ((this._get('parent')._get('height') * ((40) / 100)))
			var update$this_child8$height = (function() { this$child8.height = (((this._get('parent')._get('height') * ((40) / 100)))); }).bind(this$child8)
			var dep$this_child8$height$0 = this$child8._get('parent')
			this$child8.connectOnChanged(dep$this_child8$height$0, 'height', update$this_child8$height)
			this$child8._removeUpdater('height', [[dep$this_child8$height$0, 'height', update$this_child8$height]])
			update$this_child8$height();
//assigning source to ("res/comp4.png")
			this$child8._removeUpdater('source'); this$child8.source = (("res/comp4.png"));
//assigning fillMode to (_globals.core.Image.prototype.PreserveAspectFit)
			this$child8._removeUpdater('fillMode'); this$child8.fillMode = ((_globals.core.Image.prototype.PreserveAspectFit));
//assigning y to ((this._get('parent')._get('height') * ((40) / 100)))
			var update$this_child8$y = (function() { this$child8.y = (((this._get('parent')._get('height') * ((40) / 100)))); }).bind(this$child8)
			var dep$this_child8$y$0 = this$child8._get('parent')
			this$child8.connectOnChanged(dep$this_child8$y$0, 'height', update$this_child8$y)
			this$child8._removeUpdater('y', [[dep$this_child8$y$0, 'height', update$this_child8$y]])
			update$this_child8$y();
//assigning x to ((this._get('parent')._get('width') * ((85) / 100)) - this._get('width'))
			var update$this_child8$x = (function() { this$child8.x = (((this._get('parent')._get('width') * ((85) / 100)) - this._get('width'))); }).bind(this$child8)
			var dep$this_child8$x$0 = this$child8._get('parent')
			this$child8.connectOnChanged(dep$this_child8$x$0, 'width', update$this_child8$x)
			var dep$this_child8$x$1 = this$child8
			this$child8.connectOnChanged(dep$this_child8$x$1, 'width', update$this_child8$x)
			this$child8._removeUpdater('x', [[dep$this_child8$x$0, 'width', update$this_child8$x],[dep$this_child8$x$1, 'width', update$this_child8$x]])
			update$this_child8$x();


//setting up component DragMixin
			var this_child8$child0 = __closure.this_child8$child0
			this_child8$child0.__setup(__closure.__closure_this_child8$child0)
			delete __closure.__closure_this_child8$child0


			this$child8.addChild(this_child8$child0)

//setting up component HoverMixin
			var this_child8$child1 = __closure.this_child8$child1
			this_child8$child1.__setup(__closure.__closure_this_child8$child1)
			delete __closure.__closure_this_child8$child1

//assigning cursor to ("pointer")
			this_child8$child1._removeUpdater('cursor'); this_child8$child1.cursor = (("pointer"));

			this$child8.addChild(this_child8$child1)
			this.addChild(this$child8)

//setting up component Rectangle
			var this$child9 = __closure.this$child9
			this$child9.__setup(__closure.__closure_this$child9)
			delete __closure.__closure_this$child9

//assigning opacity to (this._get('visible') ? 0.3 : 0)
			var update$this_child9$opacity = (function() { this$child9.opacity = ((this._get('visible') ? 0.3 : 0)); }).bind(this$child9)
			var dep$this_child9$opacity$0 = this$child9
			this$child9.connectOnChanged(dep$this_child9$opacity$0, 'visible', update$this_child9$opacity)
			this$child9._removeUpdater('opacity', [[dep$this_child9$opacity$0, 'visible', update$this_child9$opacity]])
			update$this_child9$opacity();
//assigning visible to (this._get('ltr')._get('open'))
			var update$this_child9$visible = (function() { this$child9.visible = ((this._get('ltr')._get('open'))); }).bind(this$child9)
			var dep$this_child9$visible$0 = this$child9._get('ltr')
			this$child9.connectOnChanged(dep$this_child9$visible$0, 'open', update$this_child9$visible)
			this$child9._removeUpdater('visible', [[dep$this_child9$visible$0, 'open', update$this_child9$visible]])
			update$this_child9$visible();
//assigning color to ("black")
			this$child9._removeUpdater('color'); this$child9.color = (("black"));
//assigning height to (this._get('parent')._get('height'))
			var update$this_child9$height = (function() { this$child9.height = ((this._get('parent')._get('height'))); }).bind(this$child9)
			var dep$this_child9$height$0 = this$child9._get('parent')
			this$child9.connectOnChanged(dep$this_child9$height$0, 'height', update$this_child9$height)
			this$child9._removeUpdater('height', [[dep$this_child9$height$0, 'height', update$this_child9$height]])
			update$this_child9$height();
//assigning width to (this._get('parent')._get('width'))
			var update$this_child9$width = (function() { this$child9.width = ((this._get('parent')._get('width'))); }).bind(this$child9)
			var dep$this_child9$width$0 = this$child9._get('parent')
			this$child9.connectOnChanged(dep$this_child9$width$0, 'width', update$this_child9$width)
			this$child9._removeUpdater('width', [[dep$this_child9$width$0, 'width', update$this_child9$width]])
			update$this_child9$width();
//assigning z to (2)
			this$child9._removeUpdater('z'); this$child9.z = ((2));
	var behavior_this_child9_on_opacity = new _globals.core.Animation(this$child9)
	var behavior_this_child9_on_opacity__closure = { behavior_this_child9_on_opacity: behavior_this_child9_on_opacity }

//creating component Animation
	behavior_this_child9_on_opacity.__create(behavior_this_child9_on_opacity__closure.__closure_behavior_this_child9_on_opacity = { })


//setting up component Animation
	var behavior_this_child9_on_opacity = behavior_this_child9_on_opacity__closure.behavior_this_child9_on_opacity
	behavior_this_child9_on_opacity.__setup(behavior_this_child9_on_opacity__closure.__closure_behavior_this_child9_on_opacity)
	delete behavior_this_child9_on_opacity__closure.__closure_behavior_this_child9_on_opacity

//assigning duration to (500)
	behavior_this_child9_on_opacity._removeUpdater('duration'); behavior_this_child9_on_opacity.duration = ((500));

	this$child9.setAnimation('opacity', behavior_this_child9_on_opacity);

	var behavior_this_child9_on_visible = new _globals.core.Animation(this$child9)
	var behavior_this_child9_on_visible__closure = { behavior_this_child9_on_visible: behavior_this_child9_on_visible }

//creating component Animation
	behavior_this_child9_on_visible.__create(behavior_this_child9_on_visible__closure.__closure_behavior_this_child9_on_visible = { })


//setting up component Animation
	var behavior_this_child9_on_visible = behavior_this_child9_on_visible__closure.behavior_this_child9_on_visible
	behavior_this_child9_on_visible.__setup(behavior_this_child9_on_visible__closure.__closure_behavior_this_child9_on_visible)
	delete behavior_this_child9_on_visible__closure.__closure_behavior_this_child9_on_visible

//assigning duration to (500)
	behavior_this_child9_on_visible._removeUpdater('duration'); behavior_this_child9_on_visible.duration = ((500));

	this$child9.setAnimation('visible', behavior_this_child9_on_visible);

			this.addChild(this$child9)

//setting up component Letter
			var this$child10 = __closure.this$child10
			this$child10.__setup(__closure.__closure_this$child10)
			delete __closure.__closure_this$child10

//assigning y to ((this._get('parent')._get('height') * ((10) / 100)))
			var update$this_child10$y = (function() { this$child10.y = (((this._get('parent')._get('height') * ((10) / 100)))); }).bind(this$child10)
			var dep$this_child10$y$0 = this$child10._get('parent')
			this$child10.connectOnChanged(dep$this_child10$y$0, 'height', update$this_child10$y)
			this$child10._removeUpdater('y', [[dep$this_child10$y$0, 'height', update$this_child10$y]])
			update$this_child10$y();
//assigning x to ((this._get('parent')._get('width') * ((25) / 100)))
			var update$this_child10$x = (function() { this$child10.x = (((this._get('parent')._get('width') * ((25) / 100)))); }).bind(this$child10)
			var dep$this_child10$x$0 = this$child10._get('parent')
			this$child10.connectOnChanged(dep$this_child10$x$0, 'width', update$this_child10$x)
			this$child10._removeUpdater('x', [[dep$this_child10$x$0, 'width', update$this_child10$x]])
			update$this_child10$x();
//assigning z to (10)
			this$child10._removeUpdater('z'); this$child10.z = ((10));
			this$child10.on('clicked', (function() { this.close();} ).bind(this$child10))

			this.addChild(this$child10)
}
//=====[component core.Effects]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.core.Effects = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);

}
	_globals.core.Effects.prototype = Object.create(_globals.core.Object.prototype)
	_globals.core.Effects.prototype.constructor = _globals.core.Effects
	_globals.core.Effects.prototype.componentName = 'core.Effects'
	_globals.core.Effects.prototype._getFilterStyle = function() {
		var style = []
		this._addStyle(style, 'blur', 'blur', 'px')
		this._addStyle(style, 'grayscale')
		this._addStyle(style, 'sepia')
		this._addStyle(style, 'brightness')
		this._addStyle(style, 'contrast')
		this._addStyle(style, 'hueRotate', 'hue-rotate', 'deg')
		this._addStyle(style, 'invert')
		this._addStyle(style, 'saturate')
		return style
	}
	_globals.core.Effects.prototype._addStyle = function(array,property,style,units) {
		var value = this[property]
		if (value)
			array.push((style || property) + '(' + value + (units || '') + ') ')
	}
	_globals.core.Effects.prototype._update = function(name,value) {
		this._updateStyle()
		_globals.core.Object.prototype._update.apply(this, arguments)
	}
	_globals.core.Effects.prototype._updateStyle = function() {
		var filterStyle = this._getFilterStyle().join('')
		var parent = this.parent

		var style = {}
		var updateStyle = false

		if (filterStyle.length > 0) {
			//chromium bug
			//https://github.com/Modernizr/Modernizr/issues/981
			style['-webkit-filter'] = filterStyle
			style['filter'] = filterStyle
			updateStyle = true
		}

		if (this.shadow && !this.shadow._empty()) {
			style['box-shadow'] = this.shadow._getFilterStyle()
			updateStyle = true
		}

		if (updateStyle) {
			//log(style)
			parent.style(style)
		}
	}
	core.addProperty(_globals.core.Effects.prototype, 'real', 'blur')
	core.addProperty(_globals.core.Effects.prototype, 'real', 'grayscale')
	core.addProperty(_globals.core.Effects.prototype, 'real', 'sepia')
	core.addProperty(_globals.core.Effects.prototype, 'real', 'brightness')
	core.addProperty(_globals.core.Effects.prototype, 'real', 'contrast')
	core.addProperty(_globals.core.Effects.prototype, 'real', 'hueRotate')
	core.addProperty(_globals.core.Effects.prototype, 'real', 'invert')
	core.addProperty(_globals.core.Effects.prototype, 'real', 'saturate')
	core.addProperty(_globals.core.Effects.prototype, 'Shadow', 'shadow')

	_globals.core.Effects.prototype.__create = function(__closure) {
		_globals.core.Object.prototype.__create.call(this, __closure.__base = { })
//creating component core.<anonymous>
		var this$shadow = new _globals.core.Shadow(this)
		__closure.this$shadow = this$shadow

//creating component Shadow
		this$shadow.__create(__closure.__closure_this$shadow = { })

		this.shadow = this$shadow
	}
	_globals.core.Effects.prototype.__setup = function(__closure) {
	_globals.core.Object.prototype.__setup.call(this, __closure.__base); delete __closure.__base
//setting up component Shadow
			var this$shadow = __closure.this$shadow
			this$shadow.__setup(__closure.__closure_this$shadow)
			delete __closure.__closure_this$shadow
}
//=====[component controls.mixins.DragMixin]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.controls.mixins.DragMixin = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);
	//custom constructor:
	{
		this.element = this.parent.element;
		this._bindPressed(this.enabled)
	}

}
	_globals.controls.mixins.DragMixin.prototype = Object.create(_globals.core.Object.prototype)
	_globals.controls.mixins.DragMixin.prototype.constructor = _globals.controls.mixins.DragMixin
	_globals.controls.mixins.DragMixin.prototype.componentName = 'controls.mixins.DragMixin'
	_globals.controls.mixins.DragMixin.prototype._bindPressed = function(value) {
		if (value && !this._dmPressBinder) {
			this._dmPressBinder = new _globals.core.EventBinder(this.element)
			this._dmPressBinder.on('mousedown', this._downHandler.bind(this))
			this._dmPressBinder.on('touchstart', this._downHandler.bind(this))
		}
		if (this._dmPressBinder)
			this._dmPressBinder.enable(value)
	}
	_globals.controls.mixins.DragMixin.prototype._moveHandler = function(e) {
		e.preventDefault();

		if (e.changedTouches)
			e = e.changedTouches[0]
		
		if (this.direction !== this.Horizontal) {
			var eY = e.clientY, sY = this._startY, ly1 = this.limity1, ly2 = this.limity2
			if (ly2  && (eY - sY > ly2)) {
				this.parent.y = ly2
			}
			else if (ly1 && (eY - sY < ly1))
				this.parent.y = ly1
			else
				this.parent.y = eY - sY
		}
		if (this.direction !== this.Vertical) {
			var eX = e.clientX, sX = this._startX, lx1 = this.limitx1, lx2 = this.limitx2
			if (lx2  && (eX - sX > lx2)) {
				this.parent.x = lx2
			}
			else if (lx1 && (eX - sX < lx1))
				this.parent.x = lx1
			else
				this.parent.x = eX - sX
		}
	}
	_globals.controls.mixins.DragMixin.prototype._downHandler = function(e) {
		e.preventDefault();
		this.pressed = true
		
		if (e.changedTouches)
			e = e.changedTouches[0]
		
		this._startX = e.clientX - this.parent.x
		this._startY = e.clientY - this.parent.y
		if (!this._dmMoveBinder) {
			this._dmMoveBinder = new _globals.core.EventBinder(this._get('context').window)

			this._dmMoveBinder.on('mousemove', this._moveHandler.bind(this))
			this._dmMoveBinder.on('touchmove', this._moveHandler.bind(this))

			this._dmMoveBinder.on('mouseup', function() { 
				this.pressed = false
				this._dmMoveBinder.enable(false)
			}.bind(this))

			this._dmMoveBinder.on('touchend', function() { 
				this.pressed = false
				this._dmMoveBinder.enable(false)
			}.bind(this))
		} 
		this._dmMoveBinder.enable(true)
	}
	core.addProperty(_globals.controls.mixins.DragMixin.prototype, 'bool', 'pressed')
	core.addProperty(_globals.controls.mixins.DragMixin.prototype, 'bool', 'enabled', (true))
	core.addProperty(_globals.controls.mixins.DragMixin.prototype, 'int', 'x')
	core.addProperty(_globals.controls.mixins.DragMixin.prototype, 'int', 'y')
	core.addProperty(_globals.controls.mixins.DragMixin.prototype, 'int', 'limitx1')
	core.addProperty(_globals.controls.mixins.DragMixin.prototype, 'int', 'limitx2')
	core.addProperty(_globals.controls.mixins.DragMixin.prototype, 'int', 'limity1')
	core.addProperty(_globals.controls.mixins.DragMixin.prototype, 'int', 'limity2')
/** @const @type {number} */
	_globals.controls.mixins.DragMixin.prototype.Any = 0
/** @const @type {number} */
	_globals.controls.mixins.DragMixin.Any = 0
/** @const @type {number} */
	_globals.controls.mixins.DragMixin.prototype.Vertical = 1
/** @const @type {number} */
	_globals.controls.mixins.DragMixin.Vertical = 1
/** @const @type {number} */
	_globals.controls.mixins.DragMixin.prototype.Horizontal = 2
/** @const @type {number} */
	_globals.controls.mixins.DragMixin.Horizontal = 2
	core.addProperty(_globals.controls.mixins.DragMixin.prototype, 'enum', 'direction')

	_globals.controls.mixins.DragMixin.prototype.__create = function(__closure) {
		_globals.core.Object.prototype.__create.call(this, __closure.__base = { })

	}
	_globals.controls.mixins.DragMixin.prototype.__setup = function(__closure) {
	_globals.core.Object.prototype.__setup.call(this, __closure.__base); delete __closure.__base
this.onChanged('enabled', (function(value) {
		this._bindPressed(value)
	} ).bind(this))
}
//=====[component core.Rectangle]=====================

/**
 * @constructor
 * @extends {_globals.core.Item}
 */
	_globals.core.Rectangle = function(parent, _delegate) {
	_globals.core.Item.apply(this, arguments);

}
	_globals.core.Rectangle.prototype = Object.create(_globals.core.Item.prototype)
	_globals.core.Rectangle.prototype.constructor = _globals.core.Rectangle
	_globals.core.Rectangle.prototype.componentName = 'core.Rectangle'
	_globals.core.Rectangle.prototype._update = function(name,value) {
		switch(name) {
			case 'color': this.style('background-color', _globals.core.normalizeColor(value)); break;
		}
		_globals.core.Item.prototype._update.apply(this, arguments);
	}
	_globals.core.Rectangle.prototype._mapCSSAttribute = function(name) {
		var attr = {color: 'background-color'}[name]
		return (attr !== undefined)?
			attr:
			_globals.core.Item.prototype._mapCSSAttribute.apply(this, arguments)
	}
	core.addProperty(_globals.core.Rectangle.prototype, 'color', 'color', ("#0000"))
	core.addProperty(_globals.core.Rectangle.prototype, 'Border', 'border')
	core.addProperty(_globals.core.Rectangle.prototype, 'Gradient', 'gradient')

	_globals.core.Rectangle.prototype.__create = function(__closure) {
		_globals.core.Item.prototype.__create.call(this, __closure.__base = { })
//creating component core.<anonymous>
		var this$border = new _globals.core.Border(this)
		__closure.this$border = this$border

//creating component Border
		this$border.__create(__closure.__closure_this$border = { })

		this.border = this$border
	}
	_globals.core.Rectangle.prototype.__setup = function(__closure) {
	_globals.core.Item.prototype.__setup.call(this, __closure.__base); delete __closure.__base
//setting up component Border
			var this$border = __closure.this$border
			this$border.__setup(__closure.__closure_this$border)
			delete __closure.__closure_this$border
}
//=====[component vc.Cover]=====================

/**
 * @constructor
 * @extends {_globals.core.Rectangle}
 */
	_globals.vc.Cover = function(parent, _delegate) {
	_globals.core.Rectangle.apply(this, arguments);

}
	_globals.vc.Cover.prototype = Object.create(_globals.core.Rectangle.prototype)
	_globals.vc.Cover.prototype.constructor = _globals.vc.Cover
	_globals.vc.Cover.prototype.componentName = 'vc.Cover'
	_globals.vc.Cover.prototype.remove = function() {
		log ("going to remove", this.idx)
		this.parent.model.remove(this.idx);
	}
	core.addProperty(_globals.vc.Cover.prototype, 'int', 'shiftX')
	core.addProperty(_globals.vc.Cover.prototype, 'int', 'shiftY')
	core.addProperty(_globals.vc.Cover.prototype, 'bool', 'open')
	core.addProperty(_globals.vc.Cover.prototype, 'int', 'idx')
	core.addProperty(_globals.vc.Cover.prototype, 'Mixin', 'hover')
	core.addProperty(_globals.vc.Cover.prototype, 'Color', 'coverColor')

	_globals.vc.Cover.prototype.__create = function(__closure) {
		_globals.core.Rectangle.prototype.__create.call(this, __closure.__base = { })
var this$child0 = new _globals.controls.mixins.DragMixin(this)
		__closure.this$child0 = this$child0

//creating component DragMixin
		this$child0.__create(__closure.__closure_this$child0 = { })

		var this$child1 = new _globals.core.Text(this)
		__closure.this$child1 = this$child1

//creating component Text
		this$child1.__create(__closure.__closure_this$child1 = { })

//creating component vc.<anonymous>
		var this$hover = new _globals.controls.mixins.HoverMixin(this)
		__closure.this$hover = this$hover

//creating component HoverMixin
		this$hover.__create(__closure.__closure_this$hover = { })

		this.hover = this$hover
	}
	_globals.vc.Cover.prototype.__setup = function(__closure) {
	_globals.core.Rectangle.prototype.__setup.call(this, __closure.__base); delete __closure.__base
//assigning border.color to ("gray")
			this._removeUpdater('border.color'); this._get('border').color = (("gray"));
//assigning border.width to (1)
			this._removeUpdater('border.width'); this._get('border').width = ((1));

//setting up component HoverMixin
			var this$hover = __closure.this$hover
			this$hover.__setup(__closure.__closure_this$hover)
			delete __closure.__closure_this$hover

//assigning cursor to ("pointer")
			this$hover._removeUpdater('cursor'); this$hover.cursor = (("pointer"));

//assigning idx to (this._get('model').index)
			var update$this$idx = (function() { this.idx = ((this._get('model').index)); }).bind(this)
			var dep$this$idx$0 = this._get('_delegate')
			this.connectOnChanged(dep$this$idx$0, '_rowIndex', update$this$idx)
			this._removeUpdater('idx', [[dep$this$idx$0, '_rowIndex', update$this$idx]])
			update$this$idx();
//assigning color to (this._get('open') ? "#F5F5F5" : this._get('coverColor'))
			var update$this$color = (function() { this.color = ((this._get('open') ? "#F5F5F5" : this._get('coverColor'))); }).bind(this)
			var dep$this$color$0 = this
			this.connectOnChanged(dep$this$color$0, 'open', update$this$color)
			var dep$this$color$1 = this
			this.connectOnChanged(dep$this$color$1, 'coverColor', update$this$color)
			this._removeUpdater('color', [[dep$this$color$0, 'open', update$this$color],[dep$this$color$1, 'coverColor', update$this$color]])
			update$this$color();
//assigning transform.translateY to (this._get('hover')._get('value') && ! this._get('open') ? - 20 : 0)
			var update$this$transform_translateY = (function() { this._get('transform').translateY = ((this._get('hover')._get('value') && ! this._get('open') ? - 20 : 0)); }).bind(this)
			var dep$this$transform_translateY$0 = this._get('hover')
			this.connectOnChanged(dep$this$transform_translateY$0, 'value', update$this$transform_translateY)
			var dep$this$transform_translateY$1 = this
			this.connectOnChanged(dep$this$transform_translateY$1, 'open', update$this$transform_translateY)
			this._removeUpdater('transform.translateY', [[dep$this$transform_translateY$0, 'value', update$this$transform_translateY],[dep$this$transform_translateY$1, 'open', update$this$transform_translateY]])
			update$this$transform_translateY();
//assigning transform.rotateZ to (this._get('open') ? 720 : (this._get('hover')._get('value') ? 10 : 0))
			var update$this$transform_rotateZ = (function() { this._get('transform').rotateZ = ((this._get('open') ? 720 : (this._get('hover')._get('value') ? 10 : 0))); }).bind(this)
			var dep$this$transform_rotateZ$0 = this
			this.connectOnChanged(dep$this$transform_rotateZ$0, 'open', update$this$transform_rotateZ)
			var dep$this$transform_rotateZ$1 = this._get('hover')
			this.connectOnChanged(dep$this$transform_rotateZ$1, 'value', update$this$transform_rotateZ)
			this._removeUpdater('transform.rotateZ', [[dep$this$transform_rotateZ$0, 'open', update$this$transform_rotateZ],[dep$this$transform_rotateZ$1, 'value', update$this$transform_rotateZ]])
			update$this$transform_rotateZ();
//assigning height to (this._get('open') ? this._get('context')._get('height') * 0.8 * 0.33 : this._get('context')._get('height') * 0.08)
			var update$this$height = (function() { this.height = ((this._get('open') ? this._get('context')._get('height') * 0.8 * 0.33 : this._get('context')._get('height') * 0.08)); }).bind(this)
			var dep$this$height$0 = this
			this.connectOnChanged(dep$this$height$0, 'open', update$this$height)
			var dep$this$height$1 = this._get('context')
			this.connectOnChanged(dep$this$height$1, 'height', update$this$height)
			var dep$this$height$2 = this._get('context')
			this.connectOnChanged(dep$this$height$2, 'height', update$this$height)
			this._removeUpdater('height', [[dep$this$height$0, 'open', update$this$height],[dep$this$height$1, 'height', update$this$height],[dep$this$height$2, 'height', update$this$height]])
			update$this$height();
//assigning width to (this._get('open') ? this._get('context')._get('width') * 0.5 : this._get('context')._get('width') * 0.1)
			var update$this$width = (function() { this.width = ((this._get('open') ? this._get('context')._get('width') * 0.5 : this._get('context')._get('width') * 0.1)); }).bind(this)
			var dep$this$width$0 = this
			this.connectOnChanged(dep$this$width$0, 'open', update$this$width)
			var dep$this$width$1 = this._get('context')
			this.connectOnChanged(dep$this$width$1, 'width', update$this$width)
			var dep$this$width$2 = this._get('context')
			this.connectOnChanged(dep$this$width$2, 'width', update$this$width)
			this._removeUpdater('width', [[dep$this$width$0, 'open', update$this$width],[dep$this$width$1, 'width', update$this$width],[dep$this$width$2, 'width', update$this$width]])
			update$this$width();
//assigning transform.skewX to (this._get('open') ? 0 : - 11)
			var update$this$transform_skewX = (function() { this._get('transform').skewX = ((this._get('open') ? 0 : - 11)); }).bind(this)
			var dep$this$transform_skewX$0 = this
			this.connectOnChanged(dep$this$transform_skewX$0, 'open', update$this$transform_skewX)
			this._removeUpdater('transform.skewX', [[dep$this$transform_skewX$0, 'open', update$this$transform_skewX]])
			update$this$transform_skewX();
//assigning y to (this._get('open') ? (this._get('parent')._get('height') * ((36.4) / 100)) : (this._get('parent')._get('height') * ((55) / 100)) + this._get('shiftY'))
			var update$this$y = (function() { this.y = ((this._get('open') ? (this._get('parent')._get('height') * ((36.4) / 100)) : (this._get('parent')._get('height') * ((55) / 100)) + this._get('shiftY'))); }).bind(this)
			var dep$this$y$0 = this
			this.connectOnChanged(dep$this$y$0, 'open', update$this$y)
			var dep$this$y$1 = this._get('parent')
			this.connectOnChanged(dep$this$y$1, 'height', update$this$y)
			var dep$this$y$2 = this._get('parent')
			this.connectOnChanged(dep$this$y$2, 'height', update$this$y)
			var dep$this$y$3 = this
			this.connectOnChanged(dep$this$y$3, 'shiftY', update$this$y)
			this._removeUpdater('y', [[dep$this$y$0, 'open', update$this$y],[dep$this$y$1, 'height', update$this$y],[dep$this$y$2, 'height', update$this$y],[dep$this$y$3, 'shiftY', update$this$y]])
			update$this$y();
//assigning x to (this._get('open') ? (this._get('parent')._get('width') * ((25) / 100)) : (this._get('parent')._get('width') * ((15) / 100)) + this._get('shiftX'))
			var update$this$x = (function() { this.x = ((this._get('open') ? (this._get('parent')._get('width') * ((25) / 100)) : (this._get('parent')._get('width') * ((15) / 100)) + this._get('shiftX'))); }).bind(this)
			var dep$this$x$0 = this
			this.connectOnChanged(dep$this$x$0, 'open', update$this$x)
			var dep$this$x$1 = this._get('parent')
			this.connectOnChanged(dep$this$x$1, 'width', update$this$x)
			var dep$this$x$2 = this._get('parent')
			this.connectOnChanged(dep$this$x$2, 'width', update$this$x)
			var dep$this$x$3 = this
			this.connectOnChanged(dep$this$x$3, 'shiftX', update$this$x)
			this._removeUpdater('x', [[dep$this$x$0, 'open', update$this$x],[dep$this$x$1, 'width', update$this$x],[dep$this$x$2, 'width', update$this$x],[dep$this$x$3, 'shiftX', update$this$x]])
			update$this$x();
//assigning z to (this._get('open') ? 5 : 2)
			var update$this$z = (function() { this.z = ((this._get('open') ? 5 : 2)); }).bind(this)
			var dep$this$z$0 = this
			this.connectOnChanged(dep$this$z$0, 'open', update$this$z)
			this._removeUpdater('z', [[dep$this$z$0, 'open', update$this$z]])
			update$this$z();
			this._context._onCompleted((function() {
		log("onCompleted", this.idx)
		var c = ["#0091EA", "#689F38", "#00E676", "#00BFA5", "#00E5FF", "#0277BD", "#03A9F4", "#82B1FF", "#D1C4E9", "#FF5252", "#FF5722", "#FFD600", "#FF6D00", "#795548", "#FFEB3B", "#FFC107", "#2E7D32", "#CDDC39", "#84FFFF", "#01579B", "#C8E6C9", "#FFEB3B", "#FFECB3", "#D7CCC8", "#DD2C00", "#DD2C00", "#80DEEA", "#B39DDB", "#880E4F", "#FCE4EC", "#FF1744", "#B388FF", "#006064", "#B2FF59", "#E65100", "#FF7043", "#FF6F00"];

		this.shiftX = this.idx * -4;
		this.shiftY = this.idx * 12;
		this.coverColor = c[this.idx]
	} ).bind(this))
	var behavior_this_on_visible = new _globals.core.Animation(this)
	var behavior_this_on_visible__closure = { behavior_this_on_visible: behavior_this_on_visible }

//creating component Animation
	behavior_this_on_visible.__create(behavior_this_on_visible__closure.__closure_behavior_this_on_visible = { })


//setting up component Animation
	var behavior_this_on_visible = behavior_this_on_visible__closure.behavior_this_on_visible
	behavior_this_on_visible.__setup(behavior_this_on_visible__closure.__closure_behavior_this_on_visible)
	delete behavior_this_on_visible__closure.__closure_behavior_this_on_visible

//assigning duration to (1000)
	behavior_this_on_visible._removeUpdater('duration'); behavior_this_on_visible.duration = ((1000));
//assigning delay to (this._get('parent')._get('open') ? 0 : 600)
	var update$behavior_this_on_visible$delay = (function() { behavior_this_on_visible.delay = ((this._get('parent')._get('open') ? 0 : 600)); }).bind(behavior_this_on_visible)
	var dep$behavior_this_on_visible$delay$0 = behavior_this_on_visible._get('parent')
	behavior_this_on_visible.connectOnChanged(dep$behavior_this_on_visible$delay$0, 'open', update$behavior_this_on_visible$delay)
	behavior_this_on_visible._removeUpdater('delay', [[dep$behavior_this_on_visible$delay$0, 'open', update$behavior_this_on_visible$delay]])
	update$behavior_this_on_visible$delay();

	this.setAnimation('visible', behavior_this_on_visible);

	var behavior_this_on_transform = new _globals.core.Animation(this)
	var behavior_this_on_transform__closure = { behavior_this_on_transform: behavior_this_on_transform }

//creating component Animation
	behavior_this_on_transform.__create(behavior_this_on_transform__closure.__closure_behavior_this_on_transform = { })


//setting up component Animation
	var behavior_this_on_transform = behavior_this_on_transform__closure.behavior_this_on_transform
	behavior_this_on_transform.__setup(behavior_this_on_transform__closure.__closure_behavior_this_on_transform)
	delete behavior_this_on_transform__closure.__closure_behavior_this_on_transform

//assigning duration to (750)
	behavior_this_on_transform._removeUpdater('duration'); behavior_this_on_transform.duration = ((750));
//assigning delay to (this._get('parent')._get('open') || this._get('parent')._get('hover')._get('value') ? 0 : 600)
	var update$behavior_this_on_transform$delay = (function() { behavior_this_on_transform.delay = ((this._get('parent')._get('open') || this._get('parent')._get('hover')._get('value') ? 0 : 600)); }).bind(behavior_this_on_transform)
	var dep$behavior_this_on_transform$delay$0 = behavior_this_on_transform._get('parent')
	behavior_this_on_transform.connectOnChanged(dep$behavior_this_on_transform$delay$0, 'open', update$behavior_this_on_transform$delay)
	var dep$behavior_this_on_transform$delay$1 = behavior_this_on_transform._get('parent')._get('hover')
	behavior_this_on_transform.connectOnChanged(dep$behavior_this_on_transform$delay$1, 'value', update$behavior_this_on_transform$delay)
	behavior_this_on_transform._removeUpdater('delay', [[dep$behavior_this_on_transform$delay$0, 'open', update$behavior_this_on_transform$delay],[dep$behavior_this_on_transform$delay$1, 'value', update$behavior_this_on_transform$delay]])
	update$behavior_this_on_transform$delay();

	this.setAnimation('transform', behavior_this_on_transform);

	var behavior_this_on_height = new _globals.core.Animation(this)
	var behavior_this_on_height__closure = { behavior_this_on_height: behavior_this_on_height }

//creating component Animation
	behavior_this_on_height.__create(behavior_this_on_height__closure.__closure_behavior_this_on_height = { })


//setting up component Animation
	var behavior_this_on_height = behavior_this_on_height__closure.behavior_this_on_height
	behavior_this_on_height.__setup(behavior_this_on_height__closure.__closure_behavior_this_on_height)
	delete behavior_this_on_height__closure.__closure_behavior_this_on_height

//assigning duration to (750)
	behavior_this_on_height._removeUpdater('duration'); behavior_this_on_height.duration = ((750));
//assigning delay to (this._get('parent')._get('open') || this._get('parent')._get('hover')._get('value') ? 0 : 600)
	var update$behavior_this_on_height$delay = (function() { behavior_this_on_height.delay = ((this._get('parent')._get('open') || this._get('parent')._get('hover')._get('value') ? 0 : 600)); }).bind(behavior_this_on_height)
	var dep$behavior_this_on_height$delay$0 = behavior_this_on_height._get('parent')
	behavior_this_on_height.connectOnChanged(dep$behavior_this_on_height$delay$0, 'open', update$behavior_this_on_height$delay)
	var dep$behavior_this_on_height$delay$1 = behavior_this_on_height._get('parent')._get('hover')
	behavior_this_on_height.connectOnChanged(dep$behavior_this_on_height$delay$1, 'value', update$behavior_this_on_height$delay)
	behavior_this_on_height._removeUpdater('delay', [[dep$behavior_this_on_height$delay$0, 'open', update$behavior_this_on_height$delay],[dep$behavior_this_on_height$delay$1, 'value', update$behavior_this_on_height$delay]])
	update$behavior_this_on_height$delay();

	this.setAnimation('height', behavior_this_on_height);

	var behavior_this_on_width = new _globals.core.Animation(this)
	var behavior_this_on_width__closure = { behavior_this_on_width: behavior_this_on_width }

//creating component Animation
	behavior_this_on_width.__create(behavior_this_on_width__closure.__closure_behavior_this_on_width = { })


//setting up component Animation
	var behavior_this_on_width = behavior_this_on_width__closure.behavior_this_on_width
	behavior_this_on_width.__setup(behavior_this_on_width__closure.__closure_behavior_this_on_width)
	delete behavior_this_on_width__closure.__closure_behavior_this_on_width

//assigning duration to (750)
	behavior_this_on_width._removeUpdater('duration'); behavior_this_on_width.duration = ((750));
//assigning delay to (this._get('parent')._get('open') || this._get('parent')._get('hover')._get('value') ? 0 : 600)
	var update$behavior_this_on_width$delay = (function() { behavior_this_on_width.delay = ((this._get('parent')._get('open') || this._get('parent')._get('hover')._get('value') ? 0 : 600)); }).bind(behavior_this_on_width)
	var dep$behavior_this_on_width$delay$0 = behavior_this_on_width._get('parent')
	behavior_this_on_width.connectOnChanged(dep$behavior_this_on_width$delay$0, 'open', update$behavior_this_on_width$delay)
	var dep$behavior_this_on_width$delay$1 = behavior_this_on_width._get('parent')._get('hover')
	behavior_this_on_width.connectOnChanged(dep$behavior_this_on_width$delay$1, 'value', update$behavior_this_on_width$delay)
	behavior_this_on_width._removeUpdater('delay', [[dep$behavior_this_on_width$delay$0, 'open', update$behavior_this_on_width$delay],[dep$behavior_this_on_width$delay$1, 'value', update$behavior_this_on_width$delay]])
	update$behavior_this_on_width$delay();

	this.setAnimation('width', behavior_this_on_width);

	var behavior_this_on_background = new _globals.core.Animation(this)
	var behavior_this_on_background__closure = { behavior_this_on_background: behavior_this_on_background }

//creating component Animation
	behavior_this_on_background.__create(behavior_this_on_background__closure.__closure_behavior_this_on_background = { })


//setting up component Animation
	var behavior_this_on_background = behavior_this_on_background__closure.behavior_this_on_background
	behavior_this_on_background.__setup(behavior_this_on_background__closure.__closure_behavior_this_on_background)
	delete behavior_this_on_background__closure.__closure_behavior_this_on_background

//assigning duration to (750)
	behavior_this_on_background._removeUpdater('duration'); behavior_this_on_background.duration = ((750));
//assigning delay to (this._get('parent')._get('open') || this._get('parent')._get('hover')._get('value') ? 0 : 600)
	var update$behavior_this_on_background$delay = (function() { behavior_this_on_background.delay = ((this._get('parent')._get('open') || this._get('parent')._get('hover')._get('value') ? 0 : 600)); }).bind(behavior_this_on_background)
	var dep$behavior_this_on_background$delay$0 = behavior_this_on_background._get('parent')
	behavior_this_on_background.connectOnChanged(dep$behavior_this_on_background$delay$0, 'open', update$behavior_this_on_background$delay)
	var dep$behavior_this_on_background$delay$1 = behavior_this_on_background._get('parent')._get('hover')
	behavior_this_on_background.connectOnChanged(dep$behavior_this_on_background$delay$1, 'value', update$behavior_this_on_background$delay)
	behavior_this_on_background._removeUpdater('delay', [[dep$behavior_this_on_background$delay$0, 'open', update$behavior_this_on_background$delay],[dep$behavior_this_on_background$delay$1, 'value', update$behavior_this_on_background$delay]])
	update$behavior_this_on_background$delay();

	this.setAnimation('background', behavior_this_on_background);

	var behavior_this_on_y = new _globals.core.Animation(this)
	var behavior_this_on_y__closure = { behavior_this_on_y: behavior_this_on_y }

//creating component Animation
	behavior_this_on_y.__create(behavior_this_on_y__closure.__closure_behavior_this_on_y = { })


//setting up component Animation
	var behavior_this_on_y = behavior_this_on_y__closure.behavior_this_on_y
	behavior_this_on_y.__setup(behavior_this_on_y__closure.__closure_behavior_this_on_y)
	delete behavior_this_on_y__closure.__closure_behavior_this_on_y

//assigning duration to (750)
	behavior_this_on_y._removeUpdater('duration'); behavior_this_on_y.duration = ((750));
//assigning delay to (this._get('parent')._get('open') || this._get('parent')._get('hover')._get('value') ? 0 : 600)
	var update$behavior_this_on_y$delay = (function() { behavior_this_on_y.delay = ((this._get('parent')._get('open') || this._get('parent')._get('hover')._get('value') ? 0 : 600)); }).bind(behavior_this_on_y)
	var dep$behavior_this_on_y$delay$0 = behavior_this_on_y._get('parent')
	behavior_this_on_y.connectOnChanged(dep$behavior_this_on_y$delay$0, 'open', update$behavior_this_on_y$delay)
	var dep$behavior_this_on_y$delay$1 = behavior_this_on_y._get('parent')._get('hover')
	behavior_this_on_y.connectOnChanged(dep$behavior_this_on_y$delay$1, 'value', update$behavior_this_on_y$delay)
	behavior_this_on_y._removeUpdater('delay', [[dep$behavior_this_on_y$delay$0, 'open', update$behavior_this_on_y$delay],[dep$behavior_this_on_y$delay$1, 'value', update$behavior_this_on_y$delay]])
	update$behavior_this_on_y$delay();

	this.setAnimation('y', behavior_this_on_y);

	var behavior_this_on_x = new _globals.core.Animation(this)
	var behavior_this_on_x__closure = { behavior_this_on_x: behavior_this_on_x }

//creating component Animation
	behavior_this_on_x.__create(behavior_this_on_x__closure.__closure_behavior_this_on_x = { })


//setting up component Animation
	var behavior_this_on_x = behavior_this_on_x__closure.behavior_this_on_x
	behavior_this_on_x.__setup(behavior_this_on_x__closure.__closure_behavior_this_on_x)
	delete behavior_this_on_x__closure.__closure_behavior_this_on_x

//assigning duration to (750)
	behavior_this_on_x._removeUpdater('duration'); behavior_this_on_x.duration = ((750));
//assigning delay to (this._get('parent')._get('open') || this._get('parent')._get('hover')._get('value') ? 0 : 600)
	var update$behavior_this_on_x$delay = (function() { behavior_this_on_x.delay = ((this._get('parent')._get('open') || this._get('parent')._get('hover')._get('value') ? 0 : 600)); }).bind(behavior_this_on_x)
	var dep$behavior_this_on_x$delay$0 = behavior_this_on_x._get('parent')
	behavior_this_on_x.connectOnChanged(dep$behavior_this_on_x$delay$0, 'open', update$behavior_this_on_x$delay)
	var dep$behavior_this_on_x$delay$1 = behavior_this_on_x._get('parent')._get('hover')
	behavior_this_on_x.connectOnChanged(dep$behavior_this_on_x$delay$1, 'value', update$behavior_this_on_x$delay)
	behavior_this_on_x._removeUpdater('delay', [[dep$behavior_this_on_x$delay$0, 'open', update$behavior_this_on_x$delay],[dep$behavior_this_on_x$delay$1, 'value', update$behavior_this_on_x$delay]])
	update$behavior_this_on_x$delay();

	this.setAnimation('x', behavior_this_on_x);


//setting up component DragMixin
			var this$child0 = __closure.this$child0
			this$child0.__setup(__closure.__closure_this$child0)
			delete __closure.__closure_this$child0


			this.addChild(this$child0)

//setting up component Text
			var this$child1 = __closure.this$child1
			this$child1.__setup(__closure.__closure_this$child1)
			delete __closure.__closure_this$child1

//assigning text to (this._get('parent')._get('idx'))
			var update$this_child1$text = (function() { this$child1.text = ((this._get('parent')._get('idx'))); }).bind(this$child1)
			var dep$this_child1$text$0 = this$child1._get('parent')
			this$child1.connectOnChanged(dep$this_child1$text$0, 'idx', update$this_child1$text)
			this$child1._removeUpdater('text', [[dep$this_child1$text$0, 'idx', update$this_child1$text]])
			update$this_child1$text();
//assigning anchors.centerIn to (this._get('parent'))
			var update$this_child1$anchors_centerIn = (function() { this$child1._get('anchors').centerIn = ((this._get('parent'))); }).bind(this$child1)
			var dep$this_child1$anchors_centerIn$0 = this$child1
			this$child1.connectOnChanged(dep$this_child1$anchors_centerIn$0, 'parent', update$this_child1$anchors_centerIn)
			this$child1._removeUpdater('anchors.centerIn', [[dep$this_child1$anchors_centerIn$0, 'parent', update$this_child1$anchors_centerIn]])
			update$this_child1$anchors_centerIn();

			this.addChild(this$child1)
}
//=====[component core.Transform]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.core.Transform = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);
	//custom constructor:
	{ this._transforms = {} }

}
	_globals.core.Transform.prototype = Object.create(_globals.core.Object.prototype)
	_globals.core.Transform.prototype.constructor = _globals.core.Transform
	_globals.core.Transform.prototype.componentName = 'core.Transform'
	_globals.core.Transform.prototype._update = function(name,value) {
		switch(name) {
			case 'perspective':	this._transforms['perspective'] = value + 'px'; break;
			case 'translateX':	this._transforms['translateX'] = value + 'px'; break;
			case 'translateY':	this._transforms['translateY'] = value + 'px'; break;
			case 'translateZ':	this._transforms['translateZ'] = value + 'px'; break;
			case 'rotateX':	this._transforms['rotateX'] = value + 'deg'; break
			case 'rotateY':	this._transforms['rotateY'] = value + 'deg'; break
			case 'rotateZ':	this._transforms['rotateZ'] = value + 'deg'; break
			case 'rotate':	this._transforms['rotate'] = value + 'deg'; break
			case 'scaleX':	this._transforms['scaleX'] = value; break
			case 'scaleY':	this._transforms['scaleY'] = value; break
			case 'skewX':	this._transforms['skewX'] = value + 'deg'; break
			case 'skewY':	this._transforms['skewY'] = value + 'deg'; break
		}

		var str = ""
		for (var i in this._transforms) {
			str += i
			str += "(" + this._transforms[i] + ") "
		}
		this.parent.style('transform', str)
		_globals.core.Object.prototype._update.apply(this, arguments)
	}
	core.addProperty(_globals.core.Transform.prototype, 'int', 'perspective')
	core.addProperty(_globals.core.Transform.prototype, 'int', 'translateX')
	core.addProperty(_globals.core.Transform.prototype, 'int', 'translateY')
	core.addProperty(_globals.core.Transform.prototype, 'int', 'translateZ')
	core.addProperty(_globals.core.Transform.prototype, 'real', 'rotateX')
	core.addProperty(_globals.core.Transform.prototype, 'real', 'rotateY')
	core.addProperty(_globals.core.Transform.prototype, 'real', 'rotateZ')
	core.addProperty(_globals.core.Transform.prototype, 'real', 'rotate')
	core.addProperty(_globals.core.Transform.prototype, 'real', 'scaleX')
	core.addProperty(_globals.core.Transform.prototype, 'real', 'scaleY')
	core.addProperty(_globals.core.Transform.prototype, 'real', 'skewX')
	core.addProperty(_globals.core.Transform.prototype, 'real', 'skewY')//=====[component core.Anchors]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.core.Anchors = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);

}
	_globals.core.Anchors.prototype = Object.create(_globals.core.Object.prototype)
	_globals.core.Anchors.prototype.constructor = _globals.core.Anchors
	_globals.core.Anchors.prototype.componentName = 'core.Anchors'
	_globals.core.Anchors.prototype.marginsUpdated = _globals.core.createSignal('marginsUpdated')
	_globals.core.Anchors.prototype._updateBottom = function() {
		var anchors = this
		var self = anchors.parent
		var parent = self.parent

		var parent_box = parent.toScreen()
		var bottom = anchors.bottom.toScreen()

		var tm = anchors.topMargin || anchors.margins
		var bm = anchors.bottomMargin || anchors.margins
		if (anchors.top) {
			var top = anchors.top.toScreen()
			self.height = bottom - top - bm - tm
		}
		self.y = bottom - parent_box[1] - bm - self.height - self.viewY
	}
	_globals.core.Anchors.prototype._update = function(name) {
		var self = this.parent
		var anchors = this

		switch(name) {
			case 'left':
				self._removeUpdater('x')
				if (this.right)
					self._removeUpdater('width')
				var update_left = this._updateLeft.bind(this)
				update_left()
				self.connectOn(anchors.left.parent, 'boxChanged', update_left)
				anchors.onChanged('leftMargin', update_left)
				break

			case 'right':
				self._removeUpdater('x')
				if (this.left)
					self._removeUpdater('width')
				var update_right = this._updateRight.bind(this)
				update_right()
				self.onChanged('width', update_right)
				self.connectOn(anchors.right.parent, 'boxChanged', update_right)
				anchors.onChanged('rightMargin', update_right)
				break

			case 'top':
				self._removeUpdater('y')
				if (this.bottom)
					self._removeUpdater('height')
				var update_top = this._updateTop.bind(this)
				update_top()
				self.connectOn(anchors.top.parent, 'boxChanged', update_top)
				anchors.onChanged('topMargin', update_top)
				break

			case 'bottom':
				self._removeUpdater('y')
				if (this.top)
					self._removeUpdater('height')
				var update_bottom = this._updateBottom.bind(this)
				update_bottom()
				self.onChanged('height', update_bottom)
				self.connectOn(anchors.bottom.parent, 'boxChanged', update_bottom)
				anchors.onChanged('bottomMargin', update_bottom)
				break

			case 'horizontalCenter':
				self._removeUpdater('x')
				var update_h_center = this._updateHCenter.bind(this)
				update_h_center()
				self.onChanged('width', update_h_center)
				anchors.onChanged('leftMargin', update_h_center)
				anchors.onChanged('rightMargin', update_h_center)
				self.connectOn(anchors.horizontalCenter.parent, 'boxChanged', update_h_center)
				break

			case 'verticalCenter':
				self._removeUpdater('y')
				var update_v_center = this._updateVCenter.bind(this)
				update_v_center()
				self.onChanged('height', update_v_center)
				anchors.onChanged('topMargin', update_v_center)
				anchors.onChanged('bottomMargin', update_v_center)
				self.connectOn(anchors.verticalCenter.parent, 'boxChanged', update_v_center)
				break

			case 'fill':
				anchors.left = anchors.fill.left
				anchors.right = anchors.fill.right
				anchors.top = anchors.fill.top
				anchors.bottom = anchors.fill.bottom
				break

			case 'centerIn':
				anchors.horizontalCenter = anchors.centerIn.horizontalCenter
				anchors.verticalCenter = anchors.centerIn.verticalCenter
				break

			case 'leftMargin':
			case 'rightMargin':
			case 'topMargin':
			case 'bottomMargin':
			case 'margins':
				this.marginsUpdated();
		}
		_globals.core.Object.prototype._update.apply(this, arguments)
	}
	_globals.core.Anchors.prototype._updateLeft = function() {
		var anchors = this
		var self = anchors.parent
		var parent = self.parent

		var parent_box = parent.toScreen()
		var left = anchors.left.toScreen()

		var lm = anchors.leftMargin || anchors.margins
		self.x = left + lm - parent_box[0] - self.viewX
		if (anchors.right) {
			var right = anchors.right.toScreen()
			var rm = anchors.rightMargin || anchors.margins
			self.width = right - left - rm - lm
		}
	}
	_globals.core.Anchors.prototype._updateHCenter = function() {
		var anchors = this
		var self = anchors.parent
		var parent = self.parent

		var parent_box = parent.toScreen();
		var hcenter = anchors.horizontalCenter.toScreen();
		var lm = anchors.leftMargin || anchors.margins;
		var rm = anchors.rightMargin || anchors.margins;
		self.x = hcenter - self.width / 2 - parent_box[0] + lm - rm - self.viewX;
	}
	_globals.core.Anchors.prototype._updateRight = function() {
		var anchors = this
		var self = anchors.parent
		var parent = self.parent

		var parent_box = parent.toScreen()
		var right = anchors.right.toScreen()

		var lm = anchors.leftMargin || anchors.margins
		var rm = anchors.rightMargin || anchors.margins
		if (anchors.left) {
			var left = anchors.left.toScreen()
			self.width = right - left - rm - lm
		}
		self.x = right - parent_box[0] - rm - self.width - self.viewX
	}
	_globals.core.Anchors.prototype._updateTop = function() {
		var anchors = this
		var self = anchors.parent
		var parent = self.parent

		var parent_box = parent.toScreen()
		var top = anchors.top.toScreen()

		var tm = anchors.topMargin || anchors.margins
		var bm = anchors.bottomMargin || anchors.margins
		self.y = top + tm - parent_box[1] - self.viewY
		if (anchors.bottom) {
			var bottom = anchors.bottom.toScreen()
			self.height = bottom - top - bm - tm
		}
	}
	_globals.core.Anchors.prototype._updateVCenter = function() {
		var anchors = this
		var self = anchors.parent
		var parent = self.parent

		var parent_box = parent.toScreen();
		var vcenter = anchors.verticalCenter.toScreen();
		var tm = anchors.topMargin || anchors.margins;
		var bm = anchors.bottomMargin || anchors.margins;
		self.y = vcenter - self.height / 2 - parent_box[1] + tm - bm - self.viewY;
	}
	core.addProperty(_globals.core.Anchors.prototype, 'AnchorLine', 'bottom')
	core.addProperty(_globals.core.Anchors.prototype, 'AnchorLine', 'verticalCenter')
	core.addProperty(_globals.core.Anchors.prototype, 'AnchorLine', 'top')
	core.addProperty(_globals.core.Anchors.prototype, 'AnchorLine', 'left')
	core.addProperty(_globals.core.Anchors.prototype, 'AnchorLine', 'horizontalCenter')
	core.addProperty(_globals.core.Anchors.prototype, 'AnchorLine', 'right')
	core.addProperty(_globals.core.Anchors.prototype, 'Item', 'fill')
	core.addProperty(_globals.core.Anchors.prototype, 'Item', 'centerIn')
	core.addProperty(_globals.core.Anchors.prototype, 'int', 'margins')
	core.addProperty(_globals.core.Anchors.prototype, 'int', 'bottomMargin')
	core.addProperty(_globals.core.Anchors.prototype, 'int', 'topMargin')
	core.addProperty(_globals.core.Anchors.prototype, 'int', 'leftMargin')
	core.addProperty(_globals.core.Anchors.prototype, 'int', 'rightMargin')//=====[component core.Location]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.core.Location = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);
	//custom constructor:
	{
		var self = this
		var location = window.location
		window.onhashchange = function() { self.hash = location.hash }
		window.onpopstate = function() { self.updateActualValues() }
	}

}
	_globals.core.Location.prototype = Object.create(_globals.core.Object.prototype)
	_globals.core.Location.prototype.constructor = _globals.core.Location
	_globals.core.Location.prototype.componentName = 'core.Location'
	_globals.core.Location.prototype.updateActualValues = function() {
		this.hash = window.location.hash
		this.host = window.location.host
		this.href = window.location.href
		this.port = window.location.port
		this.origin = window.location.origin
		this.hostname = window.location.hostname
		this.pathname = window.location.pathname

		var state = window.history.state
		this.historyState = (typeof state === "string") ? state : JSON.stringify(state)
	}
	_globals.core.Location.prototype.pushState = function(state,title,url) {
		window.history.pushState(state, title, url)
		this.updateActualValues()
	}
	_globals.core.Location.prototype.changeHref = function(href) {
		window.location.href = href
		this.updateActualValues()
	}
	core.addProperty(_globals.core.Location.prototype, 'string', 'hash')
	core.addProperty(_globals.core.Location.prototype, 'string', 'host')
	core.addProperty(_globals.core.Location.prototype, 'string', 'href')
	core.addProperty(_globals.core.Location.prototype, 'string', 'port')
	core.addProperty(_globals.core.Location.prototype, 'string', 'origin')
	core.addProperty(_globals.core.Location.prototype, 'string', 'hostname')
	core.addProperty(_globals.core.Location.prototype, 'string', 'pathname')
	core.addProperty(_globals.core.Location.prototype, 'string', 'historyState')//=====[component core.ListModel]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.core.ListModel = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);
	//custom constructor:
	{
		this._rows = []
	}

}
	_globals.core.ListModel.prototype = Object.create(_globals.core.Object.prototype)
	_globals.core.ListModel.prototype.constructor = _globals.core.ListModel
	_globals.core.ListModel.prototype.componentName = 'core.ListModel'
	_globals.core.ListModel.prototype.reset = _globals.core.createSignal('reset')
	_globals.core.ListModel.prototype.rowsChanged = _globals.core.createSignal('rowsChanged')
	_globals.core.ListModel.prototype.rowsRemoved = _globals.core.createSignal('rowsRemoved')
	_globals.core.ListModel.prototype.rowsInserted = _globals.core.createSignal('rowsInserted')
	_globals.core.ListModel.prototype.insert = function(idx,row) {
		if (idx < 0 || idx > this._rows.length)
			throw new Error('index ' + idx + ' out of bounds (' + this._rows.length + ')')
		this._rows.splice(idx, 0, row)
		this.count = this._rows.length
		this.rowsInserted(idx, idx + 1)
	}
	_globals.core.ListModel.prototype.set = function(idx,row) {
		if (idx < 0 || idx >= this._rows.length)
			throw new Error('index ' + idx + ' out of bounds (' + this._rows.length + ')')
		if (!(row instanceof Object))
			throw new Error('row is non-object')
		this._rows[idx] = row
		this.rowsChanged(idx, idx + 1)
	}
	_globals.core.ListModel.prototype.get = function(idx) {
		if (idx < 0 || idx >= this._rows.length)
			throw new Error('index ' + idx + ' out of bounds (' + this._rows.length + ')')
		var row = this._rows[idx]
		if (!(row instanceof Object))
			throw new Error('row is non-object')
		row.index = idx
		return row
	}
	_globals.core.ListModel.prototype.clear = function() { this.assign([]) }
	_globals.core.ListModel.prototype.remove = function(idx,n) {
		if (idx < 0 || idx >= this._rows.length)
			throw new Error('index ' + idx + ' out of bounds')
		if (n === undefined)
			n = 1
		this._rows.splice(idx, n)
		this.count = this._rows.length
		this.rowsRemoved(idx, idx + n)
	}
	_globals.core.ListModel.prototype.addChild = function(child) {
		this.append(child)
	}
	_globals.core.ListModel.prototype.setProperty = function(idx,name,value) {
		if (idx < 0 || idx >= this._rows.length)
			throw new Error('index ' + idx + ' out of bounds (' + this._rows.length + ')')
		var row = this._rows[idx]
		if (!(row instanceof Object))
			throw new Error('row is non-object, invalid index? (' + idx + ')')

		if (row[name] !== value) {
			row[name] = value
			this.rowsChanged(idx, idx + 1)
		}
	}
	_globals.core.ListModel.prototype.assign = function(rows) {
		this._rows = rows
		this.count = this._rows.length
		this.reset()
	}
	_globals.core.ListModel.prototype.append = function(row) {
		var l = this._rows.length
		if (Array.isArray(row)) {
			Array.prototype.push.apply(this._rows, row)
			this.count = this._rows.length
			this.rowsInserted(l, l + row.length)
		} else {
			this._rows.push(row)
			this.count = this._rows.length
			this.rowsInserted(l, l + 1)
		}
	}
	core.addProperty(_globals.core.ListModel.prototype, 'int', 'count')//=====[component core.AnchorLine]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.core.AnchorLine = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);

}
	_globals.core.AnchorLine.prototype = Object.create(_globals.core.Object.prototype)
	_globals.core.AnchorLine.prototype.constructor = _globals.core.AnchorLine
	_globals.core.AnchorLine.prototype.componentName = 'core.AnchorLine'
	_globals.core.AnchorLine.prototype.toScreen = function() {
		return this.parent.toScreen()[this.boxIndex]
	}
	core.addProperty(_globals.core.AnchorLine.prototype, 'int', 'boxIndex')//=====[component vc.Letter]=====================

/**
 * @constructor
 * @extends {_globals.core.Item}
 */
	_globals.vc.Letter = function(parent, _delegate) {
	_globals.core.Item.apply(this, arguments);

}
	_globals.vc.Letter.prototype = Object.create(_globals.core.Item.prototype)
	_globals.vc.Letter.prototype.constructor = _globals.vc.Letter
	_globals.vc.Letter.prototype.componentName = 'vc.Letter'
	_globals.vc.Letter.prototype.close = function() {
		this._coverInst.open = false;
		this.open = false;
	}
	_globals.vc.Letter.prototype.remove = function() {
//		this._coverInst.open = false;
		this.open = false;
		this._coverInst.remove();
	}
	_globals.vc.Letter.prototype.show = function(inst) {
		this._coverInst = inst;
		this.open = true;
	}
	core.addProperty(_globals.vc.Letter.prototype, 'bool', 'open')
	core.addProperty(_globals.vc.Letter.prototype, 'Mixin', 'hover')

	_globals.vc.Letter.prototype.__create = function(__closure) {
		_globals.core.Item.prototype.__create.call(this, __closure.__base = { })
var this$child0 = new _globals.core.Item(this)
		__closure.this$child0 = this$child0

//creating component Item
		this$child0.__create(__closure.__closure_this$child0 = { })
		var this_child0$child0 = new _globals.core.Rectangle(this$child0)
		__closure.this_child0$child0 = this_child0$child0

//creating component Rectangle
		this_child0$child0.__create(__closure.__closure_this_child0$child0 = { })
		var this_child0_child0$child0 = new _globals.core.Text(this_child0$child0)
		__closure.this_child0_child0$child0 = this_child0_child0$child0

//creating component Text
		this_child0_child0$child0.__create(__closure.__closure_this_child0_child0$child0 = { })

		var this$child1 = new _globals.core.Rectangle(this)
		__closure.this$child1 = this$child1

//creating component Rectangle
		this$child1.__create(__closure.__closure_this$child1 = { })
		var this_child1$child0 = new _globals.core.Text(this$child1)
		__closure.this_child1$child0 = this_child1$child0

//creating component Text
		this_child1$child0.__create(__closure.__closure_this_child1$child0 = { })

		var this$child2 = new _globals.core.Item(this)
		__closure.this$child2 = this$child2

//creating component Item
		this$child2.__create(__closure.__closure_this$child2 = { })
		var this_child2$child0 = new _globals.core.Rectangle(this$child2)
		__closure.this_child2$child0 = this_child2$child0

//creating component Rectangle
		this_child2$child0.__create(__closure.__closure_this_child2$child0 = { })
		var this_child2_child0$child0 = new _globals.core.Text(this_child2$child0)
		__closure.this_child2_child0$child0 = this_child2_child0$child0

//creating component Text
		this_child2_child0$child0.__create(__closure.__closure_this_child2_child0$child0 = { })

		var this_child2_child0$child1 = new _globals.core.Text(this_child2$child0)
		__closure.this_child2_child0$child1 = this_child2_child0$child1

//creating component Text
		this_child2_child0$child1.__create(__closure.__closure_this_child2_child0$child1 = { })
		var this_child2_child0_child1$child0 = new _globals.controls.mixins.HoverMixin(this_child2_child0$child1)
		__closure.this_child2_child0_child1$child0 = this_child2_child0_child1$child0

//creating component HoverMixin
		this_child2_child0_child1$child0.__create(__closure.__closure_this_child2_child0_child1$child0 = { })

//creating component vc.<anonymous>
		var this$hover = new _globals.controls.mixins.HoverMixin(this)
		__closure.this$hover = this$hover

//creating component HoverMixin
		this$hover.__create(__closure.__closure_this$hover = { })

		this.hover = this$hover
		this._setId('letter')
	}
	_globals.vc.Letter.prototype.__setup = function(__closure) {
	_globals.core.Item.prototype.__setup.call(this, __closure.__base); delete __closure.__base
//setting up component HoverMixin
			var this$hover = __closure.this$hover
			this$hover.__setup(__closure.__closure_this$hover)
			delete __closure.__closure_this$hover


//assigning visible to (this._get('open'))
			var update$this$visible = (function() { this.visible = ((this._get('open'))); }).bind(this)
			var dep$this$visible$0 = this
			this.connectOnChanged(dep$this$visible$0, 'open', update$this$visible)
			this._removeUpdater('visible', [[dep$this$visible$0, 'open', update$this$visible]])
			update$this$visible();
//assigning height to ((this._get('parent')._get('height') * ((80) / 100)))
			var update$this$height = (function() { this.height = (((this._get('parent')._get('height') * ((80) / 100)))); }).bind(this)
			var dep$this$height$0 = this._get('parent')
			this.connectOnChanged(dep$this$height$0, 'height', update$this$height)
			this._removeUpdater('height', [[dep$this$height$0, 'height', update$this$height]])
			update$this$height();
//assigning width to ((this._get('parent')._get('width') * ((50) / 100)))
			var update$this$width = (function() { this.width = (((this._get('parent')._get('width') * ((50) / 100)))); }).bind(this)
			var dep$this$width$0 = this._get('parent')
			this.connectOnChanged(dep$this$width$0, 'width', update$this$width)
			this._removeUpdater('width', [[dep$this$width$0, 'width', update$this$width]])
			update$this$width();
//assigning z to (1)
			this._removeUpdater('z'); this.z = ((1));
	var behavior_this_on_visible = new _globals.core.Animation(this)
	var behavior_this_on_visible__closure = { behavior_this_on_visible: behavior_this_on_visible }

//creating component Animation
	behavior_this_on_visible.__create(behavior_this_on_visible__closure.__closure_behavior_this_on_visible = { })


//setting up component Animation
	var behavior_this_on_visible = behavior_this_on_visible__closure.behavior_this_on_visible
	behavior_this_on_visible.__setup(behavior_this_on_visible__closure.__closure_behavior_this_on_visible)
	delete behavior_this_on_visible__closure.__closure_behavior_this_on_visible

//assigning delay to (this._get('letter')._get('open') ? 750 : 600)
	var update$behavior_this_on_visible$delay = (function() { behavior_this_on_visible.delay = ((this._get('letter')._get('open') ? 750 : 600)); }).bind(behavior_this_on_visible)
	var dep$behavior_this_on_visible$delay$0 = behavior_this_on_visible._get('letter')
	behavior_this_on_visible.connectOnChanged(dep$behavior_this_on_visible$delay$0, 'open', update$behavior_this_on_visible$delay)
	behavior_this_on_visible._removeUpdater('delay', [[dep$behavior_this_on_visible$delay$0, 'open', update$behavior_this_on_visible$delay]])
	update$behavior_this_on_visible$delay();
//assigning duration to (0)
	behavior_this_on_visible._removeUpdater('duration'); behavior_this_on_visible.duration = ((0));

	this.setAnimation('visible', behavior_this_on_visible);


//setting up component Item
			var this$child0 = __closure.this$child0
			this$child0.__setup(__closure.__closure_this$child0)
			delete __closure.__closure_this$child0

//assigning transform.perspective to (1000)
			this$child0._removeUpdater('transform.perspective'); this$child0._get('transform').perspective = ((1000));
//assigning height to ((this._get('parent')._get('height') * ((66) / 100)))
			var update$this_child0$height = (function() { this$child0.height = (((this._get('parent')._get('height') * ((66) / 100)))); }).bind(this$child0)
			var dep$this_child0$height$0 = this$child0._get('parent')
			this$child0.connectOnChanged(dep$this_child0$height$0, 'height', update$this_child0$height)
			this$child0._removeUpdater('height', [[dep$this_child0$height$0, 'height', update$this_child0$height]])
			update$this_child0$height();
//assigning transform.rotateX to (this._get('letter')._get('open') ? 0 : - 180)
			var update$this_child0$transform_rotateX = (function() { this$child0._get('transform').rotateX = ((this._get('letter')._get('open') ? 0 : - 180)); }).bind(this$child0)
			var dep$this_child0$transform_rotateX$0 = this$child0._get('letter')
			this$child0.connectOnChanged(dep$this_child0$transform_rotateX$0, 'open', update$this_child0$transform_rotateX)
			this$child0._removeUpdater('transform.rotateX', [[dep$this_child0$transform_rotateX$0, 'open', update$this_child0$transform_rotateX]])
			update$this_child0$transform_rotateX();
//assigning z to (2)
			this$child0._removeUpdater('z'); this$child0.z = ((2));
//assigning width to ((this._get('parent')._get('width') * ((100) / 100)))
			var update$this_child0$width = (function() { this$child0.width = (((this._get('parent')._get('width') * ((100) / 100)))); }).bind(this$child0)
			var dep$this_child0$width$0 = this$child0._get('parent')
			this$child0.connectOnChanged(dep$this_child0$width$0, 'width', update$this_child0$width)
			this$child0._removeUpdater('width', [[dep$this_child0$width$0, 'width', update$this_child0$width]])
			update$this_child0$width();
	var behavior_this_child0_on_y = new _globals.core.Animation(this$child0)
	var behavior_this_child0_on_y__closure = { behavior_this_child0_on_y: behavior_this_child0_on_y }

//creating component Animation
	behavior_this_child0_on_y.__create(behavior_this_child0_on_y__closure.__closure_behavior_this_child0_on_y = { })


//setting up component Animation
	var behavior_this_child0_on_y = behavior_this_child0_on_y__closure.behavior_this_child0_on_y
	behavior_this_child0_on_y.__setup(behavior_this_child0_on_y__closure.__closure_behavior_this_child0_on_y)
	delete behavior_this_child0_on_y__closure.__closure_behavior_this_child0_on_y

//assigning duration to (400)
	behavior_this_child0_on_y._removeUpdater('duration'); behavior_this_child0_on_y.duration = ((400));
//assigning delay to (this._get('letter')._get('open') ? 1000 : 400)
	var update$behavior_this_child0_on_y$delay = (function() { behavior_this_child0_on_y.delay = ((this._get('letter')._get('open') ? 1000 : 400)); }).bind(behavior_this_child0_on_y)
	var dep$behavior_this_child0_on_y$delay$0 = behavior_this_child0_on_y._get('letter')
	behavior_this_child0_on_y.connectOnChanged(dep$behavior_this_child0_on_y$delay$0, 'open', update$behavior_this_child0_on_y$delay)
	behavior_this_child0_on_y._removeUpdater('delay', [[dep$behavior_this_child0_on_y$delay$0, 'open', update$behavior_this_child0_on_y$delay]])
	update$behavior_this_child0_on_y$delay();
//assigning easing to ("linear")
	behavior_this_child0_on_y._removeUpdater('easing'); behavior_this_child0_on_y.easing = (("linear"));

	this$child0.setAnimation('y', behavior_this_child0_on_y);

	var behavior_this_child0_on_z = new _globals.core.Animation(this$child0)
	var behavior_this_child0_on_z__closure = { behavior_this_child0_on_z: behavior_this_child0_on_z }

//creating component Animation
	behavior_this_child0_on_z.__create(behavior_this_child0_on_z__closure.__closure_behavior_this_child0_on_z = { })


//setting up component Animation
	var behavior_this_child0_on_z = behavior_this_child0_on_z__closure.behavior_this_child0_on_z
	behavior_this_child0_on_z.__setup(behavior_this_child0_on_z__closure.__closure_behavior_this_child0_on_z)
	delete behavior_this_child0_on_z__closure.__closure_behavior_this_child0_on_z

//assigning duration to (400)
	behavior_this_child0_on_z._removeUpdater('duration'); behavior_this_child0_on_z.duration = ((400));
//assigning delay to (this._get('letter')._get('open') ? 1000 : 400)
	var update$behavior_this_child0_on_z$delay = (function() { behavior_this_child0_on_z.delay = ((this._get('letter')._get('open') ? 1000 : 400)); }).bind(behavior_this_child0_on_z)
	var dep$behavior_this_child0_on_z$delay$0 = behavior_this_child0_on_z._get('letter')
	behavior_this_child0_on_z.connectOnChanged(dep$behavior_this_child0_on_z$delay$0, 'open', update$behavior_this_child0_on_z$delay)
	behavior_this_child0_on_z._removeUpdater('delay', [[dep$behavior_this_child0_on_z$delay$0, 'open', update$behavior_this_child0_on_z$delay]])
	update$behavior_this_child0_on_z$delay();
//assigning easing to ("linear")
	behavior_this_child0_on_z._removeUpdater('easing'); behavior_this_child0_on_z.easing = (("linear"));

	this$child0.setAnimation('z', behavior_this_child0_on_z);

	var behavior_this_child0_on_transform = new _globals.core.Animation(this$child0)
	var behavior_this_child0_on_transform__closure = { behavior_this_child0_on_transform: behavior_this_child0_on_transform }

//creating component Animation
	behavior_this_child0_on_transform.__create(behavior_this_child0_on_transform__closure.__closure_behavior_this_child0_on_transform = { })


//setting up component Animation
	var behavior_this_child0_on_transform = behavior_this_child0_on_transform__closure.behavior_this_child0_on_transform
	behavior_this_child0_on_transform.__setup(behavior_this_child0_on_transform__closure.__closure_behavior_this_child0_on_transform)
	delete behavior_this_child0_on_transform__closure.__closure_behavior_this_child0_on_transform

//assigning duration to (400)
	behavior_this_child0_on_transform._removeUpdater('duration'); behavior_this_child0_on_transform.duration = ((400));
//assigning delay to (this._get('letter')._get('open') ? 1000 : 400)
	var update$behavior_this_child0_on_transform$delay = (function() { behavior_this_child0_on_transform.delay = ((this._get('letter')._get('open') ? 1000 : 400)); }).bind(behavior_this_child0_on_transform)
	var dep$behavior_this_child0_on_transform$delay$0 = behavior_this_child0_on_transform._get('letter')
	behavior_this_child0_on_transform.connectOnChanged(dep$behavior_this_child0_on_transform$delay$0, 'open', update$behavior_this_child0_on_transform$delay)
	behavior_this_child0_on_transform._removeUpdater('delay', [[dep$behavior_this_child0_on_transform$delay$0, 'open', update$behavior_this_child0_on_transform$delay]])
	update$behavior_this_child0_on_transform$delay();
//assigning easing to ("linear")
	behavior_this_child0_on_transform._removeUpdater('easing'); behavior_this_child0_on_transform.easing = (("linear"));

	this$child0.setAnimation('transform', behavior_this_child0_on_transform);


//setting up component Rectangle
			var this_child0$child0 = __closure.this_child0$child0
			this_child0$child0.__setup(__closure.__closure_this_child0$child0)
			delete __closure.__closure_this_child0$child0

//assigning border.color to ("gray")
			this_child0$child0._removeUpdater('border.color'); this_child0$child0._get('border').color = (("gray"));
//assigning border.bottom.color to ("white")
			this_child0$child0._removeUpdater('border.bottom.color'); this_child0$child0._get('border')._get('bottom').color = (("white"));
//assigning color to (this._get('letter')._get('open') ? "#FFF" : "#F5F5F5")
			var update$this_child0_child0$color = (function() { this_child0$child0.color = ((this._get('letter')._get('open') ? "#FFF" : "#F5F5F5")); }).bind(this_child0$child0)
			var dep$this_child0_child0$color$0 = this_child0$child0._get('letter')
			this_child0$child0.connectOnChanged(dep$this_child0_child0$color$0, 'open', update$this_child0_child0$color)
			this_child0$child0._removeUpdater('color', [[dep$this_child0_child0$color$0, 'open', update$this_child0_child0$color]])
			update$this_child0_child0$color();
//assigning height to ((this._get('parent')._get('height') * ((50) / 100)))
			var update$this_child0_child0$height = (function() { this_child0$child0.height = (((this._get('parent')._get('height') * ((50) / 100)))); }).bind(this_child0$child0)
			var dep$this_child0_child0$height$0 = this_child0$child0._get('parent')
			this_child0$child0.connectOnChanged(dep$this_child0_child0$height$0, 'height', update$this_child0_child0$height)
			this_child0$child0._removeUpdater('height', [[dep$this_child0_child0$height$0, 'height', update$this_child0_child0$height]])
			update$this_child0_child0$height();
//assigning border.bottom.width to (1)
			this_child0$child0._removeUpdater('border.bottom.width'); this_child0$child0._get('border')._get('bottom').width = ((1));
//assigning width to ((this._get('parent')._get('width') * ((100) / 100)))
			var update$this_child0_child0$width = (function() { this_child0$child0.width = (((this._get('parent')._get('width') * ((100) / 100)))); }).bind(this_child0$child0)
			var dep$this_child0_child0$width$0 = this_child0$child0._get('parent')
			this_child0$child0.connectOnChanged(dep$this_child0_child0$width$0, 'width', update$this_child0_child0$width)
			this_child0$child0._removeUpdater('width', [[dep$this_child0_child0$width$0, 'width', update$this_child0_child0$width]])
			update$this_child0_child0$width();
//assigning border.width to (1)
			this_child0$child0._removeUpdater('border.width'); this_child0$child0._get('border').width = ((1));
	var behavior_this_child0_child0_on_background = new _globals.core.Animation(this_child0$child0)
	var behavior_this_child0_child0_on_background__closure = { behavior_this_child0_child0_on_background: behavior_this_child0_child0_on_background }

//creating component Animation
	behavior_this_child0_child0_on_background.__create(behavior_this_child0_child0_on_background__closure.__closure_behavior_this_child0_child0_on_background = { })


//setting up component Animation
	var behavior_this_child0_child0_on_background = behavior_this_child0_child0_on_background__closure.behavior_this_child0_child0_on_background
	behavior_this_child0_child0_on_background.__setup(behavior_this_child0_child0_on_background__closure.__closure_behavior_this_child0_child0_on_background)
	delete behavior_this_child0_child0_on_background__closure.__closure_behavior_this_child0_child0_on_background

//assigning duration to (0)
	behavior_this_child0_child0_on_background._removeUpdater('duration'); behavior_this_child0_child0_on_background.duration = ((0));
//assigning delay to (this._get('letter')._get('open') ? 1200 : 600)
	var update$behavior_this_child0_child0_on_background$delay = (function() { behavior_this_child0_child0_on_background.delay = ((this._get('letter')._get('open') ? 1200 : 600)); }).bind(behavior_this_child0_child0_on_background)
	var dep$behavior_this_child0_child0_on_background$delay$0 = behavior_this_child0_child0_on_background._get('letter')
	behavior_this_child0_child0_on_background.connectOnChanged(dep$behavior_this_child0_child0_on_background$delay$0, 'open', update$behavior_this_child0_child0_on_background$delay)
	behavior_this_child0_child0_on_background._removeUpdater('delay', [[dep$behavior_this_child0_child0_on_background$delay$0, 'open', update$behavior_this_child0_child0_on_background$delay]])
	update$behavior_this_child0_child0_on_background$delay();

	this_child0$child0.setAnimation('background', behavior_this_child0_child0_on_background);


//setting up component Text
			var this_child0_child0$child0 = __closure.this_child0_child0$child0
			this_child0_child0$child0.__setup(__closure.__closure_this_child0_child0$child0)
			delete __closure.__closure_this_child0_child0$child0

//assigning opacity to (this._get('letter')._get('open') ? 1 : 0)
			var update$this_child0_child0_child0$opacity = (function() { this_child0_child0$child0.opacity = ((this._get('letter')._get('open') ? 1 : 0)); }).bind(this_child0_child0$child0)
			var dep$this_child0_child0_child0$opacity$0 = this_child0_child0$child0._get('letter')
			this_child0_child0$child0.connectOnChanged(dep$this_child0_child0_child0$opacity$0, 'open', update$this_child0_child0_child0$opacity)
			this_child0_child0$child0._removeUpdater('opacity', [[dep$this_child0_child0_child0$opacity$0, 'open', update$this_child0_child0_child0$opacity]])
			update$this_child0_child0_child0$opacity();
//assigning clip to (true)
			this_child0_child0$child0._removeUpdater('clip'); this_child0_child0$child0.clip = ((true));
//assigning text to ("Iranian President Hassan Rouhani has met with former Cuban leader Fidel Castro and his brother President Raul Castro during a one-day state visit in Havana. <br>Monday’s sit-down with Fidel Castro was an unusual encounter since Cuba’s 90-year-old retired president receives only a few people.")
			this_child0_child0$child0._removeUpdater('text'); this_child0_child0$child0.text = (("Iranian President Hassan Rouhani has met with former Cuban leader Fidel Castro and his brother President Raul Castro during a one-day state visit in Havana. <br>Monday’s sit-down with Fidel Castro was an unusual encounter since Cuba’s 90-year-old retired president receives only a few people."));
//assigning height to ((this._get('parent')._get('height') * ((90) / 100)))
			var update$this_child0_child0_child0$height = (function() { this_child0_child0$child0.height = (((this._get('parent')._get('height') * ((90) / 100)))); }).bind(this_child0_child0$child0)
			var dep$this_child0_child0_child0$height$0 = this_child0_child0$child0._get('parent')
			this_child0_child0$child0.connectOnChanged(dep$this_child0_child0_child0$height$0, 'height', update$this_child0_child0_child0$height)
			this_child0_child0$child0._removeUpdater('height', [[dep$this_child0_child0_child0$height$0, 'height', update$this_child0_child0_child0$height]])
			update$this_child0_child0_child0$height();
//assigning width to ((this._get('parent')._get('width') * ((90) / 100)))
			var update$this_child0_child0_child0$width = (function() { this_child0_child0$child0.width = (((this._get('parent')._get('width') * ((90) / 100)))); }).bind(this_child0_child0$child0)
			var dep$this_child0_child0_child0$width$0 = this_child0_child0$child0._get('parent')
			this_child0_child0$child0.connectOnChanged(dep$this_child0_child0_child0$width$0, 'width', update$this_child0_child0_child0$width)
			this_child0_child0$child0._removeUpdater('width', [[dep$this_child0_child0_child0$width$0, 'width', update$this_child0_child0_child0$width]])
			update$this_child0_child0_child0$width();
//assigning wrapMode to (_globals.core.Text.prototype.WordWrap)
			this_child0_child0$child0._removeUpdater('wrapMode'); this_child0_child0$child0.wrapMode = ((_globals.core.Text.prototype.WordWrap));
//assigning y to ((this._get('parent')._get('height') * ((5) / 100)))
			var update$this_child0_child0_child0$y = (function() { this_child0_child0$child0.y = (((this._get('parent')._get('height') * ((5) / 100)))); }).bind(this_child0_child0$child0)
			var dep$this_child0_child0_child0$y$0 = this_child0_child0$child0._get('parent')
			this_child0_child0$child0.connectOnChanged(dep$this_child0_child0_child0$y$0, 'height', update$this_child0_child0_child0$y)
			this_child0_child0$child0._removeUpdater('y', [[dep$this_child0_child0_child0$y$0, 'height', update$this_child0_child0_child0$y]])
			update$this_child0_child0_child0$y();
//assigning x to ((this._get('parent')._get('width') * ((5) / 100)))
			var update$this_child0_child0_child0$x = (function() { this_child0_child0$child0.x = (((this._get('parent')._get('width') * ((5) / 100)))); }).bind(this_child0_child0$child0)
			var dep$this_child0_child0_child0$x$0 = this_child0_child0$child0._get('parent')
			this_child0_child0$child0.connectOnChanged(dep$this_child0_child0_child0$x$0, 'width', update$this_child0_child0_child0$x)
			this_child0_child0$child0._removeUpdater('x', [[dep$this_child0_child0_child0$x$0, 'width', update$this_child0_child0_child0$x]])
			update$this_child0_child0_child0$x();
	var behavior_this_child0_child0_child0_on_opacity = new _globals.core.Animation(this_child0_child0$child0)
	var behavior_this_child0_child0_child0_on_opacity__closure = { behavior_this_child0_child0_child0_on_opacity: behavior_this_child0_child0_child0_on_opacity }

//creating component Animation
	behavior_this_child0_child0_child0_on_opacity.__create(behavior_this_child0_child0_child0_on_opacity__closure.__closure_behavior_this_child0_child0_child0_on_opacity = { })


//setting up component Animation
	var behavior_this_child0_child0_child0_on_opacity = behavior_this_child0_child0_child0_on_opacity__closure.behavior_this_child0_child0_child0_on_opacity
	behavior_this_child0_child0_child0_on_opacity.__setup(behavior_this_child0_child0_child0_on_opacity__closure.__closure_behavior_this_child0_child0_child0_on_opacity)
	delete behavior_this_child0_child0_child0_on_opacity__closure.__closure_behavior_this_child0_child0_child0_on_opacity

//assigning duration to (0)
	behavior_this_child0_child0_child0_on_opacity._removeUpdater('duration'); behavior_this_child0_child0_child0_on_opacity.duration = ((0));
//assigning delay to (this._get('letter')._get('open') ? 1200 : 600)
	var update$behavior_this_child0_child0_child0_on_opacity$delay = (function() { behavior_this_child0_child0_child0_on_opacity.delay = ((this._get('letter')._get('open') ? 1200 : 600)); }).bind(behavior_this_child0_child0_child0_on_opacity)
	var dep$behavior_this_child0_child0_child0_on_opacity$delay$0 = behavior_this_child0_child0_child0_on_opacity._get('letter')
	behavior_this_child0_child0_child0_on_opacity.connectOnChanged(dep$behavior_this_child0_child0_child0_on_opacity$delay$0, 'open', update$behavior_this_child0_child0_child0_on_opacity$delay)
	behavior_this_child0_child0_child0_on_opacity._removeUpdater('delay', [[dep$behavior_this_child0_child0_child0_on_opacity$delay$0, 'open', update$behavior_this_child0_child0_child0_on_opacity$delay]])
	update$behavior_this_child0_child0_child0_on_opacity$delay();

	this_child0_child0$child0.setAnimation('opacity', behavior_this_child0_child0_child0_on_opacity);

			this_child0$child0.addChild(this_child0_child0$child0)
			this$child0.addChild(this_child0$child0)
			this.addChild(this$child0)

//setting up component Rectangle
			var this$child1 = __closure.this$child1
			this$child1.__setup(__closure.__closure_this$child1)
			delete __closure.__closure_this$child1

//assigning border.color to ("gray")
			this$child1._removeUpdater('border.color'); this$child1._get('border').color = (("gray"));
//assigning border.width to (1)
			this$child1._removeUpdater('border.width'); this$child1._get('border').width = ((1));
//assigning color to ("#FFF")
			this$child1._removeUpdater('color'); this$child1.color = (("#FFF"));
//assigning height to ((this._get('parent')._get('height') * ((33) / 100)))
			var update$this_child1$height = (function() { this$child1.height = (((this._get('parent')._get('height') * ((33) / 100)))); }).bind(this$child1)
			var dep$this_child1$height$0 = this$child1._get('parent')
			this$child1.connectOnChanged(dep$this_child1$height$0, 'height', update$this_child1$height)
			this$child1._removeUpdater('height', [[dep$this_child1$height$0, 'height', update$this_child1$height]])
			update$this_child1$height();
//assigning width to ((this._get('parent')._get('width') * ((100) / 100)))
			var update$this_child1$width = (function() { this$child1.width = (((this._get('parent')._get('width') * ((100) / 100)))); }).bind(this$child1)
			var dep$this_child1$width$0 = this$child1._get('parent')
			this$child1.connectOnChanged(dep$this_child1$width$0, 'width', update$this_child1$width)
			this$child1._removeUpdater('width', [[dep$this_child1$width$0, 'width', update$this_child1$width]])
			update$this_child1$width();
//assigning y to ((this._get('parent')._get('height') * ((33) / 100)))
			var update$this_child1$y = (function() { this$child1.y = (((this._get('parent')._get('height') * ((33) / 100)))); }).bind(this$child1)
			var dep$this_child1$y$0 = this$child1._get('parent')
			this$child1.connectOnChanged(dep$this_child1$y$0, 'height', update$this_child1$y)
			this$child1._removeUpdater('y', [[dep$this_child1$y$0, 'height', update$this_child1$y]])
			update$this_child1$y();


//setting up component Text
			var this_child1$child0 = __closure.this_child1$child0
			this_child1$child0.__setup(__closure.__closure_this_child1$child0)
			delete __closure.__closure_this_child1$child0

//assigning clip to (true)
			this_child1$child0._removeUpdater('clip'); this_child1$child0.clip = ((true));
//assigning text to ("Officials did not say where they talked, but photos appeared to show them inside Castro’s home. A government statement said the two leaders discussed the importance of food production and threats to world peace. <br>Rouhani met separately with Raul Castro, who took over leadership of Cuba’s government in 2006 after his brother fell ill. Officials did not comment on their discussions")
			this_child1$child0._removeUpdater('text'); this_child1$child0.text = (("Officials did not say where they talked, but photos appeared to show them inside Castro’s home. A government statement said the two leaders discussed the importance of food production and threats to world peace. <br>Rouhani met separately with Raul Castro, who took over leadership of Cuba’s government in 2006 after his brother fell ill. Officials did not comment on their discussions"));
//assigning height to ((this._get('parent')._get('height') * ((90) / 100)))
			var update$this_child1_child0$height = (function() { this_child1$child0.height = (((this._get('parent')._get('height') * ((90) / 100)))); }).bind(this_child1$child0)
			var dep$this_child1_child0$height$0 = this_child1$child0._get('parent')
			this_child1$child0.connectOnChanged(dep$this_child1_child0$height$0, 'height', update$this_child1_child0$height)
			this_child1$child0._removeUpdater('height', [[dep$this_child1_child0$height$0, 'height', update$this_child1_child0$height]])
			update$this_child1_child0$height();
//assigning width to ((this._get('parent')._get('width') * ((90) / 100)))
			var update$this_child1_child0$width = (function() { this_child1$child0.width = (((this._get('parent')._get('width') * ((90) / 100)))); }).bind(this_child1$child0)
			var dep$this_child1_child0$width$0 = this_child1$child0._get('parent')
			this_child1$child0.connectOnChanged(dep$this_child1_child0$width$0, 'width', update$this_child1_child0$width)
			this_child1$child0._removeUpdater('width', [[dep$this_child1_child0$width$0, 'width', update$this_child1_child0$width]])
			update$this_child1_child0$width();
//assigning wrapMode to (_globals.core.Text.prototype.WordWrap)
			this_child1$child0._removeUpdater('wrapMode'); this_child1$child0.wrapMode = ((_globals.core.Text.prototype.WordWrap));
//assigning y to ((this._get('parent')._get('height') * ((5) / 100)))
			var update$this_child1_child0$y = (function() { this_child1$child0.y = (((this._get('parent')._get('height') * ((5) / 100)))); }).bind(this_child1$child0)
			var dep$this_child1_child0$y$0 = this_child1$child0._get('parent')
			this_child1$child0.connectOnChanged(dep$this_child1_child0$y$0, 'height', update$this_child1_child0$y)
			this_child1$child0._removeUpdater('y', [[dep$this_child1_child0$y$0, 'height', update$this_child1_child0$y]])
			update$this_child1_child0$y();
//assigning x to ((this._get('parent')._get('width') * ((5) / 100)))
			var update$this_child1_child0$x = (function() { this_child1$child0.x = (((this._get('parent')._get('width') * ((5) / 100)))); }).bind(this_child1$child0)
			var dep$this_child1_child0$x$0 = this_child1$child0._get('parent')
			this_child1$child0.connectOnChanged(dep$this_child1_child0$x$0, 'width', update$this_child1_child0$x)
			this_child1$child0._removeUpdater('x', [[dep$this_child1_child0$x$0, 'width', update$this_child1_child0$x]])
			update$this_child1_child0$x();

			this$child1.addChild(this_child1$child0)
			this.addChild(this$child1)

//setting up component Item
			var this$child2 = __closure.this$child2
			this$child2.__setup(__closure.__closure_this$child2)
			delete __closure.__closure_this$child2

//assigning transform.perspective to (1000)
			this$child2._removeUpdater('transform.perspective'); this$child2._get('transform').perspective = ((1000));
//assigning transform.rotateX to (this._get('letter')._get('open') ? 0 : 180)
			var update$this_child2$transform_rotateX = (function() { this$child2._get('transform').rotateX = ((this._get('letter')._get('open') ? 0 : 180)); }).bind(this$child2)
			var dep$this_child2$transform_rotateX$0 = this$child2._get('letter')
			this$child2.connectOnChanged(dep$this_child2$transform_rotateX$0, 'open', update$this_child2$transform_rotateX)
			this$child2._removeUpdater('transform.rotateX', [[dep$this_child2$transform_rotateX$0, 'open', update$this_child2$transform_rotateX]])
			update$this_child2$transform_rotateX();
//assigning height to ((this._get('parent')._get('height') * ((66) / 100)))
			var update$this_child2$height = (function() { this$child2.height = (((this._get('parent')._get('height') * ((66) / 100)))); }).bind(this$child2)
			var dep$this_child2$height$0 = this$child2._get('parent')
			this$child2.connectOnChanged(dep$this_child2$height$0, 'height', update$this_child2$height)
			this$child2._removeUpdater('height', [[dep$this_child2$height$0, 'height', update$this_child2$height]])
			update$this_child2$height();
//assigning width to ((this._get('parent')._get('width') * ((100) / 100)))
			var update$this_child2$width = (function() { this$child2.width = (((this._get('parent')._get('width') * ((100) / 100)))); }).bind(this$child2)
			var dep$this_child2$width$0 = this$child2._get('parent')
			this$child2.connectOnChanged(dep$this_child2$width$0, 'width', update$this_child2$width)
			this$child2._removeUpdater('width', [[dep$this_child2$width$0, 'width', update$this_child2$width]])
			update$this_child2$width();
//assigning y to ((this._get('parent')._get('height') * ((33) / 100)))
			var update$this_child2$y = (function() { this$child2.y = (((this._get('parent')._get('height') * ((33) / 100)))); }).bind(this$child2)
			var dep$this_child2$y$0 = this$child2._get('parent')
			this$child2.connectOnChanged(dep$this_child2$y$0, 'height', update$this_child2$y)
			this$child2._removeUpdater('y', [[dep$this_child2$y$0, 'height', update$this_child2$y]])
			update$this_child2$y();
//assigning z to (this._get('letter')._get('open') ? 3 : 1)
			var update$this_child2$z = (function() { this$child2.z = ((this._get('letter')._get('open') ? 3 : 1)); }).bind(this$child2)
			var dep$this_child2$z$0 = this$child2._get('letter')
			this$child2.connectOnChanged(dep$this_child2$z$0, 'open', update$this_child2$z)
			this$child2._removeUpdater('z', [[dep$this_child2$z$0, 'open', update$this_child2$z]])
			update$this_child2$z();
	var behavior_this_child2_on_y = new _globals.core.Animation(this$child2)
	var behavior_this_child2_on_y__closure = { behavior_this_child2_on_y: behavior_this_child2_on_y }

//creating component Animation
	behavior_this_child2_on_y.__create(behavior_this_child2_on_y__closure.__closure_behavior_this_child2_on_y = { })


//setting up component Animation
	var behavior_this_child2_on_y = behavior_this_child2_on_y__closure.behavior_this_child2_on_y
	behavior_this_child2_on_y.__setup(behavior_this_child2_on_y__closure.__closure_behavior_this_child2_on_y)
	delete behavior_this_child2_on_y__closure.__closure_behavior_this_child2_on_y

//assigning duration to (400)
	behavior_this_child2_on_y._removeUpdater('duration'); behavior_this_child2_on_y.duration = ((400));
//assigning delay to (this._get('letter')._get('open') ? 1400 : 0)
	var update$behavior_this_child2_on_y$delay = (function() { behavior_this_child2_on_y.delay = ((this._get('letter')._get('open') ? 1400 : 0)); }).bind(behavior_this_child2_on_y)
	var dep$behavior_this_child2_on_y$delay$0 = behavior_this_child2_on_y._get('letter')
	behavior_this_child2_on_y.connectOnChanged(dep$behavior_this_child2_on_y$delay$0, 'open', update$behavior_this_child2_on_y$delay)
	behavior_this_child2_on_y._removeUpdater('delay', [[dep$behavior_this_child2_on_y$delay$0, 'open', update$behavior_this_child2_on_y$delay]])
	update$behavior_this_child2_on_y$delay();
//assigning easing to ("linear")
	behavior_this_child2_on_y._removeUpdater('easing'); behavior_this_child2_on_y.easing = (("linear"));

	this$child2.setAnimation('y', behavior_this_child2_on_y);

	var behavior_this_child2_on_z = new _globals.core.Animation(this$child2)
	var behavior_this_child2_on_z__closure = { behavior_this_child2_on_z: behavior_this_child2_on_z }

//creating component Animation
	behavior_this_child2_on_z.__create(behavior_this_child2_on_z__closure.__closure_behavior_this_child2_on_z = { })


//setting up component Animation
	var behavior_this_child2_on_z = behavior_this_child2_on_z__closure.behavior_this_child2_on_z
	behavior_this_child2_on_z.__setup(behavior_this_child2_on_z__closure.__closure_behavior_this_child2_on_z)
	delete behavior_this_child2_on_z__closure.__closure_behavior_this_child2_on_z

//assigning duration to (400)
	behavior_this_child2_on_z._removeUpdater('duration'); behavior_this_child2_on_z.duration = ((400));
//assigning delay to (this._get('letter')._get('open') ? 1400 : 0)
	var update$behavior_this_child2_on_z$delay = (function() { behavior_this_child2_on_z.delay = ((this._get('letter')._get('open') ? 1400 : 0)); }).bind(behavior_this_child2_on_z)
	var dep$behavior_this_child2_on_z$delay$0 = behavior_this_child2_on_z._get('letter')
	behavior_this_child2_on_z.connectOnChanged(dep$behavior_this_child2_on_z$delay$0, 'open', update$behavior_this_child2_on_z$delay)
	behavior_this_child2_on_z._removeUpdater('delay', [[dep$behavior_this_child2_on_z$delay$0, 'open', update$behavior_this_child2_on_z$delay]])
	update$behavior_this_child2_on_z$delay();
//assigning easing to ("linear")
	behavior_this_child2_on_z._removeUpdater('easing'); behavior_this_child2_on_z.easing = (("linear"));

	this$child2.setAnimation('z', behavior_this_child2_on_z);

	var behavior_this_child2_on_transform = new _globals.core.Animation(this$child2)
	var behavior_this_child2_on_transform__closure = { behavior_this_child2_on_transform: behavior_this_child2_on_transform }

//creating component Animation
	behavior_this_child2_on_transform.__create(behavior_this_child2_on_transform__closure.__closure_behavior_this_child2_on_transform = { })


//setting up component Animation
	var behavior_this_child2_on_transform = behavior_this_child2_on_transform__closure.behavior_this_child2_on_transform
	behavior_this_child2_on_transform.__setup(behavior_this_child2_on_transform__closure.__closure_behavior_this_child2_on_transform)
	delete behavior_this_child2_on_transform__closure.__closure_behavior_this_child2_on_transform

//assigning duration to (400)
	behavior_this_child2_on_transform._removeUpdater('duration'); behavior_this_child2_on_transform.duration = ((400));
//assigning delay to (this._get('letter')._get('open') ? 1400 : 0)
	var update$behavior_this_child2_on_transform$delay = (function() { behavior_this_child2_on_transform.delay = ((this._get('letter')._get('open') ? 1400 : 0)); }).bind(behavior_this_child2_on_transform)
	var dep$behavior_this_child2_on_transform$delay$0 = behavior_this_child2_on_transform._get('letter')
	behavior_this_child2_on_transform.connectOnChanged(dep$behavior_this_child2_on_transform$delay$0, 'open', update$behavior_this_child2_on_transform$delay)
	behavior_this_child2_on_transform._removeUpdater('delay', [[dep$behavior_this_child2_on_transform$delay$0, 'open', update$behavior_this_child2_on_transform$delay]])
	update$behavior_this_child2_on_transform$delay();
//assigning easing to ("linear")
	behavior_this_child2_on_transform._removeUpdater('easing'); behavior_this_child2_on_transform.easing = (("linear"));

	this$child2.setAnimation('transform', behavior_this_child2_on_transform);


//setting up component Rectangle
			var this_child2$child0 = __closure.this_child2$child0
			this_child2$child0.__setup(__closure.__closure_this_child2$child0)
			delete __closure.__closure_this_child2$child0

//assigning border.color to ("gray")
			this_child2$child0._removeUpdater('border.color'); this_child2$child0._get('border').color = (("gray"));
//assigning border.width to (1)
			this_child2$child0._removeUpdater('border.width'); this_child2$child0._get('border').width = ((1));
//assigning color to (this._get('letter')._get('open') ? "#FFF" : "#F5F5F5")
			var update$this_child2_child0$color = (function() { this_child2$child0.color = ((this._get('letter')._get('open') ? "#FFF" : "#F5F5F5")); }).bind(this_child2$child0)
			var dep$this_child2_child0$color$0 = this_child2$child0._get('letter')
			this_child2$child0.connectOnChanged(dep$this_child2_child0$color$0, 'open', update$this_child2_child0$color)
			this_child2$child0._removeUpdater('color', [[dep$this_child2_child0$color$0, 'open', update$this_child2_child0$color]])
			update$this_child2_child0$color();
//assigning border.top.color to ("white")
			this_child2$child0._removeUpdater('border.top.color'); this_child2$child0._get('border')._get('top').color = (("white"));
//assigning border.top.width to (1)
			this_child2$child0._removeUpdater('border.top.width'); this_child2$child0._get('border')._get('top').width = ((1));
//assigning height to ((this._get('parent')._get('height') * ((50) / 100)))
			var update$this_child2_child0$height = (function() { this_child2$child0.height = (((this._get('parent')._get('height') * ((50) / 100)))); }).bind(this_child2$child0)
			var dep$this_child2_child0$height$0 = this_child2$child0._get('parent')
			this_child2$child0.connectOnChanged(dep$this_child2_child0$height$0, 'height', update$this_child2_child0$height)
			this_child2$child0._removeUpdater('height', [[dep$this_child2_child0$height$0, 'height', update$this_child2_child0$height]])
			update$this_child2_child0$height();
//assigning width to ((this._get('parent')._get('width') * ((100) / 100)))
			var update$this_child2_child0$width = (function() { this_child2$child0.width = (((this._get('parent')._get('width') * ((100) / 100)))); }).bind(this_child2$child0)
			var dep$this_child2_child0$width$0 = this_child2$child0._get('parent')
			this_child2$child0.connectOnChanged(dep$this_child2_child0$width$0, 'width', update$this_child2_child0$width)
			this_child2$child0._removeUpdater('width', [[dep$this_child2_child0$width$0, 'width', update$this_child2_child0$width]])
			update$this_child2_child0$width();
//assigning y to ((this._get('parent')._get('height') * ((50) / 100)))
			var update$this_child2_child0$y = (function() { this_child2$child0.y = (((this._get('parent')._get('height') * ((50) / 100)))); }).bind(this_child2$child0)
			var dep$this_child2_child0$y$0 = this_child2$child0._get('parent')
			this_child2$child0.connectOnChanged(dep$this_child2_child0$y$0, 'height', update$this_child2_child0$y)
			this_child2$child0._removeUpdater('y', [[dep$this_child2_child0$y$0, 'height', update$this_child2_child0$y]])
			update$this_child2_child0$y();
	var behavior_this_child2_child0_on_background = new _globals.core.Animation(this_child2$child0)
	var behavior_this_child2_child0_on_background__closure = { behavior_this_child2_child0_on_background: behavior_this_child2_child0_on_background }

//creating component Animation
	behavior_this_child2_child0_on_background.__create(behavior_this_child2_child0_on_background__closure.__closure_behavior_this_child2_child0_on_background = { })


//setting up component Animation
	var behavior_this_child2_child0_on_background = behavior_this_child2_child0_on_background__closure.behavior_this_child2_child0_on_background
	behavior_this_child2_child0_on_background.__setup(behavior_this_child2_child0_on_background__closure.__closure_behavior_this_child2_child0_on_background)
	delete behavior_this_child2_child0_on_background__closure.__closure_behavior_this_child2_child0_on_background

//assigning duration to (0)
	behavior_this_child2_child0_on_background._removeUpdater('duration'); behavior_this_child2_child0_on_background.duration = ((0));
//assigning delay to (this._get('letter')._get('open') ? 1600 : 200)
	var update$behavior_this_child2_child0_on_background$delay = (function() { behavior_this_child2_child0_on_background.delay = ((this._get('letter')._get('open') ? 1600 : 200)); }).bind(behavior_this_child2_child0_on_background)
	var dep$behavior_this_child2_child0_on_background$delay$0 = behavior_this_child2_child0_on_background._get('letter')
	behavior_this_child2_child0_on_background.connectOnChanged(dep$behavior_this_child2_child0_on_background$delay$0, 'open', update$behavior_this_child2_child0_on_background$delay)
	behavior_this_child2_child0_on_background._removeUpdater('delay', [[dep$behavior_this_child2_child0_on_background$delay$0, 'open', update$behavior_this_child2_child0_on_background$delay]])
	update$behavior_this_child2_child0_on_background$delay();

	this_child2$child0.setAnimation('background', behavior_this_child2_child0_on_background);


//setting up component Text
			var this_child2_child0$child0 = __closure.this_child2_child0$child0
			this_child2_child0$child0.__setup(__closure.__closure_this_child2_child0$child0)
			delete __closure.__closure_this_child2_child0$child0

//assigning opacity to (this._get('letter')._get('open') ? 1 : 0)
			var update$this_child2_child0_child0$opacity = (function() { this_child2_child0$child0.opacity = ((this._get('letter')._get('open') ? 1 : 0)); }).bind(this_child2_child0$child0)
			var dep$this_child2_child0_child0$opacity$0 = this_child2_child0$child0._get('letter')
			this_child2_child0$child0.connectOnChanged(dep$this_child2_child0_child0$opacity$0, 'open', update$this_child2_child0_child0$opacity)
			this_child2_child0$child0._removeUpdater('opacity', [[dep$this_child2_child0_child0$opacity$0, 'open', update$this_child2_child0_child0$opacity]])
			update$this_child2_child0_child0$opacity();
//assigning clip to (true)
			this_child2_child0$child0._removeUpdater('clip'); this_child2_child0$child0.clip = ((true));
//assigning text to ("Iran’s president came to Cuba after attending the Non-Aligned Movement summit in Venezuela, which is the island’s main commercial and political partner.")
			this_child2_child0$child0._removeUpdater('text'); this_child2_child0$child0.text = (("Iran’s president came to Cuba after attending the Non-Aligned Movement summit in Venezuela, which is the island’s main commercial and political partner."));
//assigning height to ((this._get('parent')._get('height') * ((90) / 100)))
			var update$this_child2_child0_child0$height = (function() { this_child2_child0$child0.height = (((this._get('parent')._get('height') * ((90) / 100)))); }).bind(this_child2_child0$child0)
			var dep$this_child2_child0_child0$height$0 = this_child2_child0$child0._get('parent')
			this_child2_child0$child0.connectOnChanged(dep$this_child2_child0_child0$height$0, 'height', update$this_child2_child0_child0$height)
			this_child2_child0$child0._removeUpdater('height', [[dep$this_child2_child0_child0$height$0, 'height', update$this_child2_child0_child0$height]])
			update$this_child2_child0_child0$height();
//assigning width to ((this._get('parent')._get('width') * ((90) / 100)))
			var update$this_child2_child0_child0$width = (function() { this_child2_child0$child0.width = (((this._get('parent')._get('width') * ((90) / 100)))); }).bind(this_child2_child0$child0)
			var dep$this_child2_child0_child0$width$0 = this_child2_child0$child0._get('parent')
			this_child2_child0$child0.connectOnChanged(dep$this_child2_child0_child0$width$0, 'width', update$this_child2_child0_child0$width)
			this_child2_child0$child0._removeUpdater('width', [[dep$this_child2_child0_child0$width$0, 'width', update$this_child2_child0_child0$width]])
			update$this_child2_child0_child0$width();
//assigning wrapMode to (_globals.core.Text.prototype.WordWrap)
			this_child2_child0$child0._removeUpdater('wrapMode'); this_child2_child0$child0.wrapMode = ((_globals.core.Text.prototype.WordWrap));
//assigning y to ((this._get('parent')._get('height') * ((5) / 100)))
			var update$this_child2_child0_child0$y = (function() { this_child2_child0$child0.y = (((this._get('parent')._get('height') * ((5) / 100)))); }).bind(this_child2_child0$child0)
			var dep$this_child2_child0_child0$y$0 = this_child2_child0$child0._get('parent')
			this_child2_child0$child0.connectOnChanged(dep$this_child2_child0_child0$y$0, 'height', update$this_child2_child0_child0$y)
			this_child2_child0$child0._removeUpdater('y', [[dep$this_child2_child0_child0$y$0, 'height', update$this_child2_child0_child0$y]])
			update$this_child2_child0_child0$y();
//assigning x to ((this._get('parent')._get('width') * ((5) / 100)))
			var update$this_child2_child0_child0$x = (function() { this_child2_child0$child0.x = (((this._get('parent')._get('width') * ((5) / 100)))); }).bind(this_child2_child0$child0)
			var dep$this_child2_child0_child0$x$0 = this_child2_child0$child0._get('parent')
			this_child2_child0$child0.connectOnChanged(dep$this_child2_child0_child0$x$0, 'width', update$this_child2_child0_child0$x)
			this_child2_child0$child0._removeUpdater('x', [[dep$this_child2_child0_child0$x$0, 'width', update$this_child2_child0_child0$x]])
			update$this_child2_child0_child0$x();
	var behavior_this_child2_child0_child0_on_opacity = new _globals.core.Animation(this_child2_child0$child0)
	var behavior_this_child2_child0_child0_on_opacity__closure = { behavior_this_child2_child0_child0_on_opacity: behavior_this_child2_child0_child0_on_opacity }

//creating component Animation
	behavior_this_child2_child0_child0_on_opacity.__create(behavior_this_child2_child0_child0_on_opacity__closure.__closure_behavior_this_child2_child0_child0_on_opacity = { })


//setting up component Animation
	var behavior_this_child2_child0_child0_on_opacity = behavior_this_child2_child0_child0_on_opacity__closure.behavior_this_child2_child0_child0_on_opacity
	behavior_this_child2_child0_child0_on_opacity.__setup(behavior_this_child2_child0_child0_on_opacity__closure.__closure_behavior_this_child2_child0_child0_on_opacity)
	delete behavior_this_child2_child0_child0_on_opacity__closure.__closure_behavior_this_child2_child0_child0_on_opacity

//assigning duration to (0)
	behavior_this_child2_child0_child0_on_opacity._removeUpdater('duration'); behavior_this_child2_child0_child0_on_opacity.duration = ((0));
//assigning delay to (this._get('letter')._get('open') ? 1600 : 200)
	var update$behavior_this_child2_child0_child0_on_opacity$delay = (function() { behavior_this_child2_child0_child0_on_opacity.delay = ((this._get('letter')._get('open') ? 1600 : 200)); }).bind(behavior_this_child2_child0_child0_on_opacity)
	var dep$behavior_this_child2_child0_child0_on_opacity$delay$0 = behavior_this_child2_child0_child0_on_opacity._get('letter')
	behavior_this_child2_child0_child0_on_opacity.connectOnChanged(dep$behavior_this_child2_child0_child0_on_opacity$delay$0, 'open', update$behavior_this_child2_child0_child0_on_opacity$delay)
	behavior_this_child2_child0_child0_on_opacity._removeUpdater('delay', [[dep$behavior_this_child2_child0_child0_on_opacity$delay$0, 'open', update$behavior_this_child2_child0_child0_on_opacity$delay]])
	update$behavior_this_child2_child0_child0_on_opacity$delay();

	this_child2_child0$child0.setAnimation('opacity', behavior_this_child2_child0_child0_on_opacity);

			this_child2$child0.addChild(this_child2_child0$child0)

//setting up component Text
			var this_child2_child0$child1 = __closure.this_child2_child0$child1
			this_child2_child0$child1.__setup(__closure.__closure_this_child2_child0$child1)
			delete __closure.__closure_this_child2_child0$child1

//assigning color to ("red")
			this_child2_child0$child1._removeUpdater('color'); this_child2_child0$child1.color = (("red"));
//assigning text to ("DELETE")
			this_child2_child0$child1._removeUpdater('text'); this_child2_child0$child1.text = (("DELETE"));
//assigning anchors.margins to (10)
			this_child2_child0$child1._removeUpdater('anchors.margins'); this_child2_child0$child1._get('anchors').margins = ((10));
//assigning anchors.right to (this._get('parent')._get('right'))
			var update$this_child2_child0_child1$anchors_right = (function() { this_child2_child0$child1._get('anchors').right = ((this._get('parent')._get('right'))); }).bind(this_child2_child0$child1)
			var dep$this_child2_child0_child1$anchors_right$0 = this_child2_child0$child1._get('parent')
			this_child2_child0$child1.connectOnChanged(dep$this_child2_child0_child1$anchors_right$0, 'right', update$this_child2_child0_child1$anchors_right)
			this_child2_child0$child1._removeUpdater('anchors.right', [[dep$this_child2_child0_child1$anchors_right$0, 'right', update$this_child2_child0_child1$anchors_right]])
			update$this_child2_child0_child1$anchors_right();
//assigning anchors.bottom to (this._get('parent')._get('bottom'))
			var update$this_child2_child0_child1$anchors_bottom = (function() { this_child2_child0$child1._get('anchors').bottom = ((this._get('parent')._get('bottom'))); }).bind(this_child2_child0$child1)
			var dep$this_child2_child0_child1$anchors_bottom$0 = this_child2_child0$child1._get('parent')
			this_child2_child0$child1.connectOnChanged(dep$this_child2_child0_child1$anchors_bottom$0, 'bottom', update$this_child2_child0_child1$anchors_bottom)
			this_child2_child0$child1._removeUpdater('anchors.bottom', [[dep$this_child2_child0_child1$anchors_bottom$0, 'bottom', update$this_child2_child0_child1$anchors_bottom]])
			update$this_child2_child0_child1$anchors_bottom();
			this_child2_child0$child1.on('clicked', (function() {
					log("DELETE onClicked")
					this._get('letter').remove();
				} ).bind(this_child2_child0$child1))


//setting up component HoverMixin
			var this_child2_child0_child1$child0 = __closure.this_child2_child0_child1$child0
			this_child2_child0_child1$child0.__setup(__closure.__closure_this_child2_child0_child1$child0)
			delete __closure.__closure_this_child2_child0_child1$child0

//assigning cursor to ("pointer")
			this_child2_child0_child1$child0._removeUpdater('cursor'); this_child2_child0_child1$child0.cursor = (("pointer"));

			this_child2_child0$child1.addChild(this_child2_child0_child1$child0)
			this_child2$child0.addChild(this_child2_child0$child1)
			this$child2.addChild(this_child2$child0)
			this.addChild(this$child2)
}
//=====[component core.Context]=====================

/**
 * @constructor
 * @extends {_globals.core.Item}
 */
	_globals.core.Context = function(parent, _delegate) {
	_globals.core.Item.apply(this, arguments);
	//custom constructor:
	{
		this.options = arguments[2]
		this.l10n = this.options.l10n || {}

		this._local['context'] = this
		this._prefix = this.options.prefix
		this._context = this
		this._started = false
		this._completed = false
		this._completedHandlers = []
		this._delayedActions = []
		this._stylesRegistered = {}
	}

}
	_globals.core.Context.prototype = Object.create(_globals.core.Item.prototype)
	_globals.core.Context.prototype.constructor = _globals.core.Context
	_globals.core.Context.prototype.componentName = 'core.Context'
	_globals.core.Context.prototype._update = function(name,value) {
		switch(name) {
			case 'fullscreen': if (value) this._enterFullscreenMode(); else this._exitFullscreenMode(); break
		}
		_globals.core.Item.prototype._update.apply(this, arguments)
	}
	_globals.core.Context.prototype.getClass = function(name) {
		return this._prefix + name
	}
	_globals.core.Context.prototype.qsTr = function(text) {
		var args = arguments
		var lang = this.language
		var messages = this.l10n[lang] || {}
		var contexts = messages[text] || {}
		for(var name in contexts) {
			text = contexts[name] //fixme: add context handling here
			break
		}
		return text.replace(/%(\d+)/, function(text, index) { return args[index] })
	}
	_globals.core.Context.prototype._complete = function() {
		if (!this._started || this._runningComplete)
			return

		this._completed = true
		this._runningComplete = true

		var invoker = _globals.core.safeCall([], function (ex) { log("onCompleted failed:", ex, ex.stack) })
		do {
			while(this._completedHandlers.length) {
				var ch = this._completedHandlers
				this._completedHandlers = []
				ch.forEach(invoker)
			}
			this._processActions()
		} while(this._completedHandlers.length)
		this._runningComplete = false
	}
	_globals.core.Context.prototype._exitFullscreenMode = function() { return window.Modernizr.prefixed('exitFullscreen', document)() }
	_globals.core.Context.prototype.start = function(instance) {
		var closure = {}
		instance.__create(closure)
		instance.__setup(closure)
		closure = undefined
		log('Context: started')
		this._started = true
		// log('Context: calling on completed')
		log('Context: signalling layout')
		this.boxChanged()
		log('Context: done')
		return instance;
	}
	_globals.core.Context.prototype.init = function() {
		log('Context: initializing...')

		var options = this.options
		var prefix = this._prefix

		var divId = options.id

		if (prefix) {
			prefix += '-'
			//log('Context: using prefix', prefix)
		}

		var win = new _globals.html5.html.Window(this, window)
		this.window = win
		var w, h

		var html = _globals.html5.html
		var div = document.getElementById(divId)
		var topLevel = div === null
		if (!topLevel) {
			div = new html.Element(this, div)
			w = div.width()
			h = div.height()
			log('Context: found element by id, size: ' + w + 'x' + h)
			win.on('resize', function() { this.width = div.width(); this.height = div.height(); }.bind(this));
		} else {
			w = win.width();
			h = win.height();
			log("Context: window size: " + w + "x" + h);
			div = this.createElement('div')
			div.dom.id = divId //html specific
			win.on('resize', function() { this.width = win.width(); this.height = win.height(); }.bind(this));
			var body = html.getElement('body')
			body.append(div);
		}

		this.element = div
		this.width = w
		this.height = h
		this.style('visibility', 'hidden')

		win.on('scroll', function(event) { this.scrollY = win.scrollY(); }.bind(this));

		win.on('load', function() {
			log('Context: window.load. calling completed()')
			this._complete()
			this.style('visibility', 'visible')
		} .bind(this) );

		var self = this;

		var onFullscreenChanged = function(e) {
			var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
			self.fullscreen = state
		}
		'webkitfullscreenchange mozfullscreenchange fullscreenchange'.split(' ').forEach(function(name) {
			div.on(name, onFullscreenChanged)
		})

		win.on('keydown', function(event) { if (self._processKey(event)) event.preventDefault(); }.bind(this) ) //fixme: add html.Document instead
	}
	_globals.core.Context.prototype.registerStyle = function(item,tag) {
		if (!(tag in this._stylesRegistered)) {
			item.registerStyle(this.stylesheet, tag)
			this._stylesRegistered[tag] = true
		}
	}
	_globals.core.Context.prototype._inFullscreenMode = function() {
		return !!window.Modernizr.prefixed('fullscreenElement', document)
	}
	_globals.core.Context.prototype.scheduleAction = function(action) {
		this._delayedActions.push(action)
		if (this._completed && this._delayedTimeout === undefined) //do not schedule any processing before creation process ends
			this._delayedTimeout = setTimeout(this._processActions.bind(this), 0)
	}
	_globals.core.Context.prototype._onCompleted = function(callback) {
		this._completedHandlers.push(callback);
	}
	_globals.core.Context.prototype.createElement = function(tag) {
		var el = new _globals.html5.html.Element(this, document.createElement(tag))
		if (this._prefix) {
			el.addClass(this.getClass('core-item'))
		}
		return el
	}
	_globals.core.Context.prototype._processActions = function() {
		var invoker = _globals.core.safeCall([], function (ex) { log('exception in delayed action', ex, ex.stack) })
		while (this._delayedActions.length) {
			var actions = this._delayedActions
			this._delayedActions = []
			actions.forEach(invoker)
		}
		this._delayedTimeout = undefined
	}
	_globals.core.Context.prototype._enterFullscreenMode = function() { return window.Modernizr.prefixed('requestFullscreen', this.element.dom)() }
	core.addProperty(_globals.core.Context.prototype, 'bool', 'fullscreen')
	core.addProperty(_globals.core.Context.prototype, 'int', 'scrollY')
	core.addProperty(_globals.core.Context.prototype, 'Stylesheet', 'stylesheet')
	core.addProperty(_globals.core.Context.prototype, 'System', 'system')
	core.addProperty(_globals.core.Context.prototype, 'Location', 'location')
	core.addProperty(_globals.core.Context.prototype, 'string', 'language')

	_globals.core.Context.prototype.__create = function(__closure) {
		_globals.core.Item.prototype.__create.call(this, __closure.__base = { })
//creating component core.<anonymous>
		var this$stylesheet = new _globals.html5.Stylesheet(this)
		__closure.this$stylesheet = this$stylesheet

//creating component Stylesheet
		this$stylesheet.__create(__closure.__closure_this$stylesheet = { })

		this.stylesheet = this$stylesheet
//creating component core.<anonymous>
		var this$system = new _globals.core.System(this)
		__closure.this$system = this$system

//creating component System
		this$system.__create(__closure.__closure_this$system = { })

		this.system = this$system
//creating component core.<anonymous>
		var this$location = new _globals.core.Location(this)
		__closure.this$location = this$location

//creating component Location
		this$location.__create(__closure.__closure_this$location = { })

		this.location = this$location
	}
	_globals.core.Context.prototype.__setup = function(__closure) {
	_globals.core.Item.prototype.__setup.call(this, __closure.__base); delete __closure.__base
//setting up component Stylesheet
			var this$stylesheet = __closure.this$stylesheet
			this$stylesheet.__setup(__closure.__closure_this$stylesheet)
			delete __closure.__closure_this$stylesheet



//setting up component System
			var this$system = __closure.this$system
			this$system.__setup(__closure.__closure_this$system)
			delete __closure.__closure_this$system



//setting up component Location
			var this$location = __closure.this$location
			this$location.__setup(__closure.__closure_this$location)
			delete __closure.__closure_this$location
}
//=====[component core.BaseViewContent]=====================

/**
 * @constructor
 * @extends {_globals.core.Item}
 */
	_globals.core.BaseViewContent = function(parent, _delegate) {
	_globals.core.Item.apply(this, arguments);

}
	_globals.core.BaseViewContent.prototype = Object.create(_globals.core.Item.prototype)
	_globals.core.BaseViewContent.prototype.constructor = _globals.core.BaseViewContent
	_globals.core.BaseViewContent.prototype.componentName = 'core.BaseViewContent'

	_globals.core.BaseViewContent.prototype.__create = function(__closure) {
		_globals.core.Item.prototype.__create.call(this, __closure.__base = { })

	}
	_globals.core.BaseViewContent.prototype.__setup = function(__closure) {
	_globals.core.Item.prototype.__setup.call(this, __closure.__base); delete __closure.__base
this.onChanged('y', (function(value) { this.parent._delayedLayout.schedule() } ).bind(this))
			this.onChanged('x', (function(value) { this.parent._delayedLayout.schedule() } ).bind(this))
}
//=====[component html5.Stylesheet]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.html5.Stylesheet = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);
	//custom constructor:
	{
		var context = this._context
		var options = context.options

		var style = this.style = context.createElement('style')
		style.dom.type = 'text/css'

		this.prefix = options.prefix
		var divId = options.id

		var div = document.getElementById(divId)
		var topLevel = div === null

		var userSelect = window.Modernizr.prefixedCSS('user-select') + ": none; "
		style.setHtml(
			"div#" + divId + " { position: absolute; visibility: inherit; left: 0px; top: 0px; }" +
			"div." + this._context.getClass('core-text') + " { width: auto; height: auto; visibility: inherit; }" +
			(topLevel? "body { overflow-x: hidden; }": "") + //fixme: do we need style here in non-top-level mode?
			this.mangleRule('video', "{ position: absolute; visibility: inherit; }") +
			this.mangleRule('img', "{ position: absolute; visibility: inherit; -webkit-touch-callout: none; " + userSelect + " }")
		)
		_globals.html5.html.getElement('head').append(style)

		this._addRule = _globals.html5.html.createAddRule(style.dom)
	}

}
	_globals.html5.Stylesheet.prototype = Object.create(_globals.core.Object.prototype)
	_globals.html5.Stylesheet.prototype.constructor = _globals.html5.Stylesheet
	_globals.html5.Stylesheet.prototype.componentName = 'html5.Stylesheet'
	_globals.html5.Stylesheet.prototype.addRule = function(selector,rule) {
		var mangledSelector = this.mangleSelector(selector)
		this._addRule(mangledSelector, rule)
	}
	_globals.html5.Stylesheet.prototype.mangleRule = function(selector,rule) {
		return this.mangleSelector(selector) + ' ' + rule + ' '
	}
	_globals.html5.Stylesheet.prototype.mangleSelector = function(selector) {
		var prefix = this.prefix
		if (prefix)
			return selector + '.' + prefix + 'core-item'
		else
			return selector
	}
_globals.core.model = (function() {/** @const */
var exports = {};
//=====[import core.model]=====================

var ModelUpdateNothing = 0
var ModelUpdateInsert = 1
var ModelUpdateUpdate = 2

var ModelUpdateRange = function(type, length) {
	this.type = type
	this.length = length
}

exports.ModelUpdate = function() {
	this.count = 0
	this._reset()
}
exports.ModelUpdate.prototype.constructor = exports.ModelUpdate

exports.ModelUpdate.prototype._reset = function() {
	this._ranges = [new ModelUpdateRange(ModelUpdateNothing, this.count)]
	this._updateIndex = this.count
}

exports.ModelUpdate.prototype._setUpdateIndex = function(begin) {
	if (begin < this._updateIndex)
		this._updateIndex = begin
}

exports.ModelUpdate.prototype._find = function(index) {
	var ranges = this._ranges
	var i
	for(i = 0; i < ranges.length; ++i) {
		var range = ranges[i]
		if (index < range.length)
			return { index: i, offset: index }
		if (range.length > 0)
			index -= range.length
	}
	if (index != 0)
		throw new Error('invalid index ' + index)

	return { index: i - 1, offset: 0 }
}

exports.ModelUpdate.prototype.reset = function(model) {
	this.update(model, 0, Math.min(model.count, this.count))
	if (this.count < model.count) {
		this.insert(model, this.count, model.count)
	} else {
		this.remove(model, model.count, this.count)
	}
}

exports.ModelUpdate.prototype._merge = function() {
	var ranges = this._ranges
	var n = ranges.length - 1
	for(var index = 0; index < n; ) {
		var range = ranges[index]
		var nextRange = ranges[index + 1]
		if (range.type === nextRange) {
			range.length += nextRange.length
			ranges.splice(index + 1, 1)
		} else
			++index
	}
}

exports.ModelUpdate.prototype._split = function(index, offset, type, length) {
	var ranges = this._ranges
	if (offset == 0) {
		ranges.splice(index, 0, new ModelUpdateRange(type, length))
		return index + 1
	} else {
		var range = ranges[index]
		var right = range.length - offset
		range.length = offset
		if (right != 0) {
			ranges.splice(index + 1, 0,
				new ModelUpdateRange(type, length),
				new ModelUpdateRange(range.type, right))
			return index + 2
		} else {
			ranges.splice(index, 0,
				new ModelUpdateRange(type, length))
			return index + 1
		}
	}
}

exports.ModelUpdate.prototype.insert = function(model, begin, end) {
	if (begin >= end)
		return

	this._setUpdateIndex(begin)
	var ranges = this._ranges
	var d = end - begin
	this.count += d
	if (this.count != model.count)
		throw new Error('unbalanced insert ' + this.count + ' + [' + begin + '-' + end + '], model reported ' + model.count)

	var res = this._find(begin)
	var range = ranges[res.index]
	if (range.length == 0) { //first insert
		range.type = ModelUpdateInsert
		range.length += d
	} else if (range.type == ModelUpdateInsert) {
		range.length += d
	} else {
		this._split(res.index, res.offset, ModelUpdateInsert, d)
	}
	this._merge()
}

exports.ModelUpdate.prototype.remove = function(model, begin, end) {
	if (begin >= end)
		return

	this._setUpdateIndex(begin)
	var ranges = this._ranges
	var d = end - begin
	this.count -= d
	if (this.count != model.count)
		throw new Error('unbalanced remove ' + this.count + ' + [' + begin + '-' + end + '], model reported ' + model.count)

	var res = this._find(begin)
	var range = ranges[res.index]
	if (range.type == ModelUpdateInsert) {
		range.length -= d
	} else {
		var index = this._split(res.index, res.offset, ModelUpdateInsert, -d)
		while(d > 0) {
			var range = ranges[index]
			if (range.length <= d) {
				ranges.splice(index, 1)
				d -= ranges.length
			} else {
				range.length -= d
			}
		}
	}
	this._merge()
}

exports.ModelUpdate.prototype.update = function(model, begin, end) {
	if (begin >= end)
		return

	var ranges = this._ranges
	var n = end - begin
	var res = this._find(begin)
	var index = res.index

	var range = ranges[index]
	if (res.offset > 0) {
		ranges.splice(index + 1, 0, new ModelUpdateRange(ModelUpdateNothing, range.length - res.offset))
		range.length = res.offset
		++index
	}

	while(n > 0) {
		var range = ranges[index]
		var length = range.length
		switch(range.type) {
			case ModelUpdateNothing:
				if (length > n) {
					//range larger than needed
					range.length -= n
					ranges.splice(index, 0, new ModelUpdateRange(ModelUpdateUpdate, n))
					n -= length
				} else { //length < n and offset == 0
					range.type = ModelUpdateUpdate
					n -= length
				}
				break
			case ModelUpdateInsert:
				if (length > 0) {
					n -= length
					++index
				}
				break
			case ModelUpdateUpdate:
				n -= length
				++index
				break
		}
	}
	this._merge()
}

exports.ModelUpdate.prototype.apply = function(view) {
	var index = 0
	this._ranges.forEach(
		function(range) {
			switch(range.type) {
				case ModelUpdateInsert:
					var n = range.length
					if (n > 0) {
						view._insertItems(index, index + n)
						index += n
					} else {
						view._discardItems(index, index - n)
					}
					break
				case ModelUpdateUpdate:
					var n = index + range.length
					for(var i = index; i < n; ++i)
						view._updateDelegate(i)
					index = n
					break
				default:
					index += range.length
			}
		}
	)
	if (view._items.length != this.count)
		throw new Error('unbalanced items update')

	for(var i = this._updateIndex; i < this.count; ++i)
		view._updateDelegateIndex(i)
	this._reset()
}

return exports;
} )()
_globals.vc.qml.vc = (function() {/** @const */
var exports = {};
//=====[import vc.qml.vc]=====================

'use strict'
var log = function() { }
/** @const @type {!CoreObject} */
var qml = (function() {/** @const */
var exports = {};
/** @const */
var _globals = exports
if (!_globals.core) /** @const */ _globals.core = {}
if (!_globals.vc) /** @const */ _globals.vc = {}
if (!_globals.html5) /** @const */ _globals.html5 = {}
if (!_globals.controls) /** @const */ _globals.controls = {}
if (!_globals.controls.web) /** @const */ _globals.controls.web = {}
if (!_globals.controls.mixins) /** @const */ _globals.controls.mixins = {}
if (!_globals.controls.pure) /** @const */ _globals.controls.pure = {}
_globals.core.core = (function() {/** @const */
var exports = _globals;
//=====[import core.core]=====================

//WARNING: no log() function usage before init.js

exports.core.os = navigator.platform
exports.core.device = 0
exports.core.vendor = ""

exports.trace = { key: false, focus: false }

exports.core.keyCodes = {
	13: 'Select',
	27: 'Back',
	37: 'Left',
	32: 'Space',
	33: 'PageUp',
	34: 'PageDown',
	38: 'Up',
	39: 'Right',
	40: 'Down',
	48: '0',
	49: '1',
	50: '2',
	51: '3',
	52: '4',
	53: '5',
	54: '6',
	55: '7',
	56: '8',
	57: '9',
	112: 'Red',
	113: 'Green',
	114: 'Yellow',
	115: 'Blue'
}

var copyArguments = function(args, src, prefix) {
	var copy = Array.prototype.slice.call(args, src)
	if (prefix !== undefined)
		copy.unshift(prefix)
	return copy
}

exports.core.copyArguments = copyArguments



if (log === null)
	log = console.log.bind(console)

/** @const */
/** @param {string} text @param {...} args */
_globals.qsTr = function(text, args) { return _globals._context.qsTr.apply(qml._context, arguments) }


var _checkDevice = function(target, info) {
	if (navigator.userAgent.indexOf(target) < 0)
		return

	log("[QML] " + target)
	exports.core.vendor = info.vendor
	exports.core.device = info.device
	exports.core.os = info.os
	log("loaded")
}

if (!exports.core.vendor) {
	_checkDevice('Blackberry', { 'vendor': 'blackberry', 'device': 2, 'os': 'blackberry' })
	_checkDevice('Android', { 'vendor': 'google', 'device': 2, 'os': 'android' })
	_checkDevice('iPhone', { 'vendor': 'apple', 'device': 2, 'os': 'iOS' })
	_checkDevice('iPad', { 'vendor': 'apple', 'device': 2, 'os': 'iOS' })
	_checkDevice('iPod', { 'vendor': 'apple', 'device': 2, 'os': 'iOS' })
}

var colorTable = {
	'maroon':	'800000',
	'red':		'ff0000',
	'orange':	'ffA500',
	'yellow':	'ffff00',
	'olive':	'808000',
	'purple':	'800080',
	'fuchsia':	'ff00ff',
	'white':	'ffffff',
	'lime':		'00ff00',
	'green':	'008000',
	'navy':		'000080',
	'blue':		'0000ff',
	'aqua':		'00ffff',
	'teal':		'008080',
	'black':	'000000',
	'silver':	'c0c0c0',
	'gray':		'080808',
	'transparent': '0000'
}

var safeCallImpl = function(callback, args, onError) {
	try { return callback.apply(null, args) } catch(ex) { onError(ex) }
}

exports.core.safeCall = function(args, onError) {
	return function(callback) { return safeCallImpl(callback, args, onError) }
}

/**
 * @constructor
 */
exports.core.CoreObject = function() { }
exports.core.CoreObject.prototype.constructor = exports.core.CoreObject
exports.core.CoreObject.prototype.__create = function() { }
exports.core.CoreObject.prototype.__setup = function() { }


/** @constructor */
exports.core.Color = function(value) {
	if (Array.isArray(value)) {
		this.r = value[0]
		this.g = value[1]
		this.b = value[2]
		this.a = value[3] !== undefined? value[3]: 255
		return
	}
	if (typeof value !== 'string')
	{
		this.r = this.b = this.a = 255
		this.g = 0
		log("invalid color specification: " + value)
		return
	}
	var triplet
	if (value.substring(0, 4) == "rgba") {
		var b = value.indexOf('('), e = value.lastIndexOf(')')
		value = value.substring(b + 1, e).split(',')
		this.r = parseInt(value[0], 10)
		this.g = parseInt(value[1], 10)
		this.b = parseInt(value[2], 10)
		this.a = Math.floor(parseFloat(value[3]) * 255)
		return
	}
	else {
		var h = value.charAt(0);
		if (h != '#')
			triplet = colorTable[value];
		else
			triplet = value.substring(1)
	}

	if (!triplet) {
		this.r = 255
		this.g = 0
		this.b = 255
		log("invalid color specification: " + value)
		return
	}

	var len = triplet.length;
	if (len == 3 || len == 4) {
		var r = parseInt(triplet.charAt(0), 16)
		var g = parseInt(triplet.charAt(1), 16)
		var b = parseInt(triplet.charAt(2), 16)
		var a = (len == 4)? parseInt(triplet.charAt(3), 16): 15
		this.r = (r << 4) | r;
		this.g = (g << 4) | g;
		this.b = (b << 4) | b;
		this.a = (a << 4) | a;
	} else if (len == 6 || len == 8) {
		this.r = parseInt(triplet.substring(0, 2), 16)
		this.g = parseInt(triplet.substring(2, 4), 16)
		this.b = parseInt(triplet.substring(4, 6), 16)
		this.a = (len == 8)? parseInt(triplet.substring(6, 8), 16): 255
	} else
		throw new Error("invalid color specification: " + value)
}
exports.core.Color.prototype.constructor = exports.core.Color
/** @const */
var Color = exports.core.Color

exports.core.Color.prototype.rgba = function() {
	return "rgba(" + this.r + "," + this.g + "," + this.b + "," + (this.a / 255) + ")";
}

exports.core.normalizeColor = function(spec) {
	return (new Color(spec)).rgba()
}

exports.core.mixColor = function(specA, specB, r) {
	var a = new Color(specA)
	var b = new Color(specB)
	var mix = function(a, b, r) { return Math.floor((b - a) * r + a) }
	return [mix(a.r, b.r, r), mix(a.g, b.g, r), mix(a.b, b.b, r), mix(a.a, b.a, r)]
}

/** @constructor */
exports.core.DelayedAction = function(context, action) {
	this.context = context
	this.action = function() {
		this._scheduled = false
		action()
	}.bind(this)
}

exports.core.DelayedAction.prototype.schedule = function() {
	if (!this._scheduled) {
		this._scheduled = true
		this.context.scheduleAction(this.action)
	}
}

exports.addProperty = function(proto, type, name, defaultValue) {
	var convert
	switch(type) {
		case 'enum':
		case 'int':		convert = function(value) { return parseInt(value, 0) }; break
		case 'bool':	convert = function(value) { return value? true: false }; break
		case 'real':	convert = function(value) { return parseFloat(value) }; break
		case 'string':	convert = function(value) { return String(value) }; break
		default:		convert = function(value) { return value }; break
	}

	if (defaultValue !== undefined) {
		defaultValue = convert(defaultValue)
	} else {
		switch(type) {
			case 'enum': //fixme: add default value here
			case 'int':		defaultValue = 0; break
			case 'bool':	defaultValue = false; break
			case 'real':	defaultValue = 0.0; break
			case 'string':	defaultValue = ""; break
			case 'array':	defaultValue = []; break
			case 'Color':	defaultValue = '#0000'; break
			default:
				defaultValue = (type[0].toUpperCase() == type[0])? null: undefined
		}
	}

	var storageName = '__property_' + name
	var forwardName = '__forward_' + name

	Object.defineProperty(proto, name, {
		get: function() {
			var p = this[storageName]
			return p !== undefined?
				p.interpolatedValue !== undefined? p.interpolatedValue: p.value:
				defaultValue
		},

		set: function(newValue) {
			newValue = convert(newValue)
			var p = this[storageName]
			if (p === undefined) { //no storage
				if (newValue === defaultValue) //value == defaultValue, no storage allocation
					return

				p = this[storageName] = { value : defaultValue }
			}
			var animation = this.getAnimation(name)
			if (animation && p.value !== newValue) {
				if (p.frameRequest)
					_globals.html5.html.cancelAnimationFrame(p.frameRequest)

				var now = new Date()
				p.started = now.getTime() + now.getMilliseconds() / 1000.0

				var src = p.interpolatedValue !== undefined? p.interpolatedValue: p.value
				var dst = newValue

				var self = this

				var complete = function() {
					_globals.html5.html.cancelAnimationFrame(p.frameRequest)
					p.frameRequest = undefined
					animation.complete = function() { }
					animation.running = false
					p.interpolatedValue = undefined
					p.started = undefined
					self._update(name, dst, src)
				}

				var duration = animation.duration

				var nextFrame = function() {
					var date = new Date()
					var now = date.getTime() + date.getMilliseconds() / 1000.0
					var t = 1.0 * (now - p.started) / duration
					if (t >= 1) {
						complete()
					} else {
						p.interpolatedValue = convert(animation.interpolate(dst, src, t))
						self._update(name, p.interpolatedValue, src)
						p.frameRequest = _globals.html5.html.requestAnimationFrame(nextFrame)
					}
				}

				p.frameRequest = _globals.html5.html.requestAnimationFrame(nextFrame)

				animation.running = true
				animation.complete = complete
			}
			var oldValue = p.value
			if (oldValue !== newValue) {
				var forwardTarget = this[forwardName]
				if (forwardTarget !== undefined) {
					if (oldValue !== null && (oldValue instanceof Object)) {
						//forward property update for mixins
						var forwardedOldValue = oldValue[forwardTarget]
						if (newValue !== forwardedOldValue) {
							oldValue[forwardTarget] = newValue
							this._update(name, newValue, forwardedOldValue)
						}
						return
					} else if (newValue instanceof Object) {
						//first assignment of mixin
						this.connectOnChanged(newValue, forwardTarget, function(v, ov) { this._update(name, v, ov) }.bind(this))
					}
				}
				p.value = newValue
				if ((!animation || !animation.running) && newValue == defaultValue)
					delete this[storageName]
				if (!animation)
					this._update(name, newValue, oldValue)
			}
		},
		enumerable: true
	})
}

exports.addAliasProperty = function(self, name, getObject, srcProperty) {
	var target = getObject()
	self.connectOnChanged(target, srcProperty, function(value) { self._update(name, value) })

	Object.defineProperty(self, name, {
		get: function() { return target[srcProperty] },
		set: function(value) { target[srcProperty] = value },
		enumerable: true
	})
}

exports.core.createSignal = function(name) {
	return function() { this.emit.apply(this, copyArguments(arguments, 0, name)) }
}
exports.core.createSignalForwarder = function(object, name) {
	return (function() { object.emit.apply(object, copyArguments(arguments, 0, name)) })
}

/** @constructor */
exports.core.EventBinder = function(target) {
	this.target = target
	this.callbacks = {}
	this.enabled = false
}

exports.core.EventBinder.prototype.on = function(event, callback) {
	if (event in this.callbacks)
		throw new Error('double adding of event (' + event + ')')
	this.callbacks[event] = callback
	if (this.enabled)
		this.target.on(event, callback)
}

exports.core.EventBinder.prototype.constructor = exports.core.EventBinder

exports.core.EventBinder.prototype.enable = function(value) {
	if (value != this.enabled) {
		var target = this.target
		this.enabled = value
		if (value) {
			for(var event in this.callbacks)
				target.on(event, this.callbacks[event])
		} else {
			for(var event in this.callbacks)
				target.removeListener(event, this.callbacks[event])
		}
	}
}

return exports;
} )()
//========================================

/** @const @type {!CoreObject} */
var core = _globals.core.core
//=====[component core.EventEmitter]=====================

/**
 * @constructor
 * @extends {_globals.core.CoreObject}
 */
	_globals.core.EventEmitter = function(parent, _delegate) {
	_globals.core.CoreObject.apply(this, arguments);
	//custom constructor:
	{
		this._eventHandlers = {}
		this._onFirstListener = {}
		this._onLastListener = {}
		this._onConnections = []
	}

}
	_globals.core.EventEmitter.prototype = Object.create(_globals.core.CoreObject.prototype)
	_globals.core.EventEmitter.prototype.constructor = _globals.core.EventEmitter
	_globals.core.EventEmitter.prototype.componentName = 'core.EventEmitter'
	_globals.core.EventEmitter.prototype.on = function(name,callback) {
		if (name in this._eventHandlers)
			this._eventHandlers[name].push(callback)
		else {
			if (name in this._onFirstListener) {
				//log('first listener to', name)
				this._onFirstListener[name](name)
			} else if ('' in this._onFirstListener) {
				//log('first listener to', name)
				this._onFirstListener[''](name)
			}
			if (this._eventHandlers[name])
				throw new Error('listener callback added event handler')
			this._eventHandlers[name] = [callback]
		}
	}
	_globals.core.EventEmitter.prototype.removeAllListeners = function(name) {
		delete this._eventHandlers[name]
		if (name in this._onLastListener)
			this._onLastListener[name](name)
		else if ('' in this._onLastListener) {
			//log('first listener to', name)
			this._onLastListener[''](name)
		}
	}
	_globals.core.EventEmitter.prototype.connectOn = function(target,name,callback) {
		target.on(name, callback)
		this._onConnections.push([target, name, callback])
	}
	_globals.core.EventEmitter.prototype.onListener = function(name,first,last) {
		this._onFirstListener[name] = first
		this._onLastListener[name] = last
	}
	_globals.core.EventEmitter.prototype.discard = function() {
		for(var name in this._eventHandlers)
			this.removeAllListeners(name)
		this._onFirstListener = {}
		this._onLastListener = {}
		this._onConnections.forEach(function(connection) {
			connection[0].removeListener(connection[1], connection[2])
		})
		this._onConnections = []
	}
	_globals.core.EventEmitter.prototype.emit = function(name) {
		var invoker = _globals.core.safeCall(
			_globals.core.copyArguments(arguments, 1),
			function(ex) { log("event/signal " + name + " handler failed:", ex, ex.stack) }
		)

		if (name in this._eventHandlers) {
			var handlers = this._eventHandlers[name]
			handlers.forEach(invoker)
		}
	}
	_globals.core.EventEmitter.prototype.removeListener = function(name,callback) {
		if (!(name in this._eventHandlers) || callback === undefined || callback === null) {
			log('invalid removeListener(' + name + ', ' + callback + ') invocation', new Error().stack)
			return
		}

		var handlers = this._eventHandlers[name]
		var idx = handlers.indexOf(callback)
		if (idx >= 0)
			handlers.splice(idx, 1)
		else
			log('failed to remove listener for', name, 'from', this)

		if (!handlers.length)
			this.removeAllListeners(name)
	}//=====[component core.Object]=====================

/**
 * @constructor
 * @extends {_globals.core.EventEmitter}
 */
	_globals.core.Object = function(parent, _delegate) {
	_globals.core.EventEmitter.apply(this, arguments);
	//custom constructor:
	{
		_globals.core.EventEmitter.apply(this)

		this.parent = parent
		this.children = []

		this._context = parent? parent._context: null
		this._local = {}
		if (_delegate === true)
			this._local._delegate = this
		this._changedHandlers = {}
		this._changedConnections = []
		this._pressedHandlers = {}
		this._animations = {}
		this._updaters = {}
	}

}
	_globals.core.Object.prototype = Object.create(_globals.core.EventEmitter.prototype)
	_globals.core.Object.prototype.constructor = _globals.core.Object
	_globals.core.Object.prototype.componentName = 'core.Object'
	_globals.core.Object.prototype.addChild = function(child) {
		this.children.push(child);
	}
	_globals.core.Object.prototype.getAnimation = function(name,animation) {
		var a = this._animations[name]
		return (a && a.enabled())? a: null;
	}
	_globals.core.Object.prototype._update = function(name,value) {
		if (name in this._changedHandlers) {
			var handlers = this._changedHandlers[name]
			var invoker = _globals.core.safeCall([value], function(ex) { log("on " + name + " changed callback failed: ", ex, ex.stack) })
			handlers.forEach(invoker)
		}
	}
	_globals.core.Object.prototype._setId = function(name) {
		var p = this;
		while(p) {
			p._local[name] = this;
			p = p.parent;
		}
	}
	_globals.core.Object.prototype._tryFocus = function() { return false }
	_globals.core.Object.prototype._removeUpdater = function(name,newUpdaters) {
		var updaters = this._updaters
		var oldUpdaters = updaters[name]
		if (oldUpdaters !== undefined) {
			oldUpdaters.forEach(function(data) {
				var object = data[0]
				var name = data[1]
				var callback = data[2]
				object.removeOnChanged(name, callback)
			})
		}

		if (newUpdaters)
			updaters[name] = newUpdaters
		else
			delete updaters[name]
	}
	_globals.core.Object.prototype.onPressed = function(name,callback) {
		var wrapper
		if (name != 'Key')
			wrapper = function(key, event) { event.accepted = true; callback(key, event); return event.accepted }
		else
			wrapper = callback;

		if (name in this._pressedHandlers)
			this._pressedHandlers[name].push(wrapper);
		else
			this._pressedHandlers[name] = [wrapper];
	}
	_globals.core.Object.prototype.connectOnChanged = function(target,name,callback) {
		target.onChanged(name, callback)
		this._changedConnections.push([target, name, callback])
	}
	_globals.core.Object.prototype._get = function(name) {
		if (name in this)
			return this[name]

		var object = this
		while(object) {
			if (name in object._local)
				return object._local[name]
			object = object.parent
		}

		throw new Error("invalid property requested: '" + name)
	}
	_globals.core.Object.prototype.onChanged = function(name,callback) {
		if (name in this._changedHandlers)
			this._changedHandlers[name].push(callback);
		else
			this._changedHandlers[name] = [callback];
	}
	_globals.core.Object.prototype.setAnimation = function(name,animation) {
		this._animations[name] = animation;
	}
	_globals.core.Object.prototype.discard = function() {
		this._changedConnections.forEach(function(connection) {
			connection[0].removeOnChanged(connection[1], connection[2])
		})
		this._changedConnections = []

		this.children.forEach(function(child) { child.discard() })
		this.children = []

		this.parent = null
		this._context = null
		this._local = {}
		this._changedHandlers = {}
		this._pressedHandlers = {}
		this._animations = {}
		//for(var name in this._updaters) //fixme: it was added once, then removed, is it needed at all? it double-deletes callbacks
		//	this._removeUpdater(name)
		this._updaters = {}

		_globals.core.EventEmitter.prototype.discard.apply(this)
	}
	_globals.core.Object.prototype.removeOnChanged = function(name,callback) {
		if (name in this._changedHandlers) {
			var handlers = this._changedHandlers[name];
			var idx = handlers.indexOf(callback)
			if (idx >= 0)
				handlers.splice(idx, 1)
			else
				log('failed to remove changed listener for', name, 'from', this)
		}
	}//=====[component core.System]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.core.System = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);
	//custom constructor:
	{
		var browser = ""
		if (navigator.userAgent.indexOf('Chromium') >= 0)
			browser = "Chromium"
		else if (navigator.userAgent.indexOf('Chrome') >= 0)
			browser = "Chrome"
		else if (navigator.userAgent.indexOf('Opera') >= 0)
			browser = "Opera"
		else if (navigator.userAgent.indexOf('Firefox') >= 0)
			browser = "Firefox"
		else if (navigator.userAgent.indexOf('Safari') >= 0)
			browser = "Safari"
		else if (navigator.userAgent.indexOf('MSIE') >= 0)
			browser = "IE"
		else if (navigator.userAgent.indexOf('YaBrowser') >= 0)
			browser = "Yandex"

		this.browser = browser
		this.userAgent = navigator.userAgent
		this.webkit = navigator.userAgent.toLowerCase().indexOf('webkit') >= 0
		this.device = _globals.core.device
		this.vendor = _globals.core.vendor
		this.os = _globals.core.os
		this.language = navigator.language
		this._context.language = this.language.replace('-', '_')
		this.support3dTransforms = window.Modernizr && window.Modernizr.csstransforms3d
		this.supportTransforms = window.Modernizr && window.Modernizr.csstransforms
		this.supportTransitions = window.Modernizr && window.Modernizr.csstransitions

		var self = this
		window.onfocus = function() { self.pageActive = true }
		window.onblur = function() { self.pageActive = false }

		this.screenWidth = window.screen.width
		this.screenHeight = window.screen.height
	}

}
	_globals.core.System.prototype = Object.create(_globals.core.Object.prototype)
	_globals.core.System.prototype.constructor = _globals.core.System
	_globals.core.System.prototype.componentName = 'core.System'
	_globals.core.System.prototype._updateLayoutType = function() {
		if (!this.contextWidth || !this.contextHeight)
			return
		var min = this.contextWidth;// < this.contextHeight ? this.contextWidth : this.contextHeight

		if (min <= 320)
			this.layoutType = this.MobileS
		else if (min <= 375)
			this.layoutType = this.MobileM
		else if (min <= 425)
			this.layoutType = this.MobileL
		else if (min <= 768)
			this.layoutType = this.Tablet
		else if (this.contextWidth <= 1024)
			this.layoutType = this.Laptop
		else if (this.contextWidth <= 1440)
			this.layoutType = this.LaptopL
		else
			this.layoutType = this.Laptop4K
	}
	core.addProperty(_globals.core.System.prototype, 'string', 'userAgent')
	core.addProperty(_globals.core.System.prototype, 'string', 'language')
	core.addProperty(_globals.core.System.prototype, 'string', 'browser')
	core.addProperty(_globals.core.System.prototype, 'string', 'vendor')
	core.addProperty(_globals.core.System.prototype, 'string', 'os')
	core.addProperty(_globals.core.System.prototype, 'bool', 'webkit')
	core.addProperty(_globals.core.System.prototype, 'bool', 'support3dTransforms')
	core.addProperty(_globals.core.System.prototype, 'bool', 'supportTransforms')
	core.addProperty(_globals.core.System.prototype, 'bool', 'supportTransitions')
	core.addProperty(_globals.core.System.prototype, 'bool', 'portrait')
	core.addProperty(_globals.core.System.prototype, 'bool', 'landscape')
	core.addProperty(_globals.core.System.prototype, 'bool', 'pageActive', (true))
	core.addProperty(_globals.core.System.prototype, 'int', 'screenWidth')
	core.addProperty(_globals.core.System.prototype, 'int', 'screenHeight')
/** @const @type {number} */
	_globals.core.System.prototype.Desktop = 0
/** @const @type {number} */
	_globals.core.System.Desktop = 0
/** @const @type {number} */
	_globals.core.System.prototype.Tv = 1
/** @const @type {number} */
	_globals.core.System.Tv = 1
/** @const @type {number} */
	_globals.core.System.prototype.Mobile = 2
/** @const @type {number} */
	_globals.core.System.Mobile = 2
	core.addProperty(_globals.core.System.prototype, 'enum', 'device')
/** @const @type {number} */
	_globals.core.System.prototype.MobileS = 0
/** @const @type {number} */
	_globals.core.System.MobileS = 0
/** @const @type {number} */
	_globals.core.System.prototype.MobileM = 1
/** @const @type {number} */
	_globals.core.System.MobileM = 1
/** @const @type {number} */
	_globals.core.System.prototype.MobileL = 2
/** @const @type {number} */
	_globals.core.System.MobileL = 2
/** @const @type {number} */
	_globals.core.System.prototype.Tablet = 3
/** @const @type {number} */
	_globals.core.System.Tablet = 3
/** @const @type {number} */
	_globals.core.System.prototype.Laptop = 4
/** @const @type {number} */
	_globals.core.System.Laptop = 4
/** @const @type {number} */
	_globals.core.System.prototype.LaptopL = 5
/** @const @type {number} */
	_globals.core.System.LaptopL = 5
/** @const @type {number} */
	_globals.core.System.prototype.Laptop4K = 6
/** @const @type {number} */
	_globals.core.System.Laptop4K = 6
	core.addProperty(_globals.core.System.prototype, 'enum', 'layoutType')

	_globals.core.System.prototype.__create = function(__closure) {
		_globals.core.Object.prototype.__create.call(this, __closure.__base = { })

	}
	_globals.core.System.prototype.__setup = function(__closure) {
	_globals.core.Object.prototype.__setup.call(this, __closure.__base); delete __closure.__base
//assigning portrait to (this._get('parent')._get('width') < this._get('parent')._get('height'))
			var update$this$portrait = (function() { this.portrait = ((this._get('parent')._get('width') < this._get('parent')._get('height'))); }).bind(this)
			var dep$this$portrait$0 = this._get('parent')
			this.connectOnChanged(dep$this$portrait$0, 'width', update$this$portrait)
			var dep$this$portrait$1 = this._get('parent')
			this.connectOnChanged(dep$this$portrait$1, 'height', update$this$portrait)
			this._removeUpdater('portrait', [[dep$this$portrait$0, 'width', update$this$portrait],[dep$this$portrait$1, 'height', update$this$portrait]])
			update$this$portrait();
//assigning landscape to (! this._get('portrait'))
			var update$this$landscape = (function() { this.landscape = ((! this._get('portrait'))); }).bind(this)
			var dep$this$landscape$0 = this
			this.connectOnChanged(dep$this$landscape$0, 'portrait', update$this$landscape)
			this._removeUpdater('landscape', [[dep$this$landscape$0, 'portrait', update$this$landscape]])
			update$this$landscape();
			this.onChanged('contextHeight', (function(value) { this._updateLayoutType() } ).bind(this))
			this.onChanged('contextWidth', (function(value) { this._updateLayoutType() } ).bind(this))
}
//=====[component core.Item]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.core.Item = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);
	//custom constructor:
	{
		this._topPadding = 0
		if (this.parent) {
			if (this.element)
				throw new Error('double ctor call')

			this.createElement(this.getTag())
			var updateVisibility = function(value) {
				this._recursiveVisible = value
				this._updateVisibility()
			}.bind(this)
			updateVisibility(this.parent.recursiveVisible)
			this.connectOnChanged(this.parent, 'recursiveVisible', updateVisibility)
		} //no parent == top level element, skip
	}

}
	_globals.core.Item.prototype = Object.create(_globals.core.Object.prototype)
	_globals.core.Item.prototype.constructor = _globals.core.Item
	_globals.core.Item.prototype.componentName = 'core.Item'
	_globals.core.Item.prototype.boxChanged = _globals.core.createSignal('boxChanged')
	_globals.core.Item.prototype.addChild = function(child) {
		_globals.core.Object.prototype.addChild.apply(this, arguments)
		if (child._tryFocus())
			child._propagateFocusToParents()
	}
	_globals.core.Item.prototype._update = function(name,value) {
		switch(name) {
			case 'width':
				this.style('width', value)
				this.boxChanged()
				break;

			case 'height':
				this.style('height', value - this._topPadding);
				this.boxChanged()
				break;

			case 'x':
			case 'viewX':
				var x = this.x + this.viewX
				this.style('left', x);
				this.boxChanged()
				break;

			case 'y':
			case 'viewY':
				var y = this.y + this.viewY
				this.style('top', y);
				this.boxChanged()
				break;

			case 'opacity': if (this.element) this.style('opacity', value); break;
			case 'visible': if (this.element) this.style('visibility', value? 'inherit': 'hidden'); break;
			case 'z':		this.style('z-index', value); break;
			case 'radius':	this.style('border-radius', value); break;
			case 'clip':	this.style('overflow', value? 'hidden': 'visible'); break;
		}
		_globals.core.Object.prototype._update.apply(this, arguments);
	}
	_globals.core.Item.prototype._mapCSSAttribute = function(name) {
		return { width: 'width', height: 'height', x: 'left', y: 'top', viewX: 'left', viewY: 'top', opacity: 'opacity', radius: 'border-radius', rotate: 'transform', boxshadow: 'box-shadow', transform: 'transform', visible: 'visibility', background: 'background', color: 'color', font: 'font' }[name]
	}
	_globals.core.Item.prototype.setAnimation = function(name,animation) {
		if (!this._updateAnimation(name, animation))
			_globals.core.Object.prototype.setAnimation.apply(this, arguments);
	}
	_globals.core.Item.prototype._updateStyle = function() {
		var element = this.element
		if (element)
			element.updateStyle()
	}
	_globals.core.Item.prototype._updateVisibility = function() {
		var visible = ('visible' in this)? this.visible: true
		this.recursiveVisible = this._recursiveVisible && this.visible
		if (!visible && this.parent)
			this.parent._tryFocus() //try repair local focus on visibility changed
	}
	_globals.core.Item.prototype.style = function(name,style) {
		var element = this.element
		if (element)
			return element.style(name, style)
		else
			log('WARNING: style skipped:', name, style)
	}
	_globals.core.Item.prototype.toScreen = function() {
		var item = this
		var x = 0, y = 0
		var w = this.width, h = this.height
		while(item) {
			x += item.x
			y += item.y
			if ('view' in item) {
				x += item.viewX + item.view.content.x
				y += item.viewY + item.view.content.y
			}
			item = item.parent
		}
		return [x, y, x + w, y + h, x + w / 2, y + h / 2];
	}
	_globals.core.Item.prototype.forceActiveFocus = function() {
		var item = this;
		while(item.parent) {
			item.parent._focusChild(item);
			item = item.parent;
		}
	}
	_globals.core.Item.prototype._updateAnimation = function(name,animation) {
		if (!window.Modernizr.csstransitions || (animation && !animation.cssTransition))
			return false

		var css = this._mapCSSAttribute(name)

		if (css !== undefined) {
			if (!animation)
				throw new Error('resetting transition was not implemented')

			animation._target = name
			return this.setTransition(css, animation)
		} else {
			return false
		}
	}
	_globals.core.Item.prototype.hasActiveFocus = function() {
		var item = this
		while(item.parent) {
			if (item.parent.focusedChild != item)
				return false

			item = item.parent
		}
		return true
	}
	_globals.core.Item.prototype.setTransition = function(name,animation) {
		if (!window.Modernizr.csstransitions)
			return false

		var html5 = _globals.html5.html
		var transition = {
			property: html5.getPrefixedName('transition-property'),
			delay: html5.getPrefixedName('transition-delay'),
			duration: html5.getPrefixedName('transition-duration'),
			timing: html5.getPrefixedName('transition-timing-function')
		}

		name = html5.getPrefixedName(name) || name //replace transform: <prefix>rotate hack

		var property = this.style(transition.property) || []
		var duration = this.style(transition.duration) || []
		var timing = this.style(transition.timing) || []
		var delay = this.style(transition.delay) || []

		var idx = property.indexOf(name)
		if (idx === -1) { //if property not set
			property.push(name)
			duration.push(animation.duration + 'ms')
			timing.push(animation.easing)
			delay.push(animation.delay + 'ms')
		} else { //property already set, adjust the params
			duration[idx] = animation.duration + 'ms'
			timing[idx] = animation.easing
			delay[idx] = animation.delay + 'ms'
		}

		var style = {}
		style[transition.property] = property
		style[transition.duration] = duration
		style[transition.timing] = timing
		style[transition.delay] = delay

		//FIXME: smarttv 2003 animation won't work without this shit =(
		if (this._context.system.os === 'smartTV' || this._context.system.os === 'netcast') {
			style["transition-property"] = property
			style["transition-duration"] = duration
			style["transition-delay"] = delay
			style["transition-timing-function"] = timing
		}
		this.style(style)
		return true
	}
	_globals.core.Item.prototype.focusChild = function(child) {
		this._propagateFocusToParents()
		this._focusChild(child)
	}
	_globals.core.Item.prototype._processKey = function(event) {
		this._tryFocus() //soft-restore focus for invisible components
		if (this.focusedChild && this.focusedChild.visible) {
			if (this.focusedChild._processKey(event))
				return true
		}

		var key = _globals.core.keyCodes[event.which || event.keyCode];
		if (key) {
			if (key in this._pressedHandlers) {
				var handlers = this._pressedHandlers[key]
				var invoker = _globals.core.safeCall([key, event], function(ex) { log("on " + key + " handler failed:", ex, ex.stack) })
				for(var i = handlers.length - 1; i >= 0; --i) {
					var callback = handlers[i]
					if (invoker(callback)) {
						if (_globals.core.trace.key)
							log("key", key, "handled by", this, new Error().stack)
						return true;
					}
				}
			}

			if ('Key' in this._pressedHandlers) {
				var handlers = this._pressedHandlers['Key']
				var invoker = _globals.core.safeCall([key, event], function (ex) { log("onKeyPressed handler failed:", ex, ex.stack) })
				for(var i = handlers.length - 1; i >= 0; --i) {
					var callback = handlers[i]
					if (invoker(callback)) {
						if (_globals.core.trace.key)
							log("key", key, "handled by", this, new Error().stack)
						return true
					}
				}
			}
		}
		else {
			log("unknown key", event.which);
		}
		return false;
	}
	_globals.core.Item.prototype.createElement = function(tag) {
		this.element = this._context.createElement(tag)
		this._context.registerStyle(this, tag)
		this.parent.element.append(this.element)
	}
	_globals.core.Item.prototype.getTag = function() { return 'div' }
	_globals.core.Item.prototype.setFocus = function() { this.forceActiveFocus(); }
	_globals.core.Item.prototype._tryFocus = function() {
		if (!this.visible)
			return false

		if (this.focusedChild && this.focusedChild._tryFocus())
			return true

		var children = this.children
		for(var i = 0; i < children.length; ++i) {
			var child = children[i]
			if (child._tryFocus()) {
				this._focusChild(child)
				return true
			}
		}
		return this.focus
	}
	_globals.core.Item.prototype._focusChild = function(child) {
		if (child.parent !== this)
			throw new Error('invalid object passed as child')
		if (this.focusedChild === child)
			return
		if (this.focusedChild)
			this.focusedChild._focusTree(false)
		this.focusedChild = child
		if (this.focusedChild)
			this.focusedChild._focusTree(this.hasActiveFocus())
	}
	_globals.core.Item.prototype._focusTree = function(active) {
		this.activeFocus = active;
		if (this.focusedChild)
			this.focusedChild._focusTree(active);
	}
	_globals.core.Item.prototype.registerStyle = function(style,tag) {
		style.addRule(tag, 'position: absolute; visibility: inherit; border-style: solid; border-width: 0px; white-space: nowrap; border-radius: 0px; opacity: 1.0; transform: none; left: 0px; top: 0px; width: 0px; height: 0px;')
	}
	_globals.core.Item.prototype._propagateFocusToParents = function() {
		var item = this;
		while(item.parent && (!item.parent.focusedChild || !item.parent.focusedChild.visible)) {
			item.parent._focusChild(item)
			item = item.parent
		}
	}
	_globals.core.Item.prototype.discard = function() {
		_globals.core.Object.prototype.discard.apply(this)
		this.focusedChild = null
		if (this.element)
			this.element.discard()
	}
	core.addProperty(_globals.core.Item.prototype, 'int', 'x')
	core.addProperty(_globals.core.Item.prototype, 'int', 'y')
	core.addProperty(_globals.core.Item.prototype, 'int', 'z')
	core.addProperty(_globals.core.Item.prototype, 'int', 'width')
	core.addProperty(_globals.core.Item.prototype, 'int', 'height')
	core.addProperty(_globals.core.Item.prototype, 'bool', 'clip')
	core.addProperty(_globals.core.Item.prototype, 'real', 'radius')
	core.addProperty(_globals.core.Item.prototype, 'bool', 'focus')
	core.addProperty(_globals.core.Item.prototype, 'bool', 'focused')
	core.addProperty(_globals.core.Item.prototype, 'bool', 'activeFocus')
	core.addProperty(_globals.core.Item.prototype, 'Item', 'focusedChild')
	core.addProperty(_globals.core.Item.prototype, 'bool', 'visible', (true))
	core.addProperty(_globals.core.Item.prototype, 'bool', 'recursiveVisible', (true))
	core.addProperty(_globals.core.Item.prototype, 'real', 'opacity', (1))
	core.addProperty(_globals.core.Item.prototype, 'Anchors', 'anchors')
	core.addProperty(_globals.core.Item.prototype, 'Effects', 'effects')
	core.addProperty(_globals.core.Item.prototype, 'Transform', 'transform')
	core.addProperty(_globals.core.Item.prototype, 'AnchorLine', 'left')
	core.addProperty(_globals.core.Item.prototype, 'AnchorLine', 'top')
	core.addProperty(_globals.core.Item.prototype, 'AnchorLine', 'right')
	core.addProperty(_globals.core.Item.prototype, 'AnchorLine', 'bottom')
	core.addProperty(_globals.core.Item.prototype, 'AnchorLine', 'horizontalCenter')
	core.addProperty(_globals.core.Item.prototype, 'AnchorLine', 'verticalCenter')
	core.addProperty(_globals.core.Item.prototype, 'int', 'viewX')
	core.addProperty(_globals.core.Item.prototype, 'int', 'viewY')

	_globals.core.Item.prototype.__create = function(__closure) {
		_globals.core.Object.prototype.__create.call(this, __closure.__base = { })
//creating component core.<anonymous>
		var this$right = new _globals.core.AnchorLine(this)
		__closure.this$right = this$right

//creating component AnchorLine
		this$right.__create(__closure.__closure_this$right = { })

		this.right = this$right
//creating component core.<anonymous>
		var this$anchors = new _globals.core.Anchors(this)
		__closure.this$anchors = this$anchors

//creating component Anchors
		this$anchors.__create(__closure.__closure_this$anchors = { })

		this.anchors = this$anchors
//creating component core.<anonymous>
		var this$bottom = new _globals.core.AnchorLine(this)
		__closure.this$bottom = this$bottom

//creating component AnchorLine
		this$bottom.__create(__closure.__closure_this$bottom = { })

		this.bottom = this$bottom
//creating component core.<anonymous>
		var this$top = new _globals.core.AnchorLine(this)
		__closure.this$top = this$top

//creating component AnchorLine
		this$top.__create(__closure.__closure_this$top = { })

		this.top = this$top
//creating component core.<anonymous>
		var this$verticalCenter = new _globals.core.AnchorLine(this)
		__closure.this$verticalCenter = this$verticalCenter

//creating component AnchorLine
		this$verticalCenter.__create(__closure.__closure_this$verticalCenter = { })

		this.verticalCenter = this$verticalCenter
//creating component core.<anonymous>
		var this$transform = new _globals.core.Transform(this)
		__closure.this$transform = this$transform

//creating component Transform
		this$transform.__create(__closure.__closure_this$transform = { })

		this.transform = this$transform
//creating component core.<anonymous>
		var this$horizontalCenter = new _globals.core.AnchorLine(this)
		__closure.this$horizontalCenter = this$horizontalCenter

//creating component AnchorLine
		this$horizontalCenter.__create(__closure.__closure_this$horizontalCenter = { })

		this.horizontalCenter = this$horizontalCenter
//creating component core.<anonymous>
		var this$effects = new _globals.core.Effects(this)
		__closure.this$effects = this$effects

//creating component Effects
		this$effects.__create(__closure.__closure_this$effects = { })

		this.effects = this$effects
//creating component core.<anonymous>
		var this$left = new _globals.core.AnchorLine(this)
		__closure.this$left = this$left

//creating component AnchorLine
		this$left.__create(__closure.__closure_this$left = { })

		this.left = this$left
	}
	_globals.core.Item.prototype.__setup = function(__closure) {
	_globals.core.Object.prototype.__setup.call(this, __closure.__base); delete __closure.__base
//setting up component AnchorLine
			var this$right = __closure.this$right
			this$right.__setup(__closure.__closure_this$right)
			delete __closure.__closure_this$right

//assigning boxIndex to (2)
			this$right._removeUpdater('boxIndex'); this$right.boxIndex = ((2));


//setting up component Anchors
			var this$anchors = __closure.this$anchors
			this$anchors.__setup(__closure.__closure_this$anchors)
			delete __closure.__closure_this$anchors



//setting up component AnchorLine
			var this$bottom = __closure.this$bottom
			this$bottom.__setup(__closure.__closure_this$bottom)
			delete __closure.__closure_this$bottom

//assigning boxIndex to (3)
			this$bottom._removeUpdater('boxIndex'); this$bottom.boxIndex = ((3));


//setting up component AnchorLine
			var this$top = __closure.this$top
			this$top.__setup(__closure.__closure_this$top)
			delete __closure.__closure_this$top

//assigning boxIndex to (1)
			this$top._removeUpdater('boxIndex'); this$top.boxIndex = ((1));


//setting up component AnchorLine
			var this$verticalCenter = __closure.this$verticalCenter
			this$verticalCenter.__setup(__closure.__closure_this$verticalCenter)
			delete __closure.__closure_this$verticalCenter

//assigning boxIndex to (5)
			this$verticalCenter._removeUpdater('boxIndex'); this$verticalCenter.boxIndex = ((5));


//setting up component Transform
			var this$transform = __closure.this$transform
			this$transform.__setup(__closure.__closure_this$transform)
			delete __closure.__closure_this$transform



//setting up component AnchorLine
			var this$horizontalCenter = __closure.this$horizontalCenter
			this$horizontalCenter.__setup(__closure.__closure_this$horizontalCenter)
			delete __closure.__closure_this$horizontalCenter

//assigning boxIndex to (4)
			this$horizontalCenter._removeUpdater('boxIndex'); this$horizontalCenter.boxIndex = ((4));

//assigning focused to (this._get('focusedChild') === this)
			var update$this$focused = (function() { this.focused = ((this._get('focusedChild') === this)); }).bind(this)
			var dep$this$focused$0 = this
			this.connectOnChanged(dep$this$focused$0, 'focusedChild', update$this$focused)
			this._removeUpdater('focused', [[dep$this$focused$0, 'focusedChild', update$this$focused]])
			update$this$focused();

//setting up component Effects
			var this$effects = __closure.this$effects
			this$effects.__setup(__closure.__closure_this$effects)
			delete __closure.__closure_this$effects



//setting up component AnchorLine
			var this$left = __closure.this$left
			this$left.__setup(__closure.__closure_this$left)
			delete __closure.__closure_this$left

//assigning boxIndex to (0)
			this$left._removeUpdater('boxIndex'); this$left.boxIndex = ((0));

			this.onChanged('visible', (function(value) { this._updateVisibility() } ).bind(this))
}
//=====[component core.Text]=====================

/**
 * @constructor
 * @extends {_globals.core.Item}
 */
	_globals.core.Text = function(parent, _delegate) {
	_globals.core.Item.apply(this, arguments);
	//custom constructor:
	{
		this.element.addClass(this._context.getClass('text'))
		this._setText(this.text)
		var self = this
		this._delayedUpdateSize = new _globals.core.DelayedAction(this._context, function() {
			self._updateSizeImpl()
		})
	}

}
	_globals.core.Text.prototype = Object.create(_globals.core.Item.prototype)
	_globals.core.Text.prototype.constructor = _globals.core.Text
	_globals.core.Text.prototype.componentName = 'core.Text'
	_globals.core.Text.prototype.on = function(name,callback) {
		if (!this._updateSizeNeeded) {
			if (name == 'boxChanged')
				this._enableSizeUpdate()
		}
		_globals.core.Object.prototype.on.apply(this, arguments)
	}
	_globals.core.Text.prototype._updateSizeImpl = function() {
		if (this.text.length === 0) {
			this.paintedWidth = 0
			this.paintedHeight = 0
			return
		}

		var wrap = this.wrapMode != _globals.core.Text.prototype.NoWrap
		if (!wrap)
			this.style({ width: 'auto', height: 'auto', 'padding-top': 0 }) //no need to reset it to width, it's already there
		else
			this.style({ 'height': 'auto', 'padding-top': 0})

		this._reflectSize()

		var style
		if (!wrap)
			style = { width: this.width, height: this.height }
		else
			style = {'height': this.height }

		switch(this.verticalAlignment) {
			case this.AlignTop:		this._topPadding = 0; break
			case this.AlignBottom:	this._topPadding = this.height - this.paintedHeight; break
			case this.AlignVCenter:	this._topPadding = (this.height - this.paintedHeight) / 2; break
		}
		style['padding-top'] = this._topPadding
		style['height'] = this.height - this._topPadding
		this.style(style)
	}
	_globals.core.Text.prototype._update = function(name,value) {
		switch(name) {
			case 'text': this._setText(value); this._updateSize(); break;
			case 'color': this.style('color', _globals.core.normalizeColor(value)); break;
			case 'width': this._updateSize(); break;
			case 'verticalAlignment': this.verticalAlignment = value; this._enableSizeUpdate(); break
			case 'horizontalAlignment':
				switch(value) {
				case this.AlignLeft:	this.style('text-align', 'left'); break
				case this.AlignRight:	this.style('text-align', 'right'); break
				case this.AlignHCenter:	this.style('text-align', 'center'); break
				case this.AlignJustify:	this.style('text-align', 'justify'); break
				}
				break
			case 'wrapMode':
				switch(value) {
				case this.NoWrap:
					this.style({'white-space': 'nowrap', 'word-break': '' })
					break
				case this.Wrap:
				case this.WordWrap:
					this.style({'white-space': 'normal', 'word-break': '' })
					break
				case this.WrapAnywhere:
					this.style({ 'white-space': 'normal', 'word-break': 'break-all' })
					break
				}
				this._updateSize();
				break
		}
		_globals.core.Item.prototype._update.apply(this, arguments);
	}
	_globals.core.Text.prototype._setText = function(html) {
		this.element.setHtml(html)
	}
	_globals.core.Text.prototype._enableSizeUpdate = function() {
		this._updateSizeNeeded = true
		this._updateSize()
	}
	_globals.core.Text.prototype.onChanged = function(name,callback) {
		if (!this._updateSizeNeeded) {
			switch(name) {
				case "right":
				case "width":
				case "bottom":
				case "height":
				case "verticalCenter":
				case "horizontalCenter":
					this._enableSizeUpdate()
			}
		}
		_globals.core.Object.prototype.onChanged.apply(this, arguments);
	}
	_globals.core.Text.prototype._reflectSize = function() {
		this.paintedWidth = this.element.fullWidth()
		this.paintedHeight = this.element.fullHeight()
	}
	_globals.core.Text.prototype._updateStyle = function() {
		if (this.shadow && !this.shadow._empty())
			this.style('text-shadow', this.shadow._getFilterStyle())
		else
			this.style('text-shadow', '')
		_globals.core.Item.prototype._updateStyle.apply(this, arguments)
	}
	_globals.core.Text.prototype._updateSize = function() {
		if (this._updateSizeNeeded)
			this._delayedUpdateSize.schedule()
	}
	core.addProperty(_globals.core.Text.prototype, 'string', 'text')
	core.addProperty(_globals.core.Text.prototype, 'color', 'color')
	core.addProperty(_globals.core.Text.prototype, 'Shadow', 'shadow')
	core.addProperty(_globals.core.Text.prototype, 'Font', 'font')
	core.addProperty(_globals.core.Text.prototype, 'int', 'paintedWidth')
	core.addProperty(_globals.core.Text.prototype, 'int', 'paintedHeight')
/** @const @type {number} */
	_globals.core.Text.prototype.AlignTop = 0
/** @const @type {number} */
	_globals.core.Text.AlignTop = 0
/** @const @type {number} */
	_globals.core.Text.prototype.AlignBottom = 1
/** @const @type {number} */
	_globals.core.Text.AlignBottom = 1
/** @const @type {number} */
	_globals.core.Text.prototype.AlignVCenter = 2
/** @const @type {number} */
	_globals.core.Text.AlignVCenter = 2
	core.addProperty(_globals.core.Text.prototype, 'enum', 'verticalAlignment')
/** @const @type {number} */
	_globals.core.Text.prototype.AlignLeft = 0
/** @const @type {number} */
	_globals.core.Text.AlignLeft = 0
/** @const @type {number} */
	_globals.core.Text.prototype.AlignRight = 1
/** @const @type {number} */
	_globals.core.Text.AlignRight = 1
/** @const @type {number} */
	_globals.core.Text.prototype.AlignHCenter = 2
/** @const @type {number} */
	_globals.core.Text.AlignHCenter = 2
/** @const @type {number} */
	_globals.core.Text.prototype.AlignJustify = 3
/** @const @type {number} */
	_globals.core.Text.AlignJustify = 3
	core.addProperty(_globals.core.Text.prototype, 'enum', 'horizontalAlignment')
/** @const @type {number} */
	_globals.core.Text.prototype.NoWrap = 0
/** @const @type {number} */
	_globals.core.Text.NoWrap = 0
/** @const @type {number} */
	_globals.core.Text.prototype.WordWrap = 1
/** @const @type {number} */
	_globals.core.Text.WordWrap = 1
/** @const @type {number} */
	_globals.core.Text.prototype.WrapAnywhere = 2
/** @const @type {number} */
	_globals.core.Text.WrapAnywhere = 2
/** @const @type {number} */
	_globals.core.Text.prototype.Wrap = 3
/** @const @type {number} */
	_globals.core.Text.Wrap = 3
	core.addProperty(_globals.core.Text.prototype, 'enum', 'wrapMode')

	_globals.core.Text.prototype.__create = function(__closure) {
		_globals.core.Item.prototype.__create.call(this, __closure.__base = { })
//creating component core.<anonymous>
		var this$shadow = new _globals.core.Shadow(this)
		__closure.this$shadow = this$shadow

//creating component Shadow
		this$shadow.__create(__closure.__closure_this$shadow = { })

		this.shadow = this$shadow
//creating component core.<anonymous>
		var this$font = new _globals.core.Font(this)
		__closure.this$font = this$font

//creating component Font
		this$font.__create(__closure.__closure_this$font = { })

		this.font = this$font
	}
	_globals.core.Text.prototype.__setup = function(__closure) {
	_globals.core.Item.prototype.__setup.call(this, __closure.__base); delete __closure.__base
//assigning width to (this._get('paintedWidth'))
			var update$this$width = (function() { this.width = ((this._get('paintedWidth'))); }).bind(this)
			var dep$this$width$0 = this
			this.connectOnChanged(dep$this$width$0, 'paintedWidth', update$this$width)
			this._removeUpdater('width', [[dep$this$width$0, 'paintedWidth', update$this$width]])
			update$this$width();

//setting up component Shadow
			var this$shadow = __closure.this$shadow
			this$shadow.__setup(__closure.__closure_this$shadow)
			delete __closure.__closure_this$shadow



//setting up component Font
			var this$font = __closure.this$font
			this$font.__setup(__closure.__closure_this$font)
			delete __closure.__closure_this$font


//assigning height to (this._get('paintedHeight'))
			var update$this$height = (function() { this.height = ((this._get('paintedHeight'))); }).bind(this)
			var dep$this$height$0 = this
			this.connectOnChanged(dep$this$height$0, 'paintedHeight', update$this$height)
			this._removeUpdater('height', [[dep$this$height$0, 'paintedHeight', update$this$height]])
			update$this$height();
}
//=====[component controls.web.H2]=====================

/**
 * @constructor
 * @extends {_globals.core.Text}
 */
	_globals.controls.web.H2 = function(parent, _delegate) {
	_globals.core.Text.apply(this, arguments);

}
	_globals.controls.web.H2.prototype = Object.create(_globals.core.Text.prototype)
	_globals.controls.web.H2.prototype.constructor = _globals.controls.web.H2
	_globals.controls.web.H2.prototype.componentName = 'controls.web.H2'
	_globals.controls.web.H2.prototype.getTag = function() { return 'h2' }
	_globals.controls.web.H2.prototype.registerStyle = function(style,tag) { style.addRule(tag, 'position: absolute; visibility: inherit; margin: 0px'); }

	_globals.controls.web.H2.prototype.__create = function(__closure) {
		_globals.core.Text.prototype.__create.call(this, __closure.__base = { })

	}
	_globals.controls.web.H2.prototype.__setup = function(__closure) {
	_globals.core.Text.prototype.__setup.call(this, __closure.__base); delete __closure.__base
//assigning font.family to ("Roboto Slab")
			this._removeUpdater('font.family'); this._get('font').family = (("Roboto Slab"));
//assigning wrapMode to (_globals.core.Text.prototype.WordWrap)
			this._removeUpdater('wrapMode'); this.wrapMode = ((_globals.core.Text.prototype.WordWrap));
}
//=====[component core.Shadow]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.core.Shadow = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);

}
	_globals.core.Shadow.prototype = Object.create(_globals.core.Object.prototype)
	_globals.core.Shadow.prototype.constructor = _globals.core.Shadow
	_globals.core.Shadow.prototype.componentName = 'core.Shadow'
	_globals.core.Shadow.prototype._getFilterStyle = function() {
		var style = this.x + "px " + this.y + "px " + this.blur + "px "
		if (this.spread > 0)
			style += this.spread + "px "
		style += _globals.core.normalizeColor(this.color)
		return style
	}
	_globals.core.Shadow.prototype._update = function(name,value) {
		this.parent._updateStyle()
		_globals.core.Object.prototype._update.apply(this, arguments);
	}
	_globals.core.Shadow.prototype._empty = function() {
		return !this.x && !this.y && !this.blur && !this.spread;
	}
	core.addProperty(_globals.core.Shadow.prototype, 'real', 'x')
	core.addProperty(_globals.core.Shadow.prototype, 'real', 'y')
	core.addProperty(_globals.core.Shadow.prototype, 'Color', 'color', ("black"))
	core.addProperty(_globals.core.Shadow.prototype, 'real', 'blur')
	core.addProperty(_globals.core.Shadow.prototype, 'real', 'spread')//=====[component core.BaseLayout]=====================

/**
 * @constructor
 * @extends {_globals.core.Item}
 */
	_globals.core.BaseLayout = function(parent, _delegate) {
	_globals.core.Item.apply(this, arguments);
	//custom constructor:
	{
		this.count = 0
		this._delayedLayout = new _globals.core.DelayedAction(this._context, function() {
			this._updateItems()
			this._layout()
		}.bind(this))
	}

}
	_globals.core.BaseLayout.prototype = Object.create(_globals.core.Item.prototype)
	_globals.core.BaseLayout.prototype.constructor = _globals.core.BaseLayout
	_globals.core.BaseLayout.prototype.componentName = 'core.BaseLayout'
	_globals.core.BaseLayout.prototype._update = function(name,value) {
		switch(name) {
			case 'spacing': this._delayedLayout.schedule(); break;
		}
		qml.core.Item.prototype._update.apply(this, arguments);
	}
	_globals.core.BaseLayout.prototype._updateItems = function() {}
	core.addProperty(_globals.core.BaseLayout.prototype, 'int', 'count')
	core.addProperty(_globals.core.BaseLayout.prototype, 'int', 'spacing')
	core.addProperty(_globals.core.BaseLayout.prototype, 'int', 'currentIndex')
	core.addProperty(_globals.core.BaseLayout.prototype, 'int', 'contentWidth')
	core.addProperty(_globals.core.BaseLayout.prototype, 'int', 'contentHeight')
	core.addProperty(_globals.core.BaseLayout.prototype, 'bool', 'keyNavigationWraps')
	core.addProperty(_globals.core.BaseLayout.prototype, 'bool', 'handleNavigationKeys')//=====[component core.BaseView]=====================

/**
 * @constructor
 * @extends {_globals.core.BaseLayout}
 */
	_globals.core.BaseView = function(parent, _delegate) {
	_globals.core.BaseLayout.apply(this, arguments);
	//custom constructor:
	{
		this._items = []
		this._modelUpdate = new _globals.core.model.ModelUpdate()
	}

}
	_globals.core.BaseView.prototype = Object.create(_globals.core.BaseLayout.prototype)
	_globals.core.BaseView.prototype.constructor = _globals.core.BaseView
	_globals.core.BaseView.prototype.componentName = 'core.BaseView'
	_globals.core.BaseView.prototype._update = function(name,value) {
		switch(name) {
		case 'delegate':
			if (value)
				value.visible = false
			break
		}
		_globals.core.Item.prototype._update.apply(this, arguments);
	}
	_globals.core.BaseView.prototype._onRowsInserted = function(begin,end) {
		if (this.trace)
			log("rows inserted", begin, end)

		this._modelUpdate.insert(this.model, begin, end)
		this._delayedLayout.schedule()
	}
	_globals.core.BaseView.prototype._onReset = function() {
		var model = this.model
		if (this.trace)
			log("reset", this._items.length, model.count)

		this._modelUpdate.reset(model)
		this._delayedLayout.schedule()
	}
	_globals.core.BaseView.prototype._updateDelegate = function(idx) {
		var item = this._items[idx]
		if (item) {
			var row = this.model.get(idx)
			row.index = idx
			item._local.model = row
			_globals.core.Object.prototype._update.call(item, '_row')
		}
	}
	_globals.core.BaseView.prototype.itemAt = function(x,y) {
		var idx = this.indexAt(x, y)
		return idx >= 0? this._items[idx]: null
	}
	_globals.core.BaseView.prototype._discardItems = function(begin,end) {
		var deleted = this._items.splice(begin, end - begin)
		var view = this
		deleted.forEach(function(item) { view._discardItem(item)})
	}
	_globals.core.BaseView.prototype._discardItem = function(item) {
		if (item === null)
			return
		if (this.focusedChild === item)
			this.focusedChild = null;
		item.discard()
	}
	_globals.core.BaseView.prototype._attach = function() {
		if (this._attached || !this.model || !this.delegate)
			return

		this.model.on('reset', this._onReset.bind(this))
		this.model.on('rowsInserted', this._onRowsInserted.bind(this))
		this.model.on('rowsChanged', this._onRowsChanged.bind(this))
		this.model.on('rowsRemoved', this._onRowsRemoved.bind(this))
		this._attached = true
		this._onReset()
	}
	_globals.core.BaseView.prototype._updateItems = function() {
		this._modelUpdate.apply(this)
		qml.core.BaseLayout.prototype._updateItems.apply(this)
	}
	_globals.core.BaseView.prototype._updateDelegateIndex = function(idx) {
		var item = this._items[idx]
		if (item) {
			item._local.model.index = idx
			_globals.core.Object.prototype._update.call(item, '_rowIndex')
		}
	}
	_globals.core.BaseView.prototype._insertItems = function(begin,end) {
		var n = end - begin + 2
		var args = Array(n)
		args[0] = begin
		args[1] = 0
		for(var i = 2; i < n; ++i)
			args[i] = null
		Array.prototype.splice.apply(this._items, args)
	}
	_globals.core.BaseView.prototype._createDelegate = function(idx) {
		var items = this._items
		if (items[idx] !== null)
			return

		var row = this.model.get(idx)
		row['index'] = idx
		this._local['model'] = row

		var item = this.delegate()
		items[idx] = item
		item.view = this
		item.element.remove()
		this.content.element.append(item.element)

		item._local['model'] = row
		delete this._local['model']
		return item
	}
	_globals.core.BaseView.prototype.focusCurrent = function() {
		var n = this.count
		if (n == 0)
			return

		var idx = this.currentIndex
		if (idx < 0 || idx >= n) {
			if (this.keyNavigationWraps)
				this.currentIndex = (idx + n) % n
			else
				this.currentIndex = idx < 0? 0: n - 1
			return
		}
		var item = this._items[idx]

		if (item)
			this.focusChild(item)
		if (this.contentFollowsCurrentItem)
			this.positionViewAtIndex(idx)
	}
	_globals.core.BaseView.prototype._onRowsChanged = function(begin,end) {
		if (this.trace)
			log("rows changed", begin, end)

		this._modelUpdate.update(this.model, begin, end)
		this._delayedLayout.schedule()
	}
	_globals.core.BaseView.prototype._onRowsRemoved = function(begin,end) {
		if (this.trace)
			log("rows removed", begin, end)

		this._modelUpdate.remove(this.model, begin, end)
		this._delayedLayout.schedule()
	}
	core.addProperty(_globals.core.BaseView.prototype, 'Object', 'model')
	core.addProperty(_globals.core.BaseView.prototype, 'Item', 'delegate')
	core.addProperty(_globals.core.BaseView.prototype, 'int', 'contentX')
	core.addProperty(_globals.core.BaseView.prototype, 'int', 'contentY')
	core.addProperty(_globals.core.BaseView.prototype, 'int', 'scrollingStep', (0))
	core.addProperty(_globals.core.BaseView.prototype, 'int', 'animationDuration', (0))
	core.addProperty(_globals.core.BaseView.prototype, 'bool', 'contentFollowsCurrentItem', (true))
	core.addProperty(_globals.core.BaseView.prototype, 'bool', 'pageScrolling', (false))
	core.addProperty(_globals.core.BaseView.prototype, 'bool', 'rendered', (false))
	core.addProperty(_globals.core.BaseView.prototype, 'bool', 'trace')
	core.addProperty(_globals.core.BaseView.prototype, 'BaseViewContent', 'content')
/** @const @type {number} */
	_globals.core.BaseView.prototype.Beginning = 0
/** @const @type {number} */
	_globals.core.BaseView.Beginning = 0
/** @const @type {number} */
	_globals.core.BaseView.prototype.Center = 1
/** @const @type {number} */
	_globals.core.BaseView.Center = 1
/** @const @type {number} */
	_globals.core.BaseView.prototype.End = 2
/** @const @type {number} */
	_globals.core.BaseView.End = 2
/** @const @type {number} */
	_globals.core.BaseView.prototype.Visible = 3
/** @const @type {number} */
	_globals.core.BaseView.Visible = 3
/** @const @type {number} */
	_globals.core.BaseView.prototype.Contain = 4
/** @const @type {number} */
	_globals.core.BaseView.Contain = 4
/** @const @type {number} */
	_globals.core.BaseView.prototype.Page = 5
/** @const @type {number} */
	_globals.core.BaseView.Page = 5
	core.addProperty(_globals.core.BaseView.prototype, 'enum', 'positionMode')

	_globals.core.BaseView.prototype.__create = function(__closure) {
		_globals.core.BaseLayout.prototype.__create.call(this, __closure.__base = { })
//creating component core.<anonymous>
		var this$content = new _globals.core.BaseViewContent(this)
		__closure.this$content = this$content

//creating component BaseViewContent
		this$content.__create(__closure.__closure_this$content = { })

		this.content = this$content
	}
	_globals.core.BaseView.prototype.__setup = function(__closure) {
	_globals.core.BaseLayout.prototype.__setup.call(this, __closure.__base); delete __closure.__base
//assigning keyNavigationWraps to (true)
			this._removeUpdater('keyNavigationWraps'); this.keyNavigationWraps = ((true));
//assigning contentWidth to (1)
			this._removeUpdater('contentWidth'); this.contentWidth = ((1));
//assigning contentHeight to (1)
			this._removeUpdater('contentHeight'); this.contentHeight = ((1));
//assigning handleNavigationKeys to (true)
			this._removeUpdater('handleNavigationKeys'); this.handleNavigationKeys = ((true));

//setting up component BaseViewContent
			var this$content = __closure.this$content
			this$content.__setup(__closure.__closure_this$content)
			delete __closure.__closure_this$content

	var behavior_this_content_on_y = new _globals.core.Animation(this$content)
	var behavior_this_content_on_y__closure = { behavior_this_content_on_y: behavior_this_content_on_y }

//creating component Animation
	behavior_this_content_on_y.__create(behavior_this_content_on_y__closure.__closure_behavior_this_content_on_y = { })


//setting up component Animation
	var behavior_this_content_on_y = behavior_this_content_on_y__closure.behavior_this_content_on_y
	behavior_this_content_on_y.__setup(behavior_this_content_on_y__closure.__closure_behavior_this_content_on_y)
	delete behavior_this_content_on_y__closure.__closure_behavior_this_content_on_y

//assigning duration to (this._get('parent')._get('parent')._get('animationDuration'))
	var update$behavior_this_content_on_y$duration = (function() { behavior_this_content_on_y.duration = ((this._get('parent')._get('parent')._get('animationDuration'))); }).bind(behavior_this_content_on_y)
	var dep$behavior_this_content_on_y$duration$0 = behavior_this_content_on_y._get('parent')._get('parent')
	behavior_this_content_on_y.connectOnChanged(dep$behavior_this_content_on_y$duration$0, 'animationDuration', update$behavior_this_content_on_y$duration)
	behavior_this_content_on_y._removeUpdater('duration', [[dep$behavior_this_content_on_y$duration$0, 'animationDuration', update$behavior_this_content_on_y$duration]])
	update$behavior_this_content_on_y$duration();

	this$content.setAnimation('y', behavior_this_content_on_y);

	var behavior_this_content_on_x = new _globals.core.Animation(this$content)
	var behavior_this_content_on_x__closure = { behavior_this_content_on_x: behavior_this_content_on_x }

//creating component Animation
	behavior_this_content_on_x.__create(behavior_this_content_on_x__closure.__closure_behavior_this_content_on_x = { })


//setting up component Animation
	var behavior_this_content_on_x = behavior_this_content_on_x__closure.behavior_this_content_on_x
	behavior_this_content_on_x.__setup(behavior_this_content_on_x__closure.__closure_behavior_this_content_on_x)
	delete behavior_this_content_on_x__closure.__closure_behavior_this_content_on_x

//assigning duration to (this._get('parent')._get('parent')._get('animationDuration'))
	var update$behavior_this_content_on_x$duration = (function() { behavior_this_content_on_x.duration = ((this._get('parent')._get('parent')._get('animationDuration'))); }).bind(behavior_this_content_on_x)
	var dep$behavior_this_content_on_x$duration$0 = behavior_this_content_on_x._get('parent')._get('parent')
	behavior_this_content_on_x.connectOnChanged(dep$behavior_this_content_on_x$duration$0, 'animationDuration', update$behavior_this_content_on_x$duration)
	behavior_this_content_on_x._removeUpdater('duration', [[dep$behavior_this_content_on_x$duration$0, 'animationDuration', update$behavior_this_content_on_x$duration]])
	update$behavior_this_content_on_x$duration();

	this$content.setAnimation('x', behavior_this_content_on_x);

	var behavior_this_content_on_transform = new _globals.core.Animation(this$content)
	var behavior_this_content_on_transform__closure = { behavior_this_content_on_transform: behavior_this_content_on_transform }

//creating component Animation
	behavior_this_content_on_transform.__create(behavior_this_content_on_transform__closure.__closure_behavior_this_content_on_transform = { })


//setting up component Animation
	var behavior_this_content_on_transform = behavior_this_content_on_transform__closure.behavior_this_content_on_transform
	behavior_this_content_on_transform.__setup(behavior_this_content_on_transform__closure.__closure_behavior_this_content_on_transform)
	delete behavior_this_content_on_transform__closure.__closure_behavior_this_content_on_transform

//assigning duration to (this._get('parent')._get('parent')._get('animationDuration'))
	var update$behavior_this_content_on_transform$duration = (function() { behavior_this_content_on_transform.duration = ((this._get('parent')._get('parent')._get('animationDuration'))); }).bind(behavior_this_content_on_transform)
	var dep$behavior_this_content_on_transform$duration$0 = behavior_this_content_on_transform._get('parent')._get('parent')
	behavior_this_content_on_transform.connectOnChanged(dep$behavior_this_content_on_transform$duration$0, 'animationDuration', update$behavior_this_content_on_transform$duration)
	behavior_this_content_on_transform._removeUpdater('duration', [[dep$behavior_this_content_on_transform$duration$0, 'animationDuration', update$behavior_this_content_on_transform$duration]])
	update$behavior_this_content_on_transform$duration();

	this$content.setAnimation('transform', behavior_this_content_on_transform);

			this._context._onCompleted((function() {
		this._attach();
		var delayedLayout = this._delayedLayout

		var self = this
		this.element.on('scroll', function(event) {
			self.contentX = self.element.dom.scrollLeft
			self.contentY = self.element.dom.scrollTop
		}.bind(this))

		delayedLayout.schedule()
	} ).bind(this))
			this.onChanged('height', (function(value) { this._delayedLayout.schedule() } ).bind(this))
			this.onChanged('width', (function(value) { this._delayedLayout.schedule() } ).bind(this))
			this.onChanged('recursiveVisible', (function(value) { if (value) this._delayedLayout.schedule(); } ).bind(this))
			this.onChanged('contentY', (function(value) { this.content.y = -value; } ).bind(this))
			this.onChanged('contentX', (function(value) { this.content.x = -value; } ).bind(this))
			this.onChanged('focusedChild', (function(value) {
		var idx = this._items.indexOf(this.focusedChild)
		if (idx >= 0)
			this.currentIndex = idx
	} ).bind(this))
			this.onChanged('currentIndex', (function(value) {
		this.focusCurrent()
	} ).bind(this))
}
//=====[component core.Repeater]=====================

/**
 * @constructor
 * @extends {_globals.core.BaseView}
 */
	_globals.core.Repeater = function(parent, _delegate) {
	_globals.core.BaseView.apply(this, arguments);

}
	_globals.core.Repeater.prototype = Object.create(_globals.core.BaseView.prototype)
	_globals.core.Repeater.prototype.constructor = _globals.core.Repeater
	_globals.core.Repeater.prototype.componentName = 'core.Repeater'
	_globals.core.Repeater.prototype._layout = function() {
		if (!this.recursiveVisible)
			return

		var model = this.model;
		if (!model)
			return

		var created = false;
		var n = this.count = model.count
		var items = this._items
		for(var i = 0; i < n; ++i) {
			var item = items[i]
			if (!item) {
				item = this._createDelegate(i)
				created = true
			}
		}
		this.rendered = true
		if (created)
			this._context._complete()
	}//=====[component core.Animation]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.core.Animation = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);
	//custom constructor:
	{ this._disabled = 0 }

}
	_globals.core.Animation.prototype = Object.create(_globals.core.Object.prototype)
	_globals.core.Animation.prototype.constructor = _globals.core.Animation
	_globals.core.Animation.prototype.componentName = 'core.Animation'
	_globals.core.Animation.prototype.enable = function() { --this._disabled }
	_globals.core.Animation.prototype.complete = function() { }
	_globals.core.Animation.prototype.enabled = function() { return this._disabled == 0 }
	_globals.core.Animation.prototype.interpolate = function(dst,src,t) {
		return t * (dst - src) + src;
	}
	_globals.core.Animation.prototype.disable = function() { ++this._disabled }
	_globals.core.Animation.prototype._update = function(name,value) {
		var parent = this.parent
		if (this._target && parent && parent._updateAnimation && parent._updateAnimation(this._target, this.enabled() ? this: null))
			return

		_globals.core.Object.prototype._update.apply(this, arguments);
	}
	core.addProperty(_globals.core.Animation.prototype, 'int', 'delay', (0))
	core.addProperty(_globals.core.Animation.prototype, 'int', 'duration', (200))
	core.addProperty(_globals.core.Animation.prototype, 'bool', 'cssTransition', (true))
	core.addProperty(_globals.core.Animation.prototype, 'bool', 'running', (false))
	core.addProperty(_globals.core.Animation.prototype, 'string', 'easing', ("ease"))//=====[component vc.ChalkText]=====================

/**
 * @constructor
 * @extends {_globals.controls.web.H2}
 */
	_globals.vc.ChalkText = function(parent, _delegate) {
	_globals.controls.web.H2.apply(this, arguments);

}
	_globals.vc.ChalkText.prototype = Object.create(_globals.controls.web.H2.prototype)
	_globals.vc.ChalkText.prototype.constructor = _globals.vc.ChalkText
	_globals.vc.ChalkText.prototype.componentName = 'vc.ChalkText'
	core.addProperty(_globals.vc.ChalkText.prototype, 'int', 'colorNum')

	_globals.vc.ChalkText.prototype.__create = function(__closure) {
		_globals.controls.web.H2.prototype.__create.call(this, __closure.__base = { })
var this$child0 = new _globals.controls.mixins.HoverMixin(this)
		__closure.this$child0 = this$child0

//creating component HoverMixin
		this$child0.__create(__closure.__closure_this$child0 = { })

		var this$child1 = new _globals.controls.mixins.WheelMixin(this)
		__closure.this$child1 = this$child1

//creating component WheelMixin
		this$child1.__create(__closure.__closure_this$child1 = { })
	}
	_globals.vc.ChalkText.prototype.__setup = function(__closure) {
	_globals.controls.web.H2.prototype.__setup.call(this, __closure.__base); delete __closure.__base
//assigning color to ("#B2EBF2")
			this._removeUpdater('color'); this.color = (("#B2EBF2"));
//assigning text to (" <span style='color: #EEEEEE'> Income: </span>" + _globals.controls.pure.format.currency((77895415.2223),(2)) + "$")
			this._removeUpdater('text'); this.text = ((" <span style='color: #EEEEEE'> Income: </span>" + _globals.controls.pure.format.currency((77895415.2223),(2)) + "$"));
//assigning font.weight to (300)
			this._removeUpdater('font.weight'); this._get('font').weight = ((300));
			this.on('wheel', (function(e) {
		if (e.deltaY > 0)
			this.colorNum = (this.colorNum + 1) % 18
		else
			this.colorNum = (this.colorNum + 17) % 18
	} ).bind(this))
			this.on('clicked', (function() {
		this.colorNum = (this.colorNum + 1) % 18
	} ).bind(this))
			this.onChanged('colorNum', (function(value) {
		var c = ["#B2EBF2", "#B2DFDB", "#B3E5FC", "#BBDEFB", "#FFCDD2", "#FCE4EC", "#E0F7FA", "#C8E6C9", "#E8F5E9", "#DCEDC8", "#F0F4C3", "#FFF9C4", "#FFF8E1", "#FFE0B2", "#FFF3E0", "#FBE9E7", "#FFCCBC", "#A5D6A7"];
		this.color = c[this.colorNum]
	} ).bind(this))


//setting up component HoverMixin
			var this$child0 = __closure.this$child0
			this$child0.__setup(__closure.__closure_this$child0)
			delete __closure.__closure_this$child0

//assigning cursor to ("pointer")
			this$child0._removeUpdater('cursor'); this$child0.cursor = (("pointer"));

			this.addChild(this$child0)

//setting up component WheelMixin
			var this$child1 = __closure.this$child1
			this$child1.__setup(__closure.__closure_this$child1)
			delete __closure.__closure_this$child1


			this.addChild(this$child1)
}
//=====[component controls.pure.MaterialIcon]=====================

/**
 * @constructor
 * @extends {_globals.core.Text}
 */
	_globals.controls.pure.MaterialIcon = function(parent, _delegate) {
	_globals.core.Text.apply(this, arguments);
	//custom constructor:
	{
		_globals.html5.html.loadExternalStylesheet("https://fonts.googleapis.com/icon?family=Material+Icons")
	}

}
	_globals.controls.pure.MaterialIcon.prototype = Object.create(_globals.core.Text.prototype)
	_globals.controls.pure.MaterialIcon.prototype.constructor = _globals.controls.pure.MaterialIcon
	_globals.controls.pure.MaterialIcon.prototype.componentName = 'controls.pure.MaterialIcon'

	_globals.controls.pure.MaterialIcon.prototype.__create = function(__closure) {
		_globals.core.Text.prototype.__create.call(this, __closure.__base = { })
core.addAliasProperty(this, 'size', (function() { return this._get('font'); }).bind(this), 'pixelSize')
		core.addAliasProperty(this, 'icon', (function() { return this; }).bind(this), 'text')
	}
	_globals.controls.pure.MaterialIcon.prototype.__setup = function(__closure) {
	_globals.core.Text.prototype.__setup.call(this, __closure.__base); delete __closure.__base
//assigning font.family to ("Material Icons")
			this._removeUpdater('font.family'); this._get('font').family = (("Material Icons"));
}
//=====[component core.Image]=====================

/**
 * @constructor
 * @extends {_globals.core.Item}
 */
	_globals.core.Image = function(parent, _delegate) {
	_globals.core.Item.apply(this, arguments);
	//custom constructor:
	{
		var self = this
		this._delayedLoad = new _globals.core.DelayedAction(this._context, function() {
			self._load()
		})

		this._init()
	}

}
	_globals.core.Image.prototype = Object.create(_globals.core.Item.prototype)
	_globals.core.Image.prototype.constructor = _globals.core.Image
	_globals.core.Image.prototype.componentName = 'core.Image'
	_globals.core.Image.prototype.load = function() {
		var src = this.source
		this.status = (src.length === 0)? _globals.core.Image.prototype.Null: _globals.core.Image.prototype.Loading
		this._delayedLoad.schedule()
	}
	_globals.core.Image.prototype._onError = function() {
		this.status = this.Error;
	}
	_globals.core.Image.prototype._update = function(name,value) {
		switch(name) {
			case 'width':
			case 'height':
//			case 'rotate':
			case 'fillMode': this.load(); break;
			case 'source':
				this.status = value ? this.Loading : this.Null;
				if (value)
					this.load();
				break;
		}
		_globals.core.Item.prototype._update.apply(this, arguments);
	}
	_globals.core.Image.prototype._init = function() {
		var tmp = new Image()
		this._image = tmp
		this._image.onerror = this._onError.bind(this)

		var image = this
		this._image.onload = function() {
			image.paintedWidth = tmp.naturalWidth
			image.paintedHeight = tmp.naturalHeight

			var style = {'background-image': 'url(' + image.source + ')'}
			switch(image.fillMode) {
				case image.Stretch:
					style['background-repeat'] = 'no-repeat'
					style['background-size'] = '100% 100%'
					break;
				case image.TileVertically:
					style['background-repeat'] = 'repeat-y'
					style['background-size'] = '100%'
					break;
				case image.TileHorizontally:
					style['background-repeat'] = 'repeat-x'
					style['background-size'] = tmp.naturalWidth + 'px 100%'
					break;
				case image.PreserveAspectFit:
					style['background-repeat'] = 'no-repeat'
					style['background-position'] = 'center'
					var w = image.width
					var h = image.height
					var wPart = w / tmp.naturalWidth
					var hPart = h / tmp.naturalHeight
					var wRatio = 100
					var hRatio = 100

					if (wPart === 0) {
						wPart = hPart
						w = hPart * tmp.naturalWidth
					}

					if (hPart === 0) {
						hPart = wPart
						h = wPart * tmp.naturalHeight
					}

					if (wPart > hPart)
						wRatio = Math.floor(100 / wPart * hPart)
					else
						hRatio = Math.floor(100 / hPart * wPart)
					style['background-size'] = wRatio + '% ' + hRatio + '%'
					image.paintedWidth = w * wRatio / 100
					image.paintedHeight = h * hRatio / 100
					break;
				case image.PreserveAspectCrop:
					style['background-repeat'] = 'no-repeat'
					style['background-position'] = 'center'
					var pRatio = tmp.naturalWidth / tmp.naturalHeight
					var iRatio = image.width / image.height
					if (pRatio < iRatio) {
						var hRatio = Math.floor(iRatio / pRatio * 100)
						style['background-size'] = 100 + '% ' + hRatio + '%'
					}
					else {
						var wRatio = Math.floor(pRatio / iRatio * 100)
						style['background-size'] = wRatio + '% ' + 100 + '%'
					}
					break;
				case image.Tile:
					style['background-repeat'] = 'repeat-y repeat-x'
					break;
			}
			image.style(style)

			if (!image.width)
				image.width = image.paintedWidth
			if (!image.height)
				image.height = image.paintedHeight
			image.status = _globals.core.Image.prototype.Ready
		}
		this.load()
	}
	_globals.core.Image.prototype._load = function() {
		this._image.src = this.source
	}
	core.addProperty(_globals.core.Image.prototype, 'string', 'source')
	core.addProperty(_globals.core.Image.prototype, 'int', 'paintedWidth')
	core.addProperty(_globals.core.Image.prototype, 'int', 'paintedHeight')
/** @const @type {number} */
	_globals.core.Image.prototype.Null = 0
/** @const @type {number} */
	_globals.core.Image.Null = 0
/** @const @type {number} */
	_globals.core.Image.prototype.Ready = 1
/** @const @type {number} */
	_globals.core.Image.Ready = 1
/** @const @type {number} */
	_globals.core.Image.prototype.Loading = 2
/** @const @type {number} */
	_globals.core.Image.Loading = 2
/** @const @type {number} */
	_globals.core.Image.prototype.Error = 3
/** @const @type {number} */
	_globals.core.Image.Error = 3
	core.addProperty(_globals.core.Image.prototype, 'enum', 'status')
/** @const @type {number} */
	_globals.core.Image.prototype.Stretch = 0
/** @const @type {number} */
	_globals.core.Image.Stretch = 0
/** @const @type {number} */
	_globals.core.Image.prototype.PreserveAspectFit = 1
/** @const @type {number} */
	_globals.core.Image.PreserveAspectFit = 1
/** @const @type {number} */
	_globals.core.Image.prototype.PreserveAspectCrop = 2
/** @const @type {number} */
	_globals.core.Image.PreserveAspectCrop = 2
/** @const @type {number} */
	_globals.core.Image.prototype.Tile = 3
/** @const @type {number} */
	_globals.core.Image.Tile = 3
/** @const @type {number} */
	_globals.core.Image.prototype.TileVertically = 4
/** @const @type {number} */
	_globals.core.Image.TileVertically = 4
/** @const @type {number} */
	_globals.core.Image.prototype.TileHorizontally = 5
/** @const @type {number} */
	_globals.core.Image.TileHorizontally = 5
	core.addProperty(_globals.core.Image.prototype, 'enum', 'fillMode')//=====[component controls.mixins.ImageMixin]=====================

/**
 * @constructor
 * @extends {_globals.core.Image}
 */
	_globals.controls.mixins.ImageMixin = function(parent, _delegate) {
	_globals.core.Image.apply(this, arguments);

}
	_globals.controls.mixins.ImageMixin.prototype = Object.create(_globals.core.Image.prototype)
	_globals.controls.mixins.ImageMixin.prototype.constructor = _globals.controls.mixins.ImageMixin
	_globals.controls.mixins.ImageMixin.prototype.componentName = 'controls.mixins.ImageMixin'
	_globals.controls.mixins.ImageMixin.prototype.createElement = function(tag) {
		this.element = this.parent.element;
	}
	_globals.controls.mixins.ImageMixin.prototype._init = function() {
		var tmp = new Image()
		this._image = tmp
		this._image.onerror = this._onError.bind(this)

		var image = this
		this._image.onload = function() {
			var natW = tmp.naturalWidth, natH = tmp.naturalHeight
			var w = image.width, h = image.height
			image.paintedWidth = w
			image.paintedHeight = h

			var style = {'background-image': 'url(' + image.source + ')'}
			switch(image.fillMode) {
				case image.Stretch:
					style['background-repeat'] = 'no-repeat'
					style['background-size'] = '100% 100%'
					break;
				case image.TileVertically:
					style['background-repeat'] = 'repeat-y'
					style['background-size'] = '100%'
					break;
				case image.TileHorizontally:
					style['background-repeat'] = 'repeat-x'
					style['background-size'] = natW + 'px 100%'
					break;
				case image.Tile:
					style['background-repeat'] = 'repeat-y repeat-x'
					break;
				case image.PreserveAspectCrop:
					style['background-repeat'] = 'no-repeat'
					style['background-position'] = 'center'
					style['background-size'] = 'cover'
					break;
				case image.PreserveAspectFit:
					style['background-repeat'] = 'no-repeat'
					style['background-position'] = 'center'
					style['background-size'] = 'contain'
					var srcRatio = natW / natH, targetRatio = w / h
					if (srcRatio > targetRatio) { // img width aligned with target width
						image.paintedWidth = w;
						image.paintedHeight = w / srcRatio;
					} else {
						image.paintedHeight = h;
						image.paintedWidth = h * srcRatio;
					}
					break;
			}
			image.style(style)

			image.status = _globals.core.Image.prototype.Ready
		}
		this.load()
	}

	_globals.controls.mixins.ImageMixin.prototype.__create = function(__closure) {
		_globals.core.Image.prototype.__create.call(this, __closure.__base = { })

	}
	_globals.controls.mixins.ImageMixin.prototype.__setup = function(__closure) {
	_globals.core.Image.prototype.__setup.call(this, __closure.__base); delete __closure.__base
//assigning width to (this._get('paintedWidth'))
			var update$this$width = (function() { this.width = ((this._get('paintedWidth'))); }).bind(this)
			var dep$this$width$0 = this
			this.connectOnChanged(dep$this$width$0, 'paintedWidth', update$this$width)
			this._removeUpdater('width', [[dep$this$width$0, 'paintedWidth', update$this$width]])
			update$this$width();
//assigning height to (this._get('paintedHeight'))
			var update$this$height = (function() { this.height = ((this._get('paintedHeight'))); }).bind(this)
			var dep$this$height$0 = this
			this.connectOnChanged(dep$this$height$0, 'paintedHeight', update$this$height)
			this._removeUpdater('height', [[dep$this$height$0, 'paintedHeight', update$this$height]])
			update$this$height();
//assigning anchors.fill to (this._get('parent'))
			var update$this$anchors_fill = (function() { this._get('anchors').fill = ((this._get('parent'))); }).bind(this)
			var dep$this$anchors_fill$0 = this
			this.connectOnChanged(dep$this$anchors_fill$0, 'parent', update$this$anchors_fill)
			this._removeUpdater('anchors.fill', [[dep$this$anchors_fill$0, 'parent', update$this$anchors_fill]])
			update$this$anchors_fill();
}
//=====[component core.Font]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.core.Font = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);

}
	_globals.core.Font.prototype = Object.create(_globals.core.Object.prototype)
	_globals.core.Font.prototype.constructor = _globals.core.Font
	_globals.core.Font.prototype.componentName = 'core.Font'
	_globals.core.Font.prototype._update = function(name,value) {
		switch(name) {
			case 'family':		this.parent.style('font-family', value); this.parent._updateSize(); break
			case 'pointSize':	this.parent.style('font-size', value + "pt"); this.parent._updateSize(); break
			case 'pixelSize':	this.parent.style('font-size', value + "px"); this.parent._updateSize(); break
			case 'italic': 		this.parent.style('font-style', value? 'italic': 'normal'); this.parent._updateSize(); break
			case 'bold': 		this.parent.style('font-weight', value? 'bold': 'normal'); this.parent._updateSize(); break
			case 'underline':	this.parent.style('text-decoration', value? 'underline': ''); this.parent._updateSize(); break
			case 'lineHeight':	this.parent.style('line-height', value + "px"); this.parent._updateSize(); break;
			case 'weight':	this.parent.style('font-weight', value); this.parent._updateSize(); break;
		}
		_globals.core.Object.prototype._update.apply(this, arguments);
	}
	core.addProperty(_globals.core.Font.prototype, 'string', 'family')
	core.addProperty(_globals.core.Font.prototype, 'bool', 'italic')
	core.addProperty(_globals.core.Font.prototype, 'bool', 'bold')
	core.addProperty(_globals.core.Font.prototype, 'bool', 'underline')
	core.addProperty(_globals.core.Font.prototype, 'int', 'pixelSize')
	core.addProperty(_globals.core.Font.prototype, 'int', 'pointSize')
	core.addProperty(_globals.core.Font.prototype, 'int', 'lineHeight')
	core.addProperty(_globals.core.Font.prototype, 'int', 'weight')//=====[component core.BorderSide]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.core.BorderSide = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);

}
	_globals.core.BorderSide.prototype = Object.create(_globals.core.Object.prototype)
	_globals.core.BorderSide.prototype.constructor = _globals.core.BorderSide
	_globals.core.BorderSide.prototype.componentName = 'core.BorderSide'
	_globals.core.BorderSide.prototype._update = function(name,value) {
		switch(name) {
			case 'width': this._updateStyle(); break
			case 'color': this._updateStyle(); break
		}
		_globals.core.Object.prototype._update.apply(this, arguments);
	}
	_globals.core.BorderSide.prototype._updateStyle = function() {
		if (this.parent && this.parent.parent) {
			var pp = this.parent.parent
			if (pp) {
				var cssname = 'border-' + this.name
				if (this.width) {
					pp.style(cssname, this.width + "px solid " + _globals.core.normalizeColor(this.color))
				} else
					pp.style(cssname, '')
			}
		}
	}
	core.addProperty(_globals.core.BorderSide.prototype, 'string', 'name')
	core.addProperty(_globals.core.BorderSide.prototype, 'int', 'width')
	core.addProperty(_globals.core.BorderSide.prototype, 'color', 'color')//=====[component core.Border]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.core.Border = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);

}
	_globals.core.Border.prototype = Object.create(_globals.core.Object.prototype)
	_globals.core.Border.prototype.constructor = _globals.core.Border
	_globals.core.Border.prototype.componentName = 'core.Border'
	_globals.core.Border.prototype._update = function(name,value) {
		switch(name) {
			case 'width': this.parent.style({'border-width': value, 'margin-left': -value, 'margin-top': -value}); break;
			case 'color': this.parent.style('border-color', _globals.core.normalizeColor(value)); break;
			case 'style': this.parent.style('border-style', value); break
		}
		_globals.core.Object.prototype._update.apply(this, arguments)
	}
	core.addProperty(_globals.core.Border.prototype, 'int', 'width')
	core.addProperty(_globals.core.Border.prototype, 'color', 'color')
	core.addProperty(_globals.core.Border.prototype, 'string', 'style')
	core.addProperty(_globals.core.Border.prototype, 'BorderSide', 'left')
	core.addProperty(_globals.core.Border.prototype, 'BorderSide', 'right')
	core.addProperty(_globals.core.Border.prototype, 'BorderSide', 'top')
	core.addProperty(_globals.core.Border.prototype, 'BorderSide', 'bottom')

	_globals.core.Border.prototype.__create = function(__closure) {
		_globals.core.Object.prototype.__create.call(this, __closure.__base = { })
//creating component core.<anonymous>
		var this$top = new _globals.core.BorderSide(this)
		__closure.this$top = this$top

//creating component BorderSide
		this$top.__create(__closure.__closure_this$top = { })

		this.top = this$top
//creating component core.<anonymous>
		var this$right = new _globals.core.BorderSide(this)
		__closure.this$right = this$right

//creating component BorderSide
		this$right.__create(__closure.__closure_this$right = { })

		this.right = this$right
//creating component core.<anonymous>
		var this$bottom = new _globals.core.BorderSide(this)
		__closure.this$bottom = this$bottom

//creating component BorderSide
		this$bottom.__create(__closure.__closure_this$bottom = { })

		this.bottom = this$bottom
//creating component core.<anonymous>
		var this$left = new _globals.core.BorderSide(this)
		__closure.this$left = this$left

//creating component BorderSide
		this$left.__create(__closure.__closure_this$left = { })

		this.left = this$left
	}
	_globals.core.Border.prototype.__setup = function(__closure) {
	_globals.core.Object.prototype.__setup.call(this, __closure.__base); delete __closure.__base
//setting up component BorderSide
			var this$top = __closure.this$top
			this$top.__setup(__closure.__closure_this$top)
			delete __closure.__closure_this$top

//assigning name to ("top")
			this$top._removeUpdater('name'); this$top.name = (("top"));


//setting up component BorderSide
			var this$right = __closure.this$right
			this$right.__setup(__closure.__closure_this$right)
			delete __closure.__closure_this$right

//assigning name to ("right")
			this$right._removeUpdater('name'); this$right.name = (("right"));


//setting up component BorderSide
			var this$bottom = __closure.this$bottom
			this$bottom.__setup(__closure.__closure_this$bottom)
			delete __closure.__closure_this$bottom

//assigning name to ("bottom")
			this$bottom._removeUpdater('name'); this$bottom.name = (("bottom"));


//setting up component BorderSide
			var this$left = __closure.this$left
			this$left.__setup(__closure.__closure_this$left)
			delete __closure.__closure_this$left

//assigning name to ("left")
			this$left._removeUpdater('name'); this$left.name = (("left"));
}
//=====[component controls.mixins.HoverMixin]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.controls.mixins.HoverMixin = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);
	//custom constructor:
	{
		this.element = this.parent.element;
		this.parent.style('cursor', this.cursor) 
		this._bindClick(this.clickable)
		this._bindHover(this.enabled)
		this._bindActiveHover(this.activeHoverEnabled)
	}

}
	_globals.controls.mixins.HoverMixin.prototype = Object.create(_globals.core.Object.prototype)
	_globals.controls.mixins.HoverMixin.prototype.constructor = _globals.controls.mixins.HoverMixin
	_globals.controls.mixins.HoverMixin.prototype.componentName = 'controls.mixins.HoverMixin'
	_globals.controls.mixins.HoverMixin.prototype._bindClick = function(value) {
		if (value && !this._hmClickBinder) {
			this._hmClickBinder = new _globals.core.EventBinder(this.element)
			this._hmClickBinder.on('click', _globals.core.createSignalForwarder(this.parent, 'clicked').bind(this))
		}
		if (this._hmClickBinder)
			this._hmClickBinder.enable(value)
	}
	_globals.controls.mixins.HoverMixin.prototype._bindHover = function(value) {
		if (value && !this._hmHoverBinder) {
			this._hmHoverBinder = new _globals.core.EventBinder(this.parent.element)
			this._hmHoverBinder.on('mouseenter', function() { this.value = true }.bind(this))
			this._hmHoverBinder.on('mouseleave', function() { this.value = false }.bind(this))
		}
		if (this._hmHoverBinder)
			this._hmHoverBinder.enable(value)
	}
	_globals.controls.mixins.HoverMixin.prototype._bindActiveHover = function(value) {
		if (value && !this._hmActiveHoverBinder) {
			this._hmActiveHoverBinder = new _globals.core.EventBinder(this.parent.element)
			this._hmActiveHoverBinder.on('mouseover', function() { this.activeHover = true }.bind(this))
			this._hmActiveHoverBinder.on('mouseout', function() { this.activeHover = false }.bind(this))
		}
		if (this._hmActiveHoverBinder)
		{
			this._hmActiveHoverBinder.enable(value)
		}
	}
	core.addProperty(_globals.controls.mixins.HoverMixin.prototype, 'bool', 'enabled', (true))
	core.addProperty(_globals.controls.mixins.HoverMixin.prototype, 'bool', 'clickable', (true))
	core.addProperty(_globals.controls.mixins.HoverMixin.prototype, 'bool', 'activeHoverEnabled', (false))
	core.addProperty(_globals.controls.mixins.HoverMixin.prototype, 'bool', 'value')
	core.addProperty(_globals.controls.mixins.HoverMixin.prototype, 'bool', 'activeHover', (false))
	core.addProperty(_globals.controls.mixins.HoverMixin.prototype, 'string', 'cursor')

	_globals.controls.mixins.HoverMixin.prototype.__create = function(__closure) {
		_globals.core.Object.prototype.__create.call(this, __closure.__base = { })

	}
	_globals.controls.mixins.HoverMixin.prototype.__setup = function(__closure) {
	_globals.core.Object.prototype.__setup.call(this, __closure.__base); delete __closure.__base
this.onChanged('cursor', (function(value) {
		this.parent.style('cursor', value)
	} ).bind(this))
			this.onChanged('clickable', (function(value) { this._bindClick(value) } ).bind(this))
			this.onChanged('enabled', (function(value) { this._bindHover(value) } ).bind(this))
			this.onChanged('activeHoverEnabled', (function(value) { this._bindActiveHover(value) } ).bind(this))
}
//=====[component controls.mixins.WheelMixin]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.controls.mixins.WheelMixin = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);
	//custom constructor:
	{
		this.element = this.parent.element;
		this._bindWheel(this.enabled)
	}

}
	_globals.controls.mixins.WheelMixin.prototype = Object.create(_globals.core.Object.prototype)
	_globals.controls.mixins.WheelMixin.prototype.constructor = _globals.controls.mixins.WheelMixin
	_globals.controls.mixins.WheelMixin.prototype.componentName = 'controls.mixins.WheelMixin'
	_globals.controls.mixins.WheelMixin.prototype.wheel = _globals.core.createSignal('wheel')
	_globals.controls.mixins.WheelMixin.prototype._bindWheel = function(value) {
		if (value && !this._wheelBinder) {
			this._wheelBinder = new _globals.core.EventBinder(this.parent.element)
			this._wheelBinder.on('wheel', _globals.core.createSignalForwarder(this.parent, 'wheel').bind(this))
		}
		if (this._wheelBinder)
			this._wheelBinder.enable(value)
	}
	core.addProperty(_globals.controls.mixins.WheelMixin.prototype, 'bool', 'enabled', (true))

	_globals.controls.mixins.WheelMixin.prototype.__create = function(__closure) {
		_globals.core.Object.prototype.__create.call(this, __closure.__base = { })

	}
	_globals.controls.mixins.WheelMixin.prototype.__setup = function(__closure) {
	_globals.core.Object.prototype.__setup.call(this, __closure.__base); delete __closure.__base
this.onChanged('enabled', (function(value) { this._bindWheel(value) } ).bind(this))
}
//=====[component vc.UiVc]=====================

/**
 * @constructor
 * @extends {_globals.core.Item}
 */
	_globals.vc.UiVc = function(parent, _delegate) {
	_globals.core.Item.apply(this, arguments);

}
	_globals.vc.UiVc.prototype = Object.create(_globals.core.Item.prototype)
	_globals.vc.UiVc.prototype.constructor = _globals.vc.UiVc
	_globals.vc.UiVc.prototype.componentName = 'vc.UiVc'

	_globals.vc.UiVc.prototype.__create = function(__closure) {
		_globals.core.Item.prototype.__create.call(this, __closure.__base = { })
var this$child0 = new _globals.core.Rectangle(this)
		__closure.this$child0 = this$child0

//creating component Rectangle
		this$child0.__create(__closure.__closure_this$child0 = { })

		var this$child1 = new _globals.core.Rectangle(this)
		__closure.this$child1 = this$child1

//creating component Rectangle
		this$child1.__create(__closure.__closure_this$child1 = { })

		var this$child2 = new _globals.core.Rectangle(this)
		__closure.this$child2 = this$child2

//creating component Rectangle
		this$child2.__create(__closure.__closure_this$child2 = { })

		var this$child3 = new _globals.core.Repeater(this)
		__closure.this$child3 = this$child3

//creating component Repeater
		this$child3.__create(__closure.__closure_this$child3 = { })
//creating component vc.<anonymous>
		var this_child3$model = new _globals.core.ListModel(this$child3)
		__closure.this_child3$model = this_child3$model

//creating component ListModel
		this_child3$model.__create(__closure.__closure_this_child3$model = { })

		this$child3.model = this_child3$model
		this$child3.delegate = (function() {
		var delegate = new _globals.vc.Cover(this$child3, true)
		var __closure = { delegate: delegate }

//creating component Cover
			delegate.__create(__closure.__closure_delegate = { })


//setting up component Cover
			var delegate = __closure.delegate
			delegate.__setup(__closure.__closure_delegate)
			delete __closure.__closure_delegate

			delegate.on('clicked', (function() { this.open = true; this._get('ltr').show(this);} ).bind(delegate))


		return delegate
}).bind(this$child3)
		this$child3._setId('letterView')
		var this$child4 = new _globals.core.Rectangle(this)
		__closure.this$child4 = this$child4

//creating component Rectangle
		this$child4.__create(__closure.__closure_this$child4 = { })
	core.addProperty(this$child4, 'Mixin', 'hover')
		var this_child4$child0 = new _globals.controls.mixins.ImageMixin(this$child4)
		__closure.this_child4$child0 = this_child4$child0

//creating component ImageMixin
		this_child4$child0.__create(__closure.__closure_this_child4$child0 = { })

		var this_child4$child1 = new _globals.controls.pure.MaterialIcon(this$child4)
		__closure.this_child4$child1 = this_child4$child1

//creating component MaterialIcon
		this_child4$child1.__create(__closure.__closure_this_child4$child1 = { })
	core.addProperty(this_child4$child1, 'Mixin', 'hover')
//creating component vc.<anonymous>
		var this_child4_child1$hover = new _globals.controls.mixins.HoverMixin(this_child4$child1)
		__closure.this_child4_child1$hover = this_child4_child1$hover

//creating component HoverMixin
		this_child4_child1$hover.__create(__closure.__closure_this_child4_child1$hover = { })

		this_child4$child1.hover = this_child4_child1$hover
//creating component vc.<anonymous>
		var this_child4$hover = new _globals.controls.mixins.HoverMixin(this$child4)
		__closure.this_child4$hover = this_child4$hover

//creating component HoverMixin
		this_child4$hover.__create(__closure.__closure_this_child4$hover = { })

		this$child4.hover = this_child4$hover
		var this$child5 = new _globals.core.Image(this)
		__closure.this$child5 = this$child5

//creating component Image
		this$child5.__create(__closure.__closure_this$child5 = { })

		var this$child6 = new _globals.core.Rectangle(this)
		__closure.this$child6 = this$child6

//creating component Rectangle
		this$child6.__create(__closure.__closure_this$child6 = { })
		var this_child6$child0 = new _globals.controls.mixins.ImageMixin(this$child6)
		__closure.this_child6$child0 = this_child6$child0

//creating component ImageMixin
		this_child6$child0.__create(__closure.__closure_this_child6$child0 = { })

		var this_child6$child1 = new _globals.vc.ChalkText(this$child6)
		__closure.this_child6$child1 = this_child6$child1

//creating component ChalkText
		this_child6$child1.__create(__closure.__closure_this_child6$child1 = { })

		var this_child6$child2 = new _globals.vc.ChalkText(this$child6)
		__closure.this_child6$child2 = this_child6$child2

//creating component ChalkText
		this_child6$child2.__create(__closure.__closure_this_child6$child2 = { })

		var this_child6$child3 = new _globals.vc.ChalkText(this$child6)
		__closure.this_child6$child3 = this_child6$child3

//creating component ChalkText
		this_child6$child3.__create(__closure.__closure_this_child6$child3 = { })

		var this_child6$child4 = new _globals.vc.ChalkText(this$child6)
		__closure.this_child6$child4 = this_child6$child4

//creating component ChalkText
		this_child6$child4.__create(__closure.__closure_this_child6$child4 = { })

		var this_child6$child5 = new _globals.vc.ChalkText(this$child6)
		__closure.this_child6$child5 = this_child6$child5

//creating component ChalkText
		this_child6$child5.__create(__closure.__closure_this_child6$child5 = { })

		var this_child6$child6 = new _globals.vc.ChalkText(this$child6)
		__closure.this_child6$child6 = this_child6$child6

//creating component ChalkText
		this_child6$child6.__create(__closure.__closure_this_child6$child6 = { })

		var this_child6$child7 = new _globals.vc.ChalkText(this$child6)
		__closure.this_child6$child7 = this_child6$child7

//creating component ChalkText
		this_child6$child7.__create(__closure.__closure_this_child6$child7 = { })

		var this$child7 = new _globals.core.Image(this)
		__closure.this$child7 = this$child7

//creating component Image
		this$child7.__create(__closure.__closure_this$child7 = { })
		var this_child7$child0 = new _globals.controls.mixins.DragMixin(this$child7)
		__closure.this_child7$child0 = this_child7$child0

//creating component DragMixin
		this_child7$child0.__create(__closure.__closure_this_child7$child0 = { })

		var this$child8 = new _globals.core.Image(this)
		__closure.this$child8 = this$child8

//creating component Image
		this$child8.__create(__closure.__closure_this$child8 = { })
		var this_child8$child0 = new _globals.controls.mixins.DragMixin(this$child8)
		__closure.this_child8$child0 = this_child8$child0

//creating component DragMixin
		this_child8$child0.__create(__closure.__closure_this_child8$child0 = { })

		var this_child8$child1 = new _globals.controls.mixins.HoverMixin(this$child8)
		__closure.this_child8$child1 = this_child8$child1

//creating component HoverMixin
		this_child8$child1.__create(__closure.__closure_this_child8$child1 = { })

		var this$child9 = new _globals.core.Rectangle(this)
		__closure.this$child9 = this$child9

//creating component Rectangle
		this$child9.__create(__closure.__closure_this$child9 = { })
		this$child9._setId('dimmer')
		var this$child10 = new _globals.vc.Letter(this)
		__closure.this$child10 = this$child10

//creating component Letter
		this$child10.__create(__closure.__closure_this$child10 = { })
		this$child10._setId('ltr')
	}
	_globals.vc.UiVc.prototype.__setup = function(__closure) {
	_globals.core.Item.prototype.__setup.call(this, __closure.__base); delete __closure.__base
//assigning clip to (true)
			this._removeUpdater('clip'); this.clip = ((true));
//assigning anchors.fill to (this._get('context'))
			var update$this$anchors_fill = (function() { this._get('anchors').fill = ((this._get('context'))); }).bind(this)
			var dep$this$anchors_fill$0 = this
			this.connectOnChanged(dep$this$anchors_fill$0, 'context', update$this$anchors_fill)
			this._removeUpdater('anchors.fill', [[dep$this$anchors_fill$0, 'context', update$this$anchors_fill]])
			update$this$anchors_fill();


//setting up component Rectangle
			var this$child0 = __closure.this$child0
			this$child0.__setup(__closure.__closure_this$child0)
			delete __closure.__closure_this$child0

//assigning y to ((this._get('parent')._get('height') * ((70) / 100)))
			var update$this_child0$y = (function() { this$child0.y = (((this._get('parent')._get('height') * ((70) / 100)))); }).bind(this$child0)
			var dep$this_child0$y$0 = this$child0._get('parent')
			this$child0.connectOnChanged(dep$this_child0$y$0, 'height', update$this_child0$y)
			this$child0._removeUpdater('y', [[dep$this_child0$y$0, 'height', update$this_child0$y]])
			update$this_child0$y();
//assigning width to ((this._get('parent')._get('width') * ((100) / 100)))
			var update$this_child0$width = (function() { this$child0.width = (((this._get('parent')._get('width') * ((100) / 100)))); }).bind(this$child0)
			var dep$this_child0$width$0 = this$child0._get('parent')
			this$child0.connectOnChanged(dep$this_child0$width$0, 'width', update$this_child0$width)
			this$child0._removeUpdater('width', [[dep$this_child0$width$0, 'width', update$this_child0$width]])
			update$this_child0$width();
//assigning color to ("#424242")
			this$child0._removeUpdater('color'); this$child0.color = (("#424242"));
//assigning height to ((this._get('parent')._get('height') * ((30) / 100)))
			var update$this_child0$height = (function() { this$child0.height = (((this._get('parent')._get('height') * ((30) / 100)))); }).bind(this$child0)
			var dep$this_child0$height$0 = this$child0._get('parent')
			this$child0.connectOnChanged(dep$this_child0$height$0, 'height', update$this_child0$height)
			this$child0._removeUpdater('height', [[dep$this_child0$height$0, 'height', update$this_child0$height]])
			update$this_child0$height();

			this.addChild(this$child0)

//setting up component Rectangle
			var this$child1 = __closure.this$child1
			this$child1.__setup(__closure.__closure_this$child1)
			delete __closure.__closure_this$child1

//assigning color to ("#81C784")
			this$child1._removeUpdater('color'); this$child1.color = (("#81C784"));
//assigning width to ((this._get('parent')._get('width') * ((100) / 100)))
			var update$this_child1$width = (function() { this$child1.width = (((this._get('parent')._get('width') * ((100) / 100)))); }).bind(this$child1)
			var dep$this_child1$width$0 = this$child1._get('parent')
			this$child1.connectOnChanged(dep$this_child1$width$0, 'width', update$this_child1$width)
			this$child1._removeUpdater('width', [[dep$this_child1$width$0, 'width', update$this_child1$width]])
			update$this_child1$width();
//assigning height to ((this._get('parent')._get('height') * ((70) / 100)))
			var update$this_child1$height = (function() { this$child1.height = (((this._get('parent')._get('height') * ((70) / 100)))); }).bind(this$child1)
			var dep$this_child1$height$0 = this$child1._get('parent')
			this$child1.connectOnChanged(dep$this_child1$height$0, 'height', update$this_child1$height)
			this$child1._removeUpdater('height', [[dep$this_child1$height$0, 'height', update$this_child1$height]])
			update$this_child1$height();

			this.addChild(this$child1)

//setting up component Rectangle
			var this$child2 = __closure.this$child2
			this$child2.__setup(__closure.__closure_this$child2)
			delete __closure.__closure_this$child2

//assigning color to ("#FFECB3")
			this$child2._removeUpdater('color'); this$child2.color = (("#FFECB3"));
//assigning transform.perspective to (1000)
			this$child2._removeUpdater('transform.perspective'); this$child2._get('transform').perspective = ((1000));
//assigning transform.rotateX to (20)
			this$child2._removeUpdater('transform.rotateX'); this$child2._get('transform').rotateX = ((20));
//assigning height to ((this._get('parent')._get('height') * ((55) / 100)))
			var update$this_child2$height = (function() { this$child2.height = (((this._get('parent')._get('height') * ((55) / 100)))); }).bind(this$child2)
			var dep$this_child2$height$0 = this$child2._get('parent')
			this$child2.connectOnChanged(dep$this_child2$height$0, 'height', update$this_child2$height)
			this$child2._removeUpdater('height', [[dep$this_child2$height$0, 'height', update$this_child2$height]])
			update$this_child2$height();
//assigning width to ((this._get('parent')._get('width') * ((80) / 100)))
			var update$this_child2$width = (function() { this$child2.width = (((this._get('parent')._get('width') * ((80) / 100)))); }).bind(this$child2)
			var dep$this_child2$width$0 = this$child2._get('parent')
			this$child2.connectOnChanged(dep$this_child2$width$0, 'width', update$this_child2$width)
			this$child2._removeUpdater('width', [[dep$this_child2$width$0, 'width', update$this_child2$width]])
			update$this_child2$width();
//assigning y to ((this._get('parent')._get('height') * ((45) / 100)))
			var update$this_child2$y = (function() { this$child2.y = (((this._get('parent')._get('height') * ((45) / 100)))); }).bind(this$child2)
			var dep$this_child2$y$0 = this$child2._get('parent')
			this$child2.connectOnChanged(dep$this_child2$y$0, 'height', update$this_child2$y)
			this$child2._removeUpdater('y', [[dep$this_child2$y$0, 'height', update$this_child2$y]])
			update$this_child2$y();
//assigning x to ((this._get('parent')._get('width') * ((10) / 100)))
			var update$this_child2$x = (function() { this$child2.x = (((this._get('parent')._get('width') * ((10) / 100)))); }).bind(this$child2)
			var dep$this_child2$x$0 = this$child2._get('parent')
			this$child2.connectOnChanged(dep$this_child2$x$0, 'width', update$this_child2$x)
			this$child2._removeUpdater('x', [[dep$this_child2$x$0, 'width', update$this_child2$x]])
			update$this_child2$x();

			this.addChild(this$child2)

//setting up component Repeater
			var this$child3 = __closure.this$child3
			this$child3.__setup(__closure.__closure_this$child3)
			delete __closure.__closure_this$child3

//assigning width to ((this._get('parent')._get('width') * ((100) / 100)))
			var update$this_child3$width = (function() { this$child3.width = (((this._get('parent')._get('width') * ((100) / 100)))); }).bind(this$child3)
			var dep$this_child3$width$0 = this$child3._get('parent')
			this$child3.connectOnChanged(dep$this_child3$width$0, 'width', update$this_child3$width)
			this$child3._removeUpdater('width', [[dep$this_child3$width$0, 'width', update$this_child3$width]])
			update$this_child3$width();

//setting up component ListModel
			var this_child3$model = __closure.this_child3$model
			this_child3$model.__setup(__closure.__closure_this_child3$model)
			delete __closure.__closure_this_child3$model

			this_child3$model.update = (function() {
				for ( var i = 0; i < 7; ++i) {
					this.append({
						x: i * 100,
						y: i * 0
					});
				}
			} ).bind(this_child3$model)
			this_child3$model._context._onCompleted((function() {
				this.update();
			} ).bind(this_child3$model))

//assigning height to ((this._get('parent')._get('height') * ((100) / 100)))
			var update$this_child3$height = (function() { this$child3.height = (((this._get('parent')._get('height') * ((100) / 100)))); }).bind(this$child3)
			var dep$this_child3$height$0 = this$child3._get('parent')
			this$child3.connectOnChanged(dep$this_child3$height$0, 'height', update$this_child3$height)
			this$child3._removeUpdater('height', [[dep$this_child3$height$0, 'height', update$this_child3$height]])
			update$this_child3$height();

			this.addChild(this$child3)

//setting up component Rectangle
			var this$child4 = __closure.this$child4
			this$child4.__setup(__closure.__closure_this$child4)
			delete __closure.__closure_this$child4

//assigning border.color to ("#FAFAFA")
			this$child4._removeUpdater('border.color'); this$child4._get('border').color = (("#FAFAFA"));

//setting up component HoverMixin
			var this_child4$hover = __closure.this_child4$hover
			this_child4$hover.__setup(__closure.__closure_this_child4$hover)
			delete __closure.__closure_this_child4$hover


//assigning height to ((this._get('parent')._get('height') * ((45) / 100)))
			var update$this_child4$height = (function() { this$child4.height = (((this._get('parent')._get('height') * ((45) / 100)))); }).bind(this$child4)
			var dep$this_child4$height$0 = this$child4._get('parent')
			this$child4.connectOnChanged(dep$this_child4$height$0, 'height', update$this_child4$height)
			this$child4._removeUpdater('height', [[dep$this_child4$height$0, 'height', update$this_child4$height]])
			update$this_child4$height();
//assigning width to ((this._get('parent')._get('width') * ((45) / 100)))
			var update$this_child4$width = (function() { this$child4.width = (((this._get('parent')._get('width') * ((45) / 100)))); }).bind(this$child4)
			var dep$this_child4$width$0 = this$child4._get('parent')
			this$child4.connectOnChanged(dep$this_child4$width$0, 'width', update$this_child4$width)
			this$child4._removeUpdater('width', [[dep$this_child4$width$0, 'width', update$this_child4$width]])
			update$this_child4$width();
//assigning radius to (5)
			this$child4._removeUpdater('radius'); this$child4.radius = ((5));
//assigning border.width to (8)
			this$child4._removeUpdater('border.width'); this$child4._get('border').width = ((8));
//assigning x to ((this._get('parent')._get('width') * ((55) / 100)))
			var update$this_child4$x = (function() { this$child4.x = (((this._get('parent')._get('width') * ((55) / 100)))); }).bind(this$child4)
			var dep$this_child4$x$0 = this$child4._get('parent')
			this$child4.connectOnChanged(dep$this_child4$x$0, 'width', update$this_child4$x)
			this$child4._removeUpdater('x', [[dep$this_child4$x$0, 'width', update$this_child4$x]])
			update$this_child4$x();


//setting up component ImageMixin
			var this_child4$child0 = __closure.this_child4$child0
			this_child4$child0.__setup(__closure.__closure_this_child4$child0)
			delete __closure.__closure_this_child4$child0

//assigning source to ("res/sf.jpg")
			this_child4$child0._removeUpdater('source'); this_child4$child0.source = (("res/sf.jpg"));
//assigning fillMode to (_globals.core.Image.prototype.PreserveAspectCrop)
			this_child4$child0._removeUpdater('fillMode'); this_child4$child0.fillMode = ((_globals.core.Image.prototype.PreserveAspectCrop));

			this$child4.addChild(this_child4$child0)

//setting up component MaterialIcon
			var this_child4$child1 = __closure.this_child4$child1
			this_child4$child1.__setup(__closure.__closure_this_child4$child1)
			delete __closure.__closure_this_child4$child1

//assigning opacity to (this._get('visible') ? 1 : 0)
			var update$this_child4_child1$opacity = (function() { this_child4$child1.opacity = ((this._get('visible') ? 1 : 0)); }).bind(this_child4$child1)
			var dep$this_child4_child1$opacity$0 = this_child4$child1
			this_child4$child1.connectOnChanged(dep$this_child4_child1$opacity$0, 'visible', update$this_child4_child1$opacity)
			this_child4$child1._removeUpdater('opacity', [[dep$this_child4_child1$opacity$0, 'visible', update$this_child4_child1$opacity]])
			update$this_child4_child1$opacity();

//setting up component HoverMixin
			var this_child4_child1$hover = __closure.this_child4_child1$hover
			this_child4_child1$hover.__setup(__closure.__closure_this_child4_child1$hover)
			delete __closure.__closure_this_child4_child1$hover

//assigning cursor to ("pointer")
			this_child4_child1$hover._removeUpdater('cursor'); this_child4_child1$hover.cursor = (("pointer"));

//assigning color to (this._get('hover')._get('value') ? "#FFCDD2" : "white")
			var update$this_child4_child1$color = (function() { this_child4$child1.color = ((this._get('hover')._get('value') ? "#FFCDD2" : "white")); }).bind(this_child4$child1)
			var dep$this_child4_child1$color$0 = this_child4$child1._get('hover')
			this_child4$child1.connectOnChanged(dep$this_child4_child1$color$0, 'value', update$this_child4_child1$color)
			this_child4$child1._removeUpdater('color', [[dep$this_child4_child1$color$0, 'value', update$this_child4_child1$color]])
			update$this_child4_child1$color();
//assigning visible to (this._get('parent')._get('hover')._get('value'))
			var update$this_child4_child1$visible = (function() { this_child4$child1.visible = ((this._get('parent')._get('hover')._get('value'))); }).bind(this_child4$child1)
			var dep$this_child4_child1$visible$0 = this_child4$child1._get('parent')._get('hover')
			this_child4$child1.connectOnChanged(dep$this_child4_child1$visible$0, 'value', update$this_child4_child1$visible)
			this_child4$child1._removeUpdater('visible', [[dep$this_child4_child1$visible$0, 'value', update$this_child4_child1$visible]])
			update$this_child4_child1$visible();
//assigning y to (10)
			this_child4$child1._removeUpdater('y'); this_child4$child1.y = ((10));
//assigning x to ((this._get('parent')._get('width') * ((100) / 100)) - this._get('width') - 10)
			var update$this_child4_child1$x = (function() { this_child4$child1.x = (((this._get('parent')._get('width') * ((100) / 100)) - this._get('width') - 10)); }).bind(this_child4$child1)
			var dep$this_child4_child1$x$0 = this_child4$child1._get('parent')
			this_child4$child1.connectOnChanged(dep$this_child4_child1$x$0, 'width', update$this_child4_child1$x)
			var dep$this_child4_child1$x$1 = this_child4$child1
			this_child4$child1.connectOnChanged(dep$this_child4_child1$x$1, 'width', update$this_child4_child1$x)
			this_child4$child1._removeUpdater('x', [[dep$this_child4_child1$x$0, 'width', update$this_child4_child1$x],[dep$this_child4_child1$x$1, 'width', update$this_child4_child1$x]])
			update$this_child4_child1$x();
//assigning icon to (this._get('context')._get('fullscreen') ? "fullscreen_exit" : "fullscreen")
			var update$this_child4_child1$icon = (function() { this_child4$child1.icon = ((this._get('context')._get('fullscreen') ? "fullscreen_exit" : "fullscreen")); }).bind(this_child4$child1)
			var dep$this_child4_child1$icon$0 = this_child4$child1._get('context')
			this_child4$child1.connectOnChanged(dep$this_child4_child1$icon$0, 'fullscreen', update$this_child4_child1$icon)
			this_child4$child1._removeUpdater('icon', [[dep$this_child4_child1$icon$0, 'fullscreen', update$this_child4_child1$icon]])
			update$this_child4_child1$icon();
//assigning size to (80)
			this_child4$child1._removeUpdater('size'); this_child4$child1.size = ((80));
			this_child4$child1.on('clicked', (function() { this._get('context').fullscreen = !this._get('context').fullscreen } ).bind(this_child4$child1))
	var behavior_this_child4_child1_on_opacity = new _globals.core.Animation(this_child4$child1)
	var behavior_this_child4_child1_on_opacity__closure = { behavior_this_child4_child1_on_opacity: behavior_this_child4_child1_on_opacity }

//creating component Animation
	behavior_this_child4_child1_on_opacity.__create(behavior_this_child4_child1_on_opacity__closure.__closure_behavior_this_child4_child1_on_opacity = { })


//setting up component Animation
	var behavior_this_child4_child1_on_opacity = behavior_this_child4_child1_on_opacity__closure.behavior_this_child4_child1_on_opacity
	behavior_this_child4_child1_on_opacity.__setup(behavior_this_child4_child1_on_opacity__closure.__closure_behavior_this_child4_child1_on_opacity)
	delete behavior_this_child4_child1_on_opacity__closure.__closure_behavior_this_child4_child1_on_opacity

//assigning duration to (400)
	behavior_this_child4_child1_on_opacity._removeUpdater('duration'); behavior_this_child4_child1_on_opacity.duration = ((400));

	this_child4$child1.setAnimation('opacity', behavior_this_child4_child1_on_opacity);

	var behavior_this_child4_child1_on_color = new _globals.core.Animation(this_child4$child1)
	var behavior_this_child4_child1_on_color__closure = { behavior_this_child4_child1_on_color: behavior_this_child4_child1_on_color }

//creating component Animation
	behavior_this_child4_child1_on_color.__create(behavior_this_child4_child1_on_color__closure.__closure_behavior_this_child4_child1_on_color = { })


//setting up component Animation
	var behavior_this_child4_child1_on_color = behavior_this_child4_child1_on_color__closure.behavior_this_child4_child1_on_color
	behavior_this_child4_child1_on_color.__setup(behavior_this_child4_child1_on_color__closure.__closure_behavior_this_child4_child1_on_color)
	delete behavior_this_child4_child1_on_color__closure.__closure_behavior_this_child4_child1_on_color

//assigning duration to (400)
	behavior_this_child4_child1_on_color._removeUpdater('duration'); behavior_this_child4_child1_on_color.duration = ((400));

	this_child4$child1.setAnimation('color', behavior_this_child4_child1_on_color);

	var behavior_this_child4_child1_on_visible = new _globals.core.Animation(this_child4$child1)
	var behavior_this_child4_child1_on_visible__closure = { behavior_this_child4_child1_on_visible: behavior_this_child4_child1_on_visible }

//creating component Animation
	behavior_this_child4_child1_on_visible.__create(behavior_this_child4_child1_on_visible__closure.__closure_behavior_this_child4_child1_on_visible = { })


//setting up component Animation
	var behavior_this_child4_child1_on_visible = behavior_this_child4_child1_on_visible__closure.behavior_this_child4_child1_on_visible
	behavior_this_child4_child1_on_visible.__setup(behavior_this_child4_child1_on_visible__closure.__closure_behavior_this_child4_child1_on_visible)
	delete behavior_this_child4_child1_on_visible__closure.__closure_behavior_this_child4_child1_on_visible

//assigning duration to (400)
	behavior_this_child4_child1_on_visible._removeUpdater('duration'); behavior_this_child4_child1_on_visible.duration = ((400));

	this_child4$child1.setAnimation('visible', behavior_this_child4_child1_on_visible);

	var behavior_this_child4_child1_on_y = new _globals.core.Animation(this_child4$child1)
	var behavior_this_child4_child1_on_y__closure = { behavior_this_child4_child1_on_y: behavior_this_child4_child1_on_y }

//creating component Animation
	behavior_this_child4_child1_on_y.__create(behavior_this_child4_child1_on_y__closure.__closure_behavior_this_child4_child1_on_y = { })


//setting up component Animation
	var behavior_this_child4_child1_on_y = behavior_this_child4_child1_on_y__closure.behavior_this_child4_child1_on_y
	behavior_this_child4_child1_on_y.__setup(behavior_this_child4_child1_on_y__closure.__closure_behavior_this_child4_child1_on_y)
	delete behavior_this_child4_child1_on_y__closure.__closure_behavior_this_child4_child1_on_y

//assigning duration to (400)
	behavior_this_child4_child1_on_y._removeUpdater('duration'); behavior_this_child4_child1_on_y.duration = ((400));

	this_child4$child1.setAnimation('y', behavior_this_child4_child1_on_y);

	var behavior_this_child4_child1_on_x = new _globals.core.Animation(this_child4$child1)
	var behavior_this_child4_child1_on_x__closure = { behavior_this_child4_child1_on_x: behavior_this_child4_child1_on_x }

//creating component Animation
	behavior_this_child4_child1_on_x.__create(behavior_this_child4_child1_on_x__closure.__closure_behavior_this_child4_child1_on_x = { })


//setting up component Animation
	var behavior_this_child4_child1_on_x = behavior_this_child4_child1_on_x__closure.behavior_this_child4_child1_on_x
	behavior_this_child4_child1_on_x.__setup(behavior_this_child4_child1_on_x__closure.__closure_behavior_this_child4_child1_on_x)
	delete behavior_this_child4_child1_on_x__closure.__closure_behavior_this_child4_child1_on_x

//assigning duration to (400)
	behavior_this_child4_child1_on_x._removeUpdater('duration'); behavior_this_child4_child1_on_x.duration = ((400));

	this_child4$child1.setAnimation('x', behavior_this_child4_child1_on_x);

	var behavior_this_child4_child1_on_font = new _globals.core.Animation(this_child4$child1)
	var behavior_this_child4_child1_on_font__closure = { behavior_this_child4_child1_on_font: behavior_this_child4_child1_on_font }

//creating component Animation
	behavior_this_child4_child1_on_font.__create(behavior_this_child4_child1_on_font__closure.__closure_behavior_this_child4_child1_on_font = { })


//setting up component Animation
	var behavior_this_child4_child1_on_font = behavior_this_child4_child1_on_font__closure.behavior_this_child4_child1_on_font
	behavior_this_child4_child1_on_font.__setup(behavior_this_child4_child1_on_font__closure.__closure_behavior_this_child4_child1_on_font)
	delete behavior_this_child4_child1_on_font__closure.__closure_behavior_this_child4_child1_on_font

//assigning duration to (400)
	behavior_this_child4_child1_on_font._removeUpdater('duration'); behavior_this_child4_child1_on_font.duration = ((400));

	this_child4$child1.setAnimation('font', behavior_this_child4_child1_on_font);

			this$child4.addChild(this_child4$child1)
			this.addChild(this$child4)

//setting up component Image
			var this$child5 = __closure.this$child5
			this$child5.__setup(__closure.__closure_this$child5)
			delete __closure.__closure_this$child5

//assigning y to ((this._get('parent')._get('height') * ((35) / 100)))
			var update$this_child5$y = (function() { this$child5.y = (((this._get('parent')._get('height') * ((35) / 100)))); }).bind(this$child5)
			var dep$this_child5$y$0 = this$child5._get('parent')
			this$child5.connectOnChanged(dep$this_child5$y$0, 'height', update$this_child5$y)
			this$child5._removeUpdater('y', [[dep$this_child5$y$0, 'height', update$this_child5$y]])
			update$this_child5$y();
//assigning source to ("res/seat.svg")
			this$child5._removeUpdater('source'); this$child5.source = (("res/seat.svg"));
//assigning x to ((this._get('parent')._get('width') * ((80) / 100)))
			var update$this_child5$x = (function() { this$child5.x = (((this._get('parent')._get('width') * ((80) / 100)))); }).bind(this$child5)
			var dep$this_child5$x$0 = this$child5._get('parent')
			this$child5.connectOnChanged(dep$this_child5$x$0, 'width', update$this_child5$x)
			this$child5._removeUpdater('x', [[dep$this_child5$x$0, 'width', update$this_child5$x]])
			update$this_child5$x();
//assigning width to (this._get('height'))
			var update$this_child5$width = (function() { this$child5.width = ((this._get('height'))); }).bind(this$child5)
			var dep$this_child5$width$0 = this$child5
			this$child5.connectOnChanged(dep$this_child5$width$0, 'height', update$this_child5$width)
			this$child5._removeUpdater('width', [[dep$this_child5$width$0, 'height', update$this_child5$width]])
			update$this_child5$width();
//assigning height to ((this._get('parent')._get('height') * ((40) / 100)))
			var update$this_child5$height = (function() { this$child5.height = (((this._get('parent')._get('height') * ((40) / 100)))); }).bind(this$child5)
			var dep$this_child5$height$0 = this$child5._get('parent')
			this$child5.connectOnChanged(dep$this_child5$height$0, 'height', update$this_child5$height)
			this$child5._removeUpdater('height', [[dep$this_child5$height$0, 'height', update$this_child5$height]])
			update$this_child5$height();

			this.addChild(this$child5)

//setting up component Rectangle
			var this$child6 = __closure.this$child6
			this$child6.__setup(__closure.__closure_this$child6)
			delete __closure.__closure_this$child6

//assigning border.color to ("#8D6E63")
			this$child6._removeUpdater('border.color'); this$child6._get('border').color = (("#8D6E63"));
//assigning width to ((this._get('parent')._get('width') * ((40) / 100)))
			var update$this_child6$width = (function() { this$child6.width = (((this._get('parent')._get('width') * ((40) / 100)))); }).bind(this$child6)
			var dep$this_child6$width$0 = this$child6._get('parent')
			this$child6.connectOnChanged(dep$this_child6$width$0, 'width', update$this_child6$width)
			this$child6._removeUpdater('width', [[dep$this_child6$width$0, 'width', update$this_child6$width]])
			update$this_child6$width();
//assigning height to ((this._get('parent')._get('height') * ((40) / 100)))
			var update$this_child6$height = (function() { this$child6.height = (((this._get('parent')._get('height') * ((40) / 100)))); }).bind(this$child6)
			var dep$this_child6$height$0 = this$child6._get('parent')
			this$child6.connectOnChanged(dep$this_child6$height$0, 'height', update$this_child6$height)
			this$child6._removeUpdater('height', [[dep$this_child6$height$0, 'height', update$this_child6$height]])
			update$this_child6$height();
//assigning border.width to (12)
			this$child6._removeUpdater('border.width'); this$child6._get('border').width = ((12));
//assigning radius to (2)
			this$child6._removeUpdater('radius'); this$child6.radius = ((2));
//assigning y to ((this._get('parent')._get('height') * ((5) / 100)))
			var update$this_child6$y = (function() { this$child6.y = (((this._get('parent')._get('height') * ((5) / 100)))); }).bind(this$child6)
			var dep$this_child6$y$0 = this$child6._get('parent')
			this$child6.connectOnChanged(dep$this_child6$y$0, 'height', update$this_child6$y)
			this$child6._removeUpdater('y', [[dep$this_child6$y$0, 'height', update$this_child6$y]])
			update$this_child6$y();
//assigning x to ((this._get('parent')._get('width') * ((5) / 100)))
			var update$this_child6$x = (function() { this$child6.x = (((this._get('parent')._get('width') * ((5) / 100)))); }).bind(this$child6)
			var dep$this_child6$x$0 = this$child6._get('parent')
			this$child6.connectOnChanged(dep$this_child6$x$0, 'width', update$this_child6$x)
			this$child6._removeUpdater('x', [[dep$this_child6$x$0, 'width', update$this_child6$x]])
			update$this_child6$x();


//setting up component ImageMixin
			var this_child6$child0 = __closure.this_child6$child0
			this_child6$child0.__setup(__closure.__closure_this_child6$child0)
			delete __closure.__closure_this_child6$child0

//assigning source to ("res/chalkboard.jpg")
			this_child6$child0._removeUpdater('source'); this_child6$child0.source = (("res/chalkboard.jpg"));

			this$child6.addChild(this_child6$child0)

//setting up component ChalkText
			var this_child6$child1 = __closure.this_child6$child1
			this_child6$child1.__setup(__closure.__closure_this_child6$child1)
			delete __closure.__closure_this_child6$child1

//assigning y to (5)
			this_child6$child1._removeUpdater('y'); this_child6$child1.y = ((5));
//assigning x to (5)
			this_child6$child1._removeUpdater('x'); this_child6$child1.x = ((5));
//assigning font.family to ("Shadows Into Light")
			this_child6$child1._removeUpdater('font.family'); this_child6$child1._get('font').family = (("Shadows Into Light"));

			this$child6.addChild(this_child6$child1)

//setting up component ChalkText
			var this_child6$child2 = __closure.this_child6$child2
			this_child6$child2.__setup(__closure.__closure_this_child6$child2)
			delete __closure.__closure_this_child6$child2

//assigning y to (45)
			this_child6$child2._removeUpdater('y'); this_child6$child2.y = ((45));
//assigning x to (5)
			this_child6$child2._removeUpdater('x'); this_child6$child2.x = ((5));
//assigning font.family to ("Reenie Beanie")
			this_child6$child2._removeUpdater('font.family'); this_child6$child2._get('font').family = (("Reenie Beanie"));

			this$child6.addChild(this_child6$child2)

//setting up component ChalkText
			var this_child6$child3 = __closure.this_child6$child3
			this_child6$child3.__setup(__closure.__closure_this_child6$child3)
			delete __closure.__closure_this_child6$child3

//assigning y to (85)
			this_child6$child3._removeUpdater('y'); this_child6$child3.y = ((85));
//assigning x to (5)
			this_child6$child3._removeUpdater('x'); this_child6$child3.x = ((5));
//assigning font.family to ("Cabin Sketch")
			this_child6$child3._removeUpdater('font.family'); this_child6$child3._get('font').family = (("Cabin Sketch"));

			this$child6.addChild(this_child6$child3)

//setting up component ChalkText
			var this_child6$child4 = __closure.this_child6$child4
			this_child6$child4.__setup(__closure.__closure_this_child6$child4)
			delete __closure.__closure_this_child6$child4

//assigning y to (125)
			this_child6$child4._removeUpdater('y'); this_child6$child4.y = ((125));
//assigning x to (5)
			this_child6$child4._removeUpdater('x'); this_child6$child4.x = ((5));
//assigning font.family to ("Chelsea Market")
			this_child6$child4._removeUpdater('font.family'); this_child6$child4._get('font').family = (("Chelsea Market"));

			this$child6.addChild(this_child6$child4)

//setting up component ChalkText
			var this_child6$child5 = __closure.this_child6$child5
			this_child6$child5.__setup(__closure.__closure_this_child6$child5)
			delete __closure.__closure_this_child6$child5

//assigning y to (165)
			this_child6$child5._removeUpdater('y'); this_child6$child5.y = ((165));
//assigning x to (5)
			this_child6$child5._removeUpdater('x'); this_child6$child5.x = ((5));
//assigning font.family to ("Coming Soon")
			this_child6$child5._removeUpdater('font.family'); this_child6$child5._get('font').family = (("Coming Soon"));

			this$child6.addChild(this_child6$child5)

//setting up component ChalkText
			var this_child6$child6 = __closure.this_child6$child6
			this_child6$child6.__setup(__closure.__closure_this_child6$child6)
			delete __closure.__closure_this_child6$child6

//assigning y to (205)
			this_child6$child6._removeUpdater('y'); this_child6$child6.y = ((205));
//assigning x to (5)
			this_child6$child6._removeUpdater('x'); this_child6$child6.x = ((5));
//assigning font.family to ("Gloria Hallelujah")
			this_child6$child6._removeUpdater('font.family'); this_child6$child6._get('font').family = (("Gloria Hallelujah"));

			this$child6.addChild(this_child6$child6)

//setting up component ChalkText
			var this_child6$child7 = __closure.this_child6$child7
			this_child6$child7.__setup(__closure.__closure_this_child6$child7)
			delete __closure.__closure_this_child6$child7

//assigning y to (245)
			this_child6$child7._removeUpdater('y'); this_child6$child7.y = ((245));
//assigning x to (5)
			this_child6$child7._removeUpdater('x'); this_child6$child7.x = ((5));
//assigning font.family to ("Kalam")
			this_child6$child7._removeUpdater('font.family'); this_child6$child7._get('font').family = (("Kalam"));

			this$child6.addChild(this_child6$child7)
			this.addChild(this$child6)

//setting up component Image
			var this$child7 = __closure.this$child7
			this$child7.__setup(__closure.__closure_this$child7)
			delete __closure.__closure_this$child7

//assigning width to (this._get('height') / 2)
			var update$this_child7$width = (function() { this$child7.width = ((this._get('height') / 2)); }).bind(this$child7)
			var dep$this_child7$width$0 = this$child7
			this$child7.connectOnChanged(dep$this_child7$width$0, 'height', update$this_child7$width)
			this$child7._removeUpdater('width', [[dep$this_child7$width$0, 'height', update$this_child7$width]])
			update$this_child7$width();
//assigning height to ((this._get('parent')._get('height') * ((20) / 100)))
			var update$this_child7$height = (function() { this$child7.height = (((this._get('parent')._get('height') * ((20) / 100)))); }).bind(this$child7)
			var dep$this_child7$height$0 = this$child7._get('parent')
			this$child7.connectOnChanged(dep$this_child7$height$0, 'height', update$this_child7$height)
			this$child7._removeUpdater('height', [[dep$this_child7$height$0, 'height', update$this_child7$height]])
			update$this_child7$height();
//assigning source to ("res/plant.png")
			this$child7._removeUpdater('source'); this$child7.source = (("res/plant.png"));
//assigning fillMode to (_globals.core.Image.prototype.PreserveAspectFit)
			this$child7._removeUpdater('fillMode'); this$child7.fillMode = ((_globals.core.Image.prototype.PreserveAspectFit));
//assigning y to ((this._get('parent')._get('height') * ((50) / 100)) - this._get('height'))
			var update$this_child7$y = (function() { this$child7.y = (((this._get('parent')._get('height') * ((50) / 100)) - this._get('height'))); }).bind(this$child7)
			var dep$this_child7$y$0 = this$child7._get('parent')
			this$child7.connectOnChanged(dep$this_child7$y$0, 'height', update$this_child7$y)
			var dep$this_child7$y$1 = this$child7
			this$child7.connectOnChanged(dep$this_child7$y$1, 'height', update$this_child7$y)
			this$child7._removeUpdater('y', [[dep$this_child7$y$0, 'height', update$this_child7$y],[dep$this_child7$y$1, 'height', update$this_child7$y]])
			update$this_child7$y();
//assigning x to ((this._get('parent')._get('width') * ((50) / 100)))
			var update$this_child7$x = (function() { this$child7.x = (((this._get('parent')._get('width') * ((50) / 100)))); }).bind(this$child7)
			var dep$this_child7$x$0 = this$child7._get('parent')
			this$child7.connectOnChanged(dep$this_child7$x$0, 'width', update$this_child7$x)
			this$child7._removeUpdater('x', [[dep$this_child7$x$0, 'width', update$this_child7$x]])
			update$this_child7$x();


//setting up component DragMixin
			var this_child7$child0 = __closure.this_child7$child0
			this_child7$child0.__setup(__closure.__closure_this_child7$child0)
			delete __closure.__closure_this_child7$child0

//assigning direction to (_globals.controls.mixins.DragMixin.prototype.Horizontal)
			this_child7$child0._removeUpdater('direction'); this_child7$child0.direction = ((_globals.controls.mixins.DragMixin.prototype.Horizontal));

			this$child7.addChild(this_child7$child0)
			this.addChild(this$child7)

//setting up component Image
			var this$child8 = __closure.this$child8
			this$child8.__setup(__closure.__closure_this$child8)
			delete __closure.__closure_this$child8

//assigning width to (this._get('height'))
			var update$this_child8$width = (function() { this$child8.width = ((this._get('height'))); }).bind(this$child8)
			var dep$this_child8$width$0 = this$child8
			this$child8.connectOnChanged(dep$this_child8$width$0, 'height', update$this_child8$width)
			this$child8._removeUpdater('width', [[dep$this_child8$width$0, 'height', update$this_child8$width]])
			update$this_child8$width();
//assigning height to ((this._get('parent')._get('height') * ((40) / 100)))
			var update$this_child8$height = (function() { this$child8.height = (((this._get('parent')._get('height') * ((40) / 100)))); }).bind(this$child8)
			var dep$this_child8$height$0 = this$child8._get('parent')
			this$child8.connectOnChanged(dep$this_child8$height$0, 'height', update$this_child8$height)
			this$child8._removeUpdater('height', [[dep$this_child8$height$0, 'height', update$this_child8$height]])
			update$this_child8$height();
//assigning source to ("res/comp4.png")
			this$child8._removeUpdater('source'); this$child8.source = (("res/comp4.png"));
//assigning fillMode to (_globals.core.Image.prototype.PreserveAspectFit)
			this$child8._removeUpdater('fillMode'); this$child8.fillMode = ((_globals.core.Image.prototype.PreserveAspectFit));
//assigning y to ((this._get('parent')._get('height') * ((40) / 100)))
			var update$this_child8$y = (function() { this$child8.y = (((this._get('parent')._get('height') * ((40) / 100)))); }).bind(this$child8)
			var dep$this_child8$y$0 = this$child8._get('parent')
			this$child8.connectOnChanged(dep$this_child8$y$0, 'height', update$this_child8$y)
			this$child8._removeUpdater('y', [[dep$this_child8$y$0, 'height', update$this_child8$y]])
			update$this_child8$y();
//assigning x to ((this._get('parent')._get('width') * ((85) / 100)) - this._get('width'))
			var update$this_child8$x = (function() { this$child8.x = (((this._get('parent')._get('width') * ((85) / 100)) - this._get('width'))); }).bind(this$child8)
			var dep$this_child8$x$0 = this$child8._get('parent')
			this$child8.connectOnChanged(dep$this_child8$x$0, 'width', update$this_child8$x)
			var dep$this_child8$x$1 = this$child8
			this$child8.connectOnChanged(dep$this_child8$x$1, 'width', update$this_child8$x)
			this$child8._removeUpdater('x', [[dep$this_child8$x$0, 'width', update$this_child8$x],[dep$this_child8$x$1, 'width', update$this_child8$x]])
			update$this_child8$x();


//setting up component DragMixin
			var this_child8$child0 = __closure.this_child8$child0
			this_child8$child0.__setup(__closure.__closure_this_child8$child0)
			delete __closure.__closure_this_child8$child0


			this$child8.addChild(this_child8$child0)

//setting up component HoverMixin
			var this_child8$child1 = __closure.this_child8$child1
			this_child8$child1.__setup(__closure.__closure_this_child8$child1)
			delete __closure.__closure_this_child8$child1

//assigning cursor to ("pointer")
			this_child8$child1._removeUpdater('cursor'); this_child8$child1.cursor = (("pointer"));

			this$child8.addChild(this_child8$child1)
			this.addChild(this$child8)

//setting up component Rectangle
			var this$child9 = __closure.this$child9
			this$child9.__setup(__closure.__closure_this$child9)
			delete __closure.__closure_this$child9

//assigning opacity to (this._get('visible') ? 0.3 : 0)
			var update$this_child9$opacity = (function() { this$child9.opacity = ((this._get('visible') ? 0.3 : 0)); }).bind(this$child9)
			var dep$this_child9$opacity$0 = this$child9
			this$child9.connectOnChanged(dep$this_child9$opacity$0, 'visible', update$this_child9$opacity)
			this$child9._removeUpdater('opacity', [[dep$this_child9$opacity$0, 'visible', update$this_child9$opacity]])
			update$this_child9$opacity();
//assigning visible to (this._get('ltr')._get('open'))
			var update$this_child9$visible = (function() { this$child9.visible = ((this._get('ltr')._get('open'))); }).bind(this$child9)
			var dep$this_child9$visible$0 = this$child9._get('ltr')
			this$child9.connectOnChanged(dep$this_child9$visible$0, 'open', update$this_child9$visible)
			this$child9._removeUpdater('visible', [[dep$this_child9$visible$0, 'open', update$this_child9$visible]])
			update$this_child9$visible();
//assigning color to ("black")
			this$child9._removeUpdater('color'); this$child9.color = (("black"));
//assigning height to (this._get('parent')._get('height'))
			var update$this_child9$height = (function() { this$child9.height = ((this._get('parent')._get('height'))); }).bind(this$child9)
			var dep$this_child9$height$0 = this$child9._get('parent')
			this$child9.connectOnChanged(dep$this_child9$height$0, 'height', update$this_child9$height)
			this$child9._removeUpdater('height', [[dep$this_child9$height$0, 'height', update$this_child9$height]])
			update$this_child9$height();
//assigning width to (this._get('parent')._get('width'))
			var update$this_child9$width = (function() { this$child9.width = ((this._get('parent')._get('width'))); }).bind(this$child9)
			var dep$this_child9$width$0 = this$child9._get('parent')
			this$child9.connectOnChanged(dep$this_child9$width$0, 'width', update$this_child9$width)
			this$child9._removeUpdater('width', [[dep$this_child9$width$0, 'width', update$this_child9$width]])
			update$this_child9$width();
//assigning z to (2)
			this$child9._removeUpdater('z'); this$child9.z = ((2));
	var behavior_this_child9_on_opacity = new _globals.core.Animation(this$child9)
	var behavior_this_child9_on_opacity__closure = { behavior_this_child9_on_opacity: behavior_this_child9_on_opacity }

//creating component Animation
	behavior_this_child9_on_opacity.__create(behavior_this_child9_on_opacity__closure.__closure_behavior_this_child9_on_opacity = { })


//setting up component Animation
	var behavior_this_child9_on_opacity = behavior_this_child9_on_opacity__closure.behavior_this_child9_on_opacity
	behavior_this_child9_on_opacity.__setup(behavior_this_child9_on_opacity__closure.__closure_behavior_this_child9_on_opacity)
	delete behavior_this_child9_on_opacity__closure.__closure_behavior_this_child9_on_opacity

//assigning duration to (500)
	behavior_this_child9_on_opacity._removeUpdater('duration'); behavior_this_child9_on_opacity.duration = ((500));

	this$child9.setAnimation('opacity', behavior_this_child9_on_opacity);

	var behavior_this_child9_on_visible = new _globals.core.Animation(this$child9)
	var behavior_this_child9_on_visible__closure = { behavior_this_child9_on_visible: behavior_this_child9_on_visible }

//creating component Animation
	behavior_this_child9_on_visible.__create(behavior_this_child9_on_visible__closure.__closure_behavior_this_child9_on_visible = { })


//setting up component Animation
	var behavior_this_child9_on_visible = behavior_this_child9_on_visible__closure.behavior_this_child9_on_visible
	behavior_this_child9_on_visible.__setup(behavior_this_child9_on_visible__closure.__closure_behavior_this_child9_on_visible)
	delete behavior_this_child9_on_visible__closure.__closure_behavior_this_child9_on_visible

//assigning duration to (500)
	behavior_this_child9_on_visible._removeUpdater('duration'); behavior_this_child9_on_visible.duration = ((500));

	this$child9.setAnimation('visible', behavior_this_child9_on_visible);

			this.addChild(this$child9)

//setting up component Letter
			var this$child10 = __closure.this$child10
			this$child10.__setup(__closure.__closure_this$child10)
			delete __closure.__closure_this$child10

//assigning y to ((this._get('parent')._get('height') * ((10) / 100)))
			var update$this_child10$y = (function() { this$child10.y = (((this._get('parent')._get('height') * ((10) / 100)))); }).bind(this$child10)
			var dep$this_child10$y$0 = this$child10._get('parent')
			this$child10.connectOnChanged(dep$this_child10$y$0, 'height', update$this_child10$y)
			this$child10._removeUpdater('y', [[dep$this_child10$y$0, 'height', update$this_child10$y]])
			update$this_child10$y();
//assigning x to ((this._get('parent')._get('width') * ((25) / 100)))
			var update$this_child10$x = (function() { this$child10.x = (((this._get('parent')._get('width') * ((25) / 100)))); }).bind(this$child10)
			var dep$this_child10$x$0 = this$child10._get('parent')
			this$child10.connectOnChanged(dep$this_child10$x$0, 'width', update$this_child10$x)
			this$child10._removeUpdater('x', [[dep$this_child10$x$0, 'width', update$this_child10$x]])
			update$this_child10$x();
//assigning z to (10)
			this$child10._removeUpdater('z'); this$child10.z = ((10));
			this$child10.on('clicked', (function() { this.close();} ).bind(this$child10))

			this.addChild(this$child10)
}
//=====[component core.Effects]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.core.Effects = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);

}
	_globals.core.Effects.prototype = Object.create(_globals.core.Object.prototype)
	_globals.core.Effects.prototype.constructor = _globals.core.Effects
	_globals.core.Effects.prototype.componentName = 'core.Effects'
	_globals.core.Effects.prototype._getFilterStyle = function() {
		var style = []
		this._addStyle(style, 'blur', 'blur', 'px')
		this._addStyle(style, 'grayscale')
		this._addStyle(style, 'sepia')
		this._addStyle(style, 'brightness')
		this._addStyle(style, 'contrast')
		this._addStyle(style, 'hueRotate', 'hue-rotate', 'deg')
		this._addStyle(style, 'invert')
		this._addStyle(style, 'saturate')
		return style
	}
	_globals.core.Effects.prototype._addStyle = function(array,property,style,units) {
		var value = this[property]
		if (value)
			array.push((style || property) + '(' + value + (units || '') + ') ')
	}
	_globals.core.Effects.prototype._update = function(name,value) {
		this._updateStyle()
		_globals.core.Object.prototype._update.apply(this, arguments)
	}
	_globals.core.Effects.prototype._updateStyle = function() {
		var filterStyle = this._getFilterStyle().join('')
		var parent = this.parent

		var style = {}
		var updateStyle = false

		if (filterStyle.length > 0) {
			//chromium bug
			//https://github.com/Modernizr/Modernizr/issues/981
			style['-webkit-filter'] = filterStyle
			style['filter'] = filterStyle
			updateStyle = true
		}

		if (this.shadow && !this.shadow._empty()) {
			style['box-shadow'] = this.shadow._getFilterStyle()
			updateStyle = true
		}

		if (updateStyle) {
			//log(style)
			parent.style(style)
		}
	}
	core.addProperty(_globals.core.Effects.prototype, 'real', 'blur')
	core.addProperty(_globals.core.Effects.prototype, 'real', 'grayscale')
	core.addProperty(_globals.core.Effects.prototype, 'real', 'sepia')
	core.addProperty(_globals.core.Effects.prototype, 'real', 'brightness')
	core.addProperty(_globals.core.Effects.prototype, 'real', 'contrast')
	core.addProperty(_globals.core.Effects.prototype, 'real', 'hueRotate')
	core.addProperty(_globals.core.Effects.prototype, 'real', 'invert')
	core.addProperty(_globals.core.Effects.prototype, 'real', 'saturate')
	core.addProperty(_globals.core.Effects.prototype, 'Shadow', 'shadow')

	_globals.core.Effects.prototype.__create = function(__closure) {
		_globals.core.Object.prototype.__create.call(this, __closure.__base = { })
//creating component core.<anonymous>
		var this$shadow = new _globals.core.Shadow(this)
		__closure.this$shadow = this$shadow

//creating component Shadow
		this$shadow.__create(__closure.__closure_this$shadow = { })

		this.shadow = this$shadow
	}
	_globals.core.Effects.prototype.__setup = function(__closure) {
	_globals.core.Object.prototype.__setup.call(this, __closure.__base); delete __closure.__base
//setting up component Shadow
			var this$shadow = __closure.this$shadow
			this$shadow.__setup(__closure.__closure_this$shadow)
			delete __closure.__closure_this$shadow
}
//=====[component controls.mixins.DragMixin]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.controls.mixins.DragMixin = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);
	//custom constructor:
	{
		this.element = this.parent.element;
		this._bindPressed(this.enabled)
	}

}
	_globals.controls.mixins.DragMixin.prototype = Object.create(_globals.core.Object.prototype)
	_globals.controls.mixins.DragMixin.prototype.constructor = _globals.controls.mixins.DragMixin
	_globals.controls.mixins.DragMixin.prototype.componentName = 'controls.mixins.DragMixin'
	_globals.controls.mixins.DragMixin.prototype._bindPressed = function(value) {
		if (value && !this._dmPressBinder) {
			this._dmPressBinder = new _globals.core.EventBinder(this.element)
			this._dmPressBinder.on('mousedown', this._downHandler.bind(this))
			this._dmPressBinder.on('touchstart', this._downHandler.bind(this))
		}
		if (this._dmPressBinder)
			this._dmPressBinder.enable(value)
	}
	_globals.controls.mixins.DragMixin.prototype._moveHandler = function(e) {
		e.preventDefault();

		if (e.changedTouches)
			e = e.changedTouches[0]
		
		if (this.direction !== this.Horizontal) {
			var eY = e.clientY, sY = this._startY, ly1 = this.limity1, ly2 = this.limity2
			if (ly2  && (eY - sY > ly2)) {
				this.parent.y = ly2
			}
			else if (ly1 && (eY - sY < ly1))
				this.parent.y = ly1
			else
				this.parent.y = eY - sY
		}
		if (this.direction !== this.Vertical) {
			var eX = e.clientX, sX = this._startX, lx1 = this.limitx1, lx2 = this.limitx2
			if (lx2  && (eX - sX > lx2)) {
				this.parent.x = lx2
			}
			else if (lx1 && (eX - sX < lx1))
				this.parent.x = lx1
			else
				this.parent.x = eX - sX
		}
	}
	_globals.controls.mixins.DragMixin.prototype._downHandler = function(e) {
		e.preventDefault();
		this.pressed = true
		
		if (e.changedTouches)
			e = e.changedTouches[0]
		
		this._startX = e.clientX - this.parent.x
		this._startY = e.clientY - this.parent.y
		if (!this._dmMoveBinder) {
			this._dmMoveBinder = new _globals.core.EventBinder(this._get('context').window)

			this._dmMoveBinder.on('mousemove', this._moveHandler.bind(this))
			this._dmMoveBinder.on('touchmove', this._moveHandler.bind(this))

			this._dmMoveBinder.on('mouseup', function() { 
				this.pressed = false
				this._dmMoveBinder.enable(false)
			}.bind(this))

			this._dmMoveBinder.on('touchend', function() { 
				this.pressed = false
				this._dmMoveBinder.enable(false)
			}.bind(this))
		} 
		this._dmMoveBinder.enable(true)
	}
	core.addProperty(_globals.controls.mixins.DragMixin.prototype, 'bool', 'pressed')
	core.addProperty(_globals.controls.mixins.DragMixin.prototype, 'bool', 'enabled', (true))
	core.addProperty(_globals.controls.mixins.DragMixin.prototype, 'int', 'x')
	core.addProperty(_globals.controls.mixins.DragMixin.prototype, 'int', 'y')
	core.addProperty(_globals.controls.mixins.DragMixin.prototype, 'int', 'limitx1')
	core.addProperty(_globals.controls.mixins.DragMixin.prototype, 'int', 'limitx2')
	core.addProperty(_globals.controls.mixins.DragMixin.prototype, 'int', 'limity1')
	core.addProperty(_globals.controls.mixins.DragMixin.prototype, 'int', 'limity2')
/** @const @type {number} */
	_globals.controls.mixins.DragMixin.prototype.Any = 0
/** @const @type {number} */
	_globals.controls.mixins.DragMixin.Any = 0
/** @const @type {number} */
	_globals.controls.mixins.DragMixin.prototype.Vertical = 1
/** @const @type {number} */
	_globals.controls.mixins.DragMixin.Vertical = 1
/** @const @type {number} */
	_globals.controls.mixins.DragMixin.prototype.Horizontal = 2
/** @const @type {number} */
	_globals.controls.mixins.DragMixin.Horizontal = 2
	core.addProperty(_globals.controls.mixins.DragMixin.prototype, 'enum', 'direction')

	_globals.controls.mixins.DragMixin.prototype.__create = function(__closure) {
		_globals.core.Object.prototype.__create.call(this, __closure.__base = { })

	}
	_globals.controls.mixins.DragMixin.prototype.__setup = function(__closure) {
	_globals.core.Object.prototype.__setup.call(this, __closure.__base); delete __closure.__base
this.onChanged('enabled', (function(value) {
		this._bindPressed(value)
	} ).bind(this))
}
//=====[component core.Rectangle]=====================

/**
 * @constructor
 * @extends {_globals.core.Item}
 */
	_globals.core.Rectangle = function(parent, _delegate) {
	_globals.core.Item.apply(this, arguments);

}
	_globals.core.Rectangle.prototype = Object.create(_globals.core.Item.prototype)
	_globals.core.Rectangle.prototype.constructor = _globals.core.Rectangle
	_globals.core.Rectangle.prototype.componentName = 'core.Rectangle'
	_globals.core.Rectangle.prototype._update = function(name,value) {
		switch(name) {
			case 'color': this.style('background-color', _globals.core.normalizeColor(value)); break;
		}
		_globals.core.Item.prototype._update.apply(this, arguments);
	}
	_globals.core.Rectangle.prototype._mapCSSAttribute = function(name) {
		var attr = {color: 'background-color'}[name]
		return (attr !== undefined)?
			attr:
			_globals.core.Item.prototype._mapCSSAttribute.apply(this, arguments)
	}
	core.addProperty(_globals.core.Rectangle.prototype, 'color', 'color', ("#0000"))
	core.addProperty(_globals.core.Rectangle.prototype, 'Border', 'border')
	core.addProperty(_globals.core.Rectangle.prototype, 'Gradient', 'gradient')

	_globals.core.Rectangle.prototype.__create = function(__closure) {
		_globals.core.Item.prototype.__create.call(this, __closure.__base = { })
//creating component core.<anonymous>
		var this$border = new _globals.core.Border(this)
		__closure.this$border = this$border

//creating component Border
		this$border.__create(__closure.__closure_this$border = { })

		this.border = this$border
	}
	_globals.core.Rectangle.prototype.__setup = function(__closure) {
	_globals.core.Item.prototype.__setup.call(this, __closure.__base); delete __closure.__base
//setting up component Border
			var this$border = __closure.this$border
			this$border.__setup(__closure.__closure_this$border)
			delete __closure.__closure_this$border
}
//=====[component vc.Cover]=====================

/**
 * @constructor
 * @extends {_globals.core.Rectangle}
 */
	_globals.vc.Cover = function(parent, _delegate) {
	_globals.core.Rectangle.apply(this, arguments);

}
	_globals.vc.Cover.prototype = Object.create(_globals.core.Rectangle.prototype)
	_globals.vc.Cover.prototype.constructor = _globals.vc.Cover
	_globals.vc.Cover.prototype.componentName = 'vc.Cover'
	_globals.vc.Cover.prototype.remove = function() {
		log ("going to remove", this.idx)
		this.parent.model.remove(this.idx);
	}
	core.addProperty(_globals.vc.Cover.prototype, 'int', 'shiftX')
	core.addProperty(_globals.vc.Cover.prototype, 'int', 'shiftY')
	core.addProperty(_globals.vc.Cover.prototype, 'bool', 'open')
	core.addProperty(_globals.vc.Cover.prototype, 'int', 'idx')
	core.addProperty(_globals.vc.Cover.prototype, 'Mixin', 'hover')
	core.addProperty(_globals.vc.Cover.prototype, 'Color', 'coverColor')

	_globals.vc.Cover.prototype.__create = function(__closure) {
		_globals.core.Rectangle.prototype.__create.call(this, __closure.__base = { })
var this$child0 = new _globals.controls.mixins.DragMixin(this)
		__closure.this$child0 = this$child0

//creating component DragMixin
		this$child0.__create(__closure.__closure_this$child0 = { })

		var this$child1 = new _globals.core.Text(this)
		__closure.this$child1 = this$child1

//creating component Text
		this$child1.__create(__closure.__closure_this$child1 = { })

//creating component vc.<anonymous>
		var this$hover = new _globals.controls.mixins.HoverMixin(this)
		__closure.this$hover = this$hover

//creating component HoverMixin
		this$hover.__create(__closure.__closure_this$hover = { })

		this.hover = this$hover
	}
	_globals.vc.Cover.prototype.__setup = function(__closure) {
	_globals.core.Rectangle.prototype.__setup.call(this, __closure.__base); delete __closure.__base
//assigning border.color to ("gray")
			this._removeUpdater('border.color'); this._get('border').color = (("gray"));
//assigning border.width to (1)
			this._removeUpdater('border.width'); this._get('border').width = ((1));

//setting up component HoverMixin
			var this$hover = __closure.this$hover
			this$hover.__setup(__closure.__closure_this$hover)
			delete __closure.__closure_this$hover

//assigning cursor to ("pointer")
			this$hover._removeUpdater('cursor'); this$hover.cursor = (("pointer"));

//assigning idx to (this._get('model').index)
			var update$this$idx = (function() { this.idx = ((this._get('model').index)); }).bind(this)
			var dep$this$idx$0 = this._get('_delegate')
			this.connectOnChanged(dep$this$idx$0, '_rowIndex', update$this$idx)
			this._removeUpdater('idx', [[dep$this$idx$0, '_rowIndex', update$this$idx]])
			update$this$idx();
//assigning color to (this._get('open') ? "#F5F5F5" : this._get('coverColor'))
			var update$this$color = (function() { this.color = ((this._get('open') ? "#F5F5F5" : this._get('coverColor'))); }).bind(this)
			var dep$this$color$0 = this
			this.connectOnChanged(dep$this$color$0, 'open', update$this$color)
			var dep$this$color$1 = this
			this.connectOnChanged(dep$this$color$1, 'coverColor', update$this$color)
			this._removeUpdater('color', [[dep$this$color$0, 'open', update$this$color],[dep$this$color$1, 'coverColor', update$this$color]])
			update$this$color();
//assigning transform.translateY to (this._get('hover')._get('value') && ! this._get('open') ? - 20 : 0)
			var update$this$transform_translateY = (function() { this._get('transform').translateY = ((this._get('hover')._get('value') && ! this._get('open') ? - 20 : 0)); }).bind(this)
			var dep$this$transform_translateY$0 = this._get('hover')
			this.connectOnChanged(dep$this$transform_translateY$0, 'value', update$this$transform_translateY)
			var dep$this$transform_translateY$1 = this
			this.connectOnChanged(dep$this$transform_translateY$1, 'open', update$this$transform_translateY)
			this._removeUpdater('transform.translateY', [[dep$this$transform_translateY$0, 'value', update$this$transform_translateY],[dep$this$transform_translateY$1, 'open', update$this$transform_translateY]])
			update$this$transform_translateY();
//assigning transform.rotateZ to (this._get('open') ? 720 : (this._get('hover')._get('value') ? 10 : 0))
			var update$this$transform_rotateZ = (function() { this._get('transform').rotateZ = ((this._get('open') ? 720 : (this._get('hover')._get('value') ? 10 : 0))); }).bind(this)
			var dep$this$transform_rotateZ$0 = this
			this.connectOnChanged(dep$this$transform_rotateZ$0, 'open', update$this$transform_rotateZ)
			var dep$this$transform_rotateZ$1 = this._get('hover')
			this.connectOnChanged(dep$this$transform_rotateZ$1, 'value', update$this$transform_rotateZ)
			this._removeUpdater('transform.rotateZ', [[dep$this$transform_rotateZ$0, 'open', update$this$transform_rotateZ],[dep$this$transform_rotateZ$1, 'value', update$this$transform_rotateZ]])
			update$this$transform_rotateZ();
//assigning height to (this._get('open') ? this._get('context')._get('height') * 0.8 * 0.33 : this._get('context')._get('height') * 0.08)
			var update$this$height = (function() { this.height = ((this._get('open') ? this._get('context')._get('height') * 0.8 * 0.33 : this._get('context')._get('height') * 0.08)); }).bind(this)
			var dep$this$height$0 = this
			this.connectOnChanged(dep$this$height$0, 'open', update$this$height)
			var dep$this$height$1 = this._get('context')
			this.connectOnChanged(dep$this$height$1, 'height', update$this$height)
			var dep$this$height$2 = this._get('context')
			this.connectOnChanged(dep$this$height$2, 'height', update$this$height)
			this._removeUpdater('height', [[dep$this$height$0, 'open', update$this$height],[dep$this$height$1, 'height', update$this$height],[dep$this$height$2, 'height', update$this$height]])
			update$this$height();
//assigning width to (this._get('open') ? this._get('context')._get('width') * 0.5 : this._get('context')._get('width') * 0.1)
			var update$this$width = (function() { this.width = ((this._get('open') ? this._get('context')._get('width') * 0.5 : this._get('context')._get('width') * 0.1)); }).bind(this)
			var dep$this$width$0 = this
			this.connectOnChanged(dep$this$width$0, 'open', update$this$width)
			var dep$this$width$1 = this._get('context')
			this.connectOnChanged(dep$this$width$1, 'width', update$this$width)
			var dep$this$width$2 = this._get('context')
			this.connectOnChanged(dep$this$width$2, 'width', update$this$width)
			this._removeUpdater('width', [[dep$this$width$0, 'open', update$this$width],[dep$this$width$1, 'width', update$this$width],[dep$this$width$2, 'width', update$this$width]])
			update$this$width();
//assigning transform.skewX to (this._get('open') ? 0 : - 11)
			var update$this$transform_skewX = (function() { this._get('transform').skewX = ((this._get('open') ? 0 : - 11)); }).bind(this)
			var dep$this$transform_skewX$0 = this
			this.connectOnChanged(dep$this$transform_skewX$0, 'open', update$this$transform_skewX)
			this._removeUpdater('transform.skewX', [[dep$this$transform_skewX$0, 'open', update$this$transform_skewX]])
			update$this$transform_skewX();
//assigning y to (this._get('open') ? (this._get('parent')._get('height') * ((36.4) / 100)) : (this._get('parent')._get('height') * ((55) / 100)) + this._get('shiftY'))
			var update$this$y = (function() { this.y = ((this._get('open') ? (this._get('parent')._get('height') * ((36.4) / 100)) : (this._get('parent')._get('height') * ((55) / 100)) + this._get('shiftY'))); }).bind(this)
			var dep$this$y$0 = this
			this.connectOnChanged(dep$this$y$0, 'open', update$this$y)
			var dep$this$y$1 = this._get('parent')
			this.connectOnChanged(dep$this$y$1, 'height', update$this$y)
			var dep$this$y$2 = this._get('parent')
			this.connectOnChanged(dep$this$y$2, 'height', update$this$y)
			var dep$this$y$3 = this
			this.connectOnChanged(dep$this$y$3, 'shiftY', update$this$y)
			this._removeUpdater('y', [[dep$this$y$0, 'open', update$this$y],[dep$this$y$1, 'height', update$this$y],[dep$this$y$2, 'height', update$this$y],[dep$this$y$3, 'shiftY', update$this$y]])
			update$this$y();
//assigning x to (this._get('open') ? (this._get('parent')._get('width') * ((25) / 100)) : (this._get('parent')._get('width') * ((15) / 100)) + this._get('shiftX'))
			var update$this$x = (function() { this.x = ((this._get('open') ? (this._get('parent')._get('width') * ((25) / 100)) : (this._get('parent')._get('width') * ((15) / 100)) + this._get('shiftX'))); }).bind(this)
			var dep$this$x$0 = this
			this.connectOnChanged(dep$this$x$0, 'open', update$this$x)
			var dep$this$x$1 = this._get('parent')
			this.connectOnChanged(dep$this$x$1, 'width', update$this$x)
			var dep$this$x$2 = this._get('parent')
			this.connectOnChanged(dep$this$x$2, 'width', update$this$x)
			var dep$this$x$3 = this
			this.connectOnChanged(dep$this$x$3, 'shiftX', update$this$x)
			this._removeUpdater('x', [[dep$this$x$0, 'open', update$this$x],[dep$this$x$1, 'width', update$this$x],[dep$this$x$2, 'width', update$this$x],[dep$this$x$3, 'shiftX', update$this$x]])
			update$this$x();
//assigning z to (this._get('open') ? 5 : 2)
			var update$this$z = (function() { this.z = ((this._get('open') ? 5 : 2)); }).bind(this)
			var dep$this$z$0 = this
			this.connectOnChanged(dep$this$z$0, 'open', update$this$z)
			this._removeUpdater('z', [[dep$this$z$0, 'open', update$this$z]])
			update$this$z();
			this._context._onCompleted((function() {
		log("onCompleted", this.idx)
		var c = ["#0091EA", "#689F38", "#00E676", "#00BFA5", "#00E5FF", "#0277BD", "#03A9F4", "#82B1FF", "#D1C4E9", "#FF5252", "#FF5722", "#FFD600", "#FF6D00", "#795548", "#FFEB3B", "#FFC107", "#2E7D32", "#CDDC39", "#84FFFF", "#01579B", "#C8E6C9", "#FFEB3B", "#FFECB3", "#D7CCC8", "#DD2C00", "#DD2C00", "#80DEEA", "#B39DDB", "#880E4F", "#FCE4EC", "#FF1744", "#B388FF", "#006064", "#B2FF59", "#E65100", "#FF7043", "#FF6F00"];

		this.shiftX = this.idx * -4;
		this.shiftY = this.idx * 12;
		this.coverColor = c[this.idx]
	} ).bind(this))
	var behavior_this_on_visible = new _globals.core.Animation(this)
	var behavior_this_on_visible__closure = { behavior_this_on_visible: behavior_this_on_visible }

//creating component Animation
	behavior_this_on_visible.__create(behavior_this_on_visible__closure.__closure_behavior_this_on_visible = { })


//setting up component Animation
	var behavior_this_on_visible = behavior_this_on_visible__closure.behavior_this_on_visible
	behavior_this_on_visible.__setup(behavior_this_on_visible__closure.__closure_behavior_this_on_visible)
	delete behavior_this_on_visible__closure.__closure_behavior_this_on_visible

//assigning duration to (1000)
	behavior_this_on_visible._removeUpdater('duration'); behavior_this_on_visible.duration = ((1000));
//assigning delay to (this._get('parent')._get('open') ? 0 : 600)
	var update$behavior_this_on_visible$delay = (function() { behavior_this_on_visible.delay = ((this._get('parent')._get('open') ? 0 : 600)); }).bind(behavior_this_on_visible)
	var dep$behavior_this_on_visible$delay$0 = behavior_this_on_visible._get('parent')
	behavior_this_on_visible.connectOnChanged(dep$behavior_this_on_visible$delay$0, 'open', update$behavior_this_on_visible$delay)
	behavior_this_on_visible._removeUpdater('delay', [[dep$behavior_this_on_visible$delay$0, 'open', update$behavior_this_on_visible$delay]])
	update$behavior_this_on_visible$delay();

	this.setAnimation('visible', behavior_this_on_visible);

	var behavior_this_on_transform = new _globals.core.Animation(this)
	var behavior_this_on_transform__closure = { behavior_this_on_transform: behavior_this_on_transform }

//creating component Animation
	behavior_this_on_transform.__create(behavior_this_on_transform__closure.__closure_behavior_this_on_transform = { })


//setting up component Animation
	var behavior_this_on_transform = behavior_this_on_transform__closure.behavior_this_on_transform
	behavior_this_on_transform.__setup(behavior_this_on_transform__closure.__closure_behavior_this_on_transform)
	delete behavior_this_on_transform__closure.__closure_behavior_this_on_transform

//assigning duration to (750)
	behavior_this_on_transform._removeUpdater('duration'); behavior_this_on_transform.duration = ((750));
//assigning delay to (this._get('parent')._get('open') || this._get('parent')._get('hover')._get('value') ? 0 : 600)
	var update$behavior_this_on_transform$delay = (function() { behavior_this_on_transform.delay = ((this._get('parent')._get('open') || this._get('parent')._get('hover')._get('value') ? 0 : 600)); }).bind(behavior_this_on_transform)
	var dep$behavior_this_on_transform$delay$0 = behavior_this_on_transform._get('parent')
	behavior_this_on_transform.connectOnChanged(dep$behavior_this_on_transform$delay$0, 'open', update$behavior_this_on_transform$delay)
	var dep$behavior_this_on_transform$delay$1 = behavior_this_on_transform._get('parent')._get('hover')
	behavior_this_on_transform.connectOnChanged(dep$behavior_this_on_transform$delay$1, 'value', update$behavior_this_on_transform$delay)
	behavior_this_on_transform._removeUpdater('delay', [[dep$behavior_this_on_transform$delay$0, 'open', update$behavior_this_on_transform$delay],[dep$behavior_this_on_transform$delay$1, 'value', update$behavior_this_on_transform$delay]])
	update$behavior_this_on_transform$delay();

	this.setAnimation('transform', behavior_this_on_transform);

	var behavior_this_on_height = new _globals.core.Animation(this)
	var behavior_this_on_height__closure = { behavior_this_on_height: behavior_this_on_height }

//creating component Animation
	behavior_this_on_height.__create(behavior_this_on_height__closure.__closure_behavior_this_on_height = { })


//setting up component Animation
	var behavior_this_on_height = behavior_this_on_height__closure.behavior_this_on_height
	behavior_this_on_height.__setup(behavior_this_on_height__closure.__closure_behavior_this_on_height)
	delete behavior_this_on_height__closure.__closure_behavior_this_on_height

//assigning duration to (750)
	behavior_this_on_height._removeUpdater('duration'); behavior_this_on_height.duration = ((750));
//assigning delay to (this._get('parent')._get('open') || this._get('parent')._get('hover')._get('value') ? 0 : 600)
	var update$behavior_this_on_height$delay = (function() { behavior_this_on_height.delay = ((this._get('parent')._get('open') || this._get('parent')._get('hover')._get('value') ? 0 : 600)); }).bind(behavior_this_on_height)
	var dep$behavior_this_on_height$delay$0 = behavior_this_on_height._get('parent')
	behavior_this_on_height.connectOnChanged(dep$behavior_this_on_height$delay$0, 'open', update$behavior_this_on_height$delay)
	var dep$behavior_this_on_height$delay$1 = behavior_this_on_height._get('parent')._get('hover')
	behavior_this_on_height.connectOnChanged(dep$behavior_this_on_height$delay$1, 'value', update$behavior_this_on_height$delay)
	behavior_this_on_height._removeUpdater('delay', [[dep$behavior_this_on_height$delay$0, 'open', update$behavior_this_on_height$delay],[dep$behavior_this_on_height$delay$1, 'value', update$behavior_this_on_height$delay]])
	update$behavior_this_on_height$delay();

	this.setAnimation('height', behavior_this_on_height);

	var behavior_this_on_width = new _globals.core.Animation(this)
	var behavior_this_on_width__closure = { behavior_this_on_width: behavior_this_on_width }

//creating component Animation
	behavior_this_on_width.__create(behavior_this_on_width__closure.__closure_behavior_this_on_width = { })


//setting up component Animation
	var behavior_this_on_width = behavior_this_on_width__closure.behavior_this_on_width
	behavior_this_on_width.__setup(behavior_this_on_width__closure.__closure_behavior_this_on_width)
	delete behavior_this_on_width__closure.__closure_behavior_this_on_width

//assigning duration to (750)
	behavior_this_on_width._removeUpdater('duration'); behavior_this_on_width.duration = ((750));
//assigning delay to (this._get('parent')._get('open') || this._get('parent')._get('hover')._get('value') ? 0 : 600)
	var update$behavior_this_on_width$delay = (function() { behavior_this_on_width.delay = ((this._get('parent')._get('open') || this._get('parent')._get('hover')._get('value') ? 0 : 600)); }).bind(behavior_this_on_width)
	var dep$behavior_this_on_width$delay$0 = behavior_this_on_width._get('parent')
	behavior_this_on_width.connectOnChanged(dep$behavior_this_on_width$delay$0, 'open', update$behavior_this_on_width$delay)
	var dep$behavior_this_on_width$delay$1 = behavior_this_on_width._get('parent')._get('hover')
	behavior_this_on_width.connectOnChanged(dep$behavior_this_on_width$delay$1, 'value', update$behavior_this_on_width$delay)
	behavior_this_on_width._removeUpdater('delay', [[dep$behavior_this_on_width$delay$0, 'open', update$behavior_this_on_width$delay],[dep$behavior_this_on_width$delay$1, 'value', update$behavior_this_on_width$delay]])
	update$behavior_this_on_width$delay();

	this.setAnimation('width', behavior_this_on_width);

	var behavior_this_on_background = new _globals.core.Animation(this)
	var behavior_this_on_background__closure = { behavior_this_on_background: behavior_this_on_background }

//creating component Animation
	behavior_this_on_background.__create(behavior_this_on_background__closure.__closure_behavior_this_on_background = { })


//setting up component Animation
	var behavior_this_on_background = behavior_this_on_background__closure.behavior_this_on_background
	behavior_this_on_background.__setup(behavior_this_on_background__closure.__closure_behavior_this_on_background)
	delete behavior_this_on_background__closure.__closure_behavior_this_on_background

//assigning duration to (750)
	behavior_this_on_background._removeUpdater('duration'); behavior_this_on_background.duration = ((750));
//assigning delay to (this._get('parent')._get('open') || this._get('parent')._get('hover')._get('value') ? 0 : 600)
	var update$behavior_this_on_background$delay = (function() { behavior_this_on_background.delay = ((this._get('parent')._get('open') || this._get('parent')._get('hover')._get('value') ? 0 : 600)); }).bind(behavior_this_on_background)
	var dep$behavior_this_on_background$delay$0 = behavior_this_on_background._get('parent')
	behavior_this_on_background.connectOnChanged(dep$behavior_this_on_background$delay$0, 'open', update$behavior_this_on_background$delay)
	var dep$behavior_this_on_background$delay$1 = behavior_this_on_background._get('parent')._get('hover')
	behavior_this_on_background.connectOnChanged(dep$behavior_this_on_background$delay$1, 'value', update$behavior_this_on_background$delay)
	behavior_this_on_background._removeUpdater('delay', [[dep$behavior_this_on_background$delay$0, 'open', update$behavior_this_on_background$delay],[dep$behavior_this_on_background$delay$1, 'value', update$behavior_this_on_background$delay]])
	update$behavior_this_on_background$delay();

	this.setAnimation('background', behavior_this_on_background);

	var behavior_this_on_y = new _globals.core.Animation(this)
	var behavior_this_on_y__closure = { behavior_this_on_y: behavior_this_on_y }

//creating component Animation
	behavior_this_on_y.__create(behavior_this_on_y__closure.__closure_behavior_this_on_y = { })


//setting up component Animation
	var behavior_this_on_y = behavior_this_on_y__closure.behavior_this_on_y
	behavior_this_on_y.__setup(behavior_this_on_y__closure.__closure_behavior_this_on_y)
	delete behavior_this_on_y__closure.__closure_behavior_this_on_y

//assigning duration to (750)
	behavior_this_on_y._removeUpdater('duration'); behavior_this_on_y.duration = ((750));
//assigning delay to (this._get('parent')._get('open') || this._get('parent')._get('hover')._get('value') ? 0 : 600)
	var update$behavior_this_on_y$delay = (function() { behavior_this_on_y.delay = ((this._get('parent')._get('open') || this._get('parent')._get('hover')._get('value') ? 0 : 600)); }).bind(behavior_this_on_y)
	var dep$behavior_this_on_y$delay$0 = behavior_this_on_y._get('parent')
	behavior_this_on_y.connectOnChanged(dep$behavior_this_on_y$delay$0, 'open', update$behavior_this_on_y$delay)
	var dep$behavior_this_on_y$delay$1 = behavior_this_on_y._get('parent')._get('hover')
	behavior_this_on_y.connectOnChanged(dep$behavior_this_on_y$delay$1, 'value', update$behavior_this_on_y$delay)
	behavior_this_on_y._removeUpdater('delay', [[dep$behavior_this_on_y$delay$0, 'open', update$behavior_this_on_y$delay],[dep$behavior_this_on_y$delay$1, 'value', update$behavior_this_on_y$delay]])
	update$behavior_this_on_y$delay();

	this.setAnimation('y', behavior_this_on_y);

	var behavior_this_on_x = new _globals.core.Animation(this)
	var behavior_this_on_x__closure = { behavior_this_on_x: behavior_this_on_x }

//creating component Animation
	behavior_this_on_x.__create(behavior_this_on_x__closure.__closure_behavior_this_on_x = { })


//setting up component Animation
	var behavior_this_on_x = behavior_this_on_x__closure.behavior_this_on_x
	behavior_this_on_x.__setup(behavior_this_on_x__closure.__closure_behavior_this_on_x)
	delete behavior_this_on_x__closure.__closure_behavior_this_on_x

//assigning duration to (750)
	behavior_this_on_x._removeUpdater('duration'); behavior_this_on_x.duration = ((750));
//assigning delay to (this._get('parent')._get('open') || this._get('parent')._get('hover')._get('value') ? 0 : 600)
	var update$behavior_this_on_x$delay = (function() { behavior_this_on_x.delay = ((this._get('parent')._get('open') || this._get('parent')._get('hover')._get('value') ? 0 : 600)); }).bind(behavior_this_on_x)
	var dep$behavior_this_on_x$delay$0 = behavior_this_on_x._get('parent')
	behavior_this_on_x.connectOnChanged(dep$behavior_this_on_x$delay$0, 'open', update$behavior_this_on_x$delay)
	var dep$behavior_this_on_x$delay$1 = behavior_this_on_x._get('parent')._get('hover')
	behavior_this_on_x.connectOnChanged(dep$behavior_this_on_x$delay$1, 'value', update$behavior_this_on_x$delay)
	behavior_this_on_x._removeUpdater('delay', [[dep$behavior_this_on_x$delay$0, 'open', update$behavior_this_on_x$delay],[dep$behavior_this_on_x$delay$1, 'value', update$behavior_this_on_x$delay]])
	update$behavior_this_on_x$delay();

	this.setAnimation('x', behavior_this_on_x);


//setting up component DragMixin
			var this$child0 = __closure.this$child0
			this$child0.__setup(__closure.__closure_this$child0)
			delete __closure.__closure_this$child0


			this.addChild(this$child0)

//setting up component Text
			var this$child1 = __closure.this$child1
			this$child1.__setup(__closure.__closure_this$child1)
			delete __closure.__closure_this$child1

//assigning text to (this._get('parent')._get('idx'))
			var update$this_child1$text = (function() { this$child1.text = ((this._get('parent')._get('idx'))); }).bind(this$child1)
			var dep$this_child1$text$0 = this$child1._get('parent')
			this$child1.connectOnChanged(dep$this_child1$text$0, 'idx', update$this_child1$text)
			this$child1._removeUpdater('text', [[dep$this_child1$text$0, 'idx', update$this_child1$text]])
			update$this_child1$text();
//assigning anchors.centerIn to (this._get('parent'))
			var update$this_child1$anchors_centerIn = (function() { this$child1._get('anchors').centerIn = ((this._get('parent'))); }).bind(this$child1)
			var dep$this_child1$anchors_centerIn$0 = this$child1
			this$child1.connectOnChanged(dep$this_child1$anchors_centerIn$0, 'parent', update$this_child1$anchors_centerIn)
			this$child1._removeUpdater('anchors.centerIn', [[dep$this_child1$anchors_centerIn$0, 'parent', update$this_child1$anchors_centerIn]])
			update$this_child1$anchors_centerIn();

			this.addChild(this$child1)
}
//=====[component core.Transform]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.core.Transform = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);
	//custom constructor:
	{ this._transforms = {} }

}
	_globals.core.Transform.prototype = Object.create(_globals.core.Object.prototype)
	_globals.core.Transform.prototype.constructor = _globals.core.Transform
	_globals.core.Transform.prototype.componentName = 'core.Transform'
	_globals.core.Transform.prototype._update = function(name,value) {
		switch(name) {
			case 'perspective':	this._transforms['perspective'] = value + 'px'; break;
			case 'translateX':	this._transforms['translateX'] = value + 'px'; break;
			case 'translateY':	this._transforms['translateY'] = value + 'px'; break;
			case 'translateZ':	this._transforms['translateZ'] = value + 'px'; break;
			case 'rotateX':	this._transforms['rotateX'] = value + 'deg'; break
			case 'rotateY':	this._transforms['rotateY'] = value + 'deg'; break
			case 'rotateZ':	this._transforms['rotateZ'] = value + 'deg'; break
			case 'rotate':	this._transforms['rotate'] = value + 'deg'; break
			case 'scaleX':	this._transforms['scaleX'] = value; break
			case 'scaleY':	this._transforms['scaleY'] = value; break
			case 'skewX':	this._transforms['skewX'] = value + 'deg'; break
			case 'skewY':	this._transforms['skewY'] = value + 'deg'; break
		}

		var str = ""
		for (var i in this._transforms) {
			str += i
			str += "(" + this._transforms[i] + ") "
		}
		this.parent.style('transform', str)
		_globals.core.Object.prototype._update.apply(this, arguments)
	}
	core.addProperty(_globals.core.Transform.prototype, 'int', 'perspective')
	core.addProperty(_globals.core.Transform.prototype, 'int', 'translateX')
	core.addProperty(_globals.core.Transform.prototype, 'int', 'translateY')
	core.addProperty(_globals.core.Transform.prototype, 'int', 'translateZ')
	core.addProperty(_globals.core.Transform.prototype, 'real', 'rotateX')
	core.addProperty(_globals.core.Transform.prototype, 'real', 'rotateY')
	core.addProperty(_globals.core.Transform.prototype, 'real', 'rotateZ')
	core.addProperty(_globals.core.Transform.prototype, 'real', 'rotate')
	core.addProperty(_globals.core.Transform.prototype, 'real', 'scaleX')
	core.addProperty(_globals.core.Transform.prototype, 'real', 'scaleY')
	core.addProperty(_globals.core.Transform.prototype, 'real', 'skewX')
	core.addProperty(_globals.core.Transform.prototype, 'real', 'skewY')//=====[component core.Anchors]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.core.Anchors = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);

}
	_globals.core.Anchors.prototype = Object.create(_globals.core.Object.prototype)
	_globals.core.Anchors.prototype.constructor = _globals.core.Anchors
	_globals.core.Anchors.prototype.componentName = 'core.Anchors'
	_globals.core.Anchors.prototype.marginsUpdated = _globals.core.createSignal('marginsUpdated')
	_globals.core.Anchors.prototype._updateBottom = function() {
		var anchors = this
		var self = anchors.parent
		var parent = self.parent

		var parent_box = parent.toScreen()
		var bottom = anchors.bottom.toScreen()

		var tm = anchors.topMargin || anchors.margins
		var bm = anchors.bottomMargin || anchors.margins
		if (anchors.top) {
			var top = anchors.top.toScreen()
			self.height = bottom - top - bm - tm
		}
		self.y = bottom - parent_box[1] - bm - self.height - self.viewY
	}
	_globals.core.Anchors.prototype._update = function(name) {
		var self = this.parent
		var anchors = this

		switch(name) {
			case 'left':
				self._removeUpdater('x')
				if (this.right)
					self._removeUpdater('width')
				var update_left = this._updateLeft.bind(this)
				update_left()
				self.connectOn(anchors.left.parent, 'boxChanged', update_left)
				anchors.onChanged('leftMargin', update_left)
				break

			case 'right':
				self._removeUpdater('x')
				if (this.left)
					self._removeUpdater('width')
				var update_right = this._updateRight.bind(this)
				update_right()
				self.onChanged('width', update_right)
				self.connectOn(anchors.right.parent, 'boxChanged', update_right)
				anchors.onChanged('rightMargin', update_right)
				break

			case 'top':
				self._removeUpdater('y')
				if (this.bottom)
					self._removeUpdater('height')
				var update_top = this._updateTop.bind(this)
				update_top()
				self.connectOn(anchors.top.parent, 'boxChanged', update_top)
				anchors.onChanged('topMargin', update_top)
				break

			case 'bottom':
				self._removeUpdater('y')
				if (this.top)
					self._removeUpdater('height')
				var update_bottom = this._updateBottom.bind(this)
				update_bottom()
				self.onChanged('height', update_bottom)
				self.connectOn(anchors.bottom.parent, 'boxChanged', update_bottom)
				anchors.onChanged('bottomMargin', update_bottom)
				break

			case 'horizontalCenter':
				self._removeUpdater('x')
				var update_h_center = this._updateHCenter.bind(this)
				update_h_center()
				self.onChanged('width', update_h_center)
				anchors.onChanged('leftMargin', update_h_center)
				anchors.onChanged('rightMargin', update_h_center)
				self.connectOn(anchors.horizontalCenter.parent, 'boxChanged', update_h_center)
				break

			case 'verticalCenter':
				self._removeUpdater('y')
				var update_v_center = this._updateVCenter.bind(this)
				update_v_center()
				self.onChanged('height', update_v_center)
				anchors.onChanged('topMargin', update_v_center)
				anchors.onChanged('bottomMargin', update_v_center)
				self.connectOn(anchors.verticalCenter.parent, 'boxChanged', update_v_center)
				break

			case 'fill':
				anchors.left = anchors.fill.left
				anchors.right = anchors.fill.right
				anchors.top = anchors.fill.top
				anchors.bottom = anchors.fill.bottom
				break

			case 'centerIn':
				anchors.horizontalCenter = anchors.centerIn.horizontalCenter
				anchors.verticalCenter = anchors.centerIn.verticalCenter
				break

			case 'leftMargin':
			case 'rightMargin':
			case 'topMargin':
			case 'bottomMargin':
			case 'margins':
				this.marginsUpdated();
		}
		_globals.core.Object.prototype._update.apply(this, arguments)
	}
	_globals.core.Anchors.prototype._updateLeft = function() {
		var anchors = this
		var self = anchors.parent
		var parent = self.parent

		var parent_box = parent.toScreen()
		var left = anchors.left.toScreen()

		var lm = anchors.leftMargin || anchors.margins
		self.x = left + lm - parent_box[0] - self.viewX
		if (anchors.right) {
			var right = anchors.right.toScreen()
			var rm = anchors.rightMargin || anchors.margins
			self.width = right - left - rm - lm
		}
	}
	_globals.core.Anchors.prototype._updateHCenter = function() {
		var anchors = this
		var self = anchors.parent
		var parent = self.parent

		var parent_box = parent.toScreen();
		var hcenter = anchors.horizontalCenter.toScreen();
		var lm = anchors.leftMargin || anchors.margins;
		var rm = anchors.rightMargin || anchors.margins;
		self.x = hcenter - self.width / 2 - parent_box[0] + lm - rm - self.viewX;
	}
	_globals.core.Anchors.prototype._updateRight = function() {
		var anchors = this
		var self = anchors.parent
		var parent = self.parent

		var parent_box = parent.toScreen()
		var right = anchors.right.toScreen()

		var lm = anchors.leftMargin || anchors.margins
		var rm = anchors.rightMargin || anchors.margins
		if (anchors.left) {
			var left = anchors.left.toScreen()
			self.width = right - left - rm - lm
		}
		self.x = right - parent_box[0] - rm - self.width - self.viewX
	}
	_globals.core.Anchors.prototype._updateTop = function() {
		var anchors = this
		var self = anchors.parent
		var parent = self.parent

		var parent_box = parent.toScreen()
		var top = anchors.top.toScreen()

		var tm = anchors.topMargin || anchors.margins
		var bm = anchors.bottomMargin || anchors.margins
		self.y = top + tm - parent_box[1] - self.viewY
		if (anchors.bottom) {
			var bottom = anchors.bottom.toScreen()
			self.height = bottom - top - bm - tm
		}
	}
	_globals.core.Anchors.prototype._updateVCenter = function() {
		var anchors = this
		var self = anchors.parent
		var parent = self.parent

		var parent_box = parent.toScreen();
		var vcenter = anchors.verticalCenter.toScreen();
		var tm = anchors.topMargin || anchors.margins;
		var bm = anchors.bottomMargin || anchors.margins;
		self.y = vcenter - self.height / 2 - parent_box[1] + tm - bm - self.viewY;
	}
	core.addProperty(_globals.core.Anchors.prototype, 'AnchorLine', 'bottom')
	core.addProperty(_globals.core.Anchors.prototype, 'AnchorLine', 'verticalCenter')
	core.addProperty(_globals.core.Anchors.prototype, 'AnchorLine', 'top')
	core.addProperty(_globals.core.Anchors.prototype, 'AnchorLine', 'left')
	core.addProperty(_globals.core.Anchors.prototype, 'AnchorLine', 'horizontalCenter')
	core.addProperty(_globals.core.Anchors.prototype, 'AnchorLine', 'right')
	core.addProperty(_globals.core.Anchors.prototype, 'Item', 'fill')
	core.addProperty(_globals.core.Anchors.prototype, 'Item', 'centerIn')
	core.addProperty(_globals.core.Anchors.prototype, 'int', 'margins')
	core.addProperty(_globals.core.Anchors.prototype, 'int', 'bottomMargin')
	core.addProperty(_globals.core.Anchors.prototype, 'int', 'topMargin')
	core.addProperty(_globals.core.Anchors.prototype, 'int', 'leftMargin')
	core.addProperty(_globals.core.Anchors.prototype, 'int', 'rightMargin')//=====[component core.Location]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.core.Location = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);
	//custom constructor:
	{
		var self = this
		var location = window.location
		window.onhashchange = function() { self.hash = location.hash }
		window.onpopstate = function() { self.updateActualValues() }
	}

}
	_globals.core.Location.prototype = Object.create(_globals.core.Object.prototype)
	_globals.core.Location.prototype.constructor = _globals.core.Location
	_globals.core.Location.prototype.componentName = 'core.Location'
	_globals.core.Location.prototype.updateActualValues = function() {
		this.hash = window.location.hash
		this.host = window.location.host
		this.href = window.location.href
		this.port = window.location.port
		this.origin = window.location.origin
		this.hostname = window.location.hostname
		this.pathname = window.location.pathname

		var state = window.history.state
		this.historyState = (typeof state === "string") ? state : JSON.stringify(state)
	}
	_globals.core.Location.prototype.pushState = function(state,title,url) {
		window.history.pushState(state, title, url)
		this.updateActualValues()
	}
	_globals.core.Location.prototype.changeHref = function(href) {
		window.location.href = href
		this.updateActualValues()
	}
	core.addProperty(_globals.core.Location.prototype, 'string', 'hash')
	core.addProperty(_globals.core.Location.prototype, 'string', 'host')
	core.addProperty(_globals.core.Location.prototype, 'string', 'href')
	core.addProperty(_globals.core.Location.prototype, 'string', 'port')
	core.addProperty(_globals.core.Location.prototype, 'string', 'origin')
	core.addProperty(_globals.core.Location.prototype, 'string', 'hostname')
	core.addProperty(_globals.core.Location.prototype, 'string', 'pathname')
	core.addProperty(_globals.core.Location.prototype, 'string', 'historyState')//=====[component core.ListModel]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.core.ListModel = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);
	//custom constructor:
	{
		this._rows = []
	}

}
	_globals.core.ListModel.prototype = Object.create(_globals.core.Object.prototype)
	_globals.core.ListModel.prototype.constructor = _globals.core.ListModel
	_globals.core.ListModel.prototype.componentName = 'core.ListModel'
	_globals.core.ListModel.prototype.reset = _globals.core.createSignal('reset')
	_globals.core.ListModel.prototype.rowsChanged = _globals.core.createSignal('rowsChanged')
	_globals.core.ListModel.prototype.rowsRemoved = _globals.core.createSignal('rowsRemoved')
	_globals.core.ListModel.prototype.rowsInserted = _globals.core.createSignal('rowsInserted')
	_globals.core.ListModel.prototype.insert = function(idx,row) {
		if (idx < 0 || idx > this._rows.length)
			throw new Error('index ' + idx + ' out of bounds (' + this._rows.length + ')')
		this._rows.splice(idx, 0, row)
		this.count = this._rows.length
		this.rowsInserted(idx, idx + 1)
	}
	_globals.core.ListModel.prototype.set = function(idx,row) {
		if (idx < 0 || idx >= this._rows.length)
			throw new Error('index ' + idx + ' out of bounds (' + this._rows.length + ')')
		if (!(row instanceof Object))
			throw new Error('row is non-object')
		this._rows[idx] = row
		this.rowsChanged(idx, idx + 1)
	}
	_globals.core.ListModel.prototype.get = function(idx) {
		if (idx < 0 || idx >= this._rows.length)
			throw new Error('index ' + idx + ' out of bounds (' + this._rows.length + ')')
		var row = this._rows[idx]
		if (!(row instanceof Object))
			throw new Error('row is non-object')
		row.index = idx
		return row
	}
	_globals.core.ListModel.prototype.clear = function() { this.assign([]) }
	_globals.core.ListModel.prototype.remove = function(idx,n) {
		if (idx < 0 || idx >= this._rows.length)
			throw new Error('index ' + idx + ' out of bounds')
		if (n === undefined)
			n = 1
		this._rows.splice(idx, n)
		this.count = this._rows.length
		this.rowsRemoved(idx, idx + n)
	}
	_globals.core.ListModel.prototype.addChild = function(child) {
		this.append(child)
	}
	_globals.core.ListModel.prototype.setProperty = function(idx,name,value) {
		if (idx < 0 || idx >= this._rows.length)
			throw new Error('index ' + idx + ' out of bounds (' + this._rows.length + ')')
		var row = this._rows[idx]
		if (!(row instanceof Object))
			throw new Error('row is non-object, invalid index? (' + idx + ')')

		if (row[name] !== value) {
			row[name] = value
			this.rowsChanged(idx, idx + 1)
		}
	}
	_globals.core.ListModel.prototype.assign = function(rows) {
		this._rows = rows
		this.count = this._rows.length
		this.reset()
	}
	_globals.core.ListModel.prototype.append = function(row) {
		var l = this._rows.length
		if (Array.isArray(row)) {
			Array.prototype.push.apply(this._rows, row)
			this.count = this._rows.length
			this.rowsInserted(l, l + row.length)
		} else {
			this._rows.push(row)
			this.count = this._rows.length
			this.rowsInserted(l, l + 1)
		}
	}
	core.addProperty(_globals.core.ListModel.prototype, 'int', 'count')//=====[component core.AnchorLine]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.core.AnchorLine = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);

}
	_globals.core.AnchorLine.prototype = Object.create(_globals.core.Object.prototype)
	_globals.core.AnchorLine.prototype.constructor = _globals.core.AnchorLine
	_globals.core.AnchorLine.prototype.componentName = 'core.AnchorLine'
	_globals.core.AnchorLine.prototype.toScreen = function() {
		return this.parent.toScreen()[this.boxIndex]
	}
	core.addProperty(_globals.core.AnchorLine.prototype, 'int', 'boxIndex')//=====[component vc.Letter]=====================

/**
 * @constructor
 * @extends {_globals.core.Item}
 */
	_globals.vc.Letter = function(parent, _delegate) {
	_globals.core.Item.apply(this, arguments);

}
	_globals.vc.Letter.prototype = Object.create(_globals.core.Item.prototype)
	_globals.vc.Letter.prototype.constructor = _globals.vc.Letter
	_globals.vc.Letter.prototype.componentName = 'vc.Letter'
	_globals.vc.Letter.prototype.close = function() {
		this._coverInst.open = false;
		this.open = false;
	}
	_globals.vc.Letter.prototype.remove = function() {
//		this._coverInst.open = false;
		this.open = false;
		this._coverInst.remove();
	}
	_globals.vc.Letter.prototype.show = function(inst) {
		this._coverInst = inst;
		this.open = true;
	}
	core.addProperty(_globals.vc.Letter.prototype, 'bool', 'open')
	core.addProperty(_globals.vc.Letter.prototype, 'Mixin', 'hover')

	_globals.vc.Letter.prototype.__create = function(__closure) {
		_globals.core.Item.prototype.__create.call(this, __closure.__base = { })
var this$child0 = new _globals.core.Item(this)
		__closure.this$child0 = this$child0

//creating component Item
		this$child0.__create(__closure.__closure_this$child0 = { })
		var this_child0$child0 = new _globals.core.Rectangle(this$child0)
		__closure.this_child0$child0 = this_child0$child0

//creating component Rectangle
		this_child0$child0.__create(__closure.__closure_this_child0$child0 = { })
		var this_child0_child0$child0 = new _globals.core.Text(this_child0$child0)
		__closure.this_child0_child0$child0 = this_child0_child0$child0

//creating component Text
		this_child0_child0$child0.__create(__closure.__closure_this_child0_child0$child0 = { })

		var this$child1 = new _globals.core.Rectangle(this)
		__closure.this$child1 = this$child1

//creating component Rectangle
		this$child1.__create(__closure.__closure_this$child1 = { })
		var this_child1$child0 = new _globals.core.Text(this$child1)
		__closure.this_child1$child0 = this_child1$child0

//creating component Text
		this_child1$child0.__create(__closure.__closure_this_child1$child0 = { })

		var this$child2 = new _globals.core.Item(this)
		__closure.this$child2 = this$child2

//creating component Item
		this$child2.__create(__closure.__closure_this$child2 = { })
		var this_child2$child0 = new _globals.core.Rectangle(this$child2)
		__closure.this_child2$child0 = this_child2$child0

//creating component Rectangle
		this_child2$child0.__create(__closure.__closure_this_child2$child0 = { })
		var this_child2_child0$child0 = new _globals.core.Text(this_child2$child0)
		__closure.this_child2_child0$child0 = this_child2_child0$child0

//creating component Text
		this_child2_child0$child0.__create(__closure.__closure_this_child2_child0$child0 = { })

		var this_child2_child0$child1 = new _globals.core.Text(this_child2$child0)
		__closure.this_child2_child0$child1 = this_child2_child0$child1

//creating component Text
		this_child2_child0$child1.__create(__closure.__closure_this_child2_child0$child1 = { })
		var this_child2_child0_child1$child0 = new _globals.controls.mixins.HoverMixin(this_child2_child0$child1)
		__closure.this_child2_child0_child1$child0 = this_child2_child0_child1$child0

//creating component HoverMixin
		this_child2_child0_child1$child0.__create(__closure.__closure_this_child2_child0_child1$child0 = { })

//creating component vc.<anonymous>
		var this$hover = new _globals.controls.mixins.HoverMixin(this)
		__closure.this$hover = this$hover

//creating component HoverMixin
		this$hover.__create(__closure.__closure_this$hover = { })

		this.hover = this$hover
		this._setId('letter')
	}
	_globals.vc.Letter.prototype.__setup = function(__closure) {
	_globals.core.Item.prototype.__setup.call(this, __closure.__base); delete __closure.__base
//setting up component HoverMixin
			var this$hover = __closure.this$hover
			this$hover.__setup(__closure.__closure_this$hover)
			delete __closure.__closure_this$hover


//assigning visible to (this._get('open'))
			var update$this$visible = (function() { this.visible = ((this._get('open'))); }).bind(this)
			var dep$this$visible$0 = this
			this.connectOnChanged(dep$this$visible$0, 'open', update$this$visible)
			this._removeUpdater('visible', [[dep$this$visible$0, 'open', update$this$visible]])
			update$this$visible();
//assigning height to ((this._get('parent')._get('height') * ((80) / 100)))
			var update$this$height = (function() { this.height = (((this._get('parent')._get('height') * ((80) / 100)))); }).bind(this)
			var dep$this$height$0 = this._get('parent')
			this.connectOnChanged(dep$this$height$0, 'height', update$this$height)
			this._removeUpdater('height', [[dep$this$height$0, 'height', update$this$height]])
			update$this$height();
//assigning width to ((this._get('parent')._get('width') * ((50) / 100)))
			var update$this$width = (function() { this.width = (((this._get('parent')._get('width') * ((50) / 100)))); }).bind(this)
			var dep$this$width$0 = this._get('parent')
			this.connectOnChanged(dep$this$width$0, 'width', update$this$width)
			this._removeUpdater('width', [[dep$this$width$0, 'width', update$this$width]])
			update$this$width();
//assigning z to (1)
			this._removeUpdater('z'); this.z = ((1));
	var behavior_this_on_visible = new _globals.core.Animation(this)
	var behavior_this_on_visible__closure = { behavior_this_on_visible: behavior_this_on_visible }

//creating component Animation
	behavior_this_on_visible.__create(behavior_this_on_visible__closure.__closure_behavior_this_on_visible = { })


//setting up component Animation
	var behavior_this_on_visible = behavior_this_on_visible__closure.behavior_this_on_visible
	behavior_this_on_visible.__setup(behavior_this_on_visible__closure.__closure_behavior_this_on_visible)
	delete behavior_this_on_visible__closure.__closure_behavior_this_on_visible

//assigning delay to (this._get('letter')._get('open') ? 750 : 600)
	var update$behavior_this_on_visible$delay = (function() { behavior_this_on_visible.delay = ((this._get('letter')._get('open') ? 750 : 600)); }).bind(behavior_this_on_visible)
	var dep$behavior_this_on_visible$delay$0 = behavior_this_on_visible._get('letter')
	behavior_this_on_visible.connectOnChanged(dep$behavior_this_on_visible$delay$0, 'open', update$behavior_this_on_visible$delay)
	behavior_this_on_visible._removeUpdater('delay', [[dep$behavior_this_on_visible$delay$0, 'open', update$behavior_this_on_visible$delay]])
	update$behavior_this_on_visible$delay();
//assigning duration to (0)
	behavior_this_on_visible._removeUpdater('duration'); behavior_this_on_visible.duration = ((0));

	this.setAnimation('visible', behavior_this_on_visible);


//setting up component Item
			var this$child0 = __closure.this$child0
			this$child0.__setup(__closure.__closure_this$child0)
			delete __closure.__closure_this$child0

//assigning transform.perspective to (1000)
			this$child0._removeUpdater('transform.perspective'); this$child0._get('transform').perspective = ((1000));
//assigning height to ((this._get('parent')._get('height') * ((66) / 100)))
			var update$this_child0$height = (function() { this$child0.height = (((this._get('parent')._get('height') * ((66) / 100)))); }).bind(this$child0)
			var dep$this_child0$height$0 = this$child0._get('parent')
			this$child0.connectOnChanged(dep$this_child0$height$0, 'height', update$this_child0$height)
			this$child0._removeUpdater('height', [[dep$this_child0$height$0, 'height', update$this_child0$height]])
			update$this_child0$height();
//assigning transform.rotateX to (this._get('letter')._get('open') ? 0 : - 180)
			var update$this_child0$transform_rotateX = (function() { this$child0._get('transform').rotateX = ((this._get('letter')._get('open') ? 0 : - 180)); }).bind(this$child0)
			var dep$this_child0$transform_rotateX$0 = this$child0._get('letter')
			this$child0.connectOnChanged(dep$this_child0$transform_rotateX$0, 'open', update$this_child0$transform_rotateX)
			this$child0._removeUpdater('transform.rotateX', [[dep$this_child0$transform_rotateX$0, 'open', update$this_child0$transform_rotateX]])
			update$this_child0$transform_rotateX();
//assigning z to (2)
			this$child0._removeUpdater('z'); this$child0.z = ((2));
//assigning width to ((this._get('parent')._get('width') * ((100) / 100)))
			var update$this_child0$width = (function() { this$child0.width = (((this._get('parent')._get('width') * ((100) / 100)))); }).bind(this$child0)
			var dep$this_child0$width$0 = this$child0._get('parent')
			this$child0.connectOnChanged(dep$this_child0$width$0, 'width', update$this_child0$width)
			this$child0._removeUpdater('width', [[dep$this_child0$width$0, 'width', update$this_child0$width]])
			update$this_child0$width();
	var behavior_this_child0_on_y = new _globals.core.Animation(this$child0)
	var behavior_this_child0_on_y__closure = { behavior_this_child0_on_y: behavior_this_child0_on_y }

//creating component Animation
	behavior_this_child0_on_y.__create(behavior_this_child0_on_y__closure.__closure_behavior_this_child0_on_y = { })


//setting up component Animation
	var behavior_this_child0_on_y = behavior_this_child0_on_y__closure.behavior_this_child0_on_y
	behavior_this_child0_on_y.__setup(behavior_this_child0_on_y__closure.__closure_behavior_this_child0_on_y)
	delete behavior_this_child0_on_y__closure.__closure_behavior_this_child0_on_y

//assigning duration to (400)
	behavior_this_child0_on_y._removeUpdater('duration'); behavior_this_child0_on_y.duration = ((400));
//assigning delay to (this._get('letter')._get('open') ? 1000 : 400)
	var update$behavior_this_child0_on_y$delay = (function() { behavior_this_child0_on_y.delay = ((this._get('letter')._get('open') ? 1000 : 400)); }).bind(behavior_this_child0_on_y)
	var dep$behavior_this_child0_on_y$delay$0 = behavior_this_child0_on_y._get('letter')
	behavior_this_child0_on_y.connectOnChanged(dep$behavior_this_child0_on_y$delay$0, 'open', update$behavior_this_child0_on_y$delay)
	behavior_this_child0_on_y._removeUpdater('delay', [[dep$behavior_this_child0_on_y$delay$0, 'open', update$behavior_this_child0_on_y$delay]])
	update$behavior_this_child0_on_y$delay();
//assigning easing to ("linear")
	behavior_this_child0_on_y._removeUpdater('easing'); behavior_this_child0_on_y.easing = (("linear"));

	this$child0.setAnimation('y', behavior_this_child0_on_y);

	var behavior_this_child0_on_z = new _globals.core.Animation(this$child0)
	var behavior_this_child0_on_z__closure = { behavior_this_child0_on_z: behavior_this_child0_on_z }

//creating component Animation
	behavior_this_child0_on_z.__create(behavior_this_child0_on_z__closure.__closure_behavior_this_child0_on_z = { })


//setting up component Animation
	var behavior_this_child0_on_z = behavior_this_child0_on_z__closure.behavior_this_child0_on_z
	behavior_this_child0_on_z.__setup(behavior_this_child0_on_z__closure.__closure_behavior_this_child0_on_z)
	delete behavior_this_child0_on_z__closure.__closure_behavior_this_child0_on_z

//assigning duration to (400)
	behavior_this_child0_on_z._removeUpdater('duration'); behavior_this_child0_on_z.duration = ((400));
//assigning delay to (this._get('letter')._get('open') ? 1000 : 400)
	var update$behavior_this_child0_on_z$delay = (function() { behavior_this_child0_on_z.delay = ((this._get('letter')._get('open') ? 1000 : 400)); }).bind(behavior_this_child0_on_z)
	var dep$behavior_this_child0_on_z$delay$0 = behavior_this_child0_on_z._get('letter')
	behavior_this_child0_on_z.connectOnChanged(dep$behavior_this_child0_on_z$delay$0, 'open', update$behavior_this_child0_on_z$delay)
	behavior_this_child0_on_z._removeUpdater('delay', [[dep$behavior_this_child0_on_z$delay$0, 'open', update$behavior_this_child0_on_z$delay]])
	update$behavior_this_child0_on_z$delay();
//assigning easing to ("linear")
	behavior_this_child0_on_z._removeUpdater('easing'); behavior_this_child0_on_z.easing = (("linear"));

	this$child0.setAnimation('z', behavior_this_child0_on_z);

	var behavior_this_child0_on_transform = new _globals.core.Animation(this$child0)
	var behavior_this_child0_on_transform__closure = { behavior_this_child0_on_transform: behavior_this_child0_on_transform }

//creating component Animation
	behavior_this_child0_on_transform.__create(behavior_this_child0_on_transform__closure.__closure_behavior_this_child0_on_transform = { })


//setting up component Animation
	var behavior_this_child0_on_transform = behavior_this_child0_on_transform__closure.behavior_this_child0_on_transform
	behavior_this_child0_on_transform.__setup(behavior_this_child0_on_transform__closure.__closure_behavior_this_child0_on_transform)
	delete behavior_this_child0_on_transform__closure.__closure_behavior_this_child0_on_transform

//assigning duration to (400)
	behavior_this_child0_on_transform._removeUpdater('duration'); behavior_this_child0_on_transform.duration = ((400));
//assigning delay to (this._get('letter')._get('open') ? 1000 : 400)
	var update$behavior_this_child0_on_transform$delay = (function() { behavior_this_child0_on_transform.delay = ((this._get('letter')._get('open') ? 1000 : 400)); }).bind(behavior_this_child0_on_transform)
	var dep$behavior_this_child0_on_transform$delay$0 = behavior_this_child0_on_transform._get('letter')
	behavior_this_child0_on_transform.connectOnChanged(dep$behavior_this_child0_on_transform$delay$0, 'open', update$behavior_this_child0_on_transform$delay)
	behavior_this_child0_on_transform._removeUpdater('delay', [[dep$behavior_this_child0_on_transform$delay$0, 'open', update$behavior_this_child0_on_transform$delay]])
	update$behavior_this_child0_on_transform$delay();
//assigning easing to ("linear")
	behavior_this_child0_on_transform._removeUpdater('easing'); behavior_this_child0_on_transform.easing = (("linear"));

	this$child0.setAnimation('transform', behavior_this_child0_on_transform);


//setting up component Rectangle
			var this_child0$child0 = __closure.this_child0$child0
			this_child0$child0.__setup(__closure.__closure_this_child0$child0)
			delete __closure.__closure_this_child0$child0

//assigning border.color to ("gray")
			this_child0$child0._removeUpdater('border.color'); this_child0$child0._get('border').color = (("gray"));
//assigning border.bottom.color to ("white")
			this_child0$child0._removeUpdater('border.bottom.color'); this_child0$child0._get('border')._get('bottom').color = (("white"));
//assigning color to (this._get('letter')._get('open') ? "#FFF" : "#F5F5F5")
			var update$this_child0_child0$color = (function() { this_child0$child0.color = ((this._get('letter')._get('open') ? "#FFF" : "#F5F5F5")); }).bind(this_child0$child0)
			var dep$this_child0_child0$color$0 = this_child0$child0._get('letter')
			this_child0$child0.connectOnChanged(dep$this_child0_child0$color$0, 'open', update$this_child0_child0$color)
			this_child0$child0._removeUpdater('color', [[dep$this_child0_child0$color$0, 'open', update$this_child0_child0$color]])
			update$this_child0_child0$color();
//assigning height to ((this._get('parent')._get('height') * ((50) / 100)))
			var update$this_child0_child0$height = (function() { this_child0$child0.height = (((this._get('parent')._get('height') * ((50) / 100)))); }).bind(this_child0$child0)
			var dep$this_child0_child0$height$0 = this_child0$child0._get('parent')
			this_child0$child0.connectOnChanged(dep$this_child0_child0$height$0, 'height', update$this_child0_child0$height)
			this_child0$child0._removeUpdater('height', [[dep$this_child0_child0$height$0, 'height', update$this_child0_child0$height]])
			update$this_child0_child0$height();
//assigning border.bottom.width to (1)
			this_child0$child0._removeUpdater('border.bottom.width'); this_child0$child0._get('border')._get('bottom').width = ((1));
//assigning width to ((this._get('parent')._get('width') * ((100) / 100)))
			var update$this_child0_child0$width = (function() { this_child0$child0.width = (((this._get('parent')._get('width') * ((100) / 100)))); }).bind(this_child0$child0)
			var dep$this_child0_child0$width$0 = this_child0$child0._get('parent')
			this_child0$child0.connectOnChanged(dep$this_child0_child0$width$0, 'width', update$this_child0_child0$width)
			this_child0$child0._removeUpdater('width', [[dep$this_child0_child0$width$0, 'width', update$this_child0_child0$width]])
			update$this_child0_child0$width();
//assigning border.width to (1)
			this_child0$child0._removeUpdater('border.width'); this_child0$child0._get('border').width = ((1));
	var behavior_this_child0_child0_on_background = new _globals.core.Animation(this_child0$child0)
	var behavior_this_child0_child0_on_background__closure = { behavior_this_child0_child0_on_background: behavior_this_child0_child0_on_background }

//creating component Animation
	behavior_this_child0_child0_on_background.__create(behavior_this_child0_child0_on_background__closure.__closure_behavior_this_child0_child0_on_background = { })


//setting up component Animation
	var behavior_this_child0_child0_on_background = behavior_this_child0_child0_on_background__closure.behavior_this_child0_child0_on_background
	behavior_this_child0_child0_on_background.__setup(behavior_this_child0_child0_on_background__closure.__closure_behavior_this_child0_child0_on_background)
	delete behavior_this_child0_child0_on_background__closure.__closure_behavior_this_child0_child0_on_background

//assigning duration to (0)
	behavior_this_child0_child0_on_background._removeUpdater('duration'); behavior_this_child0_child0_on_background.duration = ((0));
//assigning delay to (this._get('letter')._get('open') ? 1200 : 600)
	var update$behavior_this_child0_child0_on_background$delay = (function() { behavior_this_child0_child0_on_background.delay = ((this._get('letter')._get('open') ? 1200 : 600)); }).bind(behavior_this_child0_child0_on_background)
	var dep$behavior_this_child0_child0_on_background$delay$0 = behavior_this_child0_child0_on_background._get('letter')
	behavior_this_child0_child0_on_background.connectOnChanged(dep$behavior_this_child0_child0_on_background$delay$0, 'open', update$behavior_this_child0_child0_on_background$delay)
	behavior_this_child0_child0_on_background._removeUpdater('delay', [[dep$behavior_this_child0_child0_on_background$delay$0, 'open', update$behavior_this_child0_child0_on_background$delay]])
	update$behavior_this_child0_child0_on_background$delay();

	this_child0$child0.setAnimation('background', behavior_this_child0_child0_on_background);


//setting up component Text
			var this_child0_child0$child0 = __closure.this_child0_child0$child0
			this_child0_child0$child0.__setup(__closure.__closure_this_child0_child0$child0)
			delete __closure.__closure_this_child0_child0$child0

//assigning opacity to (this._get('letter')._get('open') ? 1 : 0)
			var update$this_child0_child0_child0$opacity = (function() { this_child0_child0$child0.opacity = ((this._get('letter')._get('open') ? 1 : 0)); }).bind(this_child0_child0$child0)
			var dep$this_child0_child0_child0$opacity$0 = this_child0_child0$child0._get('letter')
			this_child0_child0$child0.connectOnChanged(dep$this_child0_child0_child0$opacity$0, 'open', update$this_child0_child0_child0$opacity)
			this_child0_child0$child0._removeUpdater('opacity', [[dep$this_child0_child0_child0$opacity$0, 'open', update$this_child0_child0_child0$opacity]])
			update$this_child0_child0_child0$opacity();
//assigning clip to (true)
			this_child0_child0$child0._removeUpdater('clip'); this_child0_child0$child0.clip = ((true));
//assigning text to ("Iranian President Hassan Rouhani has met with former Cuban leader Fidel Castro and his brother President Raul Castro during a one-day state visit in Havana. <br>Monday’s sit-down with Fidel Castro was an unusual encounter since Cuba’s 90-year-old retired president receives only a few people.")
			this_child0_child0$child0._removeUpdater('text'); this_child0_child0$child0.text = (("Iranian President Hassan Rouhani has met with former Cuban leader Fidel Castro and his brother President Raul Castro during a one-day state visit in Havana. <br>Monday’s sit-down with Fidel Castro was an unusual encounter since Cuba’s 90-year-old retired president receives only a few people."));
//assigning height to ((this._get('parent')._get('height') * ((90) / 100)))
			var update$this_child0_child0_child0$height = (function() { this_child0_child0$child0.height = (((this._get('parent')._get('height') * ((90) / 100)))); }).bind(this_child0_child0$child0)
			var dep$this_child0_child0_child0$height$0 = this_child0_child0$child0._get('parent')
			this_child0_child0$child0.connectOnChanged(dep$this_child0_child0_child0$height$0, 'height', update$this_child0_child0_child0$height)
			this_child0_child0$child0._removeUpdater('height', [[dep$this_child0_child0_child0$height$0, 'height', update$this_child0_child0_child0$height]])
			update$this_child0_child0_child0$height();
//assigning width to ((this._get('parent')._get('width') * ((90) / 100)))
			var update$this_child0_child0_child0$width = (function() { this_child0_child0$child0.width = (((this._get('parent')._get('width') * ((90) / 100)))); }).bind(this_child0_child0$child0)
			var dep$this_child0_child0_child0$width$0 = this_child0_child0$child0._get('parent')
			this_child0_child0$child0.connectOnChanged(dep$this_child0_child0_child0$width$0, 'width', update$this_child0_child0_child0$width)
			this_child0_child0$child0._removeUpdater('width', [[dep$this_child0_child0_child0$width$0, 'width', update$this_child0_child0_child0$width]])
			update$this_child0_child0_child0$width();
//assigning wrapMode to (_globals.core.Text.prototype.WordWrap)
			this_child0_child0$child0._removeUpdater('wrapMode'); this_child0_child0$child0.wrapMode = ((_globals.core.Text.prototype.WordWrap));
//assigning y to ((this._get('parent')._get('height') * ((5) / 100)))
			var update$this_child0_child0_child0$y = (function() { this_child0_child0$child0.y = (((this._get('parent')._get('height') * ((5) / 100)))); }).bind(this_child0_child0$child0)
			var dep$this_child0_child0_child0$y$0 = this_child0_child0$child0._get('parent')
			this_child0_child0$child0.connectOnChanged(dep$this_child0_child0_child0$y$0, 'height', update$this_child0_child0_child0$y)
			this_child0_child0$child0._removeUpdater('y', [[dep$this_child0_child0_child0$y$0, 'height', update$this_child0_child0_child0$y]])
			update$this_child0_child0_child0$y();
//assigning x to ((this._get('parent')._get('width') * ((5) / 100)))
			var update$this_child0_child0_child0$x = (function() { this_child0_child0$child0.x = (((this._get('parent')._get('width') * ((5) / 100)))); }).bind(this_child0_child0$child0)
			var dep$this_child0_child0_child0$x$0 = this_child0_child0$child0._get('parent')
			this_child0_child0$child0.connectOnChanged(dep$this_child0_child0_child0$x$0, 'width', update$this_child0_child0_child0$x)
			this_child0_child0$child0._removeUpdater('x', [[dep$this_child0_child0_child0$x$0, 'width', update$this_child0_child0_child0$x]])
			update$this_child0_child0_child0$x();
	var behavior_this_child0_child0_child0_on_opacity = new _globals.core.Animation(this_child0_child0$child0)
	var behavior_this_child0_child0_child0_on_opacity__closure = { behavior_this_child0_child0_child0_on_opacity: behavior_this_child0_child0_child0_on_opacity }

//creating component Animation
	behavior_this_child0_child0_child0_on_opacity.__create(behavior_this_child0_child0_child0_on_opacity__closure.__closure_behavior_this_child0_child0_child0_on_opacity = { })


//setting up component Animation
	var behavior_this_child0_child0_child0_on_opacity = behavior_this_child0_child0_child0_on_opacity__closure.behavior_this_child0_child0_child0_on_opacity
	behavior_this_child0_child0_child0_on_opacity.__setup(behavior_this_child0_child0_child0_on_opacity__closure.__closure_behavior_this_child0_child0_child0_on_opacity)
	delete behavior_this_child0_child0_child0_on_opacity__closure.__closure_behavior_this_child0_child0_child0_on_opacity

//assigning duration to (0)
	behavior_this_child0_child0_child0_on_opacity._removeUpdater('duration'); behavior_this_child0_child0_child0_on_opacity.duration = ((0));
//assigning delay to (this._get('letter')._get('open') ? 1200 : 600)
	var update$behavior_this_child0_child0_child0_on_opacity$delay = (function() { behavior_this_child0_child0_child0_on_opacity.delay = ((this._get('letter')._get('open') ? 1200 : 600)); }).bind(behavior_this_child0_child0_child0_on_opacity)
	var dep$behavior_this_child0_child0_child0_on_opacity$delay$0 = behavior_this_child0_child0_child0_on_opacity._get('letter')
	behavior_this_child0_child0_child0_on_opacity.connectOnChanged(dep$behavior_this_child0_child0_child0_on_opacity$delay$0, 'open', update$behavior_this_child0_child0_child0_on_opacity$delay)
	behavior_this_child0_child0_child0_on_opacity._removeUpdater('delay', [[dep$behavior_this_child0_child0_child0_on_opacity$delay$0, 'open', update$behavior_this_child0_child0_child0_on_opacity$delay]])
	update$behavior_this_child0_child0_child0_on_opacity$delay();

	this_child0_child0$child0.setAnimation('opacity', behavior_this_child0_child0_child0_on_opacity);

			this_child0$child0.addChild(this_child0_child0$child0)
			this$child0.addChild(this_child0$child0)
			this.addChild(this$child0)

//setting up component Rectangle
			var this$child1 = __closure.this$child1
			this$child1.__setup(__closure.__closure_this$child1)
			delete __closure.__closure_this$child1

//assigning border.color to ("gray")
			this$child1._removeUpdater('border.color'); this$child1._get('border').color = (("gray"));
//assigning border.width to (1)
			this$child1._removeUpdater('border.width'); this$child1._get('border').width = ((1));
//assigning color to ("#FFF")
			this$child1._removeUpdater('color'); this$child1.color = (("#FFF"));
//assigning height to ((this._get('parent')._get('height') * ((33) / 100)))
			var update$this_child1$height = (function() { this$child1.height = (((this._get('parent')._get('height') * ((33) / 100)))); }).bind(this$child1)
			var dep$this_child1$height$0 = this$child1._get('parent')
			this$child1.connectOnChanged(dep$this_child1$height$0, 'height', update$this_child1$height)
			this$child1._removeUpdater('height', [[dep$this_child1$height$0, 'height', update$this_child1$height]])
			update$this_child1$height();
//assigning width to ((this._get('parent')._get('width') * ((100) / 100)))
			var update$this_child1$width = (function() { this$child1.width = (((this._get('parent')._get('width') * ((100) / 100)))); }).bind(this$child1)
			var dep$this_child1$width$0 = this$child1._get('parent')
			this$child1.connectOnChanged(dep$this_child1$width$0, 'width', update$this_child1$width)
			this$child1._removeUpdater('width', [[dep$this_child1$width$0, 'width', update$this_child1$width]])
			update$this_child1$width();
//assigning y to ((this._get('parent')._get('height') * ((33) / 100)))
			var update$this_child1$y = (function() { this$child1.y = (((this._get('parent')._get('height') * ((33) / 100)))); }).bind(this$child1)
			var dep$this_child1$y$0 = this$child1._get('parent')
			this$child1.connectOnChanged(dep$this_child1$y$0, 'height', update$this_child1$y)
			this$child1._removeUpdater('y', [[dep$this_child1$y$0, 'height', update$this_child1$y]])
			update$this_child1$y();


//setting up component Text
			var this_child1$child0 = __closure.this_child1$child0
			this_child1$child0.__setup(__closure.__closure_this_child1$child0)
			delete __closure.__closure_this_child1$child0

//assigning clip to (true)
			this_child1$child0._removeUpdater('clip'); this_child1$child0.clip = ((true));
//assigning text to ("Officials did not say where they talked, but photos appeared to show them inside Castro’s home. A government statement said the two leaders discussed the importance of food production and threats to world peace. <br>Rouhani met separately with Raul Castro, who took over leadership of Cuba’s government in 2006 after his brother fell ill. Officials did not comment on their discussions")
			this_child1$child0._removeUpdater('text'); this_child1$child0.text = (("Officials did not say where they talked, but photos appeared to show them inside Castro’s home. A government statement said the two leaders discussed the importance of food production and threats to world peace. <br>Rouhani met separately with Raul Castro, who took over leadership of Cuba’s government in 2006 after his brother fell ill. Officials did not comment on their discussions"));
//assigning height to ((this._get('parent')._get('height') * ((90) / 100)))
			var update$this_child1_child0$height = (function() { this_child1$child0.height = (((this._get('parent')._get('height') * ((90) / 100)))); }).bind(this_child1$child0)
			var dep$this_child1_child0$height$0 = this_child1$child0._get('parent')
			this_child1$child0.connectOnChanged(dep$this_child1_child0$height$0, 'height', update$this_child1_child0$height)
			this_child1$child0._removeUpdater('height', [[dep$this_child1_child0$height$0, 'height', update$this_child1_child0$height]])
			update$this_child1_child0$height();
//assigning width to ((this._get('parent')._get('width') * ((90) / 100)))
			var update$this_child1_child0$width = (function() { this_child1$child0.width = (((this._get('parent')._get('width') * ((90) / 100)))); }).bind(this_child1$child0)
			var dep$this_child1_child0$width$0 = this_child1$child0._get('parent')
			this_child1$child0.connectOnChanged(dep$this_child1_child0$width$0, 'width', update$this_child1_child0$width)
			this_child1$child0._removeUpdater('width', [[dep$this_child1_child0$width$0, 'width', update$this_child1_child0$width]])
			update$this_child1_child0$width();
//assigning wrapMode to (_globals.core.Text.prototype.WordWrap)
			this_child1$child0._removeUpdater('wrapMode'); this_child1$child0.wrapMode = ((_globals.core.Text.prototype.WordWrap));
//assigning y to ((this._get('parent')._get('height') * ((5) / 100)))
			var update$this_child1_child0$y = (function() { this_child1$child0.y = (((this._get('parent')._get('height') * ((5) / 100)))); }).bind(this_child1$child0)
			var dep$this_child1_child0$y$0 = this_child1$child0._get('parent')
			this_child1$child0.connectOnChanged(dep$this_child1_child0$y$0, 'height', update$this_child1_child0$y)
			this_child1$child0._removeUpdater('y', [[dep$this_child1_child0$y$0, 'height', update$this_child1_child0$y]])
			update$this_child1_child0$y();
//assigning x to ((this._get('parent')._get('width') * ((5) / 100)))
			var update$this_child1_child0$x = (function() { this_child1$child0.x = (((this._get('parent')._get('width') * ((5) / 100)))); }).bind(this_child1$child0)
			var dep$this_child1_child0$x$0 = this_child1$child0._get('parent')
			this_child1$child0.connectOnChanged(dep$this_child1_child0$x$0, 'width', update$this_child1_child0$x)
			this_child1$child0._removeUpdater('x', [[dep$this_child1_child0$x$0, 'width', update$this_child1_child0$x]])
			update$this_child1_child0$x();

			this$child1.addChild(this_child1$child0)
			this.addChild(this$child1)

//setting up component Item
			var this$child2 = __closure.this$child2
			this$child2.__setup(__closure.__closure_this$child2)
			delete __closure.__closure_this$child2

//assigning transform.perspective to (1000)
			this$child2._removeUpdater('transform.perspective'); this$child2._get('transform').perspective = ((1000));
//assigning transform.rotateX to (this._get('letter')._get('open') ? 0 : 180)
			var update$this_child2$transform_rotateX = (function() { this$child2._get('transform').rotateX = ((this._get('letter')._get('open') ? 0 : 180)); }).bind(this$child2)
			var dep$this_child2$transform_rotateX$0 = this$child2._get('letter')
			this$child2.connectOnChanged(dep$this_child2$transform_rotateX$0, 'open', update$this_child2$transform_rotateX)
			this$child2._removeUpdater('transform.rotateX', [[dep$this_child2$transform_rotateX$0, 'open', update$this_child2$transform_rotateX]])
			update$this_child2$transform_rotateX();
//assigning height to ((this._get('parent')._get('height') * ((66) / 100)))
			var update$this_child2$height = (function() { this$child2.height = (((this._get('parent')._get('height') * ((66) / 100)))); }).bind(this$child2)
			var dep$this_child2$height$0 = this$child2._get('parent')
			this$child2.connectOnChanged(dep$this_child2$height$0, 'height', update$this_child2$height)
			this$child2._removeUpdater('height', [[dep$this_child2$height$0, 'height', update$this_child2$height]])
			update$this_child2$height();
//assigning width to ((this._get('parent')._get('width') * ((100) / 100)))
			var update$this_child2$width = (function() { this$child2.width = (((this._get('parent')._get('width') * ((100) / 100)))); }).bind(this$child2)
			var dep$this_child2$width$0 = this$child2._get('parent')
			this$child2.connectOnChanged(dep$this_child2$width$0, 'width', update$this_child2$width)
			this$child2._removeUpdater('width', [[dep$this_child2$width$0, 'width', update$this_child2$width]])
			update$this_child2$width();
//assigning y to ((this._get('parent')._get('height') * ((33) / 100)))
			var update$this_child2$y = (function() { this$child2.y = (((this._get('parent')._get('height') * ((33) / 100)))); }).bind(this$child2)
			var dep$this_child2$y$0 = this$child2._get('parent')
			this$child2.connectOnChanged(dep$this_child2$y$0, 'height', update$this_child2$y)
			this$child2._removeUpdater('y', [[dep$this_child2$y$0, 'height', update$this_child2$y]])
			update$this_child2$y();
//assigning z to (this._get('letter')._get('open') ? 3 : 1)
			var update$this_child2$z = (function() { this$child2.z = ((this._get('letter')._get('open') ? 3 : 1)); }).bind(this$child2)
			var dep$this_child2$z$0 = this$child2._get('letter')
			this$child2.connectOnChanged(dep$this_child2$z$0, 'open', update$this_child2$z)
			this$child2._removeUpdater('z', [[dep$this_child2$z$0, 'open', update$this_child2$z]])
			update$this_child2$z();
	var behavior_this_child2_on_y = new _globals.core.Animation(this$child2)
	var behavior_this_child2_on_y__closure = { behavior_this_child2_on_y: behavior_this_child2_on_y }

//creating component Animation
	behavior_this_child2_on_y.__create(behavior_this_child2_on_y__closure.__closure_behavior_this_child2_on_y = { })


//setting up component Animation
	var behavior_this_child2_on_y = behavior_this_child2_on_y__closure.behavior_this_child2_on_y
	behavior_this_child2_on_y.__setup(behavior_this_child2_on_y__closure.__closure_behavior_this_child2_on_y)
	delete behavior_this_child2_on_y__closure.__closure_behavior_this_child2_on_y

//assigning duration to (400)
	behavior_this_child2_on_y._removeUpdater('duration'); behavior_this_child2_on_y.duration = ((400));
//assigning delay to (this._get('letter')._get('open') ? 1400 : 0)
	var update$behavior_this_child2_on_y$delay = (function() { behavior_this_child2_on_y.delay = ((this._get('letter')._get('open') ? 1400 : 0)); }).bind(behavior_this_child2_on_y)
	var dep$behavior_this_child2_on_y$delay$0 = behavior_this_child2_on_y._get('letter')
	behavior_this_child2_on_y.connectOnChanged(dep$behavior_this_child2_on_y$delay$0, 'open', update$behavior_this_child2_on_y$delay)
	behavior_this_child2_on_y._removeUpdater('delay', [[dep$behavior_this_child2_on_y$delay$0, 'open', update$behavior_this_child2_on_y$delay]])
	update$behavior_this_child2_on_y$delay();
//assigning easing to ("linear")
	behavior_this_child2_on_y._removeUpdater('easing'); behavior_this_child2_on_y.easing = (("linear"));

	this$child2.setAnimation('y', behavior_this_child2_on_y);

	var behavior_this_child2_on_z = new _globals.core.Animation(this$child2)
	var behavior_this_child2_on_z__closure = { behavior_this_child2_on_z: behavior_this_child2_on_z }

//creating component Animation
	behavior_this_child2_on_z.__create(behavior_this_child2_on_z__closure.__closure_behavior_this_child2_on_z = { })


//setting up component Animation
	var behavior_this_child2_on_z = behavior_this_child2_on_z__closure.behavior_this_child2_on_z
	behavior_this_child2_on_z.__setup(behavior_this_child2_on_z__closure.__closure_behavior_this_child2_on_z)
	delete behavior_this_child2_on_z__closure.__closure_behavior_this_child2_on_z

//assigning duration to (400)
	behavior_this_child2_on_z._removeUpdater('duration'); behavior_this_child2_on_z.duration = ((400));
//assigning delay to (this._get('letter')._get('open') ? 1400 : 0)
	var update$behavior_this_child2_on_z$delay = (function() { behavior_this_child2_on_z.delay = ((this._get('letter')._get('open') ? 1400 : 0)); }).bind(behavior_this_child2_on_z)
	var dep$behavior_this_child2_on_z$delay$0 = behavior_this_child2_on_z._get('letter')
	behavior_this_child2_on_z.connectOnChanged(dep$behavior_this_child2_on_z$delay$0, 'open', update$behavior_this_child2_on_z$delay)
	behavior_this_child2_on_z._removeUpdater('delay', [[dep$behavior_this_child2_on_z$delay$0, 'open', update$behavior_this_child2_on_z$delay]])
	update$behavior_this_child2_on_z$delay();
//assigning easing to ("linear")
	behavior_this_child2_on_z._removeUpdater('easing'); behavior_this_child2_on_z.easing = (("linear"));

	this$child2.setAnimation('z', behavior_this_child2_on_z);

	var behavior_this_child2_on_transform = new _globals.core.Animation(this$child2)
	var behavior_this_child2_on_transform__closure = { behavior_this_child2_on_transform: behavior_this_child2_on_transform }

//creating component Animation
	behavior_this_child2_on_transform.__create(behavior_this_child2_on_transform__closure.__closure_behavior_this_child2_on_transform = { })


//setting up component Animation
	var behavior_this_child2_on_transform = behavior_this_child2_on_transform__closure.behavior_this_child2_on_transform
	behavior_this_child2_on_transform.__setup(behavior_this_child2_on_transform__closure.__closure_behavior_this_child2_on_transform)
	delete behavior_this_child2_on_transform__closure.__closure_behavior_this_child2_on_transform

//assigning duration to (400)
	behavior_this_child2_on_transform._removeUpdater('duration'); behavior_this_child2_on_transform.duration = ((400));
//assigning delay to (this._get('letter')._get('open') ? 1400 : 0)
	var update$behavior_this_child2_on_transform$delay = (function() { behavior_this_child2_on_transform.delay = ((this._get('letter')._get('open') ? 1400 : 0)); }).bind(behavior_this_child2_on_transform)
	var dep$behavior_this_child2_on_transform$delay$0 = behavior_this_child2_on_transform._get('letter')
	behavior_this_child2_on_transform.connectOnChanged(dep$behavior_this_child2_on_transform$delay$0, 'open', update$behavior_this_child2_on_transform$delay)
	behavior_this_child2_on_transform._removeUpdater('delay', [[dep$behavior_this_child2_on_transform$delay$0, 'open', update$behavior_this_child2_on_transform$delay]])
	update$behavior_this_child2_on_transform$delay();
//assigning easing to ("linear")
	behavior_this_child2_on_transform._removeUpdater('easing'); behavior_this_child2_on_transform.easing = (("linear"));

	this$child2.setAnimation('transform', behavior_this_child2_on_transform);


//setting up component Rectangle
			var this_child2$child0 = __closure.this_child2$child0
			this_child2$child0.__setup(__closure.__closure_this_child2$child0)
			delete __closure.__closure_this_child2$child0

//assigning border.color to ("gray")
			this_child2$child0._removeUpdater('border.color'); this_child2$child0._get('border').color = (("gray"));
//assigning border.width to (1)
			this_child2$child0._removeUpdater('border.width'); this_child2$child0._get('border').width = ((1));
//assigning color to (this._get('letter')._get('open') ? "#FFF" : "#F5F5F5")
			var update$this_child2_child0$color = (function() { this_child2$child0.color = ((this._get('letter')._get('open') ? "#FFF" : "#F5F5F5")); }).bind(this_child2$child0)
			var dep$this_child2_child0$color$0 = this_child2$child0._get('letter')
			this_child2$child0.connectOnChanged(dep$this_child2_child0$color$0, 'open', update$this_child2_child0$color)
			this_child2$child0._removeUpdater('color', [[dep$this_child2_child0$color$0, 'open', update$this_child2_child0$color]])
			update$this_child2_child0$color();
//assigning border.top.color to ("white")
			this_child2$child0._removeUpdater('border.top.color'); this_child2$child0._get('border')._get('top').color = (("white"));
//assigning border.top.width to (1)
			this_child2$child0._removeUpdater('border.top.width'); this_child2$child0._get('border')._get('top').width = ((1));
//assigning height to ((this._get('parent')._get('height') * ((50) / 100)))
			var update$this_child2_child0$height = (function() { this_child2$child0.height = (((this._get('parent')._get('height') * ((50) / 100)))); }).bind(this_child2$child0)
			var dep$this_child2_child0$height$0 = this_child2$child0._get('parent')
			this_child2$child0.connectOnChanged(dep$this_child2_child0$height$0, 'height', update$this_child2_child0$height)
			this_child2$child0._removeUpdater('height', [[dep$this_child2_child0$height$0, 'height', update$this_child2_child0$height]])
			update$this_child2_child0$height();
//assigning width to ((this._get('parent')._get('width') * ((100) / 100)))
			var update$this_child2_child0$width = (function() { this_child2$child0.width = (((this._get('parent')._get('width') * ((100) / 100)))); }).bind(this_child2$child0)
			var dep$this_child2_child0$width$0 = this_child2$child0._get('parent')
			this_child2$child0.connectOnChanged(dep$this_child2_child0$width$0, 'width', update$this_child2_child0$width)
			this_child2$child0._removeUpdater('width', [[dep$this_child2_child0$width$0, 'width', update$this_child2_child0$width]])
			update$this_child2_child0$width();
//assigning y to ((this._get('parent')._get('height') * ((50) / 100)))
			var update$this_child2_child0$y = (function() { this_child2$child0.y = (((this._get('parent')._get('height') * ((50) / 100)))); }).bind(this_child2$child0)
			var dep$this_child2_child0$y$0 = this_child2$child0._get('parent')
			this_child2$child0.connectOnChanged(dep$this_child2_child0$y$0, 'height', update$this_child2_child0$y)
			this_child2$child0._removeUpdater('y', [[dep$this_child2_child0$y$0, 'height', update$this_child2_child0$y]])
			update$this_child2_child0$y();
	var behavior_this_child2_child0_on_background = new _globals.core.Animation(this_child2$child0)
	var behavior_this_child2_child0_on_background__closure = { behavior_this_child2_child0_on_background: behavior_this_child2_child0_on_background }

//creating component Animation
	behavior_this_child2_child0_on_background.__create(behavior_this_child2_child0_on_background__closure.__closure_behavior_this_child2_child0_on_background = { })


//setting up component Animation
	var behavior_this_child2_child0_on_background = behavior_this_child2_child0_on_background__closure.behavior_this_child2_child0_on_background
	behavior_this_child2_child0_on_background.__setup(behavior_this_child2_child0_on_background__closure.__closure_behavior_this_child2_child0_on_background)
	delete behavior_this_child2_child0_on_background__closure.__closure_behavior_this_child2_child0_on_background

//assigning duration to (0)
	behavior_this_child2_child0_on_background._removeUpdater('duration'); behavior_this_child2_child0_on_background.duration = ((0));
//assigning delay to (this._get('letter')._get('open') ? 1600 : 200)
	var update$behavior_this_child2_child0_on_background$delay = (function() { behavior_this_child2_child0_on_background.delay = ((this._get('letter')._get('open') ? 1600 : 200)); }).bind(behavior_this_child2_child0_on_background)
	var dep$behavior_this_child2_child0_on_background$delay$0 = behavior_this_child2_child0_on_background._get('letter')
	behavior_this_child2_child0_on_background.connectOnChanged(dep$behavior_this_child2_child0_on_background$delay$0, 'open', update$behavior_this_child2_child0_on_background$delay)
	behavior_this_child2_child0_on_background._removeUpdater('delay', [[dep$behavior_this_child2_child0_on_background$delay$0, 'open', update$behavior_this_child2_child0_on_background$delay]])
	update$behavior_this_child2_child0_on_background$delay();

	this_child2$child0.setAnimation('background', behavior_this_child2_child0_on_background);


//setting up component Text
			var this_child2_child0$child0 = __closure.this_child2_child0$child0
			this_child2_child0$child0.__setup(__closure.__closure_this_child2_child0$child0)
			delete __closure.__closure_this_child2_child0$child0

//assigning opacity to (this._get('letter')._get('open') ? 1 : 0)
			var update$this_child2_child0_child0$opacity = (function() { this_child2_child0$child0.opacity = ((this._get('letter')._get('open') ? 1 : 0)); }).bind(this_child2_child0$child0)
			var dep$this_child2_child0_child0$opacity$0 = this_child2_child0$child0._get('letter')
			this_child2_child0$child0.connectOnChanged(dep$this_child2_child0_child0$opacity$0, 'open', update$this_child2_child0_child0$opacity)
			this_child2_child0$child0._removeUpdater('opacity', [[dep$this_child2_child0_child0$opacity$0, 'open', update$this_child2_child0_child0$opacity]])
			update$this_child2_child0_child0$opacity();
//assigning clip to (true)
			this_child2_child0$child0._removeUpdater('clip'); this_child2_child0$child0.clip = ((true));
//assigning text to ("Iran’s president came to Cuba after attending the Non-Aligned Movement summit in Venezuela, which is the island’s main commercial and political partner.")
			this_child2_child0$child0._removeUpdater('text'); this_child2_child0$child0.text = (("Iran’s president came to Cuba after attending the Non-Aligned Movement summit in Venezuela, which is the island’s main commercial and political partner."));
//assigning height to ((this._get('parent')._get('height') * ((90) / 100)))
			var update$this_child2_child0_child0$height = (function() { this_child2_child0$child0.height = (((this._get('parent')._get('height') * ((90) / 100)))); }).bind(this_child2_child0$child0)
			var dep$this_child2_child0_child0$height$0 = this_child2_child0$child0._get('parent')
			this_child2_child0$child0.connectOnChanged(dep$this_child2_child0_child0$height$0, 'height', update$this_child2_child0_child0$height)
			this_child2_child0$child0._removeUpdater('height', [[dep$this_child2_child0_child0$height$0, 'height', update$this_child2_child0_child0$height]])
			update$this_child2_child0_child0$height();
//assigning width to ((this._get('parent')._get('width') * ((90) / 100)))
			var update$this_child2_child0_child0$width = (function() { this_child2_child0$child0.width = (((this._get('parent')._get('width') * ((90) / 100)))); }).bind(this_child2_child0$child0)
			var dep$this_child2_child0_child0$width$0 = this_child2_child0$child0._get('parent')
			this_child2_child0$child0.connectOnChanged(dep$this_child2_child0_child0$width$0, 'width', update$this_child2_child0_child0$width)
			this_child2_child0$child0._removeUpdater('width', [[dep$this_child2_child0_child0$width$0, 'width', update$this_child2_child0_child0$width]])
			update$this_child2_child0_child0$width();
//assigning wrapMode to (_globals.core.Text.prototype.WordWrap)
			this_child2_child0$child0._removeUpdater('wrapMode'); this_child2_child0$child0.wrapMode = ((_globals.core.Text.prototype.WordWrap));
//assigning y to ((this._get('parent')._get('height') * ((5) / 100)))
			var update$this_child2_child0_child0$y = (function() { this_child2_child0$child0.y = (((this._get('parent')._get('height') * ((5) / 100)))); }).bind(this_child2_child0$child0)
			var dep$this_child2_child0_child0$y$0 = this_child2_child0$child0._get('parent')
			this_child2_child0$child0.connectOnChanged(dep$this_child2_child0_child0$y$0, 'height', update$this_child2_child0_child0$y)
			this_child2_child0$child0._removeUpdater('y', [[dep$this_child2_child0_child0$y$0, 'height', update$this_child2_child0_child0$y]])
			update$this_child2_child0_child0$y();
//assigning x to ((this._get('parent')._get('width') * ((5) / 100)))
			var update$this_child2_child0_child0$x = (function() { this_child2_child0$child0.x = (((this._get('parent')._get('width') * ((5) / 100)))); }).bind(this_child2_child0$child0)
			var dep$this_child2_child0_child0$x$0 = this_child2_child0$child0._get('parent')
			this_child2_child0$child0.connectOnChanged(dep$this_child2_child0_child0$x$0, 'width', update$this_child2_child0_child0$x)
			this_child2_child0$child0._removeUpdater('x', [[dep$this_child2_child0_child0$x$0, 'width', update$this_child2_child0_child0$x]])
			update$this_child2_child0_child0$x();
	var behavior_this_child2_child0_child0_on_opacity = new _globals.core.Animation(this_child2_child0$child0)
	var behavior_this_child2_child0_child0_on_opacity__closure = { behavior_this_child2_child0_child0_on_opacity: behavior_this_child2_child0_child0_on_opacity }

//creating component Animation
	behavior_this_child2_child0_child0_on_opacity.__create(behavior_this_child2_child0_child0_on_opacity__closure.__closure_behavior_this_child2_child0_child0_on_opacity = { })


//setting up component Animation
	var behavior_this_child2_child0_child0_on_opacity = behavior_this_child2_child0_child0_on_opacity__closure.behavior_this_child2_child0_child0_on_opacity
	behavior_this_child2_child0_child0_on_opacity.__setup(behavior_this_child2_child0_child0_on_opacity__closure.__closure_behavior_this_child2_child0_child0_on_opacity)
	delete behavior_this_child2_child0_child0_on_opacity__closure.__closure_behavior_this_child2_child0_child0_on_opacity

//assigning duration to (0)
	behavior_this_child2_child0_child0_on_opacity._removeUpdater('duration'); behavior_this_child2_child0_child0_on_opacity.duration = ((0));
//assigning delay to (this._get('letter')._get('open') ? 1600 : 200)
	var update$behavior_this_child2_child0_child0_on_opacity$delay = (function() { behavior_this_child2_child0_child0_on_opacity.delay = ((this._get('letter')._get('open') ? 1600 : 200)); }).bind(behavior_this_child2_child0_child0_on_opacity)
	var dep$behavior_this_child2_child0_child0_on_opacity$delay$0 = behavior_this_child2_child0_child0_on_opacity._get('letter')
	behavior_this_child2_child0_child0_on_opacity.connectOnChanged(dep$behavior_this_child2_child0_child0_on_opacity$delay$0, 'open', update$behavior_this_child2_child0_child0_on_opacity$delay)
	behavior_this_child2_child0_child0_on_opacity._removeUpdater('delay', [[dep$behavior_this_child2_child0_child0_on_opacity$delay$0, 'open', update$behavior_this_child2_child0_child0_on_opacity$delay]])
	update$behavior_this_child2_child0_child0_on_opacity$delay();

	this_child2_child0$child0.setAnimation('opacity', behavior_this_child2_child0_child0_on_opacity);

			this_child2$child0.addChild(this_child2_child0$child0)

//setting up component Text
			var this_child2_child0$child1 = __closure.this_child2_child0$child1
			this_child2_child0$child1.__setup(__closure.__closure_this_child2_child0$child1)
			delete __closure.__closure_this_child2_child0$child1

//assigning color to ("red")
			this_child2_child0$child1._removeUpdater('color'); this_child2_child0$child1.color = (("red"));
//assigning text to ("DELETE")
			this_child2_child0$child1._removeUpdater('text'); this_child2_child0$child1.text = (("DELETE"));
//assigning anchors.margins to (10)
			this_child2_child0$child1._removeUpdater('anchors.margins'); this_child2_child0$child1._get('anchors').margins = ((10));
//assigning anchors.right to (this._get('parent')._get('right'))
			var update$this_child2_child0_child1$anchors_right = (function() { this_child2_child0$child1._get('anchors').right = ((this._get('parent')._get('right'))); }).bind(this_child2_child0$child1)
			var dep$this_child2_child0_child1$anchors_right$0 = this_child2_child0$child1._get('parent')
			this_child2_child0$child1.connectOnChanged(dep$this_child2_child0_child1$anchors_right$0, 'right', update$this_child2_child0_child1$anchors_right)
			this_child2_child0$child1._removeUpdater('anchors.right', [[dep$this_child2_child0_child1$anchors_right$0, 'right', update$this_child2_child0_child1$anchors_right]])
			update$this_child2_child0_child1$anchors_right();
//assigning anchors.bottom to (this._get('parent')._get('bottom'))
			var update$this_child2_child0_child1$anchors_bottom = (function() { this_child2_child0$child1._get('anchors').bottom = ((this._get('parent')._get('bottom'))); }).bind(this_child2_child0$child1)
			var dep$this_child2_child0_child1$anchors_bottom$0 = this_child2_child0$child1._get('parent')
			this_child2_child0$child1.connectOnChanged(dep$this_child2_child0_child1$anchors_bottom$0, 'bottom', update$this_child2_child0_child1$anchors_bottom)
			this_child2_child0$child1._removeUpdater('anchors.bottom', [[dep$this_child2_child0_child1$anchors_bottom$0, 'bottom', update$this_child2_child0_child1$anchors_bottom]])
			update$this_child2_child0_child1$anchors_bottom();
			this_child2_child0$child1.on('clicked', (function() {
					log("DELETE onClicked")
					this._get('letter').remove();
				} ).bind(this_child2_child0$child1))


//setting up component HoverMixin
			var this_child2_child0_child1$child0 = __closure.this_child2_child0_child1$child0
			this_child2_child0_child1$child0.__setup(__closure.__closure_this_child2_child0_child1$child0)
			delete __closure.__closure_this_child2_child0_child1$child0

//assigning cursor to ("pointer")
			this_child2_child0_child1$child0._removeUpdater('cursor'); this_child2_child0_child1$child0.cursor = (("pointer"));

			this_child2_child0$child1.addChild(this_child2_child0_child1$child0)
			this_child2$child0.addChild(this_child2_child0$child1)
			this$child2.addChild(this_child2$child0)
			this.addChild(this$child2)
}
//=====[component core.Context]=====================

/**
 * @constructor
 * @extends {_globals.core.Item}
 */
	_globals.core.Context = function(parent, _delegate) {
	_globals.core.Item.apply(this, arguments);
	//custom constructor:
	{
		this.options = arguments[2]
		this.l10n = this.options.l10n || {}

		this._local['context'] = this
		this._prefix = this.options.prefix
		this._context = this
		this._started = false
		this._completed = false
		this._completedHandlers = []
		this._delayedActions = []
		this._stylesRegistered = {}
	}

}
	_globals.core.Context.prototype = Object.create(_globals.core.Item.prototype)
	_globals.core.Context.prototype.constructor = _globals.core.Context
	_globals.core.Context.prototype.componentName = 'core.Context'
	_globals.core.Context.prototype._update = function(name,value) {
		switch(name) {
			case 'fullscreen': if (value) this._enterFullscreenMode(); else this._exitFullscreenMode(); break
		}
		_globals.core.Item.prototype._update.apply(this, arguments)
	}
	_globals.core.Context.prototype.getClass = function(name) {
		return this._prefix + name
	}
	_globals.core.Context.prototype.qsTr = function(text) {
		var args = arguments
		var lang = this.language
		var messages = this.l10n[lang] || {}
		var contexts = messages[text] || {}
		for(var name in contexts) {
			text = contexts[name] //fixme: add context handling here
			break
		}
		return text.replace(/%(\d+)/, function(text, index) { return args[index] })
	}
	_globals.core.Context.prototype._complete = function() {
		if (!this._started || this._runningComplete)
			return

		this._completed = true
		this._runningComplete = true

		var invoker = _globals.core.safeCall([], function (ex) { log("onCompleted failed:", ex, ex.stack) })
		do {
			while(this._completedHandlers.length) {
				var ch = this._completedHandlers
				this._completedHandlers = []
				ch.forEach(invoker)
			}
			this._processActions()
		} while(this._completedHandlers.length)
		this._runningComplete = false
	}
	_globals.core.Context.prototype._exitFullscreenMode = function() { return window.Modernizr.prefixed('exitFullscreen', document)() }
	_globals.core.Context.prototype.start = function(instance) {
		var closure = {}
		instance.__create(closure)
		instance.__setup(closure)
		closure = undefined
		log('Context: started')
		this._started = true
		// log('Context: calling on completed')
		log('Context: signalling layout')
		this.boxChanged()
		log('Context: done')
		return instance;
	}
	_globals.core.Context.prototype.init = function() {
		log('Context: initializing...')

		var options = this.options
		var prefix = this._prefix

		var divId = options.id

		if (prefix) {
			prefix += '-'
			//log('Context: using prefix', prefix)
		}

		var win = new _globals.html5.html.Window(this, window)
		this.window = win
		var w, h

		var html = _globals.html5.html
		var div = document.getElementById(divId)
		var topLevel = div === null
		if (!topLevel) {
			div = new html.Element(this, div)
			w = div.width()
			h = div.height()
			log('Context: found element by id, size: ' + w + 'x' + h)
			win.on('resize', function() { this.width = div.width(); this.height = div.height(); }.bind(this));
		} else {
			w = win.width();
			h = win.height();
			log("Context: window size: " + w + "x" + h);
			div = this.createElement('div')
			div.dom.id = divId //html specific
			win.on('resize', function() { this.width = win.width(); this.height = win.height(); }.bind(this));
			var body = html.getElement('body')
			body.append(div);
		}

		this.element = div
		this.width = w
		this.height = h
		this.style('visibility', 'hidden')

		win.on('scroll', function(event) { this.scrollY = win.scrollY(); }.bind(this));

		win.on('load', function() {
			log('Context: window.load. calling completed()')
			this._complete()
			this.style('visibility', 'visible')
		} .bind(this) );

		var self = this;

		var onFullscreenChanged = function(e) {
			var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
			self.fullscreen = state
		}
		'webkitfullscreenchange mozfullscreenchange fullscreenchange'.split(' ').forEach(function(name) {
			div.on(name, onFullscreenChanged)
		})

		win.on('keydown', function(event) { if (self._processKey(event)) event.preventDefault(); }.bind(this) ) //fixme: add html.Document instead
	}
	_globals.core.Context.prototype.registerStyle = function(item,tag) {
		if (!(tag in this._stylesRegistered)) {
			item.registerStyle(this.stylesheet, tag)
			this._stylesRegistered[tag] = true
		}
	}
	_globals.core.Context.prototype._inFullscreenMode = function() {
		return !!window.Modernizr.prefixed('fullscreenElement', document)
	}
	_globals.core.Context.prototype.scheduleAction = function(action) {
		this._delayedActions.push(action)
		if (this._completed && this._delayedTimeout === undefined) //do not schedule any processing before creation process ends
			this._delayedTimeout = setTimeout(this._processActions.bind(this), 0)
	}
	_globals.core.Context.prototype._onCompleted = function(callback) {
		this._completedHandlers.push(callback);
	}
	_globals.core.Context.prototype.createElement = function(tag) {
		var el = new _globals.html5.html.Element(this, document.createElement(tag))
		if (this._prefix) {
			el.addClass(this.getClass('core-item'))
		}
		return el
	}
	_globals.core.Context.prototype._processActions = function() {
		var invoker = _globals.core.safeCall([], function (ex) { log('exception in delayed action', ex, ex.stack) })
		while (this._delayedActions.length) {
			var actions = this._delayedActions
			this._delayedActions = []
			actions.forEach(invoker)
		}
		this._delayedTimeout = undefined
	}
	_globals.core.Context.prototype._enterFullscreenMode = function() { return window.Modernizr.prefixed('requestFullscreen', this.element.dom)() }
	core.addProperty(_globals.core.Context.prototype, 'bool', 'fullscreen')
	core.addProperty(_globals.core.Context.prototype, 'int', 'scrollY')
	core.addProperty(_globals.core.Context.prototype, 'Stylesheet', 'stylesheet')
	core.addProperty(_globals.core.Context.prototype, 'System', 'system')
	core.addProperty(_globals.core.Context.prototype, 'Location', 'location')
	core.addProperty(_globals.core.Context.prototype, 'string', 'language')

	_globals.core.Context.prototype.__create = function(__closure) {
		_globals.core.Item.prototype.__create.call(this, __closure.__base = { })
//creating component core.<anonymous>
		var this$stylesheet = new _globals.html5.Stylesheet(this)
		__closure.this$stylesheet = this$stylesheet

//creating component Stylesheet
		this$stylesheet.__create(__closure.__closure_this$stylesheet = { })

		this.stylesheet = this$stylesheet
//creating component core.<anonymous>
		var this$system = new _globals.core.System(this)
		__closure.this$system = this$system

//creating component System
		this$system.__create(__closure.__closure_this$system = { })

		this.system = this$system
//creating component core.<anonymous>
		var this$location = new _globals.core.Location(this)
		__closure.this$location = this$location

//creating component Location
		this$location.__create(__closure.__closure_this$location = { })

		this.location = this$location
	}
	_globals.core.Context.prototype.__setup = function(__closure) {
	_globals.core.Item.prototype.__setup.call(this, __closure.__base); delete __closure.__base
//setting up component Stylesheet
			var this$stylesheet = __closure.this$stylesheet
			this$stylesheet.__setup(__closure.__closure_this$stylesheet)
			delete __closure.__closure_this$stylesheet



//setting up component System
			var this$system = __closure.this$system
			this$system.__setup(__closure.__closure_this$system)
			delete __closure.__closure_this$system



//setting up component Location
			var this$location = __closure.this$location
			this$location.__setup(__closure.__closure_this$location)
			delete __closure.__closure_this$location
}
//=====[component core.BaseViewContent]=====================

/**
 * @constructor
 * @extends {_globals.core.Item}
 */
	_globals.core.BaseViewContent = function(parent, _delegate) {
	_globals.core.Item.apply(this, arguments);

}
	_globals.core.BaseViewContent.prototype = Object.create(_globals.core.Item.prototype)
	_globals.core.BaseViewContent.prototype.constructor = _globals.core.BaseViewContent
	_globals.core.BaseViewContent.prototype.componentName = 'core.BaseViewContent'

	_globals.core.BaseViewContent.prototype.__create = function(__closure) {
		_globals.core.Item.prototype.__create.call(this, __closure.__base = { })

	}
	_globals.core.BaseViewContent.prototype.__setup = function(__closure) {
	_globals.core.Item.prototype.__setup.call(this, __closure.__base); delete __closure.__base
this.onChanged('y', (function(value) { this.parent._delayedLayout.schedule() } ).bind(this))
			this.onChanged('x', (function(value) { this.parent._delayedLayout.schedule() } ).bind(this))
}
//=====[component html5.Stylesheet]=====================

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	_globals.html5.Stylesheet = function(parent, _delegate) {
	_globals.core.Object.apply(this, arguments);
	//custom constructor:
	{
		var context = this._context
		var options = context.options

		var style = this.style = context.createElement('style')
		style.dom.type = 'text/css'

		this.prefix = options.prefix
		var divId = options.id

		var div = document.getElementById(divId)
		var topLevel = div === null

		var userSelect = window.Modernizr.prefixedCSS('user-select') + ": none; "
		style.setHtml(
			"div#" + divId + " { position: absolute; visibility: inherit; left: 0px; top: 0px; }" +
			"div." + this._context.getClass('core-text') + " { width: auto; height: auto; visibility: inherit; }" +
			(topLevel? "body { overflow-x: hidden; }": "") + //fixme: do we need style here in non-top-level mode?
			this.mangleRule('video', "{ position: absolute; visibility: inherit; }") +
			this.mangleRule('img', "{ position: absolute; visibility: inherit; -webkit-touch-callout: none; " + userSelect + " }")
		)
		_globals.html5.html.getElement('head').append(style)

		this._addRule = _globals.html5.html.createAddRule(style.dom)
	}

}
	_globals.html5.Stylesheet.prototype = Object.create(_globals.core.Object.prototype)
	_globals.html5.Stylesheet.prototype.constructor = _globals.html5.Stylesheet
	_globals.html5.Stylesheet.prototype.componentName = 'html5.Stylesheet'
	_globals.html5.Stylesheet.prototype.addRule = function(selector,rule) {
		var mangledSelector = this.mangleSelector(selector)
		this._addRule(mangledSelector, rule)
	}
	_globals.html5.Stylesheet.prototype.mangleRule = function(selector,rule) {
		return this.mangleSelector(selector) + ' ' + rule + ' '
	}
	_globals.html5.Stylesheet.prototype.mangleSelector = function(selector) {
		var prefix = this.prefix
		if (prefix)
			return selector + '.' + prefix + 'core-item'
		else
			return selector
	}
_globals.core.model = (function() {/** @const */
var exports = {};
//=====[import core.model]=====================

var ModelUpdateNothing = 0
var ModelUpdateInsert = 1
var ModelUpdateUpdate = 2

var ModelUpdateRange = function(type, length) {
	this.type = type
	this.length = length
}

exports.ModelUpdate = function() {
	this.count = 0
	this._reset()
}
exports.ModelUpdate.prototype.constructor = exports.ModelUpdate

exports.ModelUpdate.prototype._reset = function() {
	this._ranges = [new ModelUpdateRange(ModelUpdateNothing, this.count)]
	this._updateIndex = this.count
}

exports.ModelUpdate.prototype._setUpdateIndex = function(begin) {
	if (begin < this._updateIndex)
		this._updateIndex = begin
}

exports.ModelUpdate.prototype._find = function(index) {
	var ranges = this._ranges
	var i
	for(i = 0; i < ranges.length; ++i) {
		var range = ranges[i]
		if (index < range.length)
			return { index: i, offset: index }
		if (range.length > 0)
			index -= range.length
	}
	if (index != 0)
		throw new Error('invalid index ' + index)

	return { index: i - 1, offset: 0 }
}

exports.ModelUpdate.prototype.reset = function(model) {
	this.update(model, 0, Math.min(model.count, this.count))
	if (this.count < model.count) {
		this.insert(model, this.count, model.count)
	} else {
		this.remove(model, model.count, this.count)
	}
}

exports.ModelUpdate.prototype._merge = function() {
	var ranges = this._ranges
	var n = ranges.length - 1
	for(var index = 0; index < n; ) {
		var range = ranges[index]
		var nextRange = ranges[index + 1]
		if (range.type === nextRange) {
			range.length += nextRange.length
			ranges.splice(index + 1, 1)
		} else
			++index
	}
}

exports.ModelUpdate.prototype._split = function(index, offset, type, length) {
	var ranges = this._ranges
	if (offset == 0) {
		ranges.splice(index, 0, new ModelUpdateRange(type, length))
		return index + 1
	} else {
		var range = ranges[index]
		var right = range.length - offset
		range.length = offset
		if (right != 0) {
			ranges.splice(index + 1, 0,
				new ModelUpdateRange(type, length),
				new ModelUpdateRange(range.type, right))
			return index + 2
		} else {
			ranges.splice(index, 0,
				new ModelUpdateRange(type, length))
			return index + 1
		}
	}
}

exports.ModelUpdate.prototype.insert = function(model, begin, end) {
	if (begin >= end)
		return

	this._setUpdateIndex(begin)
	var ranges = this._ranges
	var d = end - begin
	this.count += d
	if (this.count != model.count)
		throw new Error('unbalanced insert ' + this.count + ' + [' + begin + '-' + end + '], model reported ' + model.count)

	var res = this._find(begin)
	var range = ranges[res.index]
	if (range.length == 0) { //first insert
		range.type = ModelUpdateInsert
		range.length += d
	} else if (range.type == ModelUpdateInsert) {
		range.length += d
	} else {
		this._split(res.index, res.offset, ModelUpdateInsert, d)
	}
	this._merge()
}

exports.ModelUpdate.prototype.remove = function(model, begin, end) {
	if (begin >= end)
		return

	this._setUpdateIndex(begin)
	var ranges = this._ranges
	var d = end - begin
	this.count -= d
	if (this.count != model.count)
		throw new Error('unbalanced remove ' + this.count + ' + [' + begin + '-' + end + '], model reported ' + model.count)

	var res = this._find(begin)
	var range = ranges[res.index]
	if (range.type == ModelUpdateInsert) {
		range.length -= d
	} else {
		var index = this._split(res.index, res.offset, ModelUpdateInsert, -d)
		while(d > 0) {
			var range = ranges[index]
			if (range.length <= d) {
				ranges.splice(index, 1)
				d -= ranges.length
			} else {
				range.length -= d
			}
		}
	}
	this._merge()
}

exports.ModelUpdate.prototype.update = function(model, begin, end) {
	if (begin >= end)
		return

	var ranges = this._ranges
	var n = end - begin
	var res = this._find(begin)
	var index = res.index

	var range = ranges[index]
	if (res.offset > 0) {
		ranges.splice(index + 1, 0, new ModelUpdateRange(ModelUpdateNothing, range.length - res.offset))
		range.length = res.offset
		++index
	}

	while(n > 0) {
		var range = ranges[index]
		var length = range.length
		switch(range.type) {
			case ModelUpdateNothing:
				if (length > n) {
					//range larger than needed
					range.length -= n
					ranges.splice(index, 0, new ModelUpdateRange(ModelUpdateUpdate, n))
					n -= length
				} else { //length < n and offset == 0
					range.type = ModelUpdateUpdate
					n -= length
				}
				break
			case ModelUpdateInsert:
				if (length > 0) {
					n -= length
					++index
				}
				break
			case ModelUpdateUpdate:
				n -= length
				++index
				break
		}
	}
	this._merge()
}

exports.ModelUpdate.prototype.apply = function(view) {
	var index = 0
	this._ranges.forEach(
		function(range) {
			switch(range.type) {
				case ModelUpdateInsert:
					var n = range.length
					if (n > 0) {
						view._insertItems(index, index + n)
						index += n
					} else {
						view._discardItems(index, index - n)
					}
					break
				case ModelUpdateUpdate:
					var n = index + range.length
					for(var i = index; i < n; ++i)
						view._updateDelegate(i)
					index = n
					break
				default:
					index += range.length
			}
		}
	)
	if (view._items.length != this.count)
		throw new Error('unbalanced items update')

	for(var i = this._updateIndex; i < this.count; ++i)
		view._updateDelegateIndex(i)
	this._reset()
}

return exports;
} )()
_globals.controls.pure.format = (function() {/** @const */
var exports = {};
//=====[import controls.pure.format]=====================

exports.currency = function(v, n, x) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
  return v.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
}
return exports;
} )()
_globals.html5.html = (function() {/** @const */
var exports = {};
//=====[import html5.html]=====================

exports.createAddRule = function(style) {
	if(! (style.sheet || {}).insertRule) {
		var sheet = (style.styleSheet || style.sheet)
		return function(name, rules) { sheet.addRule(name, rules) }
	}
	else {
		var sheet = style.sheet
		return function(name, rules) { sheet.insertRule(name + '{' + rules + '}', sheet.cssRules.length) }
	}
}

var StyleCache = function (prefix) {
	var style = document.createElement('style')
	style.type = 'text/css'
	document.head.appendChild(style)

	this.prefix = prefix + 'C-'
	this.style = style
	this.total = 0
	this.stats = {}
	this.classes = {}
	this.classes_total = 0
	this._addRule = exports.createAddRule(style)
}

StyleCache.prototype.constructor = StyleCache

StyleCache.prototype.add = function(rule) {
	this.stats[rule] = (this.stats[rule] || 0) + 1
	++this.total
}

StyleCache.prototype.register = function(rules) {
	var rule = rules.join(';')
	var classes = this.classes
	var cls = classes[rule]
	if (cls !== undefined)
		return cls

	var cls = classes[rule] = this.prefix + this.classes_total++
	this._addRule('.' + cls, rule)
	return cls
}

StyleCache.prototype.classify = function(rules) {
	var total = this.total
	if (total < 10) //fixme: initial population threshold
		return ''

	rules.sort() //mind vendor prefixes!
	var classified = []
	var hot = []
	var stats = this.stats
	rules.forEach(function(rule, idx) {
		var hits = stats[rule]
		var usage = hits / total
		if (usage > 0.05) { //fixme: usage threshold
			classified.push(rule)
			hot.push(idx)
		}
	})
	if (hot.length < 2)
		return ''
	hot.forEach(function(offset, idx) {
		rules.splice(offset - idx, 1)
	})
	return this.register(classified)
}

var _modernizrCache = {}

var getPrefixedName = function(name) {
	var prefixedName = _modernizrCache[name]
	if (prefixedName === undefined)
		_modernizrCache[name] = prefixedName = window.Modernizr.prefixedCSS(name)
	return prefixedName
}

exports.getPrefixedName = getPrefixedName

var registerGenericListener = function(target) {
	var copyArguments = _globals.core.copyArguments
	var prefix = '_domEventHandler_'
	target.onListener('',
		function(name) {
			//log('registering generic event', name)
			var pname = prefix + name
			var callback = target[pname] = function() {
				var args = copyArguments(arguments, 0, name)
				target.emit.apply(target, args)
			}
			target.dom.addEventListener(name, callback)
		},
		function(name) {
			//log('removing generic event', name)
			var pname = prefix + name
			target.dom.removeEventListener(name, target[pname])
		}
	)
}

var _loadedStylesheets = {}

exports.loadExternalStylesheet = function(url) {
	if (!_loadedStylesheets[url]) {
		var link = document.createElement('link')
		link.setAttribute('rel', "stylesheet")
		link.setAttribute('href', url)
		document.head.appendChild(link)
		_loadedStylesheets[url] = true
	}
}

exports.autoClassify = false

/**
 * @constructor
 */

exports.Element = function(context, dom) {
	if (exports.autoClassify) {
		if (!context._styleCache)
			context._styleCache = new StyleCache(context._prefix)
	} else
		context._styleCache = null

	_globals.core.EventEmitter.apply(this)
	this._context = context
	this.dom = dom
	this._fragment = []
	this._styles = {}
	this._class = ''

	registerGenericListener(this)
}

exports.Element.prototype = Object.create(_globals.core.EventEmitter.prototype)
exports.Element.prototype.constructor = exports.Element

exports.Element.prototype.addClass = function(cls) {
	this.dom.classList.add(cls)
}

exports.Element.prototype.setHtml = function(html) {
	var dom = this.dom
	this._fragment.forEach(function(node) { dom.removeChild(node) })
	this._fragment = []

	if (html === '')
		return

	var fragment = document.createDocumentFragment()
	var temp = document.createElement('div')

	temp.innerHTML = html
	while (temp.firstChild) {
		this._fragment.push(temp.firstChild)
		fragment.appendChild(temp.firstChild)
	}
	dom.appendChild(fragment)
	return dom.children
}

exports.Element.prototype.width = function() {
	return this.dom.clientWidth
}

exports.Element.prototype.height = function() {
	return this.dom.clientHeight
}

exports.Element.prototype.fullWidth = function() {
	return this.dom.scrollWidth
}

exports.Element.prototype.fullHeight = function() {
	return this.dom.scrollHeight
}

exports.Element.prototype.style = function(name, style) {
	if (style !== undefined) {
		if (style !== '') //fixme: replace it with explicit 'undefined' syntax
			this._styles[name] = style
		else
			delete this._styles[name]
		this.updateStyle()
	} else if (name instanceof Object) { //style({ }) assignment
		for(var k in name) {
			var value = name[k]
			if (value !== '') //fixme: replace it with explicit 'undefined' syntax
				this._styles[k] = value
			else
				delete this._styles[k]
		}
		this.updateStyle()
	}
	else
		return this._styles[name]
}

exports.Element.prototype.setAttribute = function(name, value) {
	this.dom.setAttribute(name, value)
}

exports.Element.prototype.updateStyle = function() {
	var element = this.dom
	if (!element)
		return

	/** @const */
	var cssUnits = {
		'left': 'px',
		'top': 'px',
		'width': 'px',
		'height': 'px',

		'border-radius': 'px',
		'border-width': 'px',

		'margin-left': 'px',
		'margin-top': 'px',
		'margin-right': 'px',
		'margin-bottom': 'px',

		'padding-left': 'px',
		'padding-top': 'px',
		'padding-right': 'px',
		'padding-bottom': 'px'
	}

	var cache = this._context._styleCache
	var rules = []
	for(var name in this._styles) {
		var value = this._styles[name]

		var prefixedName = getPrefixedName(name)
		var ruleName = prefixedName !== false? prefixedName: name
		if (Array.isArray(value))
			value = value.join(',')

		var unit = (typeof value === 'number')? cssUnits[name] || '': ''
		value += unit

		//var prefixedValue = window.Modernizr.prefixedCSSValue(name, value)
		//var prefixedValue = value
		var rule = ruleName + ':' + value //+ (prefixedValue !== false? prefixedValue: value)

		if (cache)
			cache.add(rule)

		rules.push(rule)
	}
	var cls = cache? cache.classify(rules): ''
	if (cls !== this._class) {
		var classList = element.classList
		if (this._class !== '')
			classList.remove(this._class)
		this._class = cls
		if (cls !== '')
			classList.add(cls)
	}
	this.dom.setAttribute('style', rules.join(';'))
}

exports.Element.prototype.append = function(el) {
	this.dom.appendChild((el instanceof exports.Element)? el.dom: el)
}

exports.Element.prototype.discard = function() {
	_globals.core.EventEmitter.prototype.discard.apply(this)
	this.remove()
}

exports.Element.prototype.remove = function() {
	var dom = this.dom
	dom.parentNode.removeChild(dom)
}

exports.Window = function(context, dom) {
	_globals.core.EventEmitter.apply(this)
	this._context = context
	this.dom = dom

	registerGenericListener(this)
}

exports.Window.prototype = Object.create(_globals.core.EventEmitter.prototype)
exports.Window.prototype.constructor = exports.Window

exports.Window.prototype.width = function() {
	return this.dom.innerWidth
}

exports.Window.prototype.height = function() {
	return this.dom.innerHeight
}

exports.Window.prototype.scrollY = function() {
	return this.dom.scrollY
}

exports.getElement = function(tag) {
	var tags = document.getElementsByTagName(tag)
	if (tags.length != 1)
		throw new Error('no tag ' + tag + '/multiple tags')
	return new exports.Element(this, tags[0])
}

var Modernizr = window.Modernizr
exports.requestAnimationFrame = Modernizr.prefixed('requestAnimationFrame', window)	|| function(callback) { return setTimeout(callback, 0) }
exports.cancelAnimationFrame = Modernizr.prefixed('cancelAnimationFrame', window)	|| function(id) { return clearTimeout(id) }

return exports;
} )()


return exports;
} )();
try {
	var l10n = {}

	qml._context = new qml.core.Context(null, false, {id: 'qml-context-vc', prefix: '', l10n: l10n})
	var closure = {}

	qml._context.__create(closure)
	qml._context.__setup(closure)
	closure = undefined
	qml._context.init()
	qml._context.start(new qml.vc.UiVc(qml._context))
} catch(ex) { log("qml initialization failed: ", ex, ex.stack) }

return exports;
} )()
_globals.controls.pure.format = (function() {/** @const */
var exports = {};
//=====[import controls.pure.format]=====================

exports.currency = function(v, n, x) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
  return v.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
}
return exports;
} )()
_globals.html5.html = (function() {/** @const */
var exports = {};
//=====[import html5.html]=====================

exports.createAddRule = function(style) {
	if(! (style.sheet || {}).insertRule) {
		var sheet = (style.styleSheet || style.sheet)
		return function(name, rules) { sheet.addRule(name, rules) }
	}
	else {
		var sheet = style.sheet
		return function(name, rules) { sheet.insertRule(name + '{' + rules + '}', sheet.cssRules.length) }
	}
}

var StyleCache = function (prefix) {
	var style = document.createElement('style')
	style.type = 'text/css'
	document.head.appendChild(style)

	this.prefix = prefix + 'C-'
	this.style = style
	this.total = 0
	this.stats = {}
	this.classes = {}
	this.classes_total = 0
	this._addRule = exports.createAddRule(style)
}

StyleCache.prototype.constructor = StyleCache

StyleCache.prototype.add = function(rule) {
	this.stats[rule] = (this.stats[rule] || 0) + 1
	++this.total
}

StyleCache.prototype.register = function(rules) {
	var rule = rules.join(';')
	var classes = this.classes
	var cls = classes[rule]
	if (cls !== undefined)
		return cls

	var cls = classes[rule] = this.prefix + this.classes_total++
	this._addRule('.' + cls, rule)
	return cls
}

StyleCache.prototype.classify = function(rules) {
	var total = this.total
	if (total < 10) //fixme: initial population threshold
		return ''

	rules.sort() //mind vendor prefixes!
	var classified = []
	var hot = []
	var stats = this.stats
	rules.forEach(function(rule, idx) {
		var hits = stats[rule]
		var usage = hits / total
		if (usage > 0.05) { //fixme: usage threshold
			classified.push(rule)
			hot.push(idx)
		}
	})
	if (hot.length < 2)
		return ''
	hot.forEach(function(offset, idx) {
		rules.splice(offset - idx, 1)
	})
	return this.register(classified)
}

var _modernizrCache = {}

var getPrefixedName = function(name) {
	var prefixedName = _modernizrCache[name]
	if (prefixedName === undefined)
		_modernizrCache[name] = prefixedName = window.Modernizr.prefixedCSS(name)
	return prefixedName
}

exports.getPrefixedName = getPrefixedName

var registerGenericListener = function(target) {
	var copyArguments = _globals.core.copyArguments
	var prefix = '_domEventHandler_'
	target.onListener('',
		function(name) {
			//log('registering generic event', name)
			var pname = prefix + name
			var callback = target[pname] = function() {
				var args = copyArguments(arguments, 0, name)
				target.emit.apply(target, args)
			}
			target.dom.addEventListener(name, callback)
		},
		function(name) {
			//log('removing generic event', name)
			var pname = prefix + name
			target.dom.removeEventListener(name, target[pname])
		}
	)
}

var _loadedStylesheets = {}

exports.loadExternalStylesheet = function(url) {
	if (!_loadedStylesheets[url]) {
		var link = document.createElement('link')
		link.setAttribute('rel', "stylesheet")
		link.setAttribute('href', url)
		document.head.appendChild(link)
		_loadedStylesheets[url] = true
	}
}

exports.autoClassify = false

/**
 * @constructor
 */

exports.Element = function(context, dom) {
	if (exports.autoClassify) {
		if (!context._styleCache)
			context._styleCache = new StyleCache(context._prefix)
	} else
		context._styleCache = null

	_globals.core.EventEmitter.apply(this)
	this._context = context
	this.dom = dom
	this._fragment = []
	this._styles = {}
	this._class = ''

	registerGenericListener(this)
}

exports.Element.prototype = Object.create(_globals.core.EventEmitter.prototype)
exports.Element.prototype.constructor = exports.Element

exports.Element.prototype.addClass = function(cls) {
	this.dom.classList.add(cls)
}

exports.Element.prototype.setHtml = function(html) {
	var dom = this.dom
	this._fragment.forEach(function(node) { dom.removeChild(node) })
	this._fragment = []

	if (html === '')
		return

	var fragment = document.createDocumentFragment()
	var temp = document.createElement('div')

	temp.innerHTML = html
	while (temp.firstChild) {
		this._fragment.push(temp.firstChild)
		fragment.appendChild(temp.firstChild)
	}
	dom.appendChild(fragment)
	return dom.children
}

exports.Element.prototype.width = function() {
	return this.dom.clientWidth
}

exports.Element.prototype.height = function() {
	return this.dom.clientHeight
}

exports.Element.prototype.fullWidth = function() {
	return this.dom.scrollWidth
}

exports.Element.prototype.fullHeight = function() {
	return this.dom.scrollHeight
}

exports.Element.prototype.style = function(name, style) {
	if (style !== undefined) {
		if (style !== '') //fixme: replace it with explicit 'undefined' syntax
			this._styles[name] = style
		else
			delete this._styles[name]
		this.updateStyle()
	} else if (name instanceof Object) { //style({ }) assignment
		for(var k in name) {
			var value = name[k]
			if (value !== '') //fixme: replace it with explicit 'undefined' syntax
				this._styles[k] = value
			else
				delete this._styles[k]
		}
		this.updateStyle()
	}
	else
		return this._styles[name]
}

exports.Element.prototype.setAttribute = function(name, value) {
	this.dom.setAttribute(name, value)
}

exports.Element.prototype.updateStyle = function() {
	var element = this.dom
	if (!element)
		return

	/** @const */
	var cssUnits = {
		'left': 'px',
		'top': 'px',
		'width': 'px',
		'height': 'px',

		'border-radius': 'px',
		'border-width': 'px',

		'margin-left': 'px',
		'margin-top': 'px',
		'margin-right': 'px',
		'margin-bottom': 'px',

		'padding-left': 'px',
		'padding-top': 'px',
		'padding-right': 'px',
		'padding-bottom': 'px'
	}

	var cache = this._context._styleCache
	var rules = []
	for(var name in this._styles) {
		var value = this._styles[name]

		var prefixedName = getPrefixedName(name)
		var ruleName = prefixedName !== false? prefixedName: name
		if (Array.isArray(value))
			value = value.join(',')

		var unit = (typeof value === 'number')? cssUnits[name] || '': ''
		value += unit

		//var prefixedValue = window.Modernizr.prefixedCSSValue(name, value)
		//var prefixedValue = value
		var rule = ruleName + ':' + value //+ (prefixedValue !== false? prefixedValue: value)

		if (cache)
			cache.add(rule)

		rules.push(rule)
	}
	var cls = cache? cache.classify(rules): ''
	if (cls !== this._class) {
		var classList = element.classList
		if (this._class !== '')
			classList.remove(this._class)
		this._class = cls
		if (cls !== '')
			classList.add(cls)
	}
	this.dom.setAttribute('style', rules.join(';'))
}

exports.Element.prototype.append = function(el) {
	this.dom.appendChild((el instanceof exports.Element)? el.dom: el)
}

exports.Element.prototype.discard = function() {
	_globals.core.EventEmitter.prototype.discard.apply(this)
	this.remove()
}

exports.Element.prototype.remove = function() {
	var dom = this.dom
	dom.parentNode.removeChild(dom)
}

exports.Window = function(context, dom) {
	_globals.core.EventEmitter.apply(this)
	this._context = context
	this.dom = dom

	registerGenericListener(this)
}

exports.Window.prototype = Object.create(_globals.core.EventEmitter.prototype)
exports.Window.prototype.constructor = exports.Window

exports.Window.prototype.width = function() {
	return this.dom.innerWidth
}

exports.Window.prototype.height = function() {
	return this.dom.innerHeight
}

exports.Window.prototype.scrollY = function() {
	return this.dom.scrollY
}

exports.getElement = function(tag) {
	var tags = document.getElementsByTagName(tag)
	if (tags.length != 1)
		throw new Error('no tag ' + tag + '/multiple tags')
	return new exports.Element(this, tags[0])
}

var Modernizr = window.Modernizr
exports.requestAnimationFrame = Modernizr.prefixed('requestAnimationFrame', window)	|| function(callback) { return setTimeout(callback, 0) }
exports.cancelAnimationFrame = Modernizr.prefixed('cancelAnimationFrame', window)	|| function(id) { return clearTimeout(id) }

return exports;
} )()


return exports;
} )();
try {
	var l10n = {}

	qml._context = new qml.core.Context(null, false, {id: 'qml-context-vc', prefix: '', l10n: l10n})
	var closure = {}

	qml._context.__create(closure)
	qml._context.__setup(closure)
	closure = undefined
	qml._context.init()
	qml._context.start(new qml.vc.UiVc(qml._context))
} catch(ex) { log("qml initialization failed: ", ex, ex.stack) }
